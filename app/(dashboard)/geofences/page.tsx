"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Edit2, MapPin, ToggleLeft, ToggleRight, Crosshair, Car } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";
import { Database } from "@/lib/database.types";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

mapboxgl.accessToken = "pk.eyJ1Ijoic2FyYWhhc2lmIiwiYSI6ImNtaWlvdGZ5bTA1Z24zZXNoazZwb3p6Y3kifQ.2olx4jcsvmvcXOoblHiRFA";

type Geofence = Database["public"]["Tables"]["geofences"]["Row"];

// Helper function to safely parse location data
const parseLocation = (location: unknown): { lng: number; lat: number } | null => {
  if (!location) return null;
  
  try {
    // If it's already an object with lng/lat
    if (typeof location === "object" && location !== null) {
      const loc = location as Record<string, unknown>;
      if (typeof loc.lng === "number" && typeof loc.lat === "number") {
        return { lng: loc.lng, lat: loc.lat };
      }
      // Check for longitude/latitude keys
      if (typeof loc.longitude === "number" && typeof loc.latitude === "number") {
        return { lng: loc.longitude, lat: loc.latitude };
      }
    }
    
    // If it's a JSON string
    if (typeof location === "string") {
      // Check if it looks like JSON
      if (location.startsWith("{")) {
        const parsed = JSON.parse(location);
        if (typeof parsed.lng === "number" && typeof parsed.lat === "number") {
          return { lng: parsed.lng, lat: parsed.lat };
        }
        if (typeof parsed.longitude === "number" && typeof parsed.latitude === "number") {
          return { lng: parsed.longitude, lat: parsed.latitude };
        }
      }
      
      // Check for PostGIS POINT format: POINT(lng lat) or SRID=4326;POINT(lng lat)
      const pointMatch = location.match(/POINT\s*\(([\d.-]+)\s+([\d.-]+)\)/);
      if (pointMatch) {
        return { lng: parseFloat(pointMatch[1]), lat: parseFloat(pointMatch[2]) };
      }
    }
    
    return null;
  } catch (e) {
    console.error("Error parsing location:", e, location);
    return null;
  }
};

export default function GeofencesPage() {
  const { user, isSuperAdmin } = useAuth();
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGeofence, setEditingGeofence] = useState<Geofence | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    vehicle_id: "",
    type: "both", // Valid values: 'entry', 'exit', 'both'
  });
  const [drawnGeometry, setDrawnGeometry] = useState<any>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);

  const fetchGeofences = async () => {
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("company_id")
      .eq("id", user.id)
      .maybeSingle();

    let query = supabase.from("geofences").select("*").order("created_at", { ascending: false });

    if (!isSuperAdmin && profile?.company_id) {
      query = query.eq("user_id", user.id);
    }

    const { data } = await query;
    setGeofences(data || []);
    setLoading(false);
  };

  const fetchVehicles = async () => {
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("company_id")
      .eq("id", user.id)
      .maybeSingle();

    let query = supabase.from("vehicles").select("id, registration_number, brand, model, last_known_location, status");

    if (!isSuperAdmin && profile?.company_id) {
      query = query.eq("company_id", profile.company_id);
    }

    const { data } = await query;
    setVehicles(data || []);
  };

  useEffect(() => {
    fetchGeofences();
    fetchVehicles();
  }, [user]);

  // Initialize map when modal opens
  useEffect(() => {
    if (!showModal || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [67.0011, 24.8607],
      zoom: 10,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });

    map.addControl(draw, "top-left");
    map.addControl(new mapboxgl.NavigationControl());

    mapRef.current = map;
    drawRef.current = draw;

    // Add vehicle markers when map loads
    map.on("load", () => {
      // Add vehicle markers
      const vehicleMarkers: mapboxgl.Marker[] = [];
      
      vehicles.forEach((v) => {
        if (!v.last_known_location) return;
        
        const loc = parseLocation(v.last_known_location);
        
        if (!loc) return;

        const isMoving = v.status === "moving" || v.status === "online" || v.status === "in_motion";

        // Create custom marker element
        const el = document.createElement("div");
        el.className = "vehicle-geofence-marker";
        el.innerHTML = `
          <div class="relative cursor-pointer">
            <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
              isMoving ? "bg-green-500" : "bg-slate-600"
            }">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
          </div>
        `;

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([loc.lng, loc.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <p class="font-semibold text-slate-900">${v.registration_number || "Vehicle"}</p>
                <p class="text-sm text-slate-600">${v.brand || ""} ${v.model || ""}</p>
                <p class="text-xs text-slate-500 mt-1">${isMoving ? "Moving" : "Stopped"}</p>
              </div>
            `)
          )
          .addTo(map);

        vehicleMarkers.push(marker);
      });

      // If a specific vehicle is selected, center on it
      if (formData.vehicle_id) {
        const selectedVehicle = vehicles.find((v) => v.id === formData.vehicle_id);
        if (selectedVehicle?.last_known_location) {
          const loc = parseLocation(selectedVehicle.last_known_location);
          
          if (loc) {
            map.flyTo({
              center: [loc.lng, loc.lat],
              zoom: 15,
            });
          }
        }
      }

      // If editing, load existing geometry
      if (editingGeofence?.boundary) {
        try {
          let boundary = editingGeofence.boundary as any;
          // Parse if it's a string (could be WKT or JSON)
          if (typeof boundary === "string") {
            // Check if it's WKT format
            if (boundary.includes("POLYGON") || boundary.includes("POINT") || boundary.includes("LINESTRING")) {
              // Parse WKT to GeoJSON - basic parser for polygons
              const wkt = boundary.replace(/^SRID=\d+;/, "");
              if (wkt.startsWith("POLYGON")) {
                const coordsStr = wkt.replace("POLYGON((", "").replace("))", "");
                const rings = coordsStr.split("),(").map((ring: string) => {
                  return ring.split(",").map((point: string) => {
                    const [lng, lat] = point.trim().split(" ").map(Number);
                    return [lng, lat];
                  });
                });
                boundary = { type: "Polygon", coordinates: rings };
              }
            } else {
              boundary = JSON.parse(boundary);
            }
          }
          if (boundary.type && boundary.coordinates) {
            draw.add({
              type: "Feature",
              geometry: boundary,
              properties: {},
            });
          }
        } catch (e) {
          console.error("Failed to load boundary:", e);
        }
      }
    });

    map.on("draw.create", (e: any) => {
      const feature = e.features[0];
      setDrawnGeometry(feature.geometry);
    });

    map.on("draw.update", (e: any) => {
      const feature = e.features[0];
      setDrawnGeometry(feature.geometry);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      drawRef.current = null;
    };
  }, [showModal, editingGeofence, formData.vehicle_id, vehicles]);

  // Convert GeoJSON geometry to WKT format for PostGIS
  const geoJsonToWkt = (geometry: any): string => {
    if (geometry.type === "Polygon") {
      const rings = geometry.coordinates.map((ring: number[][]) => {
        const points = ring.map((coord: number[]) => `${coord[0]} ${coord[1]}`).join(", ");
        return `(${points})`;
      });
      return `SRID=4326;POLYGON(${rings.join(", ")})`;
    } else if (geometry.type === "Point") {
      return `SRID=4326;POINT(${geometry.coordinates[0]} ${geometry.coordinates[1]})`;
    } else if (geometry.type === "LineString") {
      const points = geometry.coordinates.map((coord: number[]) => `${coord[0]} ${coord[1]}`).join(", ");
      return `SRID=4326;LINESTRING(${points})`;
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !drawnGeometry) {
      alert("Please draw a geofence area on the map");
      return;
    }

    try {
      // Convert GeoJSON to WKT for PostGIS
      const wktBoundary = geoJsonToWkt(drawnGeometry);
      
      if (!wktBoundary) {
        alert("Invalid geometry type. Please draw a polygon.");
        return;
      }

      const payload = {
        name: formData.name,
        description: formData.description || null,
        vehicle_id: formData.vehicle_id || null,
        type: formData.type || "both", // 'entry', 'exit', or 'both'
        boundary: wktBoundary,
        user_id: user.id,
        active: true,
      };

      let error;
      if (editingGeofence) {
        const result = await supabase.from("geofences").update(payload).eq("id", editingGeofence.id);
        error = result.error;
      } else {
        const result = await supabase.from("geofences").insert([payload]);
        error = result.error;
      }

      if (error) {
        console.error("Geofence save error:", error);
        alert(`Failed to save geofence: ${error.message}`);
        return;
      }

      setShowModal(false);
      setEditingGeofence(null);
      setFormData({ name: "", description: "", vehicle_id: "", type: "both" });
      setDrawnGeometry(null);
      fetchGeofences();
    } catch (err: any) {
      console.error("Error saving geofence:", err);
      alert(`Error: ${err.message || "Failed to save geofence"}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this geofence?")) return;
    await supabase.from("geofences").delete().eq("id", id);
    fetchGeofences();
  };

  const handleToggleActive = async (geofence: Geofence) => {
    await supabase.from("geofences").update({ active: !geofence.active }).eq("id", geofence.id);
    fetchGeofences();
  };

  const openEditModal = (geofence: Geofence) => {
    setEditingGeofence(geofence);
    setFormData({
      name: geofence.name,
      description: geofence.description || "",
      vehicle_id: geofence.vehicle_id || "",
      type: geofence.type,
    });
    setDrawnGeometry(geofence.boundary);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-screen">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Geofences</h1>
          <p className="text-slate-400">Create and manage geofence zones for your vehicles</p>
        </div>
        <button
          onClick={() => {
            setEditingGeofence(null);
            setFormData({ name: "", description: "", vehicle_id: "", type: "both" });
            setDrawnGeometry(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Geofence
        </button>
      </div>

      {geofences.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
          <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No geofences yet</h3>
          <p className="text-slate-400 mb-6">Create your first geofence to monitor vehicle entry and exit</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Geofence
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {geofences.map((geofence) => (
            <div
              key={geofence.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{geofence.name}</h3>
                    <p className="text-sm text-slate-500 capitalize">{geofence.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleActive(geofence)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    geofence.active
                      ? "bg-green-500/10 text-green-400"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {geofence.active ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </button>
              </div>

              {geofence.description && (
                <p className="text-slate-400 text-sm mb-4">{geofence.description}</p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    geofence.active
                      ? "bg-green-500/10 text-green-400"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {geofence.active ? "Active" : "Inactive"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(geofence)}
                    className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(geofence.id)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">
                {editingGeofence ? "Edit Geofence" : "Create Geofence"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingGeofence(null);
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    placeholder="Office Zone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Trigger Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="both">Entry & Exit</option>
                    <option value="entry">Entry Only</option>
                    <option value="exit">Exit Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Assign to Vehicle</label>
                <div className="flex gap-2">
                  <select
                    value={formData.vehicle_id}
                    onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
                    className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="">All Vehicles</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.registration_number || `${v.brand} ${v.model}`}
                      </option>
                    ))}
                  </select>
                  {formData.vehicle_id && (
                    <button
                      type="button"
                      onClick={() => {
                        const selectedVehicle = vehicles.find((v) => v.id === formData.vehicle_id);
                        if (selectedVehicle?.last_known_location && mapRef.current) {
                          const loc = parseLocation(selectedVehicle.last_known_location);
                          
                          if (loc) {
                            mapRef.current.flyTo({
                              center: [loc.lng, loc.lat],
                              zoom: 16,
                            });
                          } else {
                            alert("Could not parse vehicle location");
                          }
                        } else {
                          alert("Vehicle location not available");
                        }
                      }}
                      className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2"
                    >
                      <Crosshair className="w-4 h-4" />
                      Locate
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  <Car className="w-3 h-3 inline mr-1" />
                  Vehicle locations are shown on the map with markers
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  rows={2}
                  placeholder="Optional description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Draw Geofence Area *
                </label>
                <p className="text-slate-500 text-sm mb-2">
                  Use the polygon tool on the map to draw your geofence boundary
                </p>
                <div
                  ref={mapContainerRef}
                  className="w-full h-80 rounded-lg border border-slate-700"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingGeofence(null);
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  {editingGeofence ? "Update Geofence" : "Create Geofence"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
