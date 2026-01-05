"use client";

import { useEffect, useState, useRef } from "react";
import {
  FileText,
  Download,
  Calendar,
  Car,
  Clock,
  Gauge,
  MapPin,
  TrendingUp,
  Filter,
  Sparkles,
  Printer,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Loader2,
} from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";

type ReportType = "trips" | "speed" | "usage" | "alerts";

type TripReport = {
  id: string;
  vehicle_id: string;
  vehicle_name: string;
  start_time: string;
  end_time: string;
  distance: number;
  avg_speed: number;
  max_speed: number;
};

type VehicleUsage = {
  vehicle_id: string;
  vehicle_name: string;
  total_trips: number;
  total_distance: number;
  total_hours: number;
  avg_speed: number;
  max_speed: number;
  min_speed: number;
  first_seen: string;
  last_seen: string;
};

type AISummary = {
  overview: string;
  insights: string[];
  recommendations: string[];
  vehicleHighlights: {
    name: string;
    highlight: string;
  }[];
};

export default function ReportsPage() {
  const { user, isSuperAdmin } = useAuth();
  const [reportType, setReportType] = useState<ReportType>("trips");
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalTrips: 0,
    totalDistance: 0,
    avgSpeed: 0,
    maxSpeed: 0,
    totalAlerts: 0,
  });
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const fetchVehicles = async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .maybeSingle();

      let query = supabase.from("vehicles").select("id, registration_number, brand, model");

      if (!isSuperAdmin && profile?.company_id) {
        query = query.eq("company_id", profile.company_id);
      }

      const { data, error } = await query;
      if (error) throw error;
      setVehicles(data || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  const generateReport = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    setAiSummary(null);
    setShowAiSummary(false);

    const { data: profile } = await supabase
      .from("profiles")
      .select("company_id")
      .eq("id", user.id)
      .maybeSingle();

    try {
      if (reportType === "trips" || reportType === "usage") {
        // Fetch tracking data
        let query = supabase
          .from("tracking_data")
          .select("*, vehicles(registration_number, brand, model)")
          .gte("timestamp", `${dateRange.start}T00:00:00`)
          .lte("timestamp", `${dateRange.end}T23:59:59`)
          .order("timestamp", { ascending: true });

        if (selectedVehicle !== "all") {
          query = query.eq("vehicle_id", selectedVehicle);
        }

        if (!isSuperAdmin && profile?.company_id) {
          query = query.eq("company_id", profile.company_id);
        }

        const { data: trackingData, error: trackingError } = await query;
        if (trackingError) throw trackingError;

        if (reportType === "usage") {
          // Aggregate by vehicle
          const vehicleStats = new Map<string, VehicleUsage>();

          (trackingData || []).forEach((record: any) => {
            const vehicleId = record.vehicle_id;
            const vehicleName =
              record.vehicles?.registration_number ||
              `${record.vehicles?.brand || ""} ${record.vehicles?.model || ""}`.trim() ||
              "Unknown";
            const speed = record.speed || 0;
            const timestamp = record.timestamp;

            if (!vehicleStats.has(vehicleId)) {
              vehicleStats.set(vehicleId, {
                vehicle_id: vehicleId,
                vehicle_name: vehicleName,
                total_trips: 0,
                total_distance: 0,
                total_hours: 0,
                avg_speed: 0,
                max_speed: 0,
                min_speed: Infinity,
                first_seen: timestamp,
                last_seen: timestamp,
              });
            }

            const stats = vehicleStats.get(vehicleId)!;
            stats.total_trips += 1;
            stats.avg_speed = ((stats.avg_speed * (stats.total_trips - 1)) + speed) / stats.total_trips;
            stats.max_speed = Math.max(stats.max_speed, speed);
            stats.min_speed = Math.min(stats.min_speed, speed);
            if (new Date(timestamp) < new Date(stats.first_seen)) {
              stats.first_seen = timestamp;
            }
            if (new Date(timestamp) > new Date(stats.last_seen)) {
              stats.last_seen = timestamp;
            }
          });

          // Calculate hours based on first/last seen
          vehicleStats.forEach((stats) => {
            if (stats.min_speed === Infinity) stats.min_speed = 0;
            const hours = (new Date(stats.last_seen).getTime() - new Date(stats.first_seen).getTime()) / (1000 * 60 * 60);
            stats.total_hours = Math.max(0, hours);
          });

          const usageData = Array.from(vehicleStats.values());
          setReportData(usageData);
          
          const totalAvgSpeed = usageData.reduce((s, v) => s + (v.avg_speed || 0), 0);
          const maxSpeedOverall = Math.max(...usageData.map(v => v.max_speed || 0), 0);
          
          setSummary({
            totalTrips: usageData.reduce((s, v) => s + v.total_trips, 0),
            totalDistance: usageData.reduce((s, v) => s + v.total_distance, 0),
            avgSpeed: usageData.length ? totalAvgSpeed / usageData.length : 0,
            maxSpeed: maxSpeedOverall,
            totalAlerts: usageData.filter(v => v.max_speed > 80).length,
          });
        } else {
          // Trip reports - group by session
          setReportData(trackingData || []);
          const speeds = (trackingData || []).map((d: any) => d.speed || 0);
          const maxSpeed = speeds.length ? Math.max(...speeds) : 0;
          setSummary({
            totalTrips: trackingData?.length || 0,
            totalDistance: 0,
            avgSpeed: speeds.length ? speeds.reduce((a: number, b: number) => a + b, 0) / speeds.length : 0,
            maxSpeed,
            totalAlerts: speeds.filter((s: number) => s > 80).length,
          });
        }
      } else if (reportType === "speed") {
        // Speed analytics
        let query = supabase
          .from("tracking_data")
          .select("speed, vehicle_id, timestamp, vehicles(registration_number)")
          .gte("timestamp", `${dateRange.start}T00:00:00`)
          .lte("timestamp", `${dateRange.end}T23:59:59`)
          .not("speed", "is", null)
          .order("speed", { ascending: false })
          .limit(100);

        if (selectedVehicle !== "all") {
          query = query.eq("vehicle_id", selectedVehicle);
        }

        const { data, error: speedError } = await query;
        if (speedError) throw speedError;
        
        setReportData(data || []);

        const speeds = (data || []).map((d: any) => d.speed || 0);
        const maxSpeed = speeds.length ? Math.max(...speeds) : 0;
        setSummary({
          totalTrips: data?.length || 0,
          totalDistance: 0,
          avgSpeed: speeds.length ? speeds.reduce((a: number, b: number) => a + b, 0) / speeds.length : 0,
          maxSpeed,
          totalAlerts: speeds.filter((s: number) => s > 80).length,
        });
      } else if (reportType === "alerts") {
        // Alerts report
        let query = supabase
          .from("alerts")
          .select("*, vehicles(registration_number)")
          .gte("created_at", `${dateRange.start}T00:00:00`)
          .lte("created_at", `${dateRange.end}T23:59:59`)
          .order("created_at", { ascending: false });

        if (selectedVehicle !== "all") {
          query = query.eq("vehicle_id", selectedVehicle);
        }

        if (!isSuperAdmin) {
          query = query.eq("user_id", user.id);
        }

        const { data, error: alertError } = await query;
        if (alertError) throw alertError;
        
        setReportData(data || []);
        setSummary({
          totalTrips: 0,
          totalDistance: 0,
          avgSpeed: 0,
          maxSpeed: 0,
          totalAlerts: data?.length || 0,
        });
      }
    } catch (err: any) {
      console.error("Error generating report:", err);
      setError(err.message || "Failed to generate report. Please try again.");
    }

    setLoading(false);
  };

  // Generate AI Summary
  const generateAISummary = async () => {
    if (reportData.length === 0) return;
    
    setAiLoading(true);
    setShowAiSummary(true);

    try {
      // Simulate AI processing - in production, this would call an AI API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const insights: string[] = [];
      const recommendations: string[] = [];
      const vehicleHighlights: { name: string; highlight: string }[] = [];

      if (reportType === "usage") {
        const usageData = reportData as VehicleUsage[];
        const totalRecords = usageData.reduce((s, v) => s + v.total_trips, 0);
        const avgSpeedOverall = usageData.reduce((s, v) => s + (v.avg_speed || 0), 0) / (usageData.length || 1);
        const maxSpeedVehicle = usageData.reduce((max, v) => (v.max_speed || 0) > (max.max_speed || 0) ? v : max, usageData[0]);
        const mostActiveVehicle = usageData.reduce((max, v) => v.total_trips > max.total_trips ? v : max, usageData[0]);
        const overspeedVehicles = usageData.filter(v => (v.max_speed || 0) > 80);

        insights.push(`Fleet recorded ${totalRecords.toLocaleString()} data points across ${usageData.length} vehicles.`);
        insights.push(`Average fleet speed is ${avgSpeedOverall.toFixed(1)} km/h.`);
        
        if (overspeedVehicles.length > 0) {
          insights.push(`${overspeedVehicles.length} vehicle(s) exceeded 80 km/h speed limit during this period.`);
        }

        if (mostActiveVehicle) {
          vehicleHighlights.push({
            name: mostActiveVehicle.vehicle_name,
            highlight: `Most active with ${mostActiveVehicle.total_trips} records`
          });
        }

        if (maxSpeedVehicle && (maxSpeedVehicle.max_speed || 0) > 0) {
          vehicleHighlights.push({
            name: maxSpeedVehicle.vehicle_name,
            highlight: `Highest speed recorded: ${(maxSpeedVehicle.max_speed || 0).toFixed(1)} km/h`
          });
        }

        if (overspeedVehicles.length > 0) {
          recommendations.push("Review speed violations and consider driver training for vehicles exceeding limits.");
        }
        recommendations.push("Schedule regular maintenance for most active vehicles to prevent breakdowns.");
        recommendations.push("Consider route optimization for vehicles with high activity.");

      } else if (reportType === "speed") {
        const overspeeds = reportData.filter((r: any) => r.speed > 80);
        const avgSpeed = summary.avgSpeed;

        insights.push(`Analyzed ${reportData.length} speed records in the selected period.`);
        insights.push(`Average speed across all records: ${avgSpeed.toFixed(1)} km/h.`);
        insights.push(`${overspeeds.length} instances of overspeeding (>80 km/h) detected.`);

        if (summary.maxSpeed > 100) {
          insights.push(`⚠️ Critical: Maximum speed of ${summary.maxSpeed.toFixed(1)} km/h detected!`);
        }

        if (overspeeds.length > reportData.length * 0.2) {
          recommendations.push("High frequency of overspeeding detected. Implement speed monitoring alerts.");
        }
        recommendations.push("Set up geofenced speed limits for high-risk areas.");
        recommendations.push("Consider incentive programs for safe driving behavior.");

      } else if (reportType === "alerts") {
        const criticalAlerts = reportData.filter((r: any) => r.severity === "critical" || r.severity === "high");
        const alertTypes = [...new Set(reportData.map((r: any) => r.alert_type))];

        insights.push(`Total of ${reportData.length} alerts generated in the selected period.`);
        insights.push(`${criticalAlerts.length} critical/high severity alerts require immediate attention.`);
        insights.push(`Alert types include: ${alertTypes.slice(0, 3).join(", ")}.`);

        if (criticalAlerts.length > 0) {
          recommendations.push("Address critical alerts immediately to prevent potential issues.");
        }
        recommendations.push("Review recurring alert patterns and implement preventive measures.");
        recommendations.push("Ensure all vehicle safety systems are functioning properly.");

      } else {
        insights.push(`Analyzed ${reportData.length} trip records from ${dateRange.start} to ${dateRange.end}.`);
        insights.push(`Fleet average speed: ${summary.avgSpeed.toFixed(1)} km/h.`);
        
        if (summary.maxSpeed > 80) {
          insights.push(`Maximum recorded speed: ${summary.maxSpeed.toFixed(1)} km/h.`);
        }

        recommendations.push("Regular trip logging helps identify optimization opportunities.");
        recommendations.push("Consider fuel efficiency monitoring integration.");
      }

      const overviewText = reportType === "usage" 
        ? `This vehicle usage report covers ${reportData.length} vehicles from ${dateRange.start} to ${dateRange.end}. The fleet shows ${summary.totalTrips.toLocaleString()} total tracking records with an average speed of ${summary.avgSpeed.toFixed(1)} km/h.`
        : reportType === "speed"
        ? `This speed analytics report identifies ${summary.totalAlerts} overspeeding incidents out of ${reportData.length} records analyzed. The average speed is ${summary.avgSpeed.toFixed(1)} km/h with a maximum of ${summary.maxSpeed.toFixed(1)} km/h.`
        : reportType === "alerts"
        ? `This alerts report summarizes ${summary.totalAlerts} total alerts generated between ${dateRange.start} and ${dateRange.end}. Review critical alerts for immediate action.`
        : `This trip history report contains ${summary.totalTrips} records from ${dateRange.start} to ${dateRange.end} with an average speed of ${summary.avgSpeed.toFixed(1)} km/h.`;

      setAiSummary({
        overview: overviewText,
        insights,
        recommendations,
        vehicleHighlights,
      });

    } catch (err) {
      console.error("Error generating AI summary:", err);
      setError("Failed to generate AI summary. Please try again.");
    }

    setAiLoading(false);
  };

  // Sort handler
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted data
  const getSortedData = () => {
    if (!sortConfig) return reportData;
    
    return [...reportData].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? 0;
      const bVal = b[sortConfig.key] ?? 0;
      
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortConfig.direction === "asc" 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  };

  // Print report
  const handlePrint = () => {
    window.print();
  };

  // Refresh report
  const handleRefresh = () => {
    generateReport();
  };

  // Handle report type change - auto generate report
  const handleReportTypeChange = (type: ReportType) => {
    setReportType(type);
    // Auto-generate report after a small delay to let state update
    setTimeout(() => {
      if (user) {
        generateReportForType(type);
      }
    }, 100);
  };

  // Generate report for specific type (used when clicking report type buttons)
  const generateReportForType = async (type: ReportType) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    setAiSummary(null);
    setShowAiSummary(false);

    const { data: profile } = await supabase
      .from("profiles")
      .select("company_id")
      .eq("id", user.id)
      .maybeSingle();

    try {
      if (type === "trips" || type === "usage") {
        // Fetch tracking data
        let query = supabase
          .from("tracking_data")
          .select("*, vehicles(registration_number, brand, model)")
          .gte("timestamp", `${dateRange.start}T00:00:00`)
          .lte("timestamp", `${dateRange.end}T23:59:59`)
          .order("timestamp", { ascending: true });

        if (selectedVehicle !== "all") {
          query = query.eq("vehicle_id", selectedVehicle);
        }

        if (!isSuperAdmin && profile?.company_id) {
          query = query.eq("company_id", profile.company_id);
        }

        const { data: trackingData, error: trackingError } = await query;
        if (trackingError) throw trackingError;

        if (type === "usage") {
          // Aggregate by vehicle
          const vehicleStats = new Map<string, VehicleUsage>();

          (trackingData || []).forEach((record: any) => {
            const vehicleId = record.vehicle_id;
            const vehicleName =
              record.vehicles?.registration_number ||
              `${record.vehicles?.brand || ""} ${record.vehicles?.model || ""}`.trim() ||
              "Unknown";
            const speed = record.speed || 0;
            const timestamp = record.timestamp;

            if (!vehicleStats.has(vehicleId)) {
              vehicleStats.set(vehicleId, {
                vehicle_id: vehicleId,
                vehicle_name: vehicleName,
                total_trips: 0,
                total_distance: 0,
                total_hours: 0,
                avg_speed: 0,
                max_speed: 0,
                min_speed: Infinity,
                first_seen: timestamp,
                last_seen: timestamp,
              });
            }

            const stats = vehicleStats.get(vehicleId)!;
            stats.total_trips += 1;
            stats.avg_speed = ((stats.avg_speed * (stats.total_trips - 1)) + speed) / stats.total_trips;
            stats.max_speed = Math.max(stats.max_speed, speed);
            stats.min_speed = Math.min(stats.min_speed, speed);
            if (new Date(timestamp) < new Date(stats.first_seen)) {
              stats.first_seen = timestamp;
            }
            if (new Date(timestamp) > new Date(stats.last_seen)) {
              stats.last_seen = timestamp;
            }
          });

          // Calculate hours based on first/last seen
          vehicleStats.forEach((stats) => {
            if (stats.min_speed === Infinity) stats.min_speed = 0;
            const hours = (new Date(stats.last_seen).getTime() - new Date(stats.first_seen).getTime()) / (1000 * 60 * 60);
            stats.total_hours = Math.max(0, hours);
          });

          const usageData = Array.from(vehicleStats.values());
          setReportData(usageData);
          
          const totalAvgSpeed = usageData.reduce((s, v) => s + (v.avg_speed || 0), 0);
          const maxSpeedOverall = Math.max(...usageData.map(v => v.max_speed || 0), 0);
          
          setSummary({
            totalTrips: usageData.reduce((s, v) => s + v.total_trips, 0),
            totalDistance: usageData.reduce((s, v) => s + v.total_distance, 0),
            avgSpeed: usageData.length ? totalAvgSpeed / usageData.length : 0,
            maxSpeed: maxSpeedOverall,
            totalAlerts: usageData.filter(v => v.max_speed > 80).length,
          });
        } else {
          // Trip reports - group by session
          setReportData(trackingData || []);
          const speeds = (trackingData || []).map((d: any) => d.speed || 0);
          const maxSpeed = speeds.length ? Math.max(...speeds) : 0;
          setSummary({
            totalTrips: trackingData?.length || 0,
            totalDistance: 0,
            avgSpeed: speeds.length ? speeds.reduce((a: number, b: number) => a + b, 0) / speeds.length : 0,
            maxSpeed,
            totalAlerts: speeds.filter((s: number) => s > 80).length,
          });
        }
      } else if (type === "speed") {
        // Speed analytics
        let query = supabase
          .from("tracking_data")
          .select("speed, vehicle_id, timestamp, vehicles(registration_number)")
          .gte("timestamp", `${dateRange.start}T00:00:00`)
          .lte("timestamp", `${dateRange.end}T23:59:59`)
          .not("speed", "is", null)
          .order("speed", { ascending: false })
          .limit(100);

        if (selectedVehicle !== "all") {
          query = query.eq("vehicle_id", selectedVehicle);
        }

        const { data, error: speedError } = await query;
        if (speedError) throw speedError;
        
        setReportData(data || []);

        const speeds = (data || []).map((d: any) => d.speed || 0);
        const maxSpeed = speeds.length ? Math.max(...speeds) : 0;
        setSummary({
          totalTrips: data?.length || 0,
          totalDistance: 0,
          avgSpeed: speeds.length ? speeds.reduce((a: number, b: number) => a + b, 0) / speeds.length : 0,
          maxSpeed,
          totalAlerts: speeds.filter((s: number) => s > 80).length,
        });
      } else if (type === "alerts") {
        // Alerts report
        let query = supabase
          .from("alerts")
          .select("*, vehicles(registration_number)")
          .gte("created_at", `${dateRange.start}T00:00:00`)
          .lte("created_at", `${dateRange.end}T23:59:59`)
          .order("created_at", { ascending: false });

        if (selectedVehicle !== "all") {
          query = query.eq("vehicle_id", selectedVehicle);
        }

        if (!isSuperAdmin) {
          query = query.eq("user_id", user.id);
        }

        const { data, error: alertError } = await query;
        if (alertError) throw alertError;
        
        setReportData(data || []);
        setSummary({
          totalTrips: 0,
          totalDistance: 0,
          avgSpeed: 0,
          maxSpeed: 0,
          totalAlerts: data?.length || 0,
        });
      }
    } catch (err: any) {
      console.error("Error generating report:", err);
      setError(err.message || "Failed to generate report. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  const exportToCSV = () => {
    if (reportData.length === 0) return;

    const headers = Object.keys(reportData[0]).join(",");
    const rows = reportData
      .map((row) =>
        Object.values(row)
          .map((val) => (typeof val === "object" ? JSON.stringify(val) : val))
          .join(",")
      )
      .join("\n");

    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportType}-report-${dateRange.start}-${dateRange.end}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-8 print:p-4" ref={reportRef}>
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8 print:mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2 print:text-black">Reports</h1>
          <p className="text-sm md:text-base text-slate-400 print:text-gray-600">Generate and analyze tracking reports</p>
        </div>
        
        {/* Action Buttons - Mobile Grid */}
        {reportData.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 md:gap-3 print:hidden">
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              title="Refresh Report"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              title="Print Report"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={generateAISummary}
              disabled={aiLoading}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-purple-500 text-white text-sm md:text-base font-medium rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
            >
              {aiLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">AI Summary</span>
              <span className="sm:hidden">AI</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-3 py-2 md:px-6 md:py-2 bg-green-500 text-white text-sm md:text-base font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">CSV</span>
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 print:hidden">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-300"
          >
            ✕
          </button>
        </div>
      )}

      {/* Report Type Selection - Mobile Optimized */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6 print:hidden">
        {[
          { type: "trips" as ReportType, icon: MapPin, label: "Trip History", description: "View all tracking points" },
          { type: "speed" as ReportType, icon: Gauge, label: "Speed Analytics", description: "Analyze speed data" },
          { type: "usage" as ReportType, icon: TrendingUp, label: "Vehicle Usage", description: "Usage per vehicle" },
          { type: "alerts" as ReportType, icon: FileText, label: "Alert Reports", description: "View all alerts" },
        ].map(({ type, icon: Icon, label, description }) => (
          <button
            key={type}
            onClick={() => handleReportTypeChange(type)}
            disabled={loading}
            className={`p-3 md:p-4 rounded-xl border transition-all ${
              reportType === type
                ? "bg-blue-500/10 border-blue-500 text-blue-400 ring-2 ring-blue-500/20"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-750"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6 mb-1 md:mb-2" />
            <p className="font-medium text-sm md:text-base">{label}</p>
            <p className="text-xs text-slate-500 mt-1 hidden md:block">{description}</p>
          </button>
        ))}
      </div>

      {/* Filters - Mobile Optimized */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 md:p-6 mb-4 md:mb-6 print:hidden">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Filter className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
          <h3 className="text-white font-medium text-sm md:text-base">Filters</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div>
            <label className="block text-xs md:text-sm text-slate-400 mb-1.5 md:mb-2">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full pl-8 md:pl-10 pr-2 md:pr-4 py-2 text-sm md:text-base bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs md:text-sm text-slate-400 mb-1.5 md:mb-2">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500" />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full pl-8 md:pl-10 pr-2 md:pr-4 py-2 text-sm md:text-base bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-xs md:text-sm text-slate-400 mb-1.5 md:mb-2">Vehicle</label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base bg-slate-900 border border-slate-700 rounded-lg text-white"
            >
              <option value="all">All Vehicles</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.registration_number || `${v.brand} ${v.model}`}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-end">
            <button
              onClick={generateReport}
              disabled={loading}
              className="w-full px-4 md:px-6 py-2 bg-blue-500 text-white text-sm md:text-base font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards - Mobile Optimized */}
      {reportData.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6 print:grid-cols-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 md:p-6 print:bg-gray-100 print:border-gray-300">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center print:bg-blue-100">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-400 print:text-blue-600" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold text-white print:text-black">{summary.totalTrips.toLocaleString()}</p>
                <p className="text-slate-400 text-xs md:text-sm print:text-gray-600">Records</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 md:p-6 print:bg-gray-100 print:border-gray-300">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/10 rounded-lg flex items-center justify-center print:bg-green-100">
                <Gauge className="w-4 h-4 md:w-5 md:h-5 text-green-400 print:text-green-600" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold text-white print:text-black">{(summary.maxSpeed || 0).toFixed(1)}</p>
                <p className="text-slate-400 text-xs md:text-sm print:text-gray-600">Max km/h</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 md:p-6 print:bg-gray-100 print:border-gray-300">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500/10 rounded-lg flex items-center justify-center print:bg-amber-100">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-amber-400 print:text-amber-600" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold text-white print:text-black">{(summary.avgSpeed || 0).toFixed(1)}</p>
                <p className="text-slate-400 text-xs md:text-sm print:text-gray-600">Avg km/h</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 md:p-6 print:bg-gray-100 print:border-gray-300">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500/10 rounded-lg flex items-center justify-center print:bg-red-100">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400 print:text-red-600" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold text-white print:text-black">{summary.totalAlerts}</p>
                <p className="text-slate-400 text-xs md:text-sm print:text-gray-600">Alerts</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Summary Section - Mobile Optimized */}
      {showAiSummary && (
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-4 md:p-6 mb-4 md:mb-6 print:bg-purple-50 print:border-purple-300">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white print:text-black">AI-Generated Summary</h3>
                <p className="text-purple-300 text-sm print:text-purple-700">Powered by intelligent analysis</p>
              </div>
            </div>
            <button
              onClick={() => setShowAiSummary(false)}
              className="text-slate-400 hover:text-white print:hidden"
            >
              ✕
            </button>
          </div>

          {aiLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              <span className="ml-3 text-purple-300">Analyzing data...</span>
            </div>
          ) : aiSummary ? (
            <div className="space-y-6">
              {/* Overview */}
              <div className="bg-slate-800/50 rounded-lg p-4 print:bg-white">
                <h4 className="text-sm font-medium text-purple-300 mb-2 print:text-purple-700">Overview</h4>
                <p className="text-white print:text-black">{aiSummary.overview}</p>
              </div>

              {/* Insights and Recommendations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Key Insights */}
                <div className="bg-slate-800/50 rounded-lg p-4 print:bg-white">
                  <h4 className="text-sm font-medium text-blue-300 mb-3 print:text-blue-700">📊 Key Insights</h4>
                  <ul className="space-y-2">
                    {aiSummary.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm print:text-gray-700">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="bg-slate-800/50 rounded-lg p-4 print:bg-white">
                  <h4 className="text-sm font-medium text-green-300 mb-3 print:text-green-700">💡 Recommendations</h4>
                  <ul className="space-y-2">
                    {aiSummary.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm print:text-gray-700">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Vehicle Highlights */}
              {aiSummary.vehicleHighlights.length > 0 && (
                <div className="bg-slate-800/50 rounded-lg p-4 print:bg-white">
                  <h4 className="text-sm font-medium text-amber-300 mb-3 print:text-amber-700">🚗 Vehicle Highlights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {aiSummary.vehicleHighlights.map((vh, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3 print:bg-gray-100">
                        <Car className="w-5 h-5 text-amber-400 flex-shrink-0 print:text-amber-600" />
                        <div>
                          <p className="text-white font-medium text-sm print:text-black">{vh.name}</p>
                          <p className="text-slate-400 text-xs print:text-gray-600">{vh.highlight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Report Data - Empty State */}
      {reportData.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 md:p-12 text-center print:hidden">
          <FileText className="w-12 h-12 md:w-16 md:h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">No Report Data</h3>
          <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto">
            Tap a report type above to generate your data.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {getSortedData().slice(0, 20).map((row, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                {reportType === "usage" && (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-blue-400" />
                        <span className="font-medium text-white text-sm">{row.vehicle_name || "Unknown"}</span>
                      </div>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${(row.max_speed || 0) > 80 ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                        {(row.max_speed || 0) > 80 ? "Overspeed" : "Normal"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-slate-900 rounded-lg p-2">
                        <p className="text-xs text-slate-400">Records</p>
                        <p className="text-sm font-bold text-white">{row.total_trips || 0}</p>
                      </div>
                      <div className="bg-slate-900 rounded-lg p-2">
                        <p className="text-xs text-slate-400">Avg</p>
                        <p className="text-sm font-bold text-white">{(row.avg_speed || 0).toFixed(1)}</p>
                      </div>
                      <div className="bg-slate-900 rounded-lg p-2">
                        <p className="text-xs text-slate-400">Max</p>
                        <p className={`text-sm font-bold ${(row.max_speed || 0) > 80 ? "text-red-400" : "text-white"}`}>{(row.max_speed || 0).toFixed(1)}</p>
                      </div>
                    </div>
                  </>
                )}
                {reportType === "speed" && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{row.vehicles?.registration_number || row.vehicle_id?.slice(0, 8) || "Unknown"}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${(row.speed || 0) > 80 ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                        {(row.speed || 0) > 80 ? "Overspeed" : "Normal"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-amber-400" />
                        <span className={`font-bold ${(row.speed || 0) > 80 ? "text-red-400" : "text-white"}`}>{row.speed || 0} km/h</span>
                      </div>
                      <span className="text-xs text-slate-400">{row.timestamp ? new Date(row.timestamp).toLocaleString() : "-"}</span>
                    </div>
                  </>
                )}
                {reportType === "alerts" && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium capitalize">{row.alert_type?.replace(/_/g, " ") || "Alert"}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        row.severity === "critical" || row.severity === "high" ? "bg-red-500/10 text-red-400" :
                        row.severity === "medium" ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"
                      }`}>{row.severity || "low"}</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-2 line-clamp-2">{row.message || "-"}</p>
                    <p className="text-xs text-slate-500">{row.created_at ? new Date(row.created_at).toLocaleString() : "-"}</p>
                  </>
                )}
                {reportType === "trips" && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{row.vehicles?.registration_number || row.vehicle_id?.slice(0, 8) || "Unknown"}</span>
                      <span className={`font-bold text-sm ${(row.speed || 0) > 80 ? "text-red-400" : "text-slate-300"}`}>{row.speed || 0} km/h</span>
                    </div>
                    <p className="text-xs text-slate-400">{row.timestamp ? new Date(row.timestamp).toLocaleString() : "-"}</p>
                  </>
                )}
              </div>
            ))}
            {reportData.length > 20 && (
              <div className="text-center py-3 text-slate-400 text-sm">
                Showing 20 of {reportData.length} records. Export CSV for full data.
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-slate-800 border border-slate-700 rounded-xl overflow-hidden print:block print:bg-white print:border-gray-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 print:bg-gray-200">
                <tr>
                  {reportType === "usage" && (
                    <>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("vehicle_name")}
                      >
                        <div className="flex items-center gap-1">
                          Vehicle
                          {sortConfig?.key === "vehicle_name" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("total_trips")}
                      >
                        <div className="flex items-center gap-1">
                          Total Records
                          {sortConfig?.key === "total_trips" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("avg_speed")}
                      >
                        <div className="flex items-center gap-1">
                          Avg Speed
                          {sortConfig?.key === "avg_speed" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("max_speed")}
                      >
                        <div className="flex items-center gap-1">
                          Max Speed
                          {sortConfig?.key === "max_speed" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium print:text-gray-700">
                        Active Hours
                      </th>
                    </>
                  )}
                  {reportType === "speed" && (
                    <>
                      <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium print:text-gray-700">
                        Vehicle
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("speed")}
                      >
                        <div className="flex items-center gap-1">
                          Speed (km/h)
                          {sortConfig?.key === "speed" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("timestamp")}
                      >
                        <div className="flex items-center gap-1">
                          Timestamp
                          {sortConfig?.key === "timestamp" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium print:text-gray-700">
                        Status
                      </th>
                    </>
                  )}
                  {reportType === "alerts" && (
                    <>
                      <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium print:text-gray-700">
                        Type
                      </th>
                      <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium print:text-gray-700">
                        Message
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("severity")}
                      >
                        <div className="flex items-center gap-1">
                          Severity
                          {sortConfig?.key === "severity" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("created_at")}
                      >
                        <div className="flex items-center gap-1">
                          Date
                          {sortConfig?.key === "created_at" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                    </>
                  )}
                  {reportType === "trips" && (
                    <>
                      <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium print:text-gray-700">
                        Vehicle
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("speed")}
                      >
                        <div className="flex items-center gap-1">
                          Speed
                          {sortConfig?.key === "speed" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-slate-400 text-sm font-medium cursor-pointer hover:text-white print:text-gray-700"
                        onClick={() => handleSort("timestamp")}
                      >
                        <div className="flex items-center gap-1">
                          Timestamp
                          {sortConfig?.key === "timestamp" && (
                            sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 print:divide-gray-300">
                {getSortedData().slice(0, 50).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/50 transition-colors print:hover:bg-gray-100">
                    {reportType === "usage" && (
                      <>
                        <td className="px-6 py-4 text-white print:text-black font-medium">{row.vehicle_name || "Unknown"}</td>
                        <td className="px-6 py-4 text-slate-300 print:text-gray-700">{row.total_trips || 0}</td>
                        <td className="px-6 py-4 text-slate-300 print:text-gray-700">{(row.avg_speed || 0).toFixed(1)} km/h</td>
                        <td className="px-6 py-4">
                          <span className={`font-medium ${(row.max_speed || 0) > 80 ? "text-red-400" : "text-green-400"} print:text-black`}>
                            {(row.max_speed || 0).toFixed(1)} km/h
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300 print:text-gray-700">{(row.total_hours || 0).toFixed(1)} hrs</td>
                      </>
                    )}
                    {reportType === "speed" && (
                      <>
                        <td className="px-6 py-4 text-white print:text-black font-medium">
                          {row.vehicles?.registration_number || row.vehicle_id?.slice(0, 8) || "Unknown"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`${
                              (row.speed || 0) > 80 ? "text-red-400" : "text-green-400"
                            } font-medium print:text-black`}
                          >
                            {row.speed || 0} km/h
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 print:text-gray-600">
                          {row.timestamp ? new Date(row.timestamp).toLocaleString() : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            (row.speed || 0) > 80 ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"
                          }`}>
                            {(row.speed || 0) > 80 ? "Overspeed" : "Normal"}
                          </span>
                        </td>
                      </>
                    )}
                    {reportType === "alerts" && (
                      <>
                        <td className="px-6 py-4 text-white capitalize print:text-black">
                          {row.alert_type?.replace(/_/g, " ") || "Unknown"}
                        </td>
                        <td className="px-6 py-4 text-slate-300 print:text-gray-700 max-w-xs truncate">{row.message || "-"}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              row.severity === "critical" || row.severity === "high"
                                ? "bg-red-500/10 text-red-400"
                                : row.severity === "medium"
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-blue-500/10 text-blue-400"
                            }`}
                          >
                            {row.severity || "low"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 print:text-gray-600">
                          {row.created_at ? new Date(row.created_at).toLocaleString() : "-"}
                        </td>
                      </>
                    )}
                    {reportType === "trips" && (
                      <>
                        <td className="px-6 py-4 text-white print:text-black font-medium">
                          {row.vehicles?.registration_number || row.vehicle_id?.slice(0, 8) || "Unknown"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-medium ${(row.speed || 0) > 80 ? "text-red-400" : "text-slate-300"} print:text-black`}>
                            {row.speed || 0} km/h
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 print:text-gray-600">
                          {row.timestamp ? new Date(row.timestamp).toLocaleString() : "-"}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {reportData.length > 50 && (
            <div className="p-4 text-center text-slate-400 border-t border-slate-700 print:hidden">
              Showing 50 of {reportData.length} records. Export to CSV for full data.
            </div>
          )}
        </div>
        </>
      )}
    </div>
  );
}
