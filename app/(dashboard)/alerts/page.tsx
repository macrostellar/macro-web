"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Check, Shield, Gauge, MapPin, Bell, Filter } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";
import { Database } from "@/lib/database.types";

type AlertType = 'all' | 'geofence_entry' | 'geofence_exit' | 'speed_violation' | 'general';

export default function AlertsPage() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<
    Database["public"]["Tables"]["alerts"]["Row"][]
  >([]);
  const [filter, setFilter] = useState<"all" | "unacknowledged">(
    "unacknowledged"
  );
  const [typeFilter, setTypeFilter] = useState<AlertType>('all');
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    if (!user) return;

    let query = supabase
      .from("alerts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (filter === "unacknowledged") {
      query = query.eq("acknowledged", false);
    }
    
    if (typeFilter !== 'all') {
      query = query.eq("alert_type", typeFilter);
    }

    const { data, error } = await query;

    if (data && !error) {
      setAlerts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, [user, filter, typeFilter]);

  // Subscribe to realtime alerts
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('alerts_realtime')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'alerts',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('New alert received:', payload);
          setAlerts(prev => [payload.new as Database["public"]["Tables"]["alerts"]["Row"], ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleAcknowledge = async (alertId: string) => {
    await supabase
      .from("alerts")
      .update({ acknowledged: true, acknowledged_at: new Date().toISOString() })
      .eq("id", alertId);

    fetchAlerts();
  };

  const handleAcknowledgeAll = async () => {
    if (!user) return;
    
    await supabase
      .from("alerts")
      .update({ acknowledged: true, acknowledged_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("acknowledged", false);

    fetchAlerts();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-400 border-red-500/50";
      case "high":
        return "bg-orange-500/10 text-orange-400 border-orange-500/50";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/50";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/50";
    }
  };

  const getAlertIcon = (alertType: string) => {
    switch (alertType) {
      case "geofence_entry":
      case "geofence_exit":
        return <Shield className="w-5 h-5" />;
      case "speed_violation":
        return <Gauge className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getAlertTypeLabel = (alertType: string) => {
    switch (alertType) {
      case "geofence_entry":
        return "Geofence Entry";
      case "geofence_exit":
        return "Geofence Exit";
      case "speed_violation":
        return "Speed Violation";
      default:
        return alertType?.replace("_", " ") || "Alert";
    }
  };

  const pendingCount = alerts.filter(a => !a.acknowledged).length;

  if (loading) {
    return (
      <div>
        <div className="p-8 flex items-center justify-center h-screen">
          <div className="text-slate-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Alerts</h1>
            <p className="text-slate-400">Monitor and manage vehicle alerts</p>
          </div>
          <div className="flex gap-2">
            {pendingCount > 0 && (
              <button
                onClick={handleAcknowledgeAll}
                className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Acknowledge All ({pendingCount})
              </button>
            )}
            <button
              onClick={() => setFilter("unacknowledged")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "unacknowledged"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              All Alerts
            </button>
          </div>
        </div>

        {/* Alert Type Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              typeFilter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            All Types
          </button>
          <button
            onClick={() => setTypeFilter('geofence_entry')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              typeFilter === 'geofence_entry'
                ? 'bg-green-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Geofence Entry
          </button>
          <button
            onClick={() => setTypeFilter('geofence_exit')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              typeFilter === 'geofence_exit'
                ? 'bg-red-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Geofence Exit
          </button>
          <button
            onClick={() => setTypeFilter('speed_violation')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              typeFilter === 'speed_violation'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            Speed Violation
          </button>
        </div>

        {alerts.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
            <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {filter === "unacknowledged"
                ? "No pending alerts"
                : "No alerts yet"}
            </h3>
            <p className="text-slate-400">
              {filter === "unacknowledged"
                ? "All alerts have been acknowledged"
                : "Alerts will appear here when triggered (geofence crossings, speed violations, etc.)"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-slate-800 border rounded-xl p-6 transition-all ${
                  alert.acknowledged 
                    ? 'border-slate-700 opacity-75' 
                    : 'border-slate-600 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        alert.alert_type === 'speed_violation' 
                          ? 'bg-orange-500/10 text-orange-400'
                          : alert.alert_type?.includes('geofence')
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {getAlertIcon(alert.alert_type)}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
                          alert.severity
                        )}`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium">
                        {getAlertTypeLabel(alert.alert_type)}
                      </span>
                    </div>
                    <p className="text-white text-lg mb-2">{alert.message}</p>
                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                      <span>
                        {new Date(alert.created_at ?? "").toLocaleString()}
                      </span>
                      {alert.speed_recorded && alert.speed_limit && (
                        <span className="flex items-center gap-1 text-orange-400">
                          <Gauge className="w-4 h-4" />
                          {alert.speed_recorded} / {alert.speed_limit} km/h
                        </span>
                      )}
                    </div>
                    {alert.acknowledged && alert.acknowledged_at && (
                      <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Acknowledged{" "}
                        {new Date(alert.acknowledged_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                  {!alert.acknowledged && (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
