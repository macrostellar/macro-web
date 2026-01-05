"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Car,
  Activity,
  AlertCircle,
  Clock,
  Zap,
  MapPin,
  Fuel,
  Gauge,
  Users,
  User,
} from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.types";
import { DashboardSkeleton } from "@/components/ui/Skeleton";

export default function DashboardPage() {
  const { user, isSuperAdmin, isOwner, isDriver, loading: authLoading } = useAuth();
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Database["public"]["Tables"]["vehicles"]["Row"][]>([]);
  const [alerts, setAlerts] = useState<Database["public"]["Tables"]["alerts"]["Row"][]>([]);
  const [drivers, setDrivers] = useState<Database["public"]["Tables"]["drivers"]["Row"][]>([]);
  const [trackingData, setTrackingData] = useState<any[]>([]);
  const [globalVehicles, setGlobalVehicles] = useState<Database["public"]["Tables"]["vehicles"]["Row"][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to be ready before fetching data
    if (authLoading) return;
    
    // If no user after auth is ready, stop loading
    if (!user) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // Add timeout for slow network
        const timeoutId = setTimeout(() => {
          if (isMounted) {
            setError('Request timed out. Please refresh the page.');
            setLoading(false);
          }
        }, 15000);

        // -----------------------
        // 1) Get company_id
        // -----------------------
        const { data: profile } = await supabase
          .from("profiles")
          .select("company_id")
          .eq("id", user.id)
          .maybeSingle();

        if (!isMounted) return;

        const companyId = profile?.company_id || null;

        // -----------------------
        // 2) Build OR filter
        // -----------------------
        const orFilter = companyId
          ? `user_id.eq.${user.id},company_id.eq.${companyId}`
          : `user_id.eq.${user.id}`;

        // -----------------------
        // 3) Fetch data in parallel but only what's needed
        // -----------------------
        const [vehiclesResult, alertsResult, driversResult, trackingResult] = await Promise.all([
          supabase.from("vehicles").select("*").or(orFilter),
          supabase.from("alerts").select("*").or(orFilter).order("created_at", { ascending: false }).limit(10),
          supabase.from("drivers").select("id, full_name, phone_number, status, assigned_vehicle_id, email").or(orFilter),
          supabase.from("tracking_data").select("speed, vehicle_id, timestamp").or(orFilter).order("timestamp", { ascending: false }).limit(20),
        ]);

        clearTimeout(timeoutId);
        if (!isMounted) return;

        // Only super admins need global vehicle count
        let globalResult = null;
        if (isSuperAdmin) {
          globalResult = await supabase.from("vehicles").select("id", { count: "exact", head: true });
        }

        if (vehiclesResult.data)
          setVehicles(vehiclesResult.data as unknown as Database["public"]["Tables"]["vehicles"]["Row"][]);

        if (alertsResult.data)
          setAlerts(alertsResult.data as unknown as Database["public"]["Tables"]["alerts"]["Row"][]);

        if (driversResult.data)
          setDrivers(driversResult.data as unknown as Database["public"]["Tables"]["drivers"]["Row"][]);

        if (trackingResult.data)
          setTrackingData(trackingResult.data as unknown as Database["public"]["Tables"]["tracking_data"]["Row"][]);

        // For global count, use the count or fallback to vehicles count
        if (isSuperAdmin && globalResult?.count !== undefined && globalResult.count !== null) {
          // Just store the count, we don't need actual vehicle data
          setGlobalVehicles(new Array(globalResult.count).fill(null).map(() => ({ id: "" })) as any);
        } else if (vehiclesResult.data) {
          setGlobalVehicles(vehiclesResult.data as unknown as Database["public"]["Tables"]["vehicles"]["Row"][]);
        }
        
        setError(null);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        if (isMounted) {
          setError("Failed to load dashboard data. Please refresh.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [user, authLoading, isSuperAdmin]);

  // -----------------------
  // 4) Stats - memoized for performance
  // -----------------------
  const stats = useMemo(() => ({
    total: vehicles.length,
    globalTotal: globalVehicles.length,
    online: vehicles.filter(
      (v) => v.status === "online" || v.status === "in_motion"
    ).length,
    inMotion: vehicles.filter((v) => v.status === "in_motion").length,
    parked: vehicles.filter((v) => v.status === "parked").length,
    offline: vehicles.filter((v) => v.status === "offline").length,
    alerts: alerts.length,
    drivers: drivers.length,
    avgSpeed:
      trackingData.length > 0
        ? Math.round(
            trackingData.reduce((sum, t) => sum + (t.speed || 0), 0) /
              trackingData.length
          )
        : 0,
    totalDistance:
      trackingData.length > 0
        ? trackingData
            .reduce((sum, t) => sum + (t.distance || 0), 0)
            .toFixed(2)
        : 0,
  }), [vehicles, globalVehicles, alerts, drivers, trackingData]);

  // -----------------------
  // 5) Loading state
  // -----------------------
  if (loading) {
    return <DashboardSkeleton />;
  }
  
  // Error state
  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-slate-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">MacroTracking Dashboard</h1>
          <p className="text-slate-400">The Next Dimension of Data</p>
        </div>

        {/* Top Row: Company & Global Vehicles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-3xl font-bold text-white">{stats.total}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Company Vehicles</h3>
            <p className="text-xs text-slate-500 mt-2">{stats.online} active • {stats.inMotion} in motion</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-3xl font-bold text-white">{stats.globalTotal}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Global Vehicles</h3>
            <p className="text-xs text-slate-500 mt-2">All platforms</p>
          </div>
        </div>

        {/* Second Row: Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-3xl font-bold text-white">{stats.online}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Online</h3>
            <p className="text-xs text-slate-500 mt-2">{stats.total > 0 ? ((stats.online / stats.total) * 100).toFixed(0) : 0}% of fleet</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-3xl font-bold text-white">{stats.inMotion}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">In Motion</h3>
            <p className="text-xs text-slate-500 mt-2">{stats.parked} parked</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-red-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-3xl font-bold text-white">{stats.alerts}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Alerts</h3>
            <p className="text-xs text-slate-500 mt-2">Pending review</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-3xl font-bold text-white">{stats.drivers}</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Vehicle Owners</h3>
            <p className="text-xs text-slate-500 mt-2">Registered Vehicle Owners</p>
          </div>
        </div>

        {/* Third Row: Live Tracking Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gauge className="w-5 h-5 text-blue-400" />
              <h3 className="text-slate-400 text-sm font-medium">Average Speed</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.avgSpeed}</p>
            <p className="text-xs text-slate-500 mt-2">km/h across fleet</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-green-400" />
              <h3 className="text-slate-400 text-sm font-medium">Total Distance</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalDistance}</p>
            <p className="text-xs text-slate-500 mt-2">km tracked today</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Fuel className="w-5 h-5 text-amber-400" />
              <h3 className="text-slate-400 text-sm font-medium">Offline Vehicles</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stats.offline}</p>
            <p className="text-xs text-slate-500 mt-2">No signal</p>
          </div>
        </div>

        {/* Fourth Row: Fleet Overview & Recent Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Fleet Status */}
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Fleet Overview</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-300 text-sm">Online Status</span>
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${stats.total > 0 ? (stats.online / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-white font-medium text-sm">{stats.total > 0 ? ((stats.online / stats.total) * 100).toFixed(0) : 0}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-300 text-sm">In Motion</span>
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${stats.total > 0 ? (stats.inMotion / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-white font-medium text-sm">{stats.total > 0 ? ((stats.inMotion / stats.total) * 100).toFixed(0) : 0}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-300 text-sm">Parked</span>
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${stats.total > 0 ? (stats.parked / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-white font-medium text-sm">{stats.total > 0 ? ((stats.parked / stats.total) * 100).toFixed(0) : 0}%</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Recent Alerts</h2>
              <button
                onClick={() => router.push("/alerts")}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                View All
              </button>
            </div>

            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-500">No pending alerts</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {alerts.map((alert) => (
                  <div key={alert.id} className="bg-slate-900 border border-slate-700 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          alert.severity === "critical" || alert.severity === "high"
                            ? "text-red-400"
                            : alert.severity === "medium"
                            ? "text-amber-400"
                            : "text-blue-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{alert.message}</p>
                      <p className="text-slate-500 text-xs mt-1">
  {alert.created_at
    ? new Date(alert.created_at).toLocaleString()
    : "No date"}
</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Tracking Data */}
        {trackingData.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Live Tracking Feed</h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {trackingData.slice(0, 5).map((track, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-700 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">Vehicle {track.vehicle_id?.slice(0, 8)}</p>
                    <p className="text-slate-500 text-xs">{track.address || track.last_known_address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 text-sm font-medium">{track.speed || 0} km/h</p>
                    <p className="text-slate-500 text-xs">{new Date(track.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drivers Section - Show for Owners and Super Admins */}
        {(isOwner || isSuperAdmin) && drivers.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-white">Your Drivers</h2>
              </div>
              <button
                onClick={() => router.push("/owners")}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                View All
              </button>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Drivers assigned to your company who can log in to the mobile app for GPS tracking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drivers.slice(0, 6).map((driver: any) => {
                // Find assigned vehicle
                const assignedVehicle = driver.assigned_vehicle_id
                  ? vehicles.find((v) => v.id === driver.assigned_vehicle_id)
                  : null;

                return (
                  <div
                    key={driver.id}
                    onClick={() => router.push(`/owners/${driver.id}`)}
                    className="bg-slate-900 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{driver.full_name}</p>
                        <p className="text-slate-500 text-sm">{driver.phone_number}</p>
                        {driver.email && (
                          <p className="text-slate-500 text-xs truncate">{driver.email}</p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          driver.status === "active"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-slate-500/10 text-slate-400"
                        }`}
                      >
                        {driver.status || "—"}
                      </span>
                    </div>
                    {assignedVehicle && (
                      <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-2">
                        <Car className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm">
                          {assignedVehicle.registration_number}
                        </span>
                      </div>
                    )}
                    {!assignedVehicle && (
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <span className="text-slate-500 text-sm italic">No vehicle assigned</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {drivers.length > 6 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => router.push("/owners")}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  View all {drivers.length} drivers →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {vehicles.length === 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
            <Car className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            {isDriver ? (
              // Driver-specific empty state
              <>
                <h3 className="text-xl font-bold text-white mb-2">No vehicle assigned</h3>
                <p className="text-slate-400 mb-6">
                  You don&apos;t have a vehicle assigned yet. Please contact your fleet manager or company owner to get a vehicle assigned to your account.
                </p>
                <button
                  onClick={() => router.push("/settings")}
                  className="px-6 py-3 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-500 transition-colors"
                >
                  View Settings
                </button>
              </>
            ) : (
              // Owner/Admin empty state
              <>
                <h3 className="text-xl font-bold text-white mb-2">No vehicles yet</h3>
                <p className="text-slate-400 mb-6">Get started by adding your first vehicle to the platform</p>
                <button
                  onClick={() => router.push("/vehicles")}
                  className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Vehicle
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
