"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { supabase } from "@/lib/supabase";
import {
  Search,
  RefreshCcw,
  Play,
  Pause,
  MapPin,
  Car,
  Clock,
  Navigation,
  Signal,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Crosshair,
  Layers,
  SkipBack,
  SkipForward,
  X,
  Activity,
  AlertTriangle,
  Circle,
  Map as MapIcon,
  Eye,
  EyeOff,
  Plus,
  Shield,
  Compass,
  Zap,
  Radio,
} from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FyYWhhc2lmIiwiYSI6ImNtaWlvdGZ5bTA1Z24zZXNoazZwb3p6Y3kifQ.2olx4jcsvmvcXOoblHiRFA";

type Vehicle = {
  id: string;
  registration_number?: string | null;
  last_known_location?: { lat?: number; lng?: number } | null;
  last_update?: string | null;
  status?: string | null;
  assigned_driver_id?: string | null;
  company_id?: string | null;
  image_url?: string | null;
  model?: string | null;
  vehicle_type?: string | null;
  brand?: string | null;
  speed?: number | null;
  heading?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  ignition_status?: boolean | null;
};

type Geofence = {
  id: string;
  name: string;
  boundary: unknown;
  active: boolean;
  vehicle_id?: string | null;
  type?: string | null;
  speed_limit?: number | null;
};

type Alert = {
  id: string;
  message: string;
  severity: string;
  alert_type: string;
  vehicle_id?: string | null;
  geofence_id?: string | null;
  speed_recorded?: number | null;
  speed_limit?: number | null;
  created_at: string;
  acknowledged: boolean;
};

// Point in polygon check using ray casting algorithm
const isPointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
  const [x, y] = point;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  
  return inside;
};

const MAP_STYLES = {
  streets: "mapbox://styles/mapbox/streets-v12",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  dark: "mapbox://styles/mapbox/dark-v11",
  light: "mapbox://styles/mapbox/light-v11",
};

export default function LiveTrackingPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const vehicleMarkersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const drawRef = useRef<MapboxDraw | null>(null);

  // State
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isSideOpen, setIsSideOpen] = useState(true);
  const [mapStyle, setMapStyle] = useState<keyof typeof MAP_STYLES>("streets");
  const [isLoading, setIsLoading] = useState(true);
  const [showStylePicker, setShowStylePicker] = useState(false);

  // Geofence state
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [showGeofences, setShowGeofences] = useState(true);
  const geofenceLayersRef = useRef<Set<string>>(new Set());
  
  // Alert state
  const [liveAlerts, setLiveAlerts] = useState<Alert[]>([]);
  const [showAlertBanner, setShowAlertBanner] = useState(false);
  const vehicleGeofenceStateRef = useRef<Map<string, Set<string>>>(new Map()); // Track which vehicles are in which geofences
  const defaultSpeedLimit = 120; // Default speed limit in km/h
  
  // Geofence creation state
  const [isDrawingGeofence, setIsDrawingGeofence] = useState(false);
  const [showGeofenceModal, setShowGeofenceModal] = useState(false);
  const [drawnGeometry, setDrawnGeometry] = useState<GeoJSON.Geometry | null>(null);
  const [geofenceForm, setGeofenceForm] = useState({
    name: "",
    description: "",
    vehicle_id: "",
    type: "both",
  });

  // Realtime connection status
  const [realtimeStatus, setRealtimeStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Playback state
  const [playbackPoints, setPlaybackPoints] = useState<
    { lat: number; lng: number; timestamp: string; speed?: number }[]
  >([]);
  const playbackMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const playbackAnimationRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackIdx, setPlaybackIdx] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showPlaybackPanel, setShowPlaybackPanel] = useState(false);
  const [playbackVehicle, setPlaybackVehicle] = useState<Vehicle | null>(null);

  // Realtime channel ref
  const realtimeChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Stats - memoized to prevent recalculation on every render
  const stats = useMemo(() => ({
    total: vehicles.length,
    moving: vehicles.filter((v) => v.status === "moving" || v.status === "online" || v.status === "in_motion").length,
    stopped: vehicles.filter((v) => v.status === "stopped" || v.status === "parked").length,
    offline: vehicles.filter((v) => v.status === "offline" || !v.status).length,
  }), [vehicles]);

  // --- Load vehicles with latest tracking data ---
  const loadVehicles = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Fetch vehicles and latest tracking in parallel
      const [vehiclesResult, trackingResult] = await Promise.all([
        supabase
          .from("vehicles")
          .select("id, registration_number, last_known_location, last_update, status, assigned_driver_id, company_id, model, vehicle_type, brand, image_url")
          .limit(100),
        supabase
          .from("tracking_data")
          .select("vehicle_id, location, timestamp, speed, ignition_status, heading")
          .order("timestamp", { ascending: false })
          .limit(200),
      ]);

      const vehiclesData = vehiclesResult.data;
      const latestTracking = trackingResult.data;

      if (!vehiclesData) {
        setIsLoading(false);
        return;
      }

      // Create a map of latest tracking per vehicle (more efficient)
      const latestByVehicle = new Map<string, {
        location: unknown;
        timestamp: string;
        speed?: number | null;
        ignition_status?: boolean | null;
        heading?: number | null;
      }>();

      if (latestTracking) {
        for (const t of latestTracking) {
          if (!latestByVehicle.has(t.vehicle_id)) {
            latestByVehicle.set(t.vehicle_id, t);
          }
        }
      }

    // Parse location helper - handles multiple formats including PostGIS geometry
    const parseLocation = (loc: unknown): { lat: number; lng: number } | null => {
      if (!loc) return null;
      
      // Already an object with lat/lng
      if (typeof loc === 'object' && loc !== null) {
        const obj = loc as Record<string, unknown>;
        if (typeof obj.lat === 'number' && typeof obj.lng === 'number') {
          return { lat: obj.lat, lng: obj.lng };
        }
        // GeoJSON Point format
        if ('coordinates' in obj && Array.isArray(obj.coordinates)) {
          const coords = obj.coordinates as number[];
          if (coords.length >= 2) {
            return { lng: coords[0], lat: coords[1] };
          }
        }
        // Object with x/y
        if (typeof obj.x === 'number' && typeof obj.y === 'number') {
          return { lng: obj.x, lat: obj.y };
        }
      }
      
      // WKT string (including SRID prefix)
      if (typeof loc === 'string') {
        // Remove SRID prefix if present
        const cleanLoc = loc.replace(/^SRID=\d+;/, '');
        const pointMatch = cleanLoc.match(/POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i);
        if (pointMatch) {
          return { lng: parseFloat(pointMatch[1]), lat: parseFloat(pointMatch[2]) };
        }
      }
      
      return null;
    };

    const normalized = (vehiclesData as unknown as Vehicle[]).map((v) => {
      const latestTrack = latestByVehicle.get(v.id);
      
      // Use tracking_data if it's more recent than vehicles table
      let location = v.last_known_location && typeof v.last_known_location === "object"
        ? v.last_known_location
        : null;
      let lastUpdate = v.last_update;
      let status = v.status;
      let speed: number | null = null;
      let heading: number | null = null;
      let latitude: number | null = null;
      let longitude: number | null = null;
      let ignition_status: boolean | null = null;

      if (latestTrack) {
        // Parse the location column (PostGIS geometry or JSON)
        const parsedLoc = parseLocation(latestTrack.location);
        if (parsedLoc) {
          const trackTime = new Date(latestTrack.timestamp).getTime();
          const vehicleTime = lastUpdate ? new Date(lastUpdate).getTime() : 0;
          
          if (trackTime > vehicleTime) {
            location = parsedLoc;
            latitude = parsedLoc.lat;
            longitude = parsedLoc.lng;
            lastUpdate = latestTrack.timestamp;
            status = latestTrack.ignition_status ? "moving" : "stopped";
            speed = typeof latestTrack.speed === 'number' ? latestTrack.speed : null;
            heading = typeof latestTrack.heading === 'number' ? latestTrack.heading : null;
            ignition_status = latestTrack.ignition_status ?? null;
          }
        }
      }

      return {
        ...v,
        last_known_location: location,
        last_update: lastUpdate,
        status: status,
        speed: speed,
        heading: heading,
        latitude: latitude,
        longitude: longitude,
        ignition_status: ignition_status,
      };
    });

    // Sort vehicles: moving/active first, then by last update
    const sortedVehicles = normalized.sort((a, b) => {
      const aActive = a.status === 'moving' || a.status === 'online' || a.status === 'in_motion';
      const bActive = b.status === 'moving' || b.status === 'online' || b.status === 'in_motion';
      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;
      // Then by last update (most recent first)
      const aTime = a.last_update ? new Date(a.last_update).getTime() : 0;
      const bTime = b.last_update ? new Date(b.last_update).getTime() : 0;
      return bTime - aTime;
    });

    const uniqueVehicles = Array.from(
      new Map(sortedVehicles.map((v: Vehicle) => [v.id, v])).values()
    );
    setVehicles(uniqueVehicles);
    } catch (error) {
      console.error("Error loading vehicles:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- Load geofences ---
  const loadGeofences = useCallback(async () => {
    // Use RPC to get boundary as GeoJSON since PostGIS stores it as binary WKB
    // The RPC function needs to be created in Supabase first
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.rpc as any)('get_geofences_with_geojson');
    
    if (error) {
      // Fallback to regular query if RPC doesn't exist
      console.log('RPC not available, trying direct query with ST_AsGeoJSON');
      const { data: fallbackData } = await supabase
        .from("geofences")
        .select("id, name, boundary, active, vehicle_id, type")
        .eq("active", true);
      
      // Try to parse the boundary - it might be WKB hex
      const parsedGeofences = (fallbackData || []).map((g: any) => {
        // If boundary is a hex string (WKB), we can't parse it client-side easily
        // But if it's already GeoJSON object, use it
        let parsedBoundary = g.boundary;
        if (typeof g.boundary === 'object' && g.boundary?.type && g.boundary?.coordinates) {
          parsedBoundary = g.boundary;
        }
        return { ...g, boundary: parsedBoundary };
      });
      
      setGeofences(parsedGeofences as Geofence[]);
      return;
    }

    setGeofences((data || []) as Geofence[]);
  }, []);

  // Check geofence violations for a vehicle
  const checkGeofenceViolations = useCallback(async (
    vehicleId: string, 
    vehicleName: string,
    lat: number, 
    lng: number,
    speed: number | null
  ) => {
    if (geofences.length === 0) return;

    const currentVehicleState = vehicleGeofenceStateRef.current.get(vehicleId) || new Set<string>();
    const newGeofenceState = new Set<string>();

    for (const geofence of geofences) {
      const geometry = parseBoundary(geofence.boundary);
      if (!geometry || geometry.type !== 'Polygon') continue;

      // Check if vehicle is inside geofence
      const coordinates = geometry.coordinates[0]; // First ring (outer polygon)
      const isInside = isPointInPolygon([lng, lat], coordinates);
      
      if (isInside) {
        newGeofenceState.add(geofence.id);
        
        // Check for entry alert
        if (!currentVehicleState.has(geofence.id)) {
          // Vehicle just entered geofence
          if (geofence.type === 'entry' || geofence.type === 'both') {
            const alert: Alert = {
              id: `${vehicleId}-${geofence.id}-entry-${Date.now()}`,
              message: `${vehicleName} entered geofence: ${geofence.name}`,
              severity: 'medium',
              alert_type: 'geofence_entry',
              vehicle_id: vehicleId,
              geofence_id: geofence.id,
              created_at: new Date().toISOString(),
              acknowledged: false,
            };
            setLiveAlerts(prev => [alert, ...prev].slice(0, 50));
            setShowAlertBanner(true);
            
            // Save to database
            saveAlert(alert, vehicleId, geofence.id);
          }
        }

        // Check speed limit within geofence
        if (geofence.speed_limit && speed && speed > geofence.speed_limit) {
          const alert: Alert = {
            id: `${vehicleId}-speed-${geofence.id}-${Date.now()}`,
            message: `${vehicleName} speeding in ${geofence.name}: ${speed.toFixed(0)} km/h (limit: ${geofence.speed_limit} km/h)`,
            severity: 'high',
            alert_type: 'speed_violation',
            vehicle_id: vehicleId,
            geofence_id: geofence.id,
            speed_recorded: speed,
            speed_limit: geofence.speed_limit,
            created_at: new Date().toISOString(),
            acknowledged: false,
          };
          setLiveAlerts(prev => [alert, ...prev].slice(0, 50));
          setShowAlertBanner(true);
          saveAlert(alert, vehicleId, geofence.id);
        }
      } else {
        // Check for exit alert
        if (currentVehicleState.has(geofence.id)) {
          // Vehicle just exited geofence
          if (geofence.type === 'exit' || geofence.type === 'both') {
            const alert: Alert = {
              id: `${vehicleId}-${geofence.id}-exit-${Date.now()}`,
              message: `${vehicleName} exited geofence: ${geofence.name}`,
              severity: 'medium',
              alert_type: 'geofence_exit',
              vehicle_id: vehicleId,
              geofence_id: geofence.id,
              created_at: new Date().toISOString(),
              acknowledged: false,
            };
            setLiveAlerts(prev => [alert, ...prev].slice(0, 50));
            setShowAlertBanner(true);
            saveAlert(alert, vehicleId, geofence.id);
          }
        }
      }
    }

    // Update vehicle geofence state
    vehicleGeofenceStateRef.current.set(vehicleId, newGeofenceState);

    // Check global speed limit
    if (speed && speed > defaultSpeedLimit) {
      // Only alert once per 60 seconds per vehicle for speed
      const lastSpeedAlertKey = `${vehicleId}-speed-global`;
      const lastAlert = liveAlerts.find(a => a.id.startsWith(lastSpeedAlertKey));
      const shouldAlert = !lastAlert || (Date.now() - new Date(lastAlert.created_at).getTime() > 60000);
      
      if (shouldAlert) {
        const alert: Alert = {
          id: `${lastSpeedAlertKey}-${Date.now()}`,
          message: `${vehicleName} exceeded speed limit: ${speed.toFixed(0)} km/h (limit: ${defaultSpeedLimit} km/h)`,
          severity: 'high',
          alert_type: 'speed_violation',
          vehicle_id: vehicleId,
          speed_recorded: speed,
          speed_limit: defaultSpeedLimit,
          created_at: new Date().toISOString(),
          acknowledged: false,
        };
        setLiveAlerts(prev => [alert, ...prev].slice(0, 50));
        setShowAlertBanner(true);
        saveAlert(alert, vehicleId, null);
      }
    }
  }, [geofences, liveAlerts]);

  // Save alert to database
  const saveAlert = async (alert: Alert, vehicleId: string, geofenceId: string | null) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('alerts').insert({
        user_id: user.id,
        vehicle_id: vehicleId,
        geofence_id: geofenceId,
        message: alert.message,
        severity: alert.severity,
        alert_type: alert.alert_type,
        speed_recorded: alert.speed_recorded,
        speed_limit: alert.speed_limit,
        acknowledged: false,
      });
    } catch (error) {
      console.error('Failed to save alert:', error);
    }
  };

  // Parse WKT to GeoJSON
  const wktToGeoJson = (wkt: string): { type: string; coordinates: number[][][] } | null => {
    try {
      const cleanWkt = wkt.replace(/^SRID=\d+;/, "");
      const polygonMatch = cleanWkt.match(/POLYGON\s*\(\((.+)\)\)/i);
      if (!polygonMatch) return null;

      const coordsStr = polygonMatch[1];
      const rings = coordsStr.split("),(").map((ring) =>
        ring.replace(/[()]/g, "").split(",").map((pair) => {
          const [lng, lat] = pair.trim().split(/\s+/).map(Number);
          return [lng, lat];
        })
      );

      return { type: "Polygon", coordinates: rings };
    } catch {
      return null;
    }
  };

  // Parse boundary to GeoJSON
  const parseBoundary = (boundary: unknown): { type: string; coordinates: number[][][] } | null => {
    if (!boundary) return null;

    try {
      if (typeof boundary === "string") {
        // Check if WKT format
        if (boundary.includes("POLYGON") || boundary.includes("POINT")) {
          return wktToGeoJson(boundary);
        }
        // Try JSON parse
        const parsed = JSON.parse(boundary);
        if (parsed.type && parsed.coordinates) {
          return parsed;
        }
      } else if (typeof boundary === "object" && boundary !== null) {
        const b = boundary as { type?: string; coordinates?: number[][][] };
        if (b.type && b.coordinates) {
          return { type: b.type, coordinates: b.coordinates };
        }
      }
    } catch {
      return null;
    }
    return null;
  };

  // Apply filters
  useEffect(() => {
    const list = vehicles.filter((v) => {
      if (search.trim()) {
        const s = search.toLowerCase();
        const rn = String(v.registration_number || "").toLowerCase();
        const brand = String(v.brand || "").toLowerCase();
        const model = String(v.model || "").toLowerCase();
        if (!rn.includes(s) && !brand.includes(s) && !model.includes(s))
          return false;
      }
      if (statusFilter) {
        // Handle "moving" filter to include in_motion, moving, and online statuses
        if (statusFilter === "moving") {
          if (v.status !== "moving" && v.status !== "in_motion" && v.status !== "online") return false;
        } else if (statusFilter === "stopped") {
          if (v.status !== "stopped" && v.status !== "parked") return false;
        } else if (statusFilter === "offline") {
          if (v.status && v.status !== "offline") return false;
        } else if (v.status !== statusFilter) {
          return false;
        }
      }
      return true;
    });
    setFilteredVehicles(list);
  }, [vehicles, search, statusFilter]);

  // --- Init map ---
  useEffect(() => {
    if (mapRef.current) return;
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLES[mapStyle],
      center: [67.0011, 24.8607],
      zoom: 11,
      pitch: 0,
      bearing: 0,
    });

    mapRef.current = map;

    // Add draw control for geofence creation
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: false,
        trash: false,
      },
    });
    map.addControl(draw, "top-left");
    drawRef.current = draw;

    // Handle draw events
    map.on("draw.create", (e: { features: GeoJSON.Feature[] }) => {
      const feature = e.features[0];
      if (feature?.geometry) {
        setDrawnGeometry(feature.geometry);
        setShowGeofenceModal(true);
        setIsDrawingGeofence(false);
      }
    });

    // Ensure map resizes properly after mount
    map.on('load', () => {
      map.resize();
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), "bottom-right");
    
    // Only add GeolocateControl if geolocation is supported and available
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      // Check if geolocation is actually available (not just the API)
      navigator.permissions?.query({ name: 'geolocation' }).then((result) => {
        if (result.state !== 'denied') {
          map.addControl(
            new mapboxgl.GeolocateControl({
              positionOptions: { enableHighAccuracy: true },
              trackUserLocation: true,
            }),
            "bottom-right"
          );
        }
      }).catch(() => {
        // Permissions API not supported, try adding anyway
        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
          }),
          "bottom-right"
        );
      });
    }

    // Also resize after a short delay to handle layout shifts
    const resizeTimer = setTimeout(() => {
      map.resize();
    }, 100);

    return () => {
      clearTimeout(resizeTimer);
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map style
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(MAP_STYLES[mapStyle]);
    }
  }, [mapStyle]);

  // Resize map when sidebar toggles
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.resize();
      }, 350);
    }
  }, [isSideOpen]);

  // --- Draw geofences on map ---
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const drawGeofences = () => {
      // Remove old geofence layers and sources (layers first, then sources)
      geofenceLayersRef.current.forEach((sourceId) => {
        const fillLayerId = `geofence-fill-${sourceId.replace('geofence-', '')}`;
        const outlineLayerId = `geofence-outline-${sourceId.replace('geofence-', '')}`;
        
        try {
          if (map.getLayer(fillLayerId)) map.removeLayer(fillLayerId);
          if (map.getLayer(outlineLayerId)) map.removeLayer(outlineLayerId);
          if (map.getSource(sourceId)) map.removeSource(sourceId);
        } catch (e) {
          console.warn("Error removing geofence layer:", e);
        }
      });
      geofenceLayersRef.current.clear();

      if (!showGeofences) return;

      // Add new geofence layers
      geofences.forEach((geofence) => {
        const geometry = parseBoundary(geofence.boundary);
        if (!geometry) return;

        const sourceId = `geofence-${geofence.id}`;
        const layerId = `geofence-fill-${geofence.id}`;
        const outlineId = `geofence-outline-${geofence.id}`;

        // Skip if source already exists
        if (map.getSource(sourceId)) {
          geofenceLayersRef.current.add(sourceId);
          return;
        }

        // Determine color based on type
        let fillColor = "#3b82f6"; // blue default
        let outlineColor = "#2563eb";
        if (geofence.type === "entry") {
          fillColor = "#22c55e"; // green
          outlineColor = "#16a34a";
        } else if (geofence.type === "exit") {
          fillColor = "#ef4444"; // red
          outlineColor = "#dc2626";
        }

        try {
          map.addSource(sourceId, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: { name: geofence.name, type: geofence.type },
              geometry: geometry as GeoJSON.Geometry,
            },
          });

          map.addLayer({
            id: layerId,
            type: "fill",
            source: sourceId,
            paint: {
              "fill-color": fillColor,
              "fill-opacity": 0.2,
            },
          });

          map.addLayer({
            id: outlineId,
            type: "line",
            source: sourceId,
            paint: {
              "line-color": outlineColor,
              "line-width": 2,
              "line-dasharray": [2, 2],
            },
          });

          geofenceLayersRef.current.add(sourceId);

          // Add popup on click
          map.on("click", layerId, (e) => {
            const coordinates = e.lngLat;
            const name = geofence.name;
            const type = geofence.type || "both";

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`
                <div class="p-2">
                  <p class="font-semibold text-slate-900">${name}</p>
                  <p class="text-sm text-slate-600">Trigger: ${type}</p>
                </div>
              `)
              .addTo(map);
          });

          map.on("mouseenter", layerId, () => {
            map.getCanvas().style.cursor = "pointer";
          });

          map.on("mouseleave", layerId, () => {
            map.getCanvas().style.cursor = "";
          });
        } catch (e) {
          console.error("Error adding geofence layer:", e);
        }
      });
    };

    // Wait for map style to load before adding layers
    if (map.isStyleLoaded()) {
      drawGeofences();
    } else {
      map.on("style.load", drawGeofences);
    }

    return () => {
      map.off("style.load", drawGeofences);
    };
  }, [geofences, showGeofences, mapStyle]);

  // --- Update vehicle markers ---
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers that no longer exist
    vehicleMarkersRef.current.forEach((marker, id) => {
      if (!vehicles.find((v) => v.id === id)) {
        marker.remove();
        vehicleMarkersRef.current.delete(id);
      }
    });

    // Update or add markers
    vehicles.forEach((v) => {
      if (!v.last_known_location?.lng || !v.last_known_location?.lat) return;

      const isSelected = selectedVehicle?.id === v.id;
      const isMoving = v.status === "moving" || v.status === "online" || v.status === "in_motion";
      const vehicleName = v.registration_number || v.brand || 'Vehicle';

      // Remove existing marker to recreate with updated state
      if (vehicleMarkersRef.current.has(v.id)) {
        vehicleMarkersRef.current.get(v.id)!.remove();
        vehicleMarkersRef.current.delete(v.id);
      }

      // Create marker with current state
      const el = document.createElement("div");
      el.className = "vehicle-marker";
      el.innerHTML = `
        <div class="relative cursor-pointer group flex flex-col items-center">
          <!-- Vehicle Label -->
          <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <div class="px-2 py-0.5 bg-slate-900/90 backdrop-blur-sm rounded text-xs font-medium text-white shadow-lg border border-slate-700">
              ${vehicleName}
            </div>
          </div>
          <!-- Vehicle Icon -->
          <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            isMoving
              ? "bg-green-500"
              : "bg-slate-600"
          } ${isSelected ? "ring-4 ring-blue-400 scale-125" : ""}">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          ${isMoving ? '<div class="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>' : ''}
        </div>
      `;

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([v.last_known_location.lng, v.last_known_location.lat])
        .addTo(map);

      el.addEventListener("click", () => {
        setSelectedVehicle(v);
        map.flyTo({
          center: [v.last_known_location!.lng!, v.last_known_location!.lat!],
          zoom: 16,
          duration: 1000,
        });
      });

      vehicleMarkersRef.current.set(v.id, marker);
    });
  }, [vehicles, selectedVehicle]);

  // --- Realtime subscription ---
  useEffect(() => {
    const setupRealtimeSubscription = () => {
      if (realtimeChannelRef.current) {
        supabase.removeChannel(realtimeChannelRef.current);
      }

      setRealtimeStatus('connecting');

      const handleTrackingUpdate = (payload: { new: Record<string, unknown> }) => {
        console.log('📍 Realtime tracking update received:', payload.new);
        
        const record = payload.new as { 
          vehicle_id?: string; 
          location?: { coordinates?: number[]; type?: string } | string; 
          latitude?: number | string | null;
          longitude?: number | string | null;
          timestamp?: string; 
          ignition_status?: boolean; 
          speed?: number | string;
          heading?: number;
        };
        
        // Handle various location formats
        let lng: number | undefined;
        let lat: number | undefined;
        
        // First check direct latitude/longitude columns (primary format from mobile app)
        if (record?.latitude != null && record?.longitude != null) {
          lat = typeof record.latitude === 'number' ? record.latitude : parseFloat(String(record.latitude));
          lng = typeof record.longitude === 'number' ? record.longitude : parseFloat(String(record.longitude));
        }
        // Fallback to location column
        else if (record?.location) {
          const loc = record.location;
          
          // Format 1: GeoJSON Point { type: "Point", coordinates: [lng, lat] }
          if (typeof loc === 'object' && 'coordinates' in loc && Array.isArray(loc.coordinates)) {
            [lng, lat] = loc.coordinates;
          }
          // Format 2: WKT string "POINT(lng lat)" or "SRID=4326;POINT(lng lat)"
          else if (typeof loc === 'string') {
            const pointMatch = loc.match(/POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i);
            if (pointMatch) {
              lng = parseFloat(pointMatch[1]);
              lat = parseFloat(pointMatch[2]);
            }
          }
          // Format 3: Object with x/y or lng/lat
          else if (typeof loc === 'object') {
            const locObj = loc as Record<string, unknown>;
            if (typeof locObj.lng === 'number' && typeof locObj.lat === 'number') {
              lng = locObj.lng;
              lat = locObj.lat;
            } else if (typeof locObj.x === 'number' && typeof locObj.y === 'number') {
              lng = locObj.x;
              lat = locObj.y;
            }
          }
        }
        
        if (!lat || !lng || isNaN(lat) || isNaN(lng) || !record.vehicle_id) {
          console.log('⚠️ Could not parse location from payload:', record);
          return;
        }
        
        console.log(`🚗 Updating vehicle ${record.vehicle_id} to [${lat}, ${lng}]`);

        // Parse speed to number
        const speed = record.speed != null 
          ? (typeof record.speed === 'number' ? record.speed : parseFloat(String(record.speed)))
          : null;

        // Parse heading
        const heading = record.heading != null
          ? (typeof record.heading === 'number' ? record.heading : parseFloat(String(record.heading)))
          : null;

        const updateData = {
          last_known_location: { lat, lng },
          latitude: lat,
          longitude: lng,
          last_update: record.timestamp || new Date().toISOString(),
          status: record.ignition_status ? "moving" : "stopped",
          speed: speed,
          heading: heading,
          ignition_status: record.ignition_status ?? null,
        };

        setVehicles((prev) => {
          const existingVehicle = prev.find(v => v.id === record.vehicle_id);
          if (existingVehicle) {
            // Update existing vehicle
            return prev.map((v) =>
              v.id === record.vehicle_id
                ? { ...v, ...updateData }
                : v
            );
          } else if (record.vehicle_id) {
            // Add new vehicle if it doesn't exist in the list
            console.log(`📥 Adding new vehicle ${record.vehicle_id} to tracking list`);
            const newVehicle: Vehicle = {
              id: record.vehicle_id,
              registration_number: null,
              ...updateData,
            };
            return [newVehicle, ...prev];
          }
          return prev;
        });

        // Check for geofence violations and speed alerts
        const vehicleName = vehicles.find(v => v.id === record.vehicle_id)?.registration_number || 'Vehicle';
        checkGeofenceViolations(record.vehicle_id, vehicleName, lat, lng, speed);

        // Also update selected vehicle if it's the same one
        setSelectedVehicle((prev) => {
          if (prev?.id === record.vehicle_id) {
            return { ...prev, ...updateData } as Vehicle;
          }
          return prev;
        });
      };

      const channel = supabase
        .channel("vehicle_tracking")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "tracking_data" },
          handleTrackingUpdate
        )
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "tracking_data" },
          handleTrackingUpdate
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setRealtimeStatus('connected');
            console.log('✅ Realtime connected to tracking_data');
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            setRealtimeStatus('disconnected');
            console.log('❌ Realtime disconnected, attempting reconnect...');
            
            // Auto-reconnect after 3 seconds
            if (reconnectTimeoutRef.current) {
              clearTimeout(reconnectTimeoutRef.current);
            }
            reconnectTimeoutRef.current = setTimeout(() => {
              setupRealtimeSubscription();
            }, 3000);
          } else if (status === 'CLOSED') {
            setRealtimeStatus('disconnected');
          }
        });

      realtimeChannelRef.current = channel;
    };

    setupRealtimeSubscription();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (realtimeChannelRef.current) {
        supabase.removeChannel(realtimeChannelRef.current);
      }
    };
  }, []);

  // Load initial data
  useEffect(() => {
    loadVehicles();
    loadGeofences();
  }, [loadVehicles, loadGeofences]);

  // Polling fallback - only poll when realtime is disconnected
  useEffect(() => {
    // Only poll if realtime is not connected
    if (realtimeStatus === 'connected') return;
    
    const pollInterval = setInterval(() => {
      loadVehicles();
    }, 15000); // 15 seconds when disconnected

    return () => clearInterval(pollInterval);
  }, [loadVehicles, realtimeStatus]);

  // --- Playback functions ---
  const fetchHistory = async (vehicleId: string, hours = 6) => {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("tracking_data")
      .select("timestamp, location, speed")
      .eq("vehicle_id", vehicleId)
      .gte("timestamp", since)
      .order("timestamp", { ascending: true })
      .limit(5000);

    if (error) {
      console.error("Error fetching history:", error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log("No tracking data found for vehicle", vehicleId, "since", since);
      return [];
    }

    console.log(`Found ${data.length} tracking records for playback`);

    return data.map((p: { 
      timestamp: string; 
      location?: unknown; 
      speed?: number | null;
    }) => {
      let lat: number | undefined;
      let lng: number | undefined;
      
      // Parse location column (PostGIS geometry or JSON)
      if (p.location) {
        const loc = p.location;
        
        // Format 1: Object with lat/lng
        if (typeof loc === 'object' && loc !== null) {
          const obj = loc as Record<string, unknown>;
          if (typeof obj.lat === 'number' && typeof obj.lng === 'number') {
            lat = obj.lat;
            lng = obj.lng;
          }
          // GeoJSON { type: "Point", coordinates: [lng, lat] }
          else if ('coordinates' in obj && Array.isArray(obj.coordinates)) {
            const coords = obj.coordinates as number[];
            if (coords.length >= 2) {
              [lng, lat] = coords;
            }
          }
        }
        // Format 2: WKT string "POINT(lng lat)"
        else if (typeof loc === 'string') {
          const cleanLoc = loc.replace(/^SRID=\d+;/, '');
          const pointMatch = cleanLoc.match(/POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i);
          if (pointMatch) {
            lng = parseFloat(pointMatch[1]);
            lat = parseFloat(pointMatch[2]);
          }
        }
      }
      
      // Parse speed (could be string or number)
      const speed = p.speed != null 
        ? (typeof p.speed === 'number' ? p.speed : undefined)
        : undefined;
      
      return {
        lat: lat ?? NaN,
        lng: lng ?? NaN,
        timestamp: p.timestamp,
        speed: speed,
      };
    }).filter(p => !isNaN(p.lat) && !isNaN(p.lng)); // Filter out invalid points
  };

  const handleStartPlayback = async (vehicle: Vehicle, hours = 6) => {
    const points = await fetchHistory(vehicle.id, hours);
    if (!points.length) {
      alert("No history found for this vehicle in the selected timeframe.");
      return;
    }

    // Validate first point has valid coordinates
    if (isNaN(points[0].lat) || isNaN(points[0].lng)) {
      alert("Unable to parse location data for playback.");
      return;
    }

    setPlaybackVehicle(vehicle);
    setPlaybackPoints(points);
    setPlaybackIdx(0);
    setPlaybackDuration(points.length - 1);
    setShowPlaybackPanel(true);
    setIsPlaying(true);

    drawPlaybackLine(points);

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [points[0].lng, points[0].lat],
        zoom: 14,
      });
    }

    if (playbackMarkerRef.current) {
      playbackMarkerRef.current.remove();
    }

    const el = document.createElement("div");
    el.innerHTML = `
      <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        </svg>
      </div>
    `;

    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat([points[0].lng, points[0].lat])
      .addTo(mapRef.current!);

    playbackMarkerRef.current = marker;
  };

  const drawPlaybackLine = (points: { lat: number; lng: number }[]) => {
    const map = mapRef.current!;

    if (map.getLayer("playback-line")) map.removeLayer("playback-line");
    if (map.getSource("playback-line")) map.removeSource("playback-line");

    map.addSource("playback-line", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: points.map((p) => [p.lng, p.lat]),
        },
      },
    });

    map.addLayer({
      id: "playback-line",
      type: "line",
      source: "playback-line",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3b82f6",
        "line-width": 4,
        "line-opacity": 0.8,
      },
    });
  };

  // Animation loop
  useEffect(() => {
    if (!isPlaying || playbackPoints.length === 0) {
      if (playbackAnimationRef.current) {
        cancelAnimationFrame(playbackAnimationRef.current);
        playbackAnimationRef.current = null;
      }
      return;
    }

    let currentIdx = playbackIdx;
    const fps = 10 * playbackSpeed;
    const stepMs = 1000 / fps;

    const loop = () => {
      if (currentIdx >= playbackPoints.length) {
        setIsPlaying(false);
        return;
      }

      const p = playbackPoints[currentIdx];
      if (playbackMarkerRef.current) {
        playbackMarkerRef.current.setLngLat([p.lng, p.lat]);
      }
      setPlaybackIdx(currentIdx);
      currentIdx++;

      playbackAnimationRef.current = requestAnimationFrame(() => {
        setTimeout(loop, stepMs);
      });
    };

    loop();

    return () => {
      if (playbackAnimationRef.current) {
        cancelAnimationFrame(playbackAnimationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, playbackSpeed]);

  const closePlayback = () => {
    setShowPlaybackPanel(false);
    setIsPlaying(false);
    setPlaybackPoints([]);
    setPlaybackVehicle(null);

    if (playbackMarkerRef.current) {
      playbackMarkerRef.current.remove();
      playbackMarkerRef.current = null;
    }

    const map = mapRef.current;
    if (map) {
      if (map.getLayer("playback-line")) map.removeLayer("playback-line");
      if (map.getSource("playback-line")) map.removeSource("playback-line");
    }
  };

  const getStatusIcon = (status?: string | null) => {
    switch (status) {
      case "moving":
      case "online":
      case "in_motion":
        return <Activity className="w-4 h-4 text-green-400" />;
      case "stopped":
      case "parked":
        return <Circle className="w-4 h-4 text-amber-400" />;
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Signal className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status?: string | null) => {
    switch (status) {
      case "moving":
      case "online":
      case "in_motion":
        return "text-green-400 bg-green-500/10";
      case "stopped":
      case "parked":
        return "text-amber-400 bg-amber-500/10";
      case "alert":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-slate-400 bg-slate-500/10";
    }
  };

  const formatTime = (t?: string | null) => {
    if (!t) return "N/A";
    const date = new Date(t);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  // Convert heading degrees to compass direction
  const getCompassDirection = (heading: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  };

  // --- Geofence creation functions ---
  const toggleDrawingMode = () => {
    if (!drawRef.current) return;

    if (isDrawingGeofence) {
      // Cancel drawing
      drawRef.current.deleteAll();
      drawRef.current.changeMode("simple_select");
      setIsDrawingGeofence(false);
    } else {
      // Start drawing
      drawRef.current.changeMode("draw_polygon");
      setIsDrawingGeofence(true);
    }
  };

  // Convert GeoJSON geometry to WKT format for PostGIS
  const geoJsonToWkt = (geometry: GeoJSON.Geometry): string => {
    if (geometry.type === "Polygon") {
      const coords = geometry.coordinates as number[][][];
      const rings = coords.map((ring) => {
        const points = ring.map((coord) => `${coord[0]} ${coord[1]}`).join(", ");
        return `(${points})`;
      });
      return `SRID=4326;POLYGON(${rings.join(", ")})`;
    }
    return "";
  };

  const handleSaveGeofence = async () => {
    if (!drawnGeometry) {
      alert("Please draw a geofence area on the map");
      return;
    }
    if (!geofenceForm.name.trim()) {
      alert("Please enter a name for the geofence");
      return;
    }

    try {
      const wktBoundary = geoJsonToWkt(drawnGeometry);
      
      if (!wktBoundary) {
        alert("Invalid geometry. Please draw a polygon.");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to create a geofence");
        return;
      }

      const { error } = await supabase.from("geofences").insert([{
        name: geofenceForm.name,
        description: geofenceForm.description || null,
        vehicle_id: geofenceForm.vehicle_id || null,
        type: geofenceForm.type || "both",
        boundary: wktBoundary,
        user_id: user.id,
        active: true,
      }]);

      if (error) {
        console.error("Geofence save error:", error);
        alert(`Failed to save geofence: ${error.message}`);
        return;
      }

      // Clear everything
      if (drawRef.current) {
        drawRef.current.deleteAll();
      }
      setShowGeofenceModal(false);
      setDrawnGeometry(null);
      setGeofenceForm({ name: "", description: "", vehicle_id: "", type: "both" });
      
      // Reload geofences
      loadGeofences();
      alert("Geofence created successfully!");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save geofence";
      console.error("Error saving geofence:", err);
      alert(`Error: ${errorMessage}`);
    }
  };

  const cancelGeofenceCreation = () => {
    if (drawRef.current) {
      drawRef.current.deleteAll();
    }
    setShowGeofenceModal(false);
    setDrawnGeometry(null);
    setIsDrawingGeofence(false);
    setGeofenceForm({ name: "", description: "", vehicle_id: "", type: "both" });
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-900" style={{ height: 'calc(100vh)', minHeight: '100vh' }}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }} />

      {/* Alert Banner */}
      {showAlertBanner && liveAlerts.length > 0 && (
        <div className="absolute top-0 left-0 right-0 z-30">
          <div className="bg-red-500/90 backdrop-blur-sm border-b border-red-600 px-4 py-2 animate-pulse">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{liveAlerts[0].message}</span>
                {liveAlerts.length > 1 && (
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs text-white">
                    +{liveAlerts.length - 1} more
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const alertsPanel = document.getElementById('alerts-panel');
                    if (alertsPanel) alertsPanel.classList.toggle('hidden');
                  }}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
                >
                  View All
                </button>
                <button
                  onClick={() => setShowAlertBanner(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Panel (toggleable) */}
      <div 
        id="alerts-panel"
        className="hidden absolute top-16 right-4 z-30 w-96 max-h-96 overflow-y-auto bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl"
      >
        <div className="p-4 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-white font-semibold">Live Alerts</h3>
            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs">{liveAlerts.length}</span>
          </div>
          <button
            onClick={() => setLiveAlerts([])}
            className="text-slate-400 hover:text-white text-sm"
          >
            Clear All
          </button>
        </div>
        <div className="p-2 space-y-2">
          {liveAlerts.length === 0 ? (
            <p className="text-slate-400 text-center py-4">No alerts</p>
          ) : (
            liveAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  alert.severity === 'high' || alert.severity === 'critical'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                    alert.severity === 'high' || alert.severity === 'critical' ? 'text-red-400' : 'text-amber-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-slate-400 text-xs mt-1">
                      {new Date(alert.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Top Stats Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-sm rounded-xl p-2 shadow-xl border border-slate-700">
          <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-700">
            <Car className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xs text-slate-400">Total</p>
              <p className="text-lg font-bold text-white">{stats.total}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-700">
            <Activity className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs text-slate-400">Moving</p>
              <p className="text-lg font-bold text-green-400">{stats.moving}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-700">
            <Circle className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-xs text-slate-400">Stopped</p>
              <p className="text-lg font-bold text-amber-400">{stats.stopped}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-700">
            <Signal className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Offline</p>
              <p className="text-lg font-bold text-slate-400">{stats.offline}</p>
            </div>
          </div>
          
          {/* Live Connection Status */}
          <div className="flex items-center gap-2 px-4 py-2">
            {realtimeStatus === 'connected' ? (
              <>
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <p className="text-xs text-green-400 font-medium">LIVE</p>
                </div>
              </>
            ) : realtimeStatus === 'connecting' ? (
              <>
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-xs text-amber-400 font-medium">Connecting...</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-xs text-red-400 font-medium">Disconnected</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div
        className={`absolute top-0 left-0 h-full z-20 transition-all duration-300 ${
          isSideOpen ? "w-96" : "w-0"
        }`}
      >
        <div className="h-full bg-slate-900/95 backdrop-blur-sm border-r border-slate-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Live Tracking</h2>
                  <p className="text-xs text-slate-400">{filteredVehicles.length} vehicles</p>
                </div>
              </div>
              <button
                onClick={() => loadVehicles()}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                title="Refresh"
              >
                <RefreshCcw className={`w-4 h-4 text-slate-400 ${isLoading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vehicles..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {[
                { value: "", label: "All" },
                { value: "moving", label: "Moving" },
                { value: "stopped", label: "Stopped" },
                { value: "offline", label: "Offline" },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                    statusFilter === f.value
                      ? "bg-blue-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center py-12">
                <Car className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No vehicles found</p>
              </div>
            ) : (
              filteredVehicles.map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVehicle(v);
                    if (v.last_known_location?.lng && v.last_known_location?.lat) {
                      mapRef.current?.flyTo({
                        center: [v.last_known_location.lng, v.last_known_location.lat],
                        zoom: 16,
                        duration: 1000,
                      });
                    }
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedVehicle?.id === v.id
                      ? "bg-blue-500/20 border border-blue-500/50"
                      : "bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(v.status)}`}>
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {v.registration_number || v.id.slice(0, 8)}
                        </h3>
                        <p className="text-slate-400 text-xs">
                          {v.brand} {v.model}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(v.status)}`}>
                      {getStatusIcon(v.status)}
                      <span className="capitalize">{v.status || "offline"}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-400 text-xs">{formatTime(v.last_update)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-400 text-xs">{v.speed || 0} km/h</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (v.last_known_location?.lng && v.last_known_location?.lat) {
                          mapRef.current?.flyTo({
                            center: [v.last_known_location.lng, v.last_known_location.lat],
                            zoom: 17,
                            duration: 1000,
                          });
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 transition-colors"
                    >
                      <Crosshair className="w-3.5 h-3.5" />
                      Focus
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartPlayback(v, 6);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-xs text-blue-400 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Playback
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Toggle Side Panel Button */}
      <button
        onClick={() => setIsSideOpen(!isSideOpen)}
        className={`absolute top-1/2 -translate-y-1/2 z-30 p-2 bg-slate-800 border border-slate-700 rounded-r-lg shadow-lg hover:bg-slate-700 transition-all duration-300 ${
          isSideOpen ? "left-96" : "left-0"
        }`}
      >
        {isSideOpen ? (
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {/* Map Controls - Top Right */}
      <div className="absolute top-20 right-4 z-10 flex flex-col gap-2">
        {/* Geofence Toggle */}
        <button
          onClick={() => setShowGeofences(!showGeofences)}
          className={`p-3 border rounded-lg shadow-lg transition-colors ${
            showGeofences
              ? "bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30"
              : "bg-slate-800 border-slate-700 hover:bg-slate-700"
          }`}
          title={showGeofences ? "Hide Geofences" : "Show Geofences"}
        >
          {showGeofences ? (
            <Eye className="w-5 h-5 text-blue-400" />
          ) : (
            <EyeOff className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {/* Create Geofence */}
        <button
          onClick={toggleDrawingMode}
          className={`p-3 border rounded-lg shadow-lg transition-colors ${
            isDrawingGeofence
              ? "bg-green-500/20 border-green-500 text-green-400"
              : "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-400"
          }`}
          title={isDrawingGeofence ? "Cancel Drawing" : "Create Geofence"}
        >
          {isDrawingGeofence ? (
            <X className="w-5 h-5" />
          ) : (
            <Shield className="w-5 h-5" />
          )}
        </button>

        {/* Style Picker */}
        <div className="relative">
          <button
            onClick={() => setShowStylePicker(!showStylePicker)}
            className="p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
            title="Map Style"
          >
            <Layers className="w-5 h-5 text-slate-400" />
          </button>
          {showStylePicker && (
            <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
              {Object.keys(MAP_STYLES).map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setMapStyle(style as keyof typeof MAP_STYLES);
                    setShowStylePicker(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm capitalize hover:bg-slate-700 transition-colors ${
                    mapStyle === style
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-slate-300"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Drawing Mode Indicator */}
      {isDrawingGeofence && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-green-500 flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-medium">
              Drawing Mode: Click on the map to draw a geofence polygon
            </span>
            <button
              onClick={toggleDrawingMode}
              className="text-green-400 hover:text-green-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Geofence Legend */}
      {showGeofences && geofences.length > 0 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-slate-700 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-blue-500/30 border border-blue-500 rounded"></div>
              <span className="text-xs text-slate-400">Both</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-green-500/30 border border-green-500 rounded"></div>
              <span className="text-xs text-slate-400">Entry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-red-500/30 border border-red-500 rounded"></div>
              <span className="text-xs text-slate-400">Exit</span>
            </div>
            <span className="text-xs text-slate-500 ml-2">({geofences.length} geofences)</span>
          </div>
        </div>
      )}

      {/* Playback Panel */}
      {showPlaybackPanel && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4">
          <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {playbackVehicle?.registration_number || "Vehicle"} - Route Playback
                  </h3>
                  <p className="text-slate-400 text-xs">
                    {playbackPoints[playbackIdx]?.timestamp
                      ? new Date(playbackPoints[playbackIdx].timestamp).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={closePlayback}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min={0}
                max={Math.max(0, playbackDuration)}
                value={playbackIdx}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPlaybackIdx(val);
                  if (playbackMarkerRef.current && playbackPoints[val]) {
                    playbackMarkerRef.current.setLngLat([
                      playbackPoints[val].lng,
                      playbackPoints[val].lat,
                    ]);
                  }
                }}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-slate-500">
                <span>{playbackIdx + 1} / {playbackDuration + 1} points</span>
                <span>{playbackPoints[playbackIdx]?.speed || 0} km/h</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  const newIdx = Math.max(0, playbackIdx - 10);
                  setPlaybackIdx(newIdx);
                  if (playbackMarkerRef.current && playbackPoints[newIdx]) {
                    playbackMarkerRef.current.setLngLat([
                      playbackPoints[newIdx].lng,
                      playbackPoints[newIdx].lat,
                    ]);
                  }
                }}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <SkipBack className="w-5 h-5 text-slate-400" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={() => {
                  const newIdx = Math.min(playbackDuration, playbackIdx + 10);
                  setPlaybackIdx(newIdx);
                  if (playbackMarkerRef.current && playbackPoints[newIdx]) {
                    playbackMarkerRef.current.setLngLat([
                      playbackPoints[newIdx].lng,
                      playbackPoints[newIdx].lat,
                    ]);
                  }
                }}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <SkipForward className="w-5 h-5 text-slate-400" />
              </button>

              {/* Speed Control */}
              <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-slate-800 rounded-lg">
                <span className="text-xs text-slate-400">Speed:</span>
                {[0.5, 1, 2, 4].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-1 text-xs rounded ${
                      playbackSpeed === speed
                        ? "bg-blue-500 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Vehicle Info Panel - Enhanced with Live Stats */}
      {selectedVehicle && !showPlaybackPanel && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-4xl w-full px-4">
          <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl overflow-hidden">
            {/* Live indicator */}
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">LIVE TRACKING</span>
                <span className="text-slate-500 text-xs">|</span>
                <Radio className="w-3 h-3 text-blue-400" />
                <span className="text-slate-400 text-xs">Real-time updates</span>
              </div>
              <span className="text-slate-500 text-xs">
                Last update: {formatTime(selectedVehicle.last_update)}
              </span>
            </div>

            <div className="p-4 flex items-center gap-4 flex-wrap">
              {/* Vehicle Identity */}
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getStatusColor(selectedVehicle.status)}`}>
                  <Car className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    {selectedVehicle.registration_number || selectedVehicle.id.slice(0, 8)}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {selectedVehicle.brand} {selectedVehicle.model}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-12 w-px bg-slate-700" />

              {/* Status */}
              <div className="text-center min-w-[70px]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Activity className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">Status</p>
                </div>
                <p className={`font-bold capitalize text-sm ${
                  selectedVehicle.status === 'moving' || selectedVehicle.status === 'online' || selectedVehicle.status === 'in_motion' 
                    ? 'text-green-400' 
                    : selectedVehicle.status === 'stopped' || selectedVehicle.status === 'parked'
                    ? 'text-amber-400'
                    : 'text-slate-400'
                }`}>
                  {selectedVehicle.status || "Offline"}
                </p>
              </div>

              {/* Speed */}
              <div className="text-center min-w-[70px]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Gauge className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">Speed</p>
                </div>
                <p className="text-white font-bold text-sm">
                  <span className={selectedVehicle.speed && selectedVehicle.speed > 80 ? 'text-red-400' : 'text-white'}>
                    {selectedVehicle.speed?.toFixed(1) || '0'}
                  </span>
                  <span className="text-slate-500 text-xs ml-1">km/h</span>
                </p>
              </div>

              {/* Heading */}
              <div className="text-center min-w-[70px]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Compass className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">Heading</p>
                </div>
                <p className="text-white font-bold text-sm">
                  {selectedVehicle.heading ? `${selectedVehicle.heading.toFixed(0)}°` : '—'}
                  <span className="text-slate-500 text-xs ml-1">
                    {selectedVehicle.heading ? getCompassDirection(selectedVehicle.heading) : ''}
                  </span>
                </p>
              </div>

              {/* Coordinates */}
              <div className="text-center min-w-[120px]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">Coordinates</p>
                </div>
                <p className="text-white font-mono text-xs">
                  {selectedVehicle.latitude?.toFixed(6) || selectedVehicle.last_known_location?.lat?.toFixed(6) || '—'},
                  {selectedVehicle.longitude?.toFixed(6) || selectedVehicle.last_known_location?.lng?.toFixed(6) || '—'}
                </p>
              </div>

              {/* Ignition */}
              <div className="text-center min-w-[70px]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">Ignition</p>
                </div>
                <p className={`font-bold text-sm ${selectedVehicle.ignition_status ? 'text-green-400' : 'text-slate-500'}`}>
                  {selectedVehicle.ignition_status ? 'ON' : 'OFF'}
                </p>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartPlayback(selectedVehicle, 6)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  <Play className="w-4 h-4" />
                  History
                </button>
                <button
                  onClick={() => {
                    if (mapRef.current && selectedVehicle.last_known_location) {
                      mapRef.current.flyTo({
                        center: [
                          selectedVehicle.last_known_location.lng!,
                          selectedVehicle.last_known_location.lat!
                        ],
                        zoom: 16,
                        essential: true
                      });
                    }
                  }}
                  className="p-2.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  title="Center on vehicle"
                >
                  <Crosshair className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="p-2.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Geofence Creation Modal */}
      {showGeofenceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Create Geofence</h2>
              </div>
              <button
                onClick={cancelGeofenceCreation}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Geofence Name *
                </label>
                <input
                  type="text"
                  value={geofenceForm.name}
                  onChange={(e) => setGeofenceForm({ ...geofenceForm, name: e.target.value })}
                  placeholder="e.g., Warehouse Zone, Parking Area"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={geofenceForm.description}
                  onChange={(e) => setGeofenceForm({ ...geofenceForm, description: e.target.value })}
                  placeholder="Optional description..."
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Alert Type
                </label>
                <select
                  value={geofenceForm.type}
                  onChange={(e) => setGeofenceForm({ ...geofenceForm, type: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                >
                  <option value="both">Both (Entry & Exit)</option>
                  <option value="entry">Entry Only</option>
                  <option value="exit">Exit Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Assign to Vehicle (Optional)
                </label>
                <select
                  value={geofenceForm.vehicle_id}
                  onChange={(e) => setGeofenceForm({ ...geofenceForm, vehicle_id: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                >
                  <option value="">All Vehicles</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.registration_number} {v.vehicle_type ? `- ${v.vehicle_type}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={cancelGeofenceCreation}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGeofence}
                className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Save Geofence
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for markers */}
      <style jsx global>{`
        .vehicle-marker {
          z-index: 1;
        }
        .vehicle-marker:hover {
          z-index: 10;
        }
        .mapboxgl-popup-content {
          background: rgb(15 23 42) !important;
          color: white !important;
          border-radius: 12px !important;
          padding: 16px !important;
          border: 1px solid rgb(51 65 85) !important;
        }
        .mapboxgl-popup-tip {
          border-top-color: rgb(15 23 42) !important;
        }
        .mapboxgl-ctrl-group {
          background: rgb(30 41 59) !important;
          border: 1px solid rgb(51 65 85) !important;
        }
        .mapboxgl-ctrl-group button {
          background: transparent !important;
        }
        .mapboxgl-ctrl-group button:hover {
          background: rgb(51 65 85) !important;
        }
        .mapboxgl-ctrl-icon {
          filter: invert(1) !important;
        }
      `}</style>
    </div>
  );
}
