const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://jbhdzfhzpxqhioxsclxj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiaGR6Zmh6cHhxaGlveHNjbHhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjMzODE4MiwiZXhwIjoyMDc3OTE0MTgyfQ.OXWp1Y1cr6bv-if-FG9jNMjkzF_T0NZxEEQcTqOwASM'
);

async function main() {
  console.log('Resetting all vehicles to offline (no fake data)...\n');

  // Set all vehicles to offline with no fake location data
  const { data, error } = await supabase
    .from('vehicles')
    .update({
      status: 'offline',
      last_known_location: null,
      last_known_address: null,
      last_update: null
    })
    .neq('id', '00000000-0000-0000-0000-000000000000') // Match all
    .select('id, registration_number, status');

  if (error) {
    console.log('Error:', error);
    return;
  }

  console.log('Updated vehicles:');
  data.forEach(v => {
    console.log(`  - ${v.registration_number}: ${v.status}`);
  });

  // Also clear any fake tracking_data
  const { error: trackingError } = await supabase
    .from('tracking_data')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (trackingError) {
    console.log('Error clearing tracking data:', trackingError);
  } else {
    console.log('\nCleared all fake tracking data.');
  }

  console.log('\n✅ All vehicles reset to offline.');
  console.log('📍 Location data will update when real GPS devices send data.');
}

main();
