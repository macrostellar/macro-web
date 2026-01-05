"use client";


import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

type Driver = any;

type DriverContextType = {
  drivers: Driver[];
  driversMap: Record<string, Driver>;
  refreshDrivers: () => Promise<void>;
  getDriver: (id?: string | null) => Driver | null;
  setLocalSelectedDriver: (id: string | null) => void;
  localSelectedDriverId: string | null;
  loading: boolean;
};

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [localSelectedDriverId, setLocalSelectedDriverId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const refreshDrivers = useCallback(async () => {
    if (!user) {
      setDrivers([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await supabase.from("drivers").select("*");
      setDrivers(data ?? []);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Only fetch drivers when user is authenticated
    if (!authLoading && user) {
      refreshDrivers();
    } else if (!authLoading && !user) {
      // Clear drivers when user logs out
      setDrivers([]);
    }
  }, [user, authLoading, refreshDrivers]);

  const driversMap = React.useMemo(
    () => Object.fromEntries(drivers.map((d: any) => [d.id, d])),
    [drivers]
  );

  const getDriver = (id?: string | null) => (id ? driversMap[id] ?? null : null);

  return (
    <DriverContext.Provider
      value={{
        drivers,
        driversMap,
        refreshDrivers,
        getDriver,
        setLocalSelectedDriver: setLocalSelectedDriverId,
        localSelectedDriverId,
        loading,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export const useDrivers = () => {
  const ctx = useContext(DriverContext);
  if (!ctx) throw new Error("useDrivers must be used within DriverProvider");
  return ctx;
};
