import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Shield, Phone, MapPin, Users, AlertTriangle,
  PhoneCall, MessageCircle, Share2, Bell, Navigation, Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Emergency contacts — these are Jaipur-specific helpline numbers
// In production, we'd also pull user's personal emergency contacts from their profile
const emergencyContacts = [
  { icon: PhoneCall, label: "Police", number: "100", color: "bg-destructive/15 text-destructive" },
  { icon: Phone, label: "Ambulance", number: "108", color: "bg-uber-green/15 text-uber-green" },
  { icon: AlertTriangle, label: "Women Helpline", number: "1091", color: "bg-uber-surge/15 text-uber-surge" },
  { icon: Phone, label: "RideX Support", number: "1800-XXX-XXXX", color: "bg-primary/15 text-primary" },
];

// Safety features that users can toggle or activate
// Each feature has a description so users understand what it does
const safetyFeatures = [
  {
    icon: Share2,
    title: "Share My Trip",
    desc: "Share live ride status with trusted contacts so they can track you in real time",
    action: "share",
  },
  {
    icon: Navigation,
    title: "Live Location Sharing",
    desc: "Continuously share your GPS location with family members during rides",
    action: "location",
  },
  {
    icon: Bell,
    title: "Ride Check Alerts",
    desc: "Get automatic safety check-ins if your ride goes off-route or stops unexpectedly",
    action: "ridecheck",
  },
  {
    icon: Users,
    title: "Trusted Contacts",
    desc: "Add up to 5 emergency contacts who can be notified instantly",
    action: "contacts",
  },
  {
    icon: Car,
    title: "Verify Your Ride",
    desc: "Always match car model, license plate, and driver photo before getting in",
    action: "verify",
  },
];

// Safety tips — these rotate or could be shown as a carousel
// Sourced from common ride-sharing safety guidelines
const safetyTips = [
  "Always verify the driver's name and car details before entering the vehicle.",
  "Share your trip details with a friend or family member every time.",
  "Sit in the back seat for maximum personal space and safety.",
  "If you feel unsafe, use the emergency button — we alert authorities instantly.",
  "Avoid sharing personal information like your home address with drivers.",
];

/**
 * Safety page — the main hub for all safety-related features.
 * Includes emergency calling, feature toggles, and safety tips.
 * Designed to be accessible quickly — every action is max 2 taps away.
 */
const Safety = () => {
  const navigate = useNavigate();
  // Track which features the user has enabled
  // TODO: Persist these to user profile via API
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>(["ridecheck"]);

  // Toggle a safety feature on/off
  const toggleFeature = (action: string) => {
    setEnabledFeatures((prev) =>
      prev.includes(action) ? prev.filter((f) => f !== action) : [...prev, action]
    );
    // Show confirmation toast so user gets feedback
    toast({
      title: enabledFeatures.includes(action) ? "Feature disabled" : "Feature enabled",
      description: `Safety feature has been ${enabledFeatures.includes(action) ? "turned off" : "activated"}.`,
    });
  };

  // Simulate calling an emergency number
  // On a real device, this would use tel: protocol to initiate a call
  const handleEmergencyCall = (number: string, label: string) => {
    toast({
      title: `Calling ${label}`,
      description: `Dialing ${number}...`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with back button */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-card p-2.5 shadow-sm border border-border"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Safety Center</h1>
          <p className="text-xs text-muted-foreground">Your safety is our priority</p>
        </div>
      </div>

      {/* ==================== SOS Emergency Button ==================== */}
      {/* Big red button at the top — most important action, always visible */}
      <div className="px-5 mb-6">
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleEmergencyCall("112", "Emergency Services")}
          className="w-full rounded-2xl bg-destructive p-5 flex items-center gap-4 shadow-lg"
        >
          <div className="h-14 w-14 rounded-full bg-destructive-foreground/20 flex items-center justify-center">
            <AlertTriangle className="h-7 w-7 text-destructive-foreground" />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-destructive-foreground">Emergency SOS</p>
            <p className="text-xs text-destructive-foreground/80">
              Tap to alert authorities & share your location
            </p>
          </div>
        </motion.button>
      </div>

      {/* ==================== Emergency Contacts ==================== */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-bold text-foreground mb-3">Emergency Contacts</h2>
        <div className="grid grid-cols-2 gap-3">
          {emergencyContacts.map((contact, i) => (
            <motion.button
              key={contact.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleEmergencyCall(contact.number, contact.label)}
              className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 border border-border hover:bg-secondary transition-colors"
            >
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${contact.color}`}>
                <contact.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-foreground">{contact.label}</p>
              <p className="text-[10px] text-muted-foreground">{contact.number}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ==================== Safety Features ==================== */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-bold text-foreground mb-3">Safety Features</h2>
        <div className="space-y-3">
          {safetyFeatures.map((feature, i) => {
            const isEnabled = enabledFeatures.includes(feature.action);
            return (
              <motion.button
                key={feature.action}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => toggleFeature(feature.action)}
                className={`flex w-full items-center gap-3 rounded-xl p-4 border transition-all ${
                  isEnabled
                    ? "bg-primary/10 border-primary/30"
                    : "bg-card border-border hover:bg-secondary"
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  isEnabled ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                }`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight">{feature.desc}</p>
                </div>
                {/* Toggle indicator dot — green for on, gray for off */}
                <div className={`h-3 w-3 rounded-full ${
                  isEnabled ? "bg-uber-green" : "bg-muted-foreground/30"
                }`} />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ==================== Safety Tips ==================== */}
      {/* Quick scrollable tips — good for first-time users */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-bold text-foreground mb-3">Safety Tips</h2>
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          {safetyTips.map((tip, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-4 ${
                i < safetyTips.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* Numbered badge for each tip */}
              <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-primary">{i + 1}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Report issue button at the bottom */}
      <div className="px-5 pb-8">
        <Button
          variant="outline"
          onClick={() => toast({ title: "Report submitted", description: "Our team will review your concern shortly." })}
          className="w-full rounded-xl h-12 text-sm font-semibold"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Report a Safety Issue
        </Button>
      </div>
    </div>
  );
};

export default Safety;
