"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function EditDriverModal({ driver, onClose, onSuccess }: { driver: any; onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: driver?.full_name || "",
    phone_number: driver?.phone_number || "",
    email: driver?.email || "",
    license_number: driver?.license_number || "",
    license_expiry: driver?.license_expiry || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!driver?.id) throw new Error("Driver ID not found");

      const { error } = await supabase
        .from("drivers")
        .update(formData)
        .eq("id", driver.id);

      if (error) {
        console.error("Update error:", error);
        setError(error.message || "Failed to update driver");
        return;
      }

      onSuccess?.();
    } catch (err: any) {
      console.error("Edit driver failed:", err);
      setError(err?.message ?? "Failed to edit driver");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Edit Owner</h2>
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

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
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
{/* 
          <div>
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