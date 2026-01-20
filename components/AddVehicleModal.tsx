"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { useDrivers } from "../contexts/DriverContext";

const BRAND_OPTIONS = {
  car: [
    "Toyota",
    "Honda",
    "BMW",
    "Audi",
    "Ford",
    "Mercedes-Benz",
    "Mitsubishi",
    "Hyundai",
    "Chevrolet",
    "MG",
    "Subaru",
    "Nissan",
    "Cupa",
    "Dacia",
    "GMC",
    "Mazda",
    "Lada",
    "Hongqi",
    "Kia",
    "Volkswagen",
    "Rolls Royce",
    "Ferrari",
    "Lamborghini",
    "Porsche",
    "Tesla",
    "Jaguar",
    "Land Rover",
    "Bentley",
    "Aston Martin",
    "Lexus",
    "Maserati",
    "Pagani",
    "Mclaren",
    "Bugatti",
    "Koenigsegg",
    "Alfa Romeo",
    "Cadillac",
    "Chrysler",
    "Dodge",
    "Fiat",
    "Genesis",
    "Infiniti",
    "Mini",
    "Ram",
    "Suzuki",
    "Volvo",
    "Skoda",
    "Seat",
    "Citroen",
    "Peugeot",
    "Renault",
    "Saab",
    "Opel",
    "Vauxhall",
    "Proton",
    "Perodua",
    "Geely",
    "Great Wall",
    "Mahindra",
    "Tata",
    "Datsun",
    "Haval",
    "Wuling",
    "Baojun",
    "Changan",
    "Foton",
    "ZX Auto",
    "Lifan",
    "Brilliance",
    "JAC Motors",
    "Roewe",
    "NIO",
    "XPeng",
    "Li Auto",
    "BYD",
    "Ora",
    "Leapmotor",
    "WM Motor",
    "Aiways",
    "Seres",
    "GAC Motor",
    "Dongfeng",
    "FAW",
    "SAIC Motor",
    "BAIC",
    "Chery",
    "Zotye",
    "Yema",
    "Hafei",
    "Luzhou",
    "Soueast",
    "Haima",
    "Jinbei",
    "Faw Jiefang",
    "King Long",
    "Yutong",
    "Ankai",
  ],
  bus: ["Volvo", "Mercedes", "Ashok Leyland", "Tata", "Scania"],
  truck: ["Volvo", "Scania", "Mercedes", "MAN", "Tata"],
  van: ["Toyota", "Nissan", "Ford", "Mercedes Sprinter"],
  motorcycle: ["Honda", "Yamaha", "Kawasaki", "Suzuki", "Harley-Davidson"],
  other: ["Other Brand"],
};

const MODEL_OPTIONS = {
  Toyota: [
    "Corolla",
    "Camry",
    "RAV4",
    "Highlander",
    "Prius",
    "Yaris",
    "C-HR",
    "Hilux",
    "Land Cruiser",
    "Fortuner",
  ],
  Honda: ["Civic", "Accord", "CR-V", "HR-V", "Pilot", "Fit", "City"],
  BMW: [
    "1 Series",
    "2 Series",
    "3 Series",
    "4 Series",
    "5 Series",
    "7 Series",
    "X1",
    "X3",
    "X5",
  ],
  Audi: ["A1", "A3", "A4", "A6", "Q2", "Q3", "Q5", "Q7"],
  Ford: ["Focus", "Fiesta", "Mustang", "Escape", "Explorer", "Edge", "Ranger"],
  "Mercedes-Benz": [
    "A-Class",
    "C-Class",
    "E-Class",
    "S-Class",
    "GLA",
    "GLC",
    "GLE",
    "GLS",
  ],
  Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Veloster"],
  Nissan: ["Sentra", "Altima", "Maxima", "Rogue", "Kicks", "Pathfinder"],
  Mitsubishi: ["Lancer", "Outlander", "ASX", "Pajero", "Eclipse Cross"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"],
  Kia: ["Rio", "Cerato", "Sportage", "Sorento", "Seltos", "Telluride"],
  Volkswagen: ["Golf", "Polo", "Passat", "Tiguan", "Touareg", "Jetta"],
  Chevrolet: ["Spark", "Aveo", "Malibu", "Cruze", "Tahoe", "Suburban"],
  Subaru: ["Impreza", "WRX", "Forester", "Outback", "Crosstrek"],
  Mazda: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-5", "CX-9"],
  Lexus: ["IS", "ES", "GS", "RX", "NX", "UX", "LX"],
  Infiniti: ["Q50", "Q60", "QX50", "QX60", "QX80"],
  Volvo: ["S60", "S90", "XC40", "XC60", "XC90"],
  Porsche: ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
  LandRover: ["Range Rover", "Range Rover Sport", "Discovery", "Defender"],
  Jeep: ["Wrangler", "Cherokee", "Grand Cherokee", "Renegade", "Compass"],
  Dodge: ["Charger", "Challenger", "Durango"],
  Ram: ["1500", "2500", "3500"],
  GMC: ["Terrain", "Acadia", "Yukon", "Sierra"],
  Cadillac: ["CT4", "CT5", "XT4", "XT5", "Escalade"],
  Fiat: ["500", "Panda", "Tipo"],
  Peugeot: ["208", "308", "3008", "5008"],
  Renault: ["Clio", "Megane", "Captur", "Kadjar"],
  Skoda: ["Fabia", "Octavia", "Superb", "Kodiaq"],
  MG: ["MG3", "ZS", "HS", "MG5"],
  BYD: ["Han", "Tang", "Song Plus", "Atto 3", "Seal"],
  Geely: ["Emgrand", "Coolray", "Tugella"],
  Chery: ["Tiggo 2", "Tiggo 4", "Tiggo 7", "Arrizo 5"],
  GreatWall: ["Haval H6", "Haval Jolion", "Wingle 7"],
  Mahindra: ["XUV300", "XUV500", "Scorpio", "Thar"],
  Tata: ["Tiago", "Tigor", "Nexon", "Harrier"],
  Opel: ["Corsa", "Astra", "Insignia", "Grandland"],
  Citroen: ["C3", "C4", "C5 Aircross"],
  Seat: ["Ibiza", "Leon", "Ateca"],
  Suzuki: ["Swift", "Baleno", "Vitara", "Jimny"],
  Mini: ["Cooper", "Countryman", "Clubman"],
  Maserati: ["Ghibli", "Quattroporte", "Levante"],
  AlfaRomeo: ["Giulia", "Stelvio"],
  Ferrari: ["Roma", "Portofino", "F8", "SF90"],
  Lamborghini: ["Huracan", "Aventador", "Urus"],
  McLaren: ["720S", "570S", "Artura"],
  Bugatti: ["Chiron"],
  RollsRoyce: ["Ghost", "Phantom", "Cullinan"],
  AstonMartin: ["Vantage", "DB11", "DBX"],
  other: ["Generic Model"],
};

export default function AddVehicleModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { user } = useAuth();
  const { drivers, setLocalSelectedDriver } = useDrivers();
  // only show drivers created by the current user
  const userDrivers = drivers.filter((d: any) => d.user_id === user?.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    vehicle_type: string;
    brand: string;
    registration_number: string;
    vin: string;
    tracker_id: string;
    model: string;
    image_url: string;
    imageFile: File | null;
    custom_brand: string;
    assignedDriverId: string | null;
  }>({
    name: "",
    vehicle_type: "car",
    brand: "",
    registration_number: "",
    vin: "",
    tracker_id: "",
    model: "",
    image_url: "",
    imageFile: null,
    custom_brand: "", // <-- added: holds manual brand when "Other" selected
    assignedDriverId: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!user) throw new Error("Not authenticated");

      // basic client-side validation
      // require brand value or custom_brand when "Other" selected
      const finalBrand =
        formData.brand === "Other" ? formData.custom_brand.trim() : formData.brand;

      if (!formData.tracker_id || !formData.registration_number || !formData.vin || !finalBrand) {
        setError("Please fill tracker ID, registration number, VIN and brand.");
        setLoading(false);
        return;
      }

      let imageUrl: string | null = null;

      // Upload image if provided (optional)
      if (formData.imageFile) {
        const fileName = `${user.id}/${crypto.randomUUID()}-${formData.imageFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("vehicle-images")
          .upload(fileName, formData.imageFile);

        if (uploadError) {
          console.error("Image upload failed:", uploadError);
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("vehicle-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      // fetch profile to get company_id (fallback to user.id)
      let companyId: string | null = null;
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("company_id")
          .eq("id", user.id)
          .maybeSingle();
        companyId = profile?.company_id ?? user.id;
      }

      const insertPayload = {
        tracker_id: formData.tracker_id,
        registration_number: formData.registration_number,
        vehicle_type: formData.vehicle_type,
        brand: finalBrand,
        model: formData.model,
        vin: formData.vin,
        image_url: imageUrl,
        assigned_driver_id: selectedDriver || null,
        user_id: user?.id ?? null,
        company_id: companyId,
      };

      // request returned row to get clearer errors / inserted id
      const { data: inserted, error } = await supabase
        .from("vehicles")
        .insert([insertPayload])
        .select();

      if (error) {
        console.error("Insert vehicle error:", error);
        setError(error.message || JSON.stringify(error));
        return;
      }

      // success — close modal / refresh parent
      onSuccess?.();
    } catch (err: any) {
      console.error("Add vehicle failed:", err);
      setError(err?.message ?? "Failed to add vehicle");
    } finally {
      setLoading(false);
    }
  };

  const brandList = BRAND_OPTIONS[formData.vehicle_type as keyof typeof BRAND_OPTIONS] || [];
  // if user selected "Other" use the custom_brand as effective brand for model lookup
  const effectiveBrand =
    formData.brand === "Other" ? formData.custom_brand || "" : formData.brand;
  const modelOptions = MODEL_OPTIONS[effectiveBrand as keyof typeof MODEL_OPTIONS] || [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-lg sm:text-2xl font-bold text-white">Add New Vehicle</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* grid layout: 1 col on small, 2 cols on sm+ screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Driver / Owner - Optional */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Assign to Owner {userDrivers.length > 0 && <span className="text-slate-500">(Optional)</span>}
              </label>
              {userDrivers.length === 0 ? (
                <div className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-400 text-sm">
                  No owners available. You can add owners later from the Vehicle Owners page.
                </div>
              ) : (
                <select
                  value={selectedDriver ?? ""}
                  onChange={(e) => {
                    const driverId = e.target.value || null;
                    setSelectedDriver(driverId);
                    setLocalSelectedDriver(driverId);
                    const selected = drivers.find((d) => d.id === driverId);
                    setFormData({
                      ...formData,
                      name: selected ? selected.full_name : "",
                    });
                  }}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="">No owner assigned</option>
                  {userDrivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.full_name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Vehicle Type *
              </label>
              <select
                required
                value={formData.vehicle_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vehicle_type: e.target.value,
                    brand: "",
                  })
                }
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

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Brand *
              </label>
              <select
                required
                value={formData.brand}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    brand: e.target.value,
                    model: "",
                    custom_brand: e.target.value === "Other" ? formData.custom_brand : "",
                  })
                }
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                <option value="">Select Brand</option>
                {[...brandList].sort().map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Custom brand when Other */}
            {formData.brand === "Other" && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Enter Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LocalBrand"
                  value={formData.custom_brand}
                  onChange={(e) =>
                    setFormData({ ...formData, custom_brand: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
            )}

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Model
              </label>
              {modelOptions && modelOptions.length > 0 ? (
                <select
                  value={formData.model || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="">Select Model</option>
                  {modelOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="Enter model (optional)"
                  value={formData.model || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              )}
            </div>

            {/* Tracker ID */}
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

            {/* Registration Number */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Registration Number *
              </label>
              <input
                required
                type="text"
                value={formData.registration_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_number: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>

            {/* VIN */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                VIN *
              </label>
              <input
                required
                type="text"
                value={formData.vin}
                onChange={(e) =>
                  setFormData({ ...formData, vin: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>

            {/* Image upload spans full width */}
            <div className="sm:col-span-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, imageFile: e.target.files?.[0] || null })
                }
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/2 px-4 py-2 bg-slate-700 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
