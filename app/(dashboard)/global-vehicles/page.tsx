"use client";

import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import { useDrivers } from "../../../contexts/DriverContext";
import { Database } from "@/lib/database.types";

export default function GlobalVehiclesPage() {
  const router = useRouter();
  const { getDriver } = useDrivers();
  const [vehicles, setVehicles] = useState<Database["public"]["Tables"]["vehicles"]["Row"][]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Database["public"]["Tables"]["vehicles"]["Row"][]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const fetchAllVehicles = async () => {
    // Fetch ALL vehicles from all users
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });
      console.log("Supabase error:", error);
    if (data && !error) {
      setVehicles(data);
      setFilteredVehicles(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllVehicles();
  }, []);

  useEffect(() => {
    let filtered = vehicles;

    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          (v.tracker_id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (v.registration_number?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (v.brand?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (v.model?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((v) => v.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((v) => v.vehicle_type === typeFilter);
    }

    setFilteredVehicles(filtered);
  }, [searchTerm, statusFilter, typeFilter, vehicles]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "in_motion":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "parked":
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
      case "alert":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };
  console.log("Vehicle:", vehicles);
console.log("Error occurred?");

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
            <h1 className="text-3xl font-bold text-white">Global Vehicles</h1>
            <p className="text-slate-400 mt-2">
              All vehicles connected to the platform
            </p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name, tracker ID, or registration..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500"
              />
            </div>

            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="in_motion">In Motion</option>
                <option value="parked">Parked</option>
                <option value="alert">Alert</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="all">All Types</option>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No vehicles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {vehicle.registration_number}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      vehicle.status
                    )}`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-400">
                  <p>
                    <span className="text-slate-500">Tracker ID:</span>{" "}
                    {vehicle.tracker_id}
                  </p>
                  <p>
                    <span className="text-slate-500">Type:</span>{" "}
                    <span className="capitalize">{vehicle.vehicle_type}</span>
                  </p>
                  <p>
                    <span className="text-slate-500">Driver:</span>{" "}
                    {getDriver(vehicle.assigned_driver_id)?.full_name ||
                      "No driver assigned"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
