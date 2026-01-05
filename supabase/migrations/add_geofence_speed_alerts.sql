-- Migration: Add geofence RPC and speed limit support
-- Run this in Supabase SQL Editor

-- 1. Create RPC function to get geofences with GeoJSON boundary
CREATE OR REPLACE FUNCTION get_geofences_with_geojson()
RETURNS TABLE (
  id uuid,
  name text,
  boundary jsonb,
  active boolean,
  vehicle_id uuid,
  type text,
  user_id uuid,
  description text,
  speed_limit integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    g.id,
    g.name,
    ST_AsGeoJSON(g.boundary)::jsonb as boundary,
    g.active,
    g.vehicle_id,
    g.type,
    g.user_id,
    g.description,
    g.speed_limit
  FROM geofences g;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Add speed_limit column to vehicles table (in km/h)
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS speed_limit integer DEFAULT 120;

-- 3. Add speed_limit column to geofences table (optional per-zone speed limit)
ALTER TABLE geofences ADD COLUMN IF NOT EXISTS speed_limit integer DEFAULT NULL;

-- 4. Create alerts for geofence and speed violations
-- Ensure alerts table has the right columns
ALTER TABLE alerts ADD COLUMN IF NOT EXISTS alert_type text DEFAULT 'general';
ALTER TABLE alerts ADD COLUMN IF NOT EXISTS geofence_id uuid REFERENCES geofences(id);
ALTER TABLE alerts ADD COLUMN IF NOT EXISTS speed_recorded numeric;
ALTER TABLE alerts ADD COLUMN IF NOT EXISTS speed_limit numeric;
ALTER TABLE alerts ADD COLUMN IF NOT EXISTS location jsonb;
ALTER TABLE alerts ADD COLUMN IF NOT EXISTS acknowledged boolean DEFAULT false;
ALTER TABLE alerts ADD COLUMN IF NOT EXISTS acknowledged_at timestamp with time zone;
ALTER TABLE alerts ADD COLUMN IF NOT EXISTS acknowledged_by uuid REFERENCES profiles(id);

-- 5. Create function to check geofence violations
CREATE OR REPLACE FUNCTION check_geofence_violation(
  p_vehicle_id uuid,
  p_latitude double precision,
  p_longitude double precision
) RETURNS TABLE (
  geofence_id uuid,
  geofence_name text,
  violation_type text,
  is_inside boolean
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    g.id as geofence_id,
    g.name as geofence_name,
    g.type as violation_type,
    ST_Contains(g.boundary, ST_SetSRID(ST_MakePoint(p_longitude, p_latitude), 4326)) as is_inside
  FROM geofences g
  WHERE g.active = true
    AND (g.vehicle_id IS NULL OR g.vehicle_id = p_vehicle_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Grant execute permission
GRANT EXECUTE ON FUNCTION get_geofences_with_geojson() TO authenticated;
GRANT EXECUTE ON FUNCTION get_geofences_with_geojson() TO anon;
GRANT EXECUTE ON FUNCTION check_geofence_violation(uuid, double precision, double precision) TO authenticated;
GRANT EXECUTE ON FUNCTION check_geofence_violation(uuid, double precision, double precision) TO anon;
