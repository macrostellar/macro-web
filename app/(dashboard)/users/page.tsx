"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Users, Shield, Trash2, Edit2, Mail, Building2, Key, Send, Car, UserCheck } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useAuth, UserRole } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";

type UserProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  company_id: string | null;
  company_name: string | null;
  role: UserRole;
  created_at: string | null;
};

type Vehicle = {
  id: string;
  registration_number: string | null;
  vehicle_type: string;
  assigned_driver_id: string | null;
};

type Driver = {
  id: string;
  full_name: string;
  assigned_vehicle_id: string | null;
};

export default function UsersPage() {
  const { isSuperAdmin, user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    phone: "",
    role: "owner" as UserRole,
    company_name: "",
    company_id: "",
  });
  const [error, setError] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordResetUser, setPasswordResetUser] = useState<UserProfile | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState("");
  
  // Vehicle assignment state
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [assigningUser, setAssigningUser] = useState<UserProfile | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [assigningVehicle, setAssigningVehicle] = useState(false);
  const [vehicleSuccess, setVehicleSuccess] = useState("");

  // Redirect if not super admin
  useEffect(() => {
    if (!isSuperAdmin) {
      router.push("/dashboard");
    }
  }, [isSuperAdmin, router]);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    setUsers((data as UserProfile[]) || []);
    setLoading(false);
  };

  const fetchVehicles = async () => {
    const { data } = await supabase
      .from("vehicles")
      .select("id, registration_number, vehicle_type, assigned_driver_id")
      .order("registration_number");
    
    setVehicles((data as Vehicle[]) || []);
  };

  const fetchDrivers = async () => {
    const { data } = await supabase
      .from("drivers")
      .select("id, full_name, assigned_vehicle_id")
      .order("full_name");
    
    setDrivers((data as Driver[]) || []);
  };

  useEffect(() => {
    fetchUsers();
    fetchVehicles();
    fetchDrivers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (u.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (u.company_name?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!editingUser) return;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        role: formData.role,
        company_name: formData.company_name,
        company_id: formData.company_id || null,
      })
      .eq("id", editingUser.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setShowModal(false);
    setEditingUser(null);
    fetchUsers();
  };

  const handleAssignVehicle = async () => {
    if (!assigningUser || !selectedVehicleId) return;

    setAssigningVehicle(true);
    setError("");

    try {
      // First, find if there's a driver record for this user, or create one
      const { data: existingDriver } = await supabase
        .from("drivers")
        .select("id")
        .eq("user_id", assigningUser.id)
        .maybeSingle();

      let driverId = existingDriver?.id;

      if (!driverId) {
        // Create a driver record if one doesn't exist
        const { data: newDriver, error: createError } = await supabase
          .from("drivers")
          .insert({
            user_id: assigningUser.id,
            full_name: assigningUser.full_name || "Unknown",
            phone_number: assigningUser.phone || "",
            company_id: assigningUser.company_id,
            status: "active",
          })
          .select("id")
          .single();

        if (createError) {
          setError("Failed to create driver record: " + createError.message);
          setAssigningVehicle(false);
          return;
        }
        driverId = newDriver.id;
      }

      // Update the vehicle's assigned_driver_id
      const { error: vehicleError } = await supabase
        .from("vehicles")
        .update({ assigned_driver_id: driverId })
        .eq("id", selectedVehicleId);

      if (vehicleError) {
        setError("Failed to assign vehicle: " + vehicleError.message);
        setAssigningVehicle(false);
        return;
      }

      // Update the driver's assigned_vehicle_id
      const { error: driverError } = await supabase
        .from("drivers")
        .update({ assigned_vehicle_id: selectedVehicleId })
        .eq("id", driverId);

      if (driverError) {
        setError("Failed to update driver: " + driverError.message);
        setAssigningVehicle(false);
        return;
      }

      setVehicleSuccess("Vehicle assigned successfully!");
      fetchVehicles();
      fetchDrivers();
      
      setTimeout(() => {
        setShowVehicleModal(false);
        setAssigningUser(null);
        setSelectedVehicleId("");
        setVehicleSuccess("");
      }, 1500);
    } catch (err) {
      setError("An error occurred while assigning the vehicle");
    } finally {
      setAssigningVehicle(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === user?.id) {
      alert("You cannot delete your own account");
      return;
    }

    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    // Delete from profiles (auth user deletion requires admin API)
    await supabase.from("profiles").delete().eq("id", userId);
    fetchUsers();
  };

  const openEditModal = (userProfile: UserProfile) => {
    setEditingUser(userProfile);
    setFormData({
      email: userProfile.email || "",
      full_name: userProfile.full_name || "",
      phone: userProfile.phone || "",
      role: userProfile.role || "owner",
      company_name: userProfile.company_name || "",
      company_id: userProfile.company_id || "",
    });
    setShowModal(true);
  };

  const openVehicleModal = (userProfile: UserProfile) => {
    setAssigningUser(userProfile);
    setSelectedVehicleId("");
    setVehicleSuccess("");
    setError("");
    setShowVehicleModal(true);
  };

  const openPasswordResetModal = (userProfile: UserProfile) => {
    setPasswordResetUser(userProfile);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordResetSuccess("");
    setError("");
    setShowPasswordModal(true);
  };

  const handleSendPasswordResetEmail = async () => {
    if (!passwordResetUser?.email) {
      setError("User has no email address");
      return;
    }

    setPasswordResetLoading(true);
    setError("");
    
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        passwordResetUser.email,
        { redirectTo: `${window.location.origin}/signin` }
      );

      if (resetError) {
        setError(resetError.message);
      } else {
        setPasswordResetSuccess(`Password reset email sent to ${passwordResetUser.email}`);
      }
    } catch (err) {
      setError("Failed to send password reset email");
    } finally {
      setPasswordResetLoading(false);
    }
  };

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordResetUser) return;

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setPasswordResetLoading(true);
    setError("");

    try {
      // Use the admin API endpoint via an API route
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: passwordResetUser.id,
          newPassword: newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to reset password");
      } else {
        setPasswordResetSuccess("Password has been reset successfully!");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError("Failed to reset password. Make sure the API route is configured.");
    } finally {
      setPasswordResetLoading(false);
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "owner":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "driver":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "owner":
        return "Owner";
      case "driver":
        return "Driver";
      default:
        return "User";
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-slate-400">Manage all users on the platform</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="owner">Owner</option>
            <option value="driver">Driver</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{users.length}</p>
              <p className="text-slate-400 text-sm">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {users.filter((u) => u.role === "super_admin").length}
              </p>
              <p className="text-slate-400 text-sm">Super Admins</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {users.filter((u) => u.role === "owner").length}
              </p>
              <p className="text-slate-400 text-sm">Owners</p>
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
                {users.filter((u) => u.role === "driver").length}
              </p>
              <p className="text-slate-400 text-sm">Drivers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
          <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No users found</h3>
          <p className="text-slate-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">User</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Company</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Role</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Joined</th>
                <th className="text-right px-6 py-4 text-slate-400 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredUsers.map((userProfile) => (
                <tr key={userProfile.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">
                        {userProfile.full_name || "No name"}
                      </p>
                      <p className="text-slate-500 text-sm">{userProfile.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-300">
                      {userProfile.company_name || "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleBadgeColor(
                        userProfile.role
                      )}`}
                    >
                      {getRoleLabel(userProfile.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-400 text-sm">
                      {userProfile.created_at
                        ? new Date(userProfile.created_at).toLocaleDateString()
                        : "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(userProfile)}
                        className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                        title="Edit User"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {userProfile.role === "driver" && (
                        <button
                          onClick={() => openVehicleModal(userProfile)}
                          className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                          title="Assign Vehicle"
                        >
                          <Car className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => openPasswordResetModal(userProfile)}
                        className="p-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20 transition-colors"
                        title="Reset Password"
                      >
                        <Key className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(userProfile.id)}
                        disabled={userProfile.id === user?.id}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit User Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">Edit User</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingUser(null);
                }}
                className="text-slate-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-500 cursor-not-allowed"
                />
                <p className="text-slate-500 text-xs mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                <select
                  value={formData.role || "owner"}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="driver">Driver</option>
                  <option value="owner">Owner</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company ID</label>
                <input
                  type="text"
                  value={formData.company_id}
                  onChange={(e) => setFormData({ ...formData, company_id: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm"
                  placeholder="company-uuid"
                />
                <p className="text-slate-500 text-xs mt-1">Link this user to a company for data filtering</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {showPasswordModal && passwordResetUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Reset Password</h2>
                  <p className="text-slate-400 text-sm">{passwordResetUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordResetUser(null);
                  setPasswordResetSuccess("");
                  setError("");
                }}
                className="text-slate-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {passwordResetSuccess && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3">
                  <p className="text-green-400 text-sm">{passwordResetSuccess}</p>
                </div>
              )}

              {/* Option 1: Send Reset Email */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Send className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-medium">Send Password Reset Email</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Send an email to the user with a link to reset their password.
                </p>
                <button
                  onClick={handleSendPasswordResetEmail}
                  disabled={passwordResetLoading}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {passwordResetLoading ? "Sending..." : "Send Reset Email"}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800 text-slate-500">OR</span>
                </div>
              </div>

              {/* Option 2: Set New Password Directly */}
              <form onSubmit={handleSetNewPassword} className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <Key className="w-5 h-5 text-amber-400" />
                  <h3 className="text-white font-medium">Set New Password Directly</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    placeholder="Enter new password"
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    placeholder="Confirm new password"
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={passwordResetLoading || !newPassword || !confirmPassword}
                  className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  {passwordResetLoading ? "Resetting..." : "Set New Password"}
                </button>
              </form>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordResetUser(null);
                    setPasswordResetSuccess("");
                    setError("");
                  }}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Assignment Modal */}
      {showVehicleModal && assigningUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Assign Vehicle</h2>
                  <p className="text-slate-400 text-sm">{assigningUser.full_name || assigningUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowVehicleModal(false);
                  setAssigningUser(null);
                  setVehicleSuccess("");
                  setError("");
                }}
                className="text-slate-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {vehicleSuccess && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3">
                  <p className="text-green-400 text-sm">{vehicleSuccess}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Select Vehicle</label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="">Choose a vehicle...</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.registration_number || 'No Reg'} ({v.vehicle_type})
                      {v.assigned_driver_id ? ' - Already Assigned' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm">
                  <strong className="text-white">Note:</strong> Assigning a vehicle to this driver will:
                </p>
                <ul className="text-slate-400 text-sm mt-2 list-disc list-inside space-y-1">
                  <li>Create a driver record if one doesn&apos;t exist</li>
                  <li>Link the vehicle to this driver</li>
                  <li>Allow tracking of this driver in the mobile app</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowVehicleModal(false);
                    setAssigningUser(null);
                    setVehicleSuccess("");
                    setError("");
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignVehicle}
                  disabled={!selectedVehicleId || assigningVehicle}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Car className="w-4 h-4" />
                  {assigningVehicle ? "Assigning..." : "Assign Vehicle"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
