import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, Clock, Building2, CheckCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Contact Form Submitted:", data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have a question? We're here to help. Our team typically responds within 24 hours.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

       
        <div className="space-y-8">

       
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="relative">
              <iframe
                title="Our Location - Aarambha IT Research Center"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.3773427640363!2d83.98842719999999!3d28.226224400000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595ec53333f5f%3A0x564e586c363cea1c!2sAarambha%20IT%20Research%20Center!5e0!3m2!1sen!2snp!4v1761905604706!5m2!1sen!2snp"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
              <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Pokhara, Nepal
                </p>
              </div>
            </div>
          </div>

      
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">

          
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Visit Our Office</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Gairapatan Road<br />
                    Lakeside, Pokhara 33700<br />
                    Kaski, Nepal
                  </p>
                </div>
              </div>
            </div>

           
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Call Us</p>
                    <a href="tel:+977980022334455" className="text-blue-600 hover:text-blue-700 font-medium">
                      +977 9800-223-34455
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4">
                 
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Us</p>
                    <a href="mailto:support@ecommerce-by-two.com" className="text-blue-600 hover:text-blue-700 font-medium break-all">
                      support@ecommerce-by-two.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6" />
              <h3 className="text-xl font-bold">Office Hours</h3>
            </div>
            <div className="space-y-2 text-blue-50">
              <p><span className="font-medium">Sun - Thu:</span> 9:00 AM - 6:00 PM</p>
              <p><span className="font-medium">Friday:</span> 10:00 AM - 3:00 PM</p>
              <p><span className="font-medium text-yellow-300">Saturday:</span> Closed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10 border border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a Message</h2>
            <p className="text-gray-600">We'll get back to you as soon as possible!</p>
          </div>

          {success && (
            <div className="mb-6 p-5 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3 text-green-800">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-bold">Thank You!</p>
                <p className="text-sm">Your message has been sent successfully. We'll reply soon!</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Prabesh Poudel"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
                })}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="6"
                placeholder="How can we help you today? Let us know your query..."
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Message must be at least 10 characters" }
                })}
              />
              {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/50"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Send Message
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            We respect your privacy. Your information is safe with us.
          </p>
        </div>
      </div>
    </div>
  );
}