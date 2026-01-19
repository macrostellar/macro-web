"use client";
import { useState} from 'react';
import { Mail, MessageSquare, Send, ArrowLeft } from 'lucide-react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function ContactPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccess(true);
    setLoading(false);
    setFormData({ name: '', email: user?.email || '', message: '' });

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => router.push(isAuthenticated ? '/dashboard' : '/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {isAuthenticated ? 'Back to dashboard' : 'Back to home'}
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-slate-400">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Email Us</h3>
                <p className="text-slate-400 text-sm">macrostellar@rppnet.com</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Send us an email and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Live Chat</h3>
                <p className="text-slate-400 text-sm">Available Mon-Fri, 9am-5pm</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Chat with our support team for immediate assistance.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

          {success && (
              // This route is now disabled as the admin dashboard is standalone.
              export default function ContactDisabled() {
                return null;
              }
            </div>
