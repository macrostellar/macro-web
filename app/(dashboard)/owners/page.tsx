"use client";

import { useEffect, useState, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import AddDriverModal from '../../../components/AddDriverModal';
import { Database } from '@/lib/database.types';
import { TableRowSkeleton } from '@/components/ui/Skeleton';

export default function DriversPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [drivers, setDrivers] = useState<Database["public"]["Tables"]["drivers"]["Row"][]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState<Database["public"]["Tables"]["drivers"]["Row"][]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDriverId, setEditingDriverId] = useState<string | null>(null);

  // const fetchDrivers = async () => {
  //   if (!user) return;
  //   const { data, error } = await supabase
  //     .from('drivers')
  //     .select('*')
  //     .eq('user_id', user.id)
  //     .order('created_at', { ascending: false });

  //   if (data && !error) {
  //     setDrivers(data);
  //     setFilteredDrivers(data);
  //   }

  //   setLoading(false);
  // };
const fetchDrivers = async () => {
  if (!user) return;

  // Get the profile data to use company_id and role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('company_id, role')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return;
  }

  let query = supabase
    .from('drivers')
    .select('*')
    .order('created_at', { ascending: false });

  if (profile.role === 'super_admin') {
    console.log("Super admin: fetching ALL drivers");
    // No filter - show all drivers
  } else if (profile.company_id) {
    console.log("Owner: fetching drivers for company:", profile.company_id);
    query = query.eq('company_id', profile.company_id);
  } else {
    console.log("Fallback: fetching drivers for user:", user.id);
    query = query.eq('user_id', user.id);
  }

  const { data, error } = await query;

  if (data && !error) {
    setDrivers(data);
    setFilteredDrivers(data);
  } else {
    console.error("Error fetching drivers:", error);
  }

  setLoading(false);
};

  useEffect(() => {
    fetchDrivers();
  }, [user]);

  useEffect(() => {
    let filtered = drivers;

    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          (d.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (d.phone_number?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (d.license_number?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDrivers(filtered);
  }, [searchTerm, drivers]);

  const handleAddSuccess = () => {
    setShowAddModal(false);
    fetchDrivers();
  };

  const handleAddDriver = async (formData: any) => {
    if (!user) return;

    // Get company_id
    const { data: profile } = await supabase
      .from('profiles')
      .select('company_id')
      .eq('id', user.id)
      .maybeSingle();

    const companyId = profile?.company_id ?? user.id;

    const { error } = await supabase
      .from('drivers')
      .insert([
        {
          ...formData,
          user_id: user.id,
          company_id: companyId,
        },
      ]);

    if (!error) {
      fetchDrivers();
    }
  };

  const handleDelete = async (driverId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('drivers')
      .delete()
      .eq('id', driverId)
      .eq('user_id', user.id);

    if (!error) {
      fetchDrivers();
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <div className="h-8 w-48 bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Vehicle Owners</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            + Add Owner
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search vehicle owners by name, phone, license..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Drivers List */}
        <div className="space-y-3">
          {filteredDrivers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No vehicle owners found</p>
            </div>
          ) : (
            filteredDrivers.map((driver) => (
              <div
                key={driver.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => router.push(`/owners/${driver.id}`)}
                  >
                    <h3 className="text-lg font-bold text-white">
                      {driver.full_name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {driver.license_number || 'No license'}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(driver.id);
                      }}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-slate-400">
                  <span>📱 {driver.phone_number}</span>
                  <span>🆔 {driver.license_number || 'No license'}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {showAddModal && (
          <AddDriverModal
            onClose={() => setShowAddModal(false)}
            onSuccess={handleAddSuccess}
          />
        )}
      </div>
    </div>
  );
}
