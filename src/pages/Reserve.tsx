import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, MapPin, Car, Users, ChevronRight } from "lucide-react";
import LocationInput from "@/components/LocationInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

// Popular Jaipur destinations people often reserve rides to
// These are the most common airport/station/tourist spot pickups
const popularDestinations = [
  { name: "Jaipur International Airport", area: "Sanganer", icon: "✈️" },
  { name: "Jaipur Junction Railway Station", area: "Station Road", icon: "🚆" },
  { name: "Amer Fort", area: "Devisinghpura", icon: "🏰" },
  { name: "Chokhi Dhani", area: "Sitapura", icon: "🎭" },
];

// Available time slots — 30 min intervals
// We generate these statically instead of computing to keep things simple
const timeSlots = [
  "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM",
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
  "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM",
  "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
];

// Vehicle options for scheduled rides — slightly higher pricing for reservations
// Reservation premium is roughly 15-20% over regular fares
const vehicleOptions = [
  { name: "Sedan", desc: "Comfortable 4-seater", price: "₹150", icon: "🚗", capacity: 4 },
  { name: "SUV", desc: "Spacious 6-seater", price: "₹300", icon: "🚙", capacity: 6 },
  { name: "Premium", desc: "Luxury experience", price: "₹520", icon: "🖤", capacity: 4 },
];

/**
 * Reserve page — lets users schedule a ride in advance.
 * Three-step flow: 1) Pick date & time, 2) Enter locations, 3) Choose vehicle.
 * This is different from instant booking — driver is assigned closer to pickup time.
 */
const Reserve = () => {
  const navigate = useNavigate();

  // Form state — each piece corresponds to a step in the flow
  const [pickup, setPickup] = useState("Current Location");
  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [step, setStep] = useState(1); // 1 = date/time, 2 = location, 3 = vehicle

  // Can't go past step 1 without both date and time
  const canProceedStep1 = selectedDate && selectedTime;
  // Need a destination to move to vehicle selection
  const canProceedStep2 = destination.trim().length > 0;

  // Format date nicely for the confirmation screen
  // Using toLocaleDateString because it handles locale stuff for us
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
    : "";

  // Handle final booking confirmation
  // TODO: In production, this would call an API to create the reservation
  const handleConfirm = () => {
    navigate("/ride-tracking");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top navigation bar with back button and step indicator */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
          className="rounded-full bg-card p-2.5 shadow-sm border border-border"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Reserve a Ride</h1>
          {/* Step counter so user knows where they are in the flow */}
          <p className="text-xs text-muted-foreground">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress bar — visual indicator of how far along the user is */}
      <div className="px-5 mb-6">
        <div className="h-1 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* ==================== STEP 1: Date & Time Selection ==================== */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-5 space-y-5"
        >
          {/* Calendar widget — only allow future dates (disabled past dates) */}
          <div className="rounded-xl bg-card p-3 border border-border">
            <div className="flex items-center gap-2 mb-3 px-1">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Pick a Date</span>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md"
            />
          </div>

          {/* Time slot grid — scrollable list of 30-minute intervals */}
          <div className="rounded-xl bg-card p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Pick a Time</span>
            </div>
            {/* Using a fixed-height container with overflow so the page doesn't get too long */}
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    selectedTime === time
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-foreground hover:bg-accent"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Next button — disabled until both date and time are selected */}
          <Button
            onClick={() => setStep(2)}
            disabled={!canProceedStep1}
            className="w-full rounded-xl h-12 text-base font-semibold"
          >
            Continue
          </Button>
        </motion.div>
      )}

      {/* ==================== STEP 2: Location Input ==================== */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-5 space-y-5"
        >
          {/* Show selected date/time as a badge so user can verify */}
          <div className="flex items-center gap-2 rounded-xl bg-primary/10 p-3">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {formattedDate} at {selectedTime}
            </span>
          </div>

          {/* Reusing our LocationInput component — same one from BookRide */}
          <LocationInput
            pickup={pickup}
            destination={destination}
            onPickupChange={setPickup}
            onDestinationChange={setDestination}
          />

          {/* Quick-pick popular destinations — saves typing for common routes */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Popular Destinations</p>
            <div className="space-y-2">
              {popularDestinations.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => setDestination(dest.name)}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 transition-colors border ${
                    destination === dest.name
                      ? "bg-primary/10 border-primary/30"
                      : "bg-card border-border hover:bg-secondary"
                  }`}
                >
                  <span className="text-xl">{dest.icon}</span>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium text-foreground">{dest.name}</p>
                    <p className="text-xs text-muted-foreground">{dest.area}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setStep(3)}
            disabled={!canProceedStep2}
            className="w-full rounded-xl h-12 text-base font-semibold"
          >
            Choose Vehicle
          </Button>
        </motion.div>
      )}

      {/* ==================== STEP 3: Vehicle Selection & Confirm ==================== */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-5 space-y-5"
        >
          {/* Trip summary card — shows all selections before final confirm */}
          <div className="rounded-xl bg-card p-4 border border-border space-y-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">{formattedDate} at {selectedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground truncate">{destination}</span>
            </div>
          </div>

          {/* Vehicle options — tap to select, highlighted with primary color */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Select Vehicle</p>
            <div className="space-y-3">
              {vehicleOptions.map((vehicle, i) => (
                <button
                  key={vehicle.name}
                  onClick={() => setSelectedVehicle(i)}
                  className={`flex w-full items-center gap-4 rounded-xl p-4 transition-all border ${
                    selectedVehicle === i
                      ? "bg-primary/10 border-primary/30 shadow-sm"
                      : "bg-card border-border hover:bg-secondary"
                  }`}
                >
                  {/* Vehicle emoji — quick visual identifier */}
                  <span className="text-3xl">{vehicle.icon}</span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground">{vehicle.name}</p>
                    <p className="text-xs text-muted-foreground">{vehicle.desc}</p>
                    {/* Capacity badge — useful for group bookings */}
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{vehicle.capacity} seats</span>
                    </div>
                  </div>
                  {/* Price on the right — estimated fare for the route */}
                  <div className="text-right">
                    <p className="text-base font-bold text-foreground">{vehicle.price}</p>
                    <p className="text-[10px] text-muted-foreground">estimated</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Final confirm button — triggers the reservation */}
          <Button
            onClick={handleConfirm}
            className="w-full rounded-xl h-12 text-base font-semibold"
          >
            Confirm Reservation
          </Button>

          {/* Cancellation policy note — important legal info */}
          <p className="text-[10px] text-muted-foreground text-center pb-4">
            Free cancellation up to 1 hour before pickup. After that, a ₹50 fee applies.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Reserve;
