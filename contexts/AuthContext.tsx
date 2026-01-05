"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type User, type Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type UserRole = 'super_admin' | 'owner' | 'driver' | null;

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  company_id: string | null;
  company_name: string | null;
  username: string | null;
  role: UserRole;
  created_at: string | null;
  updated_at: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isSuperAdmin: boolean;
  isOwner: boolean;
  isDriver: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Permission definitions
const PERMISSIONS = {
  super_admin: [
    'manage_all_users', 'manage_all_vehicles', 'manage_all_drivers',
    'view_all_reports', 'manage_billing', 'manage_settings', 'view_all_alerts',
    'manage_own_fleet', 'manage_own_drivers', 'manage_own_vehicles',
    'view_own_reports', 'view_own_alerts', 'view_assigned_vehicle', 'view_own_trips',
    'manage_companies', 'manage_subscriptions'
  ],
  owner: [
    'manage_own_fleet', 'manage_own_drivers', 'manage_own_vehicles',
    'view_own_reports', 'view_own_alerts', 'view_assigned_vehicle', 'view_own_trips'
  ],
  driver: [
    'view_assigned_vehicle', 'view_own_trips'
  ]
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data && !error) {
        setProfile(data as Profile);
        setRole(data.role as UserRole);
      } else if (error) {
        console.error('Error fetching profile:', error);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  // Initialize session and auth state
  useEffect(() => {
    let isMounted = true;
    
    const initAuth = async () => {
      try {
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Auth timeout')), 10000)
        );
        
        const sessionPromise = supabase.auth.getSession();
        
        const { data } = await Promise.race([sessionPromise, timeoutPromise]) as { data: { session: any } };
        
        if (!isMounted) return;
        
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        if (data.session?.user) {
          await fetchProfile(data.session.user.id);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setRole(null);
      }
      
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign Up
  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      if (data.user && fullName) {
        // update profile after signup with default role as 'owner'
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ full_name: fullName, role: 'owner' })
          .eq('id', data.user.id);

        if (profileError) throw profileError;
      }

      return { error: null };
    } catch (error) {
      console.error('SignUp Error:', error);
      return { error: error as Error };
    }
  };

  // Sign In
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('SignIn Error:', error);
      return { error: error as Error };
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      // Clear state first to prevent stale UI
      setUser(null);
      setSession(null);
      setProfile(null);
      setRole(null);
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('SignOut Error:', error);
    }
  };

  // Role checks
  const isSuperAdmin = role === 'super_admin';
  const isOwner = role === 'owner';
  const isDriver = role === 'driver';

  // Permission check
  const hasPermission = (permission: string): boolean => {
    if (!role) return false;
    const rolePermissions = PERMISSIONS[role] || [];
    return rolePermissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ 
      user, session, profile, role, loading, 
      signUp, signIn, signOut, refreshProfile,
      isSuperAdmin, isOwner, isDriver, hasPermission 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for consuming auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
