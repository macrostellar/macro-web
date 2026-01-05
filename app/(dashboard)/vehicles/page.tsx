"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Plus, Search, Car, MapPin, Clock } from "lucide-react";
import AddVehicleModal from "../../../components/AddVehicleModal";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.types";
import { useDrivers } from "../../../contexts/DriverContext";
import { CardSkeleton } from "@/components/ui/Skeleton";
type VehicleWithDriver = Database["public"]["Tables"]["vehicles"]["Row"] & {
  drivers: { id: string; full_name: string | null } | null;
};

export default function VehiclesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { getDriver } = useDrivers();
  const [vehicles, setVehicles] = useState<VehicleWithDriver[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleWithDriver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    try {
      // get current user's company id from profiles (or fallback to user.id)
      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .maybeSingle();

      const companyId = profile?.company_id ?? user.id;

      const { data, error } = await supabase
        .from("vehicles")
        .select(`
          id, registration_number, brand, model, vehicle_type, status, 
          last_known_address, last_update, tracker_id, assigned_driver_id,
          drivers:assigned_driver_id ( id, full_name )
        `)
        .eq("company_id", companyId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (data && !error) {
        setVehicles(data as VehicleWithDriver[]);
        setFilteredVehicles(data as VehicleWithDriver[]);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  useEffect(() => {
    let filtered = vehicles;

    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          (v.tracker_id?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (v.registration_number?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
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

  const handleAddSuccess = () => {
    setShowAddModal(false);
    fetchVehicles();
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <div className="h-8 w-32 bg-slate-700 rounded animate-pulse mb-2" />
          <div className="h-4 w-48 bg-slate-700/50 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );  
  }

  return (
    <div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Vehicles</h1>
            <p className="text-slate-400">Manage your tracked vehicles</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Vehicle
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="online">Online</option>
              <option value="in_motion">In Motion</option>
              <option value="parked">Parked</option>
              <option value="offline">Offline</option>
              <option value="alert">Alert</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {filteredVehicles.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
            <Car className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {vehicles.length === 0 ? "No vehicles yet" : "No vehicles found"}
            </h3>
            <p className="text-slate-400 mb-6">
              {vehicles.length === 0
                ? "Add your first vehicle to start tracking"
                : "Try adjusting your filters"}
            </p>
            {vehicles.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Vehicle
              </button>
            )}
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
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Car className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {vehicle.brand}
                      </h3>
                      <p className="text-slate-500 text-sm capitalize">
                        Type: {vehicle.vehicle_type}
                      </p>
                      <p className="text-slate-500 text-sm capitalize">
                        Model: {vehicle.model}
                      </p>
                      <p className="text-slate-500 text-sm capitalize">
                        Owner:{" "}
                        {getDriver(vehicle.assigned_driver_id)?.full_name ||
                          vehicle.drivers?.full_name ||
                          "No owner assigned"}
                      </p>
                      
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      vehicle.status
                    )}`}
                  >
                    {vehicle.status.replace("_", " ")}
                  </span>
                </div>

                {vehicle.registration_number && (
                  <div className="mb-3">
                    <p className="text-slate-500 text-sm">Registration</p>
                    <p className="text-white font-medium">
                      {vehicle.registration_number}
                    </p>
                  </div>
                )}

                {vehicle.last_known_address && (
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-400 text-sm">
                      {vehicle.last_known_address}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-3 border-t border-slate-700">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <p className="text-slate-500 text-xs">
                    Updated{" "}
                    {vehicle.last_update
                      ? new Date(vehicle.last_update).toLocaleString()
                      : "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddVehicleModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
}
