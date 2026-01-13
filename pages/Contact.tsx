import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Showroom Location',
      lines: ['Kimathi Street, Nairobi CBD', 'Elite Plaza, 2nd Floor']
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone Support',
      lines: ['+254 721 825 773'],
      subtitle: 'Available for WhatsApp & Calls'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      lines: ['sales@eliteinfofocus.co.ke']
    },
    {
      icon: <Clock size={24} />,
      title: 'Business Hours',
      lines: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sun: Closed']
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-zinc-950 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <MessageCircle className="w-3 h-3" />
              Get in Touch
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Let's Talk Gear</h1>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Ready to upgrade your studio? Visit our showroom in Nairobi or send us a message.
              Our team of experts is here to help you choose the right gear.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-colors group"
                >
                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-blue-500 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-zinc-400">{line}</p>
                    ))}
                    {item.subtitle && (
                      <p className="text-zinc-500 text-sm mt-1">{item.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/254721825773?text=Hi%20Elite%20InfoFocus,%20I%20have%20a%20question%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/20 hover:scale-[1.02] group"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
              <span className="text-sm font-normal opacity-75">—Instant Response</span>
            </a>
          </div>

          {/* Form */}
          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 relative overflow-hidden">
            {/* Success overlay */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-zinc-900/95 backdrop-blur-sm flex items-center justify-center z-10 animate-fade-in">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-zinc-400">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full bg-zinc-950 border rounded-xl p-4 text-white focus:outline-none transition-all form-input-animated ${errors.firstName ? 'border-red-500' : 'border-zinc-800 focus:border-blue-500'
                      }`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="form-error">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full bg-zinc-950 border rounded-xl p-4 text-white focus:outline-none transition-all form-input-animated ${errors.lastName ? 'border-red-500' : 'border-zinc-800 focus:border-blue-500'
                      }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="form-error">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-zinc-950 border rounded-xl p-4 text-white focus:outline-none transition-all form-input-animated ${errors.email ? 'border-red-500' : 'border-zinc-800 focus:border-blue-500'
                    }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-zinc-950 border rounded-xl p-4 text-white focus:outline-none transition-all resize-none form-input-animated ${errors.message ? 'border-red-500' : 'border-zinc-800 focus:border-blue-500'
                    }`}
                  placeholder="I'm interested in the Sony A7 IV..."
                ></textarea>
                {errors.message && <p className="form-error">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;