import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

let lat = 24.8607;
let lng = 67.0011;

function randomMovement(lat: number, lng: number) {
  return {
    lat: lat + (Math.random() - 0.5) * 0.001,
    lng: lng + (Math.random() - 0.5) * 0.001
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const vehicleId = searchParams.get("vehicle_id");

  if (!vehicleId) {
    return NextResponse.json({ error: "vehicle_id is required" }, { status: 400 });
  }

  const newPos = randomMovement(lat, lng);
  lat = newPos.lat;
  lng = newPos.lng;

  const { error } = await supabase.rpc("insert_tracking_point", {
  v_vehicle_id: vehicleId,
  v_lng: newPos.lng,
  v_lat: newPos.lat,
  v_speed: Math.floor(Math.random() * 60),
  v_heading: Math.floor(Math.random() * 360),
  v_battery: Math.floor(Math.random() * 100),
  v_ignition: true,
});


  if (error) {
    console.error("RPC Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({
    status: "Tracking point inserted",
    new_position: newPos
  });
}
