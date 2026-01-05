"use client";

import { MapPin, Clock, Shield, Globe, Zap, Users } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function LandingPage() {
const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-2">
            <img src="https://macrostellar.com/wp-content/uploads/2025/11/4.png" alt="Logo" className="w-20 h-20" />
             <img src="https://macrostellar.com/wp-content/uploads/2025/11/2-1.png" alt="Logo" className="w-64 h-64" />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/signin')}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Universal Asset Tracking
            <br />
            <span className="text-blue-400">Reimagined</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Next-generation real-time tracking platform for road vehicles, aircraft, maritime vessels, and more.
            Track anything, anywhere, from a single unified dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/signup')}
              className="px-8 py-4 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/50"
            >
              Start Tracking Now
            </button>
            <button
              onClick={() => router.push('/contact')}
              className="px-8 py-4 bg-slate-700 text-white text-lg rounded-lg hover:bg-slate-600 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Connect Tracker</h3>
            <p className="text-slate-400">
              Link your GPS tracking device to our platform in seconds
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Monitor Real-Time</h3>
            <p className="text-slate-400">
              View live location, speed, and telemetry data on interactive maps
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Stay Protected</h3>
            <p className="text-slate-400">
              Set geofences and receive instant alerts for any breaches
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Phase 1: Road Vehicle Tracking
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our MVP launches with comprehensive tracking for cars, buses, trucks, and commercial fleets.
            More asset types coming soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <Clock className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Real-Time Location</h3>
            <p className="text-slate-400">
              Track your fleet with precision GPS positioning updated every few seconds
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <MapPin className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Route History</h3>
            <p className="text-slate-400">
              Access complete journey records with timestamps and detailed path information
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <Shield className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Geofencing Alerts</h3>
            <p className="text-slate-400">
              Define virtual boundaries and get notified when vehicles enter or exit zones
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <Zap className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Live Telemetry</h3>
            <p className="text-slate-400">
              Monitor speed, fuel levels, battery status, and ignition state in real-time
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <Users className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Fleet Management</h3>
            <p className="text-slate-400">
              Manage multiple vehicles from a unified dashboard with powerful filtering
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <Globe className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Unified Platform</h3>
            <p className="text-slate-400">
              Built on scalable architecture ready for aircraft, maritime, and IoT tracking
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Asset Tracking?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the next generation of universal asset monitoring. Start tracking your road vehicles today.
          </p>
          <button
            onClick={() => router.push('/signup')}
            className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-xl"
          >
            Get Started Free
          </button>
        </div>
      </section>

      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 ">
            <div className='text-center'>
              <div className="flex items-center justify-center text-center">
             <img src="https://macrostellar.com/wp-content/uploads/2025/11/1-e1763898340162.png" alt="Logo" className="my-2" />
            </div>
              <p className="text-slate-400 text-md">
The Next Dimension of Data
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><button onClick={() => router.push('/signup')} className="text-slate-400 hover:text-white text-sm transition-colors">Get Started</button></li>
                <li><button onClick={() => router.push('/contact')} className="text-slate-400 hover:text-white text-sm transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              &copy; 2026 Macrostellar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
