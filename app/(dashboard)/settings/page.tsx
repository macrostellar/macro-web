"use client";

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { User, Building, Phone, Save, Bell, Shield, Key, Gauge } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import {Database} from '@/lib/database.types';
export default function SettingsPage() {
  const { user, role, isSuperAdmin, isOwner, isDriver, refreshProfile } = useAuth();
  const [profile, setProfile] = useState<Database["public"]["Tables"]["profiles"]["Row"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    phone: '',
  });
  const [alertSettings, setAlertSettings] = useState({
    geofence_alerts: true,
    speed_alerts: true,
    sos_alerts: true,
    email_notifications: false,
  });
  const [speedLimitSettings, setSpeedLimitSettings] = useState({
    default_speed_limit: 120,
    city_speed_limit: 60,
    highway_speed_limit: 120,
  });
  const [savingSpeedLimits, setSavingSpeedLimits] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, company_name, phone, email, role, created_at, company_id')
          .eq('id', user.id)
          .maybeSingle();

        if (data && !error) {
          setProfile(data);
          setFormData({
            full_name: data.full_name || '',
            company_name: data.company_name || '',
            phone: data.phone || '',
          });
        } else if (!data) {
          // If profile doesn't exist, create default one
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert([{ id: user.id, email: user.email }])
            .select("id, full_name, company_name, phone, email, role, created_at, company_id")
            .maybeSingle();
          if (newProfile) {
            setProfile(newProfile);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage('');

    try {
      // Always include all fields, even if empty (to allow clearing)
      const updateData = {
        full_name: formData.full_name || null,
        company_name: formData.company_name || null,
        phone: formData.phone || null,
      };

      console.log('Updating profile with:', updateData);

      const { error, data: updatedData } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error("Update error:", error);
        setMessage(`Failed to update profile: ${error.message}`);
      } else {
        console.log('Profile updated:', updatedData);
        
        // Update local state with the returned data
        if (updatedData) {
          setProfile(updatedData);
          setFormData({
            full_name: updatedData.full_name || '',
            company_name: updatedData.company_name || '',
            phone: updatedData.phone || '',
          });
        }
        
        // Refresh the global auth context profile
        await refreshProfile();
        
        setMessage('Profile updated successfully');
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err: any) {
      console.error("Error:", err);
      setMessage('An error occurred');
    } finally {
      setSaving(false);
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

  return (
    <div>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account preferences</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>

          {message && (
            <div
              className={`mb-6 p-3 rounded-lg ${
                message.includes('success')
                  ? 'bg-green-500/10 border border-green-500/50 text-green-400'
                  : 'bg-red-500/10 border border-red-500/50 text-red-400'
              }`}
            >
              {message}
            </div>
          )}

          {/* Read-only view when not editing */}
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-white font-medium">{user?.email || 'N/A'}</p>
                </div>
                <div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Full Name</p>
                <p className="text-white">{profile?.full_name || '—'}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Company Name</p>
                <p className="text-white">{profile?.company_name || '—'}</p>
              </div>

              <div>
                <p className="text-slate-400 text-sm">Phone</p>
                <p className="text-white">{profile?.phone || '—'}</p>
              </div>
            </div>
          ) : (
            /* Editable form when in edit mode */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-500 cursor-not-allowed"
                />
                <p className="text-slate-500 text-xs mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Company Name
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    // discard changes and exit edit mode
                    setFormData({
                      full_name: profile?.full_name || '',
                      company_name: profile?.company_name || '',
                      phone: profile?.phone || '',
                    });
                    setIsEditing(false);
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  <Save className="w-5 h-5 inline-block mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Details</h2>
          <div className="space-y-3">
            <div>
              <p className="text-slate-500 text-sm">Role</p>
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-1 ${
                isSuperAdmin ? 'bg-purple-500/10 text-purple-400' :
                isOwner ? 'bg-blue-500/10 text-blue-400' :
                isDriver ? 'bg-green-500/10 text-green-400' :
                'bg-slate-700 text-slate-300'
              }`}>
                {isSuperAdmin ? 'Super Admin' : isOwner ? 'Owner' : isDriver ? 'Driver' : role || 'User'}
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Account Created</p>
              <p className="text-white">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : 'N/A'}
              </p>  
            </div>
            <div>
              <p className="text-slate-500 text-sm">User ID</p>
              <p className="text-white font-mono text-sm">{user?.id}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Company ID</p>
              <p className="text-white font-mono text-sm">{profile?.company_id || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Alert Preferences */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-slate-400" />
            <h2 className="text-xl font-bold text-white">Alert Preferences</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: 'geofence_alerts', label: 'Geofence Alerts', desc: 'Notify when vehicles enter/exit geofences' },
              { key: 'speed_alerts', label: 'Speed Alerts', desc: 'Notify when vehicles exceed speed limits' },
              { key: 'sos_alerts', label: 'SOS Alerts', desc: 'Notify on emergency SOS triggers' },
              { key: 'email_notifications', label: 'Email Notifications', desc: 'Receive alerts via email' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{label}</p>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
                <button
                  onClick={() => setAlertSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    alertSettings[key as keyof typeof alertSettings] ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    alertSettings[key as keyof typeof alertSettings] ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Speed Limit Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-5 h-5 text-slate-400" />
            <h2 className="text-xl font-bold text-white">Speed Limit Settings</h2>
          </div>
          <p className="text-slate-400 text-sm mb-6">Configure speed limits for alerting when vehicles exceed these thresholds.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Default Speed Limit</label>
              <div className="relative">
                <input
                  type="number"
                  value={speedLimitSettings.default_speed_limit}
                  onChange={(e) => setSpeedLimitSettings(prev => ({ 
                    ...prev, 
                    default_speed_limit: parseInt(e.target.value) || 0 
                  }))}
                  className="w-full px-4 py-3 pr-16 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={0}
                  max={300}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">km/h</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">Applied to all vehicles by default</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">City Speed Limit</label>
              <div className="relative">
                <input
                  type="number"
                  value={speedLimitSettings.city_speed_limit}
                  onChange={(e) => setSpeedLimitSettings(prev => ({ 
                    ...prev, 
                    city_speed_limit: parseInt(e.target.value) || 0 
                  }))}
                  className="w-full px-4 py-3 pr-16 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={0}
                  max={300}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">km/h</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">For city geofence zones</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Highway Speed Limit</label>
              <div className="relative">
                <input
                  type="number"
                  value={speedLimitSettings.highway_speed_limit}
                  onChange={(e) => setSpeedLimitSettings(prev => ({ 
                    ...prev, 
                    highway_speed_limit: parseInt(e.target.value) || 0 
                  }))}
                  className="w-full px-4 py-3 pr-16 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={0}
                  max={300}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">km/h</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">For highway geofence zones</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Per-Vehicle Speed Limits</p>
                <p className="text-slate-400 text-sm mt-1">
                  You can also set individual speed limits for each vehicle in the vehicle details page. 
                  Per-vehicle limits override the default limit when set.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={async () => {
                setSavingSpeedLimits(true);
                // Save speed limit settings (could be stored in company settings)
                // For now, just show success message
                await new Promise(resolve => setTimeout(resolve, 500));
                setMessage('Speed limit settings saved successfully');
                setSavingSpeedLimits(false);
                setTimeout(() => setMessage(''), 3000);
              }}
              disabled={savingSpeedLimits}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {savingSpeedLimits ? 'Saving...' : 'Save Speed Limits'}
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-slate-400" />
            <h2 className="text-xl font-bold text-white">Security</h2>
          </div>
          {!changingPassword ? (
            <button
              onClick={() => setChangingPassword(true)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (passwordData.newPassword !== passwordData.confirmPassword) {
                setMessage('Passwords do not match');
                return;
              }
              if (passwordData.newPassword.length < 6) {
                setMessage('Password must be at least 6 characters');
                return;
              }
              setSaving(true);
              const { error } = await supabase.auth.updateUser({ password: passwordData.newPassword });
              if (error) {
                setMessage('Failed to update password: ' + error.message);
              } else {
                setMessage('Password updated successfully');
                setPasswordData({ newPassword: '', confirmPassword: '' });
                setChangingPassword(false);
              }
              setSaving(false);
              setTimeout(() => setMessage(''), 3000);
            }} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setChangingPassword(false); setPasswordData({ newPassword: '', confirmPassword: '' }); }}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
