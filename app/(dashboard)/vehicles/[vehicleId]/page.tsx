"use client";

import { useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  MapPin,
  Gauge,
  Battery,
  Fuel,
  Clock,
} from "lucide-react";

import { supabase } from "../../../../lib/supabase";

import { useRouter, usePathname } from "next/navigation";
import { Database } from "@/lib/database.types";

import EditVehicleModal from "../../../../components/EditVehicleModal";

export default function VehicleDetailPage() {
  const router = useRouter();
  const pathname = usePathname();

  // /vehicles/123 → get last part
  const vehicleId = pathname.split("/").pop();

  const [vehicle, setVehicle] = useState<
    Database["public"]["Tables"]["vehicles"]["Row"] | null
  >(null);
  const [trackingData, setTrackingData] = useState<
    Database["public"]["Tables"]["tracking_data"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [driver, setDriver] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const driverImageUrl = driver?.driver_image
    ? supabase.storage.from("driver-files").getPublicUrl(driver.driver_image)
        .data.publicUrl
    : null;

  // FETCH DATA
  useEffect(() => {
    if (!vehicleId) return;

    const fetchData = async () => {
      setLoading(true);

      // Vehicle
      const { data: vehicleData, error: vehicleError } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", vehicleId)
        .maybeSingle();

      if (!vehicleData || vehicleError) {
        setLoading(false);
        return;
      }

      setVehicle(vehicleData);

      // Driver
      if (vehicleData.assigned_driver_id) {
        const { data: driverData } = await supabase
          .from("drivers")
          .select("*")
          .eq("id", vehicleData.assigned_driver_id)
          .maybeSingle();

        setDriver(driverData || null);
      }

      // Tracking Data
      const { data: tracking } = await supabase
        .from("tracking_data")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .order("timestamp", { ascending: false })
        .limit(50);

      setTrackingData(tracking || []);
      setLoading(false);
    };

    fetchData();
  }, [vehicleId]);

  // Vehicle image URL fix
  let finalUrl = vehicle?.image_url || null;
  if (finalUrl) finalUrl = finalUrl.replace(/%2520/g, "%20");

  // DELETE VEHICLE
  const handleDelete = async () => {
    if (!vehicle || !confirm("Are you sure you want to delete this vehicle?"))
      return;

    setDeleting(true);

    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", vehicle.id);

    if (!error) {
      router.push("/vehicles");
    } else {
      alert("Failed to delete vehicle");
      setDeleting(false);
    }
  };

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

  if (loading) {
    return (
      <div>
        <div className="p-8 flex items-center justify-center h-screen">
          <div className="text-slate-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div>
        <div className="p-8">
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">Vehicle not found</p>
            <button
              onClick={() => router.push("/vehicles")}
              className="text-blue-400 hover:text-blue-300"
            >
              Back to vehicles
            </button>
          </div>
        </div>
      </div>
    );
  }

  const latestTracking = trackingData[0];

  return (
    <div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Vehicle Details</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Edit2 className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {vehicle.brand} {vehicle.model}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 capitalize">
                {vehicle.vehicle_type}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  vehicle.status
                )}`}
              >
                {vehicle.status.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            {/* MAP VIEW */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Live Location
              </h2>
              <div className="bg-slate-900 rounded-lg h-96 flex items-center justify-center border border-slate-700">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500">Map view will display here</p>
                  {vehicle.last_known_address && (
                    <p className="text-slate-400 text-sm mt-2">
                      {vehicle.last_known_address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ROUTE HISTORY */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Route History
              </h2>

              {trackingData.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500">No tracking data available</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {trackingData.map((data) => (
                    <div
                      key={data.id}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">
                          {new Date(data.timestamp).toLocaleString()}
                        </span>
                        {data.speed !== null && (
                          <span className="text-slate-400 text-sm">
                            {data.speed} km/h
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>Location recorded</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* OWNER / DRIVER */}
            <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl p-6 w-1/2">
              <h2 className="text-xl font-bold text-white mb-4">
                Owner Details
              </h2>

              {!driver ? (
                <p className="text-slate-500">No owner assigned</p>
              ) : (
                <div className="flex items-center gap-6 justify-between">
                  <img
                    src={
                      driverImageUrl
                        ? driverImageUrl
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5TPu3HoTZkTyxzVY6h3fuKo-nPU85G5u4Vw&s"
                    }
                    className="w-20 h-20 rounded-full border border-slate-700 object-cover"
                  />

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Owner Name: {driver.full_name}
                    </h3>
                    <p className="text-slate-400 text-sm mb-2">
                      Owner Phone: {driver.phone_number}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        driver.status
                      )}`}
                    >
                      {driver.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            {/* INFO */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Vehicle Info
              </h2>
              <div className="space-y-3">
                {vehicle.registration_number && (
                  <div>
                    <p className="text-slate-500 text-sm">Registration</p>
                    <p className="text-white font-medium">
                      {vehicle.registration_number}
                    </p>
                  </div>
                )}

                {vehicle.vin && (
                  <div>
                    <p className="text-slate-500 text-sm">VIN</p>
                    <p className="text-white font-medium">{vehicle.vin}</p>
                  </div>
                )}

                <div>
                  <p className="text-slate-500 text-sm">Tracker ID</p>
                  <p className="text-white font-medium">{vehicle.tracker_id}</p>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">Last Update</p>
                  <p className="text-white font-medium">
                    {vehicle?.last_update
                      ? new Date(vehicle.last_update).toLocaleString()
                      : "No update"}
                  </p>
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Vehicle Image
              </h2>

              <img
                src={
                  finalUrl
                    ? finalUrl
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5TPu3HoTZkTyxzVY6h3fuKo-nPU85G5u4Vw&s"
                }
                className="w-full rounded-lg border border-slate-700 object-cover"
              />
            </div>

            {/* TELEMETRY */}
            {latestTracking && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Live Telemetry
                </h2>

                <div className="space-y-4">
                  {latestTracking.speed !== null && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Gauge className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm">Speed</p>
                        <p className="text-white font-medium">
                          {latestTracking.speed} km/h
                        </p>
                      </div>
                    </div>
                  )}

                  {latestTracking.battery_level !== null && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <Battery className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm">Battery</p>
                        <p className="text-white font-medium">
                          {latestTracking.battery_level}%
                        </p>
                      </div>
                    </div>
                  )}

                  {latestTracking.fuel_level !== null && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                        <Fuel className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm">Fuel</p>
                        <p className="text-white font-medium">
                          {latestTracking.fuel_level}%
                        </p>
                      </div>
                    </div>
                  )}

                  {latestTracking.ignition_status !== null && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-500/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm">Ignition</p>
                        <p className="text-white font-medium">
                          {latestTracking.ignition_status ? "On" : "Off"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {showEditModal && (
          <EditVehicleModal
            vehicle={vehicle}
            onClose={() => setShowEditModal(false)}
            onSuccess={() => {
              setShowEditModal(false);
              window.location.reload();
            }}
          />
        )}
      </div>
    </div>
  );
}
