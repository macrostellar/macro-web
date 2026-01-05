"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Gauge,
  Battery,
  Fuel,
  Clock,
  Trash2,
  Car,
  Edit2,
} from "lucide-react";
import EditDriverModal from "../../../../components/EditDriverModal";
import { supabase } from "../../../../lib/supabase";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.types";


export default function DriversDetailPage({ params }: { params: Promise<{ driverId: string }> }) {
  const router = useRouter();
const { driverId } = React.use(params);

  const [driver, setDriver] = useState<any>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [trackingData, setTrackingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const driverImageUrl = driver?.driver_image
    ? supabase.storage.from("driver-files").getPublicUrl(driver.driver_image)
        .data.publicUrl || null
    : null;

  const licenseImageUrl = driver?.license_image
    ? supabase.storage.from("driver-files").getPublicUrl(driver.license_image)
        .data.publicUrl || null
    : null;

  useEffect(() => {
    if (!driverId) return;

    const fetchData = async () => {
      // Fetch driver
      const { data: driverData } = await supabase
        .from("drivers")
        .select("*")
        .eq("id", driverId)
        .maybeSingle<Database["public"]["Tables"]["drivers"]["Row"]>();

      setDriver(driverData);

      if (driverData?.assigned_vehicle_id) {
        // Fetch assigned vehicle
        const { data: vehicleData } = await supabase
          .from("vehicles")
          .select("*")
          .eq("id", driverData.assigned_vehicle_id)
          .maybeSingle();

        setVehicle(vehicleData);

        // Fetch tracking for the assigned vehicle
        const { data: tracking } = await supabase
          .from("tracking_data")
          .select("*")
          .eq("vehicle_id", driverData.assigned_vehicle_id)
          .order("timestamp", { ascending: false })
          .limit(50);

        setTrackingData(tracking || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [driverId]);

  const handleDelete = async () => {
    if (!driver || !confirm("Are you sure you want to delete this owner?"))
      return;

    setDeleting(true);
    const { error } = await supabase
      .from("drivers")
      .delete()
      .eq("id", driver.id);

    if (!error) {
      router.push("/owners");
    } else {
      alert("Failed to delete owner");
      setDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "inactive":
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
      case "suspended":
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

  if (!driver) {
    return (
      <div>
        <div className="p-8">
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">Owner not found</p>
            <button
              onClick={() => router.push("/owners")}
              className="text-blue-400 hover:text-blue-300"
            >
              Back to vehicle owners
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
        {/* BACK BUTTON */}
        <button
          onClick={() => router.push("/owners")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to vehicle owners
        </button>

        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <img
              src={
                driverImageUrl && driverImageUrl.trim() !== ""
                  ? driverImageUrl
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5TPu3HoTZkTyxzVY6h3fuKo-nPU85G5u4Vw&s"
              }
              className="w-20 h-20 rounded-full border border-slate-700 object-cover"
            />

            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {driver.full_name}
              </h1>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  driver.status
                )}`}
              >
                {driver.status}
              </span>
            </div>
          </div>

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
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* ASSIGNED VEHICLE */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Assigned Vehicle
              </h2>

              {!vehicle ? (
                <p className="text-slate-500">No vehicle assigned</p>
              ) : (
                <div className="flex items-center gap-4">
                  <Car className="w-10 h-10 text-blue-400" />
                  <div>
                    <p className="text-white font-medium text-lg">
                      {vehicle.name}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {vehicle.registration_number}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      Type: {vehicle.vehicle_type}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ROUTE HISTORY */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Recent Trips
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
                        <span>Recorded GPS Location</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                License Photo{" "}
              </h2>

             
                <div>
                  <img
                    src={
                      licenseImageUrl && licenseImageUrl.trim() !== ""
                        ? licenseImageUrl
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5TPu3HoTZkTyxzVY6h3fuKo-nPU85G5u4Vw&s"
                    }
                    className="w-20 h-20 border border-slate-700 object-cover"
                  />
                </div>
              
            </div> */}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* DRIVER INFO */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Owner Info</h2>

              <div className="space-y-3">
                <div>
                  <p className="text-slate-500 text-sm">Phone</p>
                  <p className="text-white font-medium">
                    {driver.phone_number}
                  </p>
                </div>

                {driver.email && (
                  <div>
                    <p className="text-slate-500 text-sm">Email</p>
                    <p className="text-white font-medium">{driver.email}</p>
                  </div>
                )}

                {driver.license_number && (
                  <div>
                    <p className="text-slate-500 text-sm">License Number</p>
                    <p className="text-white font-medium">
                      {driver.license_number}
                    </p>
                  </div>
                )}

                {driver.license_expiry && (
                  <div>
                    <p className="text-slate-500 text-sm">License Expiry</p>
                    <p className="text-white font-medium">
                      {new Date(driver.license_expiry).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* LIVE TELEMETRY */}
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

        {/* EDIT MODAL */}
        {showEditModal && (
          <EditDriverModal
            driver={driver}
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
