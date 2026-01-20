"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  LayoutDashboard,
  Car,
  AlertCircle,
  FileText,
  Settings,
  LogOut,
  Bus,
  Locate,
  Users,
  Building2,
  Map,
  Bell,
  Shield,
  Loader2,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { signOut, role, isSuperAdmin, isOwner, profile, loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [forceShow, setForceShow] = useState(false);

  // Redirect to signin if not authenticated (but only after loading is done)
  useEffect(() => {
    if (!loading && !user && !redirecting && !forceShow) {
      setRedirecting(true);
      router.replace("/signin");
    }
  }, [loading, user, router, redirecting, forceShow]);

  // Fallback: if loading takes too long, either show dashboard or redirect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        // Check if we have cached user info in localStorage
        const cachedProfile = localStorage.getItem('profile');
        if (cachedProfile) {
          console.log('Auth loading timeout - showing dashboard with cached data');
          setForceShow(true);
        } else {
          console.warn('Auth loading timeout - no cached data, redirecting to signin');
          router.replace("/signin");
        }
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [loading, router]);

  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent double clicks
    setIsSigningOut(true);
    try {
      await signOut();
      router.replace("/signin");
    } catch (error) {
      console.error("Sign out error:", error);
      setIsSigningOut(false);
    }
  };

  // Base nav items for all users
  const baseNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Locate, label: "Live Tracking", path: "/live-tracking" },
  ];

  // Owner and Super Admin nav items
  const ownerNavItems = [
    { icon: Bus, label: "My Vehicles", path: "/vehicles" },
    { icon: Users, label: "Vehicle Owners", path: "/owners" },
    { icon: Map, label: "Geofences", path: "/geofences" },
    { icon: AlertCircle, label: "Alerts", path: "/alerts" },
    { icon: FileText, label: "Reports", path: "/reports" },
  ];

  // Super Admin only items
  const adminNavItems = [
    { icon: Car, label: "All Vehicles", path: "/global-vehicles" },
    { icon: Building2, label: "Companies", path: "/companies" },
    { icon: Shield, label: "User Management", path: "/users" },
  ];

  // Settings available to all
  const settingsItem = { icon: Settings, label: "Settings", path: "/settings" };

  // Build nav items based on role
  let navItems = [...baseNavItems];
  
  if (isOwner || isSuperAdmin) {
    navItems = [...navItems, ...ownerNavItems];
  }
  
  if (isSuperAdmin) {
    navItems = [...navItems, ...adminNavItems];
  }
  
  navItems.push(settingsItem);

  // Show loading spinner while auth is loading (unless force show) or signing out
  if ((loading && !forceShow) || isSigningOut || redirecting) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="text-slate-400 mt-2 text-sm">
            {isSigningOut ? 'Signing out...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated and not force showing
  if (!user && !forceShow) {
    return null;
  }

  // Get role badge color
  const getRoleBadgeColor = () => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'owner':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'driver':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'owner':
        return 'Owner';
      case 'driver':
        return 'Driver';
      default:
        return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col fixed left-0 top-0 h-screen">
        <div className="flex flex-col items-center p-4 gap-1">
          <img
            src="https://rppnet.com/wp-content/uploads/2026/01/full_logo_white_version.png"
            alt="Macrostellar Logo"
            className="h-full w-full"
          />
        </div>

        {/* User info section */}
        <div className="px-4 py-3 border-b border-slate-700">
          <p className="text-white font-medium text-sm truncate">
            {profile?.full_name || profile?.email || 'User'}
          </p>
          <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getRoleBadgeColor()}`}>
            {getRoleLabel()}
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningOut ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <LogOut className="w-5 h-5" />
            )}
            <span className="font-medium text-sm">{isSigningOut ? "Signing out..." : "Sign Out"}</span>
          </button>
        </div>
      </div>

      <div className="ml-64 flex-1 min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
