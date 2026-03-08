import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Clock, Star, MapPin, Calendar, ChevronRight, Car, Package, Utensils } from "lucide-react";
import SideMenu from "@/components/SideMenu";

// Hardcoded saved places — later we can fetch these from user profile / localStorage
const savedPlaces = [
  { icon: "🏠", label: "Home", address: "Vaishali Nagar, Jaipur" },
  { icon: "💼", label: "Work", address: "Malviya Nagar, Jaipur" },
];

// Mock data for recent rides history
// TODO: Replace with actual API call when backend is ready
const recentRides = [
  { destination: "Jaipur International Airport", time: "Yesterday, 3:45 PM", price: "₹450" },
  { destination: "Hawa Mahal", time: "Mar 5, 11:20 AM", price: "₹120" },
  { destination: "Amer Fort", time: "Mar 3, 9:00 AM", price: "₹280" },
  { destination: "World Trade Park", time: "Mar 1, 6:30 PM", price: "₹95" },
];

// Main services offered on the home screen
// Each service links to its own booking flow
const services = [
  { icon: <Car className="h-6 w-6" />, label: "Ride", color: "bg-primary/15 text-primary" },
  { icon: <Package className="h-6 w-6" />, label: "Package", color: "bg-uber-green/15 text-uber-green" },
  { icon: <Utensils className="h-6 w-6" />, label: "Eats", color: "bg-uber-yellow/15 text-uber-yellow" },
  { icon: <Calendar className="h-6 w-6" />, label: "Reserve", color: "bg-uber-surge/15 text-uber-surge" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Side navigation drawer — hamburger menu in top-left */}
      <SideMenu />

      {/* Greeting header — we could make this dynamic based on time of day */}
      <div className="px-5 pt-12 pb-6 pl-16">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">Good evening</h1>
          <p className="text-sm text-muted-foreground">Where are you going?</p>
        </motion.div>
      </div>

      {/* Search bar — tapping this takes user to the booking page */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-6"
      >
        <button
          onClick={() => navigate("/book")}
          className="flex w-full items-center gap-3 rounded-xl bg-card p-4 transition-all hover:bg-secondary"
        >
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Where to?</span>
          {/* "Now" pill — could be expanded to show scheduled time */}
          <div className="ml-auto flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
            <Clock className="h-3.5 w-3.5 text-foreground" />
            <span className="text-xs font-medium text-foreground">Now</span>
          </div>
        </button>
      </motion.div>

      {/* Quick-access service grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-5 mb-6"
      >
        <div className="grid grid-cols-4 gap-3">
          {services.map((service) => (
            <button
              key={service.label}
              // Navigate to the appropriate page based on service type
              onClick={() => service.label === "Ride" ? navigate("/book") : service.label === "Package" ? navigate("/package") : service.label === "Eats" ? navigate("/eats") : undefined}
              className="flex flex-col items-center gap-2"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.color}`}>
                {service.icon}
              </div>
              <span className="text-xs font-medium text-foreground">{service.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Saved places section — home, work, etc. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 mb-6"
      >
        <div className="rounded-xl bg-card">
          {savedPlaces.map((place, i) => (
            <button
              key={place.label}
              onClick={() => navigate("/book")}
              className={`flex w-full items-center gap-3 p-4 transition-colors hover:bg-secondary ${
                i < savedPlaces.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg">
                {place.icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{place.label}</p>
                <p className="text-xs text-muted-foreground">{place.address}</p>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recent rides list — shows past trip history */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="px-5"
      >
        <h2 className="mb-3 text-lg font-bold text-foreground">Recent</h2>
        <div className="space-y-2">
          {recentRides.map((ride) => (
            <button
              key={ride.destination}
              onClick={() => navigate("/book")}
              className="flex w-full items-center gap-3 rounded-xl bg-card p-4 transition-colors hover:bg-secondary"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">{ride.destination}</p>
                <p className="text-xs text-muted-foreground">{ride.time}</p>
              </div>
              {/* Price shown on the right for quick reference */}
              <span className="text-sm font-semibold text-foreground">{ride.price}</span>
            </button>
          ))}
        </div>
      </motion.div>

      
    </div>
  );
};

export default Index;
