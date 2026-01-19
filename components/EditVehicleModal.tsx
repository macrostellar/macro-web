
"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useDrivers } from "../contexts/DriverContext";

// Brand mapping by vehicle type
const BRANDS_BY_TYPE = {
  car: [
    "Toyota",
    "Honda",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Volkswagen",
    "Hyundai",
    "Kia",
    "Mazda",
    "Ford",
    "Chevrolet",
    "Tesla",
  ],
  bus: [
    "Volvo",
    "MAN",
    "Scania",
    "Mercedes-Benz",
    "Iveco",
    "Hino",
    "Isuzu",
  ],
  truck: [
    "Volvo",
    "Scania",
    "MAN",
    "Mercedes-Benz",
    "Iveco",
    "Hino",
    "Isuzu",
    "Freightliner",
    "Peterbilt",
  ],
  van: [
    "Mercedes-Benz",
    "Ford",
    "Volkswagen",
    "Renault",
    "Peugeot",
    "Citroen",
    "Iveco",
  ],
  motorcycle: [
    "Honda",
    "Yamaha",
    "Suzuki",
    "Kawasaki",
    "Harley-Davidson",
    "Royal Enfield",
    "KTM",
  ],
  other: ["Other"],
};

export default function EditVehicleModal({ vehicle, onClose, onSuccess }: { vehicle: any; onClose: () => void; onSuccess: () => void }) {
  const { user } = useAuth();
  const { drivers } = useDrivers();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    tracker_id: vehicle?.tracker_id || "",
    registration_number: vehicle?.registration_number || "",
    vehicle_type: vehicle?.vehicle_type || "car",
    brand: vehicle?.brand || "",
    model: vehicle?.model || "",
    vin: vehicle?.vin || "",
    status: vehicle?.status || "parked",
  });

  const [selectedDriver, setSelectedDriver] = useState<string | null>(
    vehicle?.assigned_driver_id || null
  );

  const userDrivers = drivers.filter((d: any) => d.user_id === user?.id);
  const availableBrands =
    BRANDS_BY_TYPE[formData.vehicle_type as keyof typeof BRANDS_BY_TYPE] || [];

  // Reset brand if not in new type's list
  const handleVehicleTypeChange = (newType: string) => {
    setFormData({
      ...formData,
      vehicle_type: newType,
      brand: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!vehicle?.id) throw new Error("Vehicle ID not found");

      const updatePayload = {
        tracker_id: formData.tracker_id,
        registration_number: formData.registration_number,
        vehicle_type: formData.vehicle_type,
        brand: formData.brand,
        model: formData.model,
        vin: formData.vin,
        status: formData.status,
        assigned_driver_id: selectedDriver || null,
      };

      const { error } = await supabase
        .from("vehicles")
        .update(updatePayload)
        .eq("id", vehicle.id);

      if (error) {
        console.error("Update error:", error);
        setError(error.message || "Failed to update vehicle");
        return;
      }

      onSuccess?.();
    } catch (err: any) {
      console.error("Edit vehicle failed:", err);
      setError(err?.message ?? "Failed to edit vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 className="text-2xl font-bold text-white">Edit Vehicle</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tracker ID *
            </label>
            <input
              type="text"
              required
              value={formData.tracker_id}
              onChange={(e) =>
                setFormData({ ...formData, tracker_id: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Registration Number *
            </label>
            <input
              type="text"
              required
              value={formData.registration_number}
              onChange={(e) =>
                setFormData({ ...formData, registration_number: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Vehicle Type *
            </label>
            <select
              value={formData.vehicle_type}
              onChange={(e) => handleVehicleTypeChange(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            >
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="truck">Truck</option>
              <option value="van">Van</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Brand *
            </label>
            <select
              required
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            >
              <option value="">Select Brand</option>
              {availableBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Model *
            </label>
            <input
              type="text"
              required
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              VIN *
            </label>
            <input
              type="text"
              required
              value={formData.vin}
              onChange={(e) =>
                setFormData({ ...formData, vin: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            >
              <option value="online">Online</option>
              <option value="in_motion">In Motion</option>
              <option value="parked">Parked</option>
              <option value="offline">Offline</option>
              <option value="alert">Alert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Assign Owner
            </label>
            <select
              value={selectedDriver ?? ""}
              onChange={(e) => setSelectedDriver(e.target.value || null)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            >
              <option value="">No Owner</option>
              {userDrivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}