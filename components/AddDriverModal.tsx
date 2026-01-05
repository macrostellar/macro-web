"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function AddDriverModal({ onClose, onSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    license_number: "",
    license_expiry: "",
    driverImageFile: null,
    licenseImageFile: null,
  });

  // --- FIXED: now returns the PUBLIC URL ---
  const uploadFile = async (file: File, path: string) => {
  const { error } = await supabase.storage
    .from("driver-files")
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    console.error("Upload failed:", error);
    return null;
  }

  return path; // return file path to store in DB
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!user) return;

    try {
      const driverId = crypto.randomUUID();

      // Get company_id from profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .maybeSingle();

      const companyId = profile?.company_id ?? user.id;

      let driverImageUrl = ""; 
      let licenseImageUrl = "";

      // Upload Driver Photo
      if (formData.driverImageFile) {
        driverImageUrl = await uploadFile (formData.driverImageFile, `${driverId}/driver.jpg`
        );

      }

      // Upload License Photo
      if (formData.licenseImageFile) {
        licenseImageUrl = await uploadFile(
formData.licenseImageFile, `${driverId}/license.jpg`
        );
      }

      // Insert into table
      const { error: insertError } = await supabase.from("drivers").insert({
        id: driverId,
        user_id: user.id,
        company_id: companyId,
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        email: formData.email || null,
        license_number: formData.license_number || null,
        license_expiry: formData.license_expiry || null,
        driver_image: driverImageUrl,    // now full URL
        license_image: licenseImageUrl,  // full URL
        status: "active",
      });

      if (insertError) throw insertError;

      onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add owner");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Add New Owner</h2>
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

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Phone Number *
            </label>
            <input
              type="text"
              required
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>

          {/* License Number */}
          {/* <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              License Number
            </label>
            <input
              type="text"
              value={formData.license_number}
              onChange={(e) =>
                setFormData({ ...formData, license_number: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div> */}

          {/* License Expiry */}
          {/* <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              License Expiry
            </label>
            <input
              type="date"
              value={formData.license_expiry}
              onChange={(e) =>
                setFormData({ ...formData, license_expiry: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div> */}

          {/* Driver Photo */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Owner Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  driverImageFile: e.target.files[0],
                })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>

          {/* License Photo */}
          {/* <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              License Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  licenseImageFile: e.target.files[0],
                })
              }
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div> */}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {loading ? "Adding..." : "Add Owner"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
