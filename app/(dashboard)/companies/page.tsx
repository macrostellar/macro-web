"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Building2, Users, Car, Trash2, Edit2 } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";

type Company = {
  company_id: string;
  company_name: string;
  owner_count: number;
  vehicle_count: number;
};

export default function CompaniesPage() {
  const { isSuperAdmin } = useAuth();
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ company_name: "" });
  const [error, setError] = useState("");

  // Redirect if not super admin
  useEffect(() => {
    if (!isSuperAdmin) {
      router.push("/dashboard");
    }
  }, [isSuperAdmin, router]);

  const fetchCompanies = async () => {
    // Get unique companies from profiles
    const { data: profiles } = await supabase
      .from("profiles")
      .select("company_id, company_name")
      .not("company_id", "is", null);

    if (!profiles) {
      setLoading(false);
      return;
    }

    // Get unique companies
    const uniqueCompanies = new Map<string, string>();
    profiles.forEach((p) => {
      if (p.company_id && p.company_name) {
        uniqueCompanies.set(p.company_id, p.company_name);
      }
    });

    // Count owners and vehicles per company
    const companiesWithCounts: Company[] = [];

    for (const [company_id, company_name] of uniqueCompanies) {
      const { count: ownerCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("company_id", company_id);

      const { count: vehicleCount } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("company_id", company_id);

      companiesWithCounts.push({
        company_id,
        company_name,
        owner_count: ownerCount || 0,
        vehicle_count: vehicleCount || 0,
      });
    }

    setCompanies(companiesWithCounts);
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((c) =>
    c.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.company_name.trim()) {
      setError("Company name is required");
      return;
    }

    // Generate a new company_id
    const newCompanyId = crypto.randomUUID();

    // We'll create a placeholder profile for the company
    // In production, you'd likely create an admin user for this company
    const { error: insertError } = await supabase.from("profiles").insert({
      id: crypto.randomUUID(),
      company_id: newCompanyId,
      company_name: formData.company_name,
      role: "owner",
      email: `admin@${formData.company_name.toLowerCase().replace(/\s+/g, "")}.com`,
    });

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setShowModal(false);
    setFormData({ company_name: "" });
    fetchCompanies();
  };

  const handleDeleteCompany = async (companyId: string) => {
    if (!confirm("Are you sure? This will remove the company association from all users.")) return;

    // Remove company association from profiles
    await supabase
      .from("profiles")
      .update({ company_id: null, company_name: null })
      .eq("company_id", companyId);

    // Remove company association from vehicles
    await supabase.from("vehicles").update({ company_id: null }).eq("company_id", companyId);

    fetchCompanies();
  };

  if (!isSuperAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-screen">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Companies</h1>
          <p className="text-slate-400">Manage all companies on the platform</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Company
        </button>
      </div>

      {/* Search */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{companies.length}</p>
              <p className="text-slate-400 text-sm">Total Companies</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {companies.reduce((sum, c) => sum + c.owner_count, 0)}
              </p>
              <p className="text-slate-400 text-sm">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {companies.reduce((sum, c) => sum + c.vehicle_count, 0)}
              </p>
              <p className="text-slate-400 text-sm">Total Vehicles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Companies List */}
      {filteredCompanies.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
          <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No companies found</h3>
          <p className="text-slate-400">Companies will appear here when users sign up</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.company_id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{company.company_name}</h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {company.company_id.slice(0, 8)}...
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-900 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-white">{company.owner_count}</p>
                  <p className="text-slate-500 text-xs">Users</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-white">{company.vehicle_count}</p>
                  <p className="text-slate-500 text-xs">Vehicles</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-700">
                <button
                  onClick={() => handleDeleteCompany(company.company_id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Company Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">Add Company</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({ company_name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  placeholder="Acme Corporation"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Create Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
