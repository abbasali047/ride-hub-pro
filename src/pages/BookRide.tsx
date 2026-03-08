import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import LocationInput from "@/components/LocationInput";
import MapPlaceholder from "@/components/MapPlaceholder";
import VehicleCard from "@/components/VehicleCard";
import MoodSelector from "@/components/MoodSelector";

const vehicles = [
  { name: "UberX", description: "Affordable everyday rides", price: "$12.50", eta: "3 min", capacity: 4, icon: "🚗", surge: false },
  { name: "Comfort", description: "Newer cars, extra legroom", price: "$18.75", eta: "5 min", capacity: 4, icon: "🚙", surge: false },
  { name: "UberXL", description: "Affordable rides for groups", price: "$22.00", eta: "8 min", capacity: 6, icon: "🚐", surge: true },
  { name: "Black", description: "Premium rides in luxury cars", price: "$35.00", eta: "6 min", capacity: 4, icon: "🖤", surge: false },
];

const BookRide = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("Current Location");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [mood, setMood] = useState<string | null>(null);
  const [scheduleMode, setScheduleMode] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);

  const handleDestinationChange = (val: string) => {
    setDestination(val);
    if (val.length > 2) setShowVehicles(true);
  };

  const handleBook = () => {
    navigate("/ride-tracking");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="rounded-full bg-card p-2">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Plan your ride</h1>
      </div>

      <div className="px-5 space-y-4">
        <MapPlaceholder showRoute={showVehicles} />

        <LocationInput
          pickup={pickup}
          destination={destination}
          onPickupChange={setPickup}
          onDestinationChange={handleDestinationChange}
        />

        {/* Schedule toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setScheduleMode(false)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              !scheduleMode ? "bg-foreground text-background" : "bg-card text-foreground"
            }`}
          >
            <Clock className="h-4 w-4" />
            Ride now
          </button>
          <button
            onClick={() => setScheduleMode(true)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              scheduleMode ? "bg-foreground text-background" : "bg-card text-foreground"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Schedule
          </button>
        </div>

        {/* Schedule picker */}
        <AnimatePresence>
          {scheduleMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden rounded-xl bg-card p-4"
            >
              <h3 className="mb-3 text-sm font-semibold text-foreground">Pick a time</h3>
              <div className="grid grid-cols-3 gap-2">
                {["Today 5:00 PM", "Today 6:00 PM", "Tomorrow 8:00 AM", "Tomorrow 9:00 AM", "Tomorrow 12:00 PM", "Custom"].map((time) => (
                  <button
                    key={time}
                    className="rounded-lg bg-secondary px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-uber-surface"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vehicle selection */}
        <AnimatePresence>
          {showVehicles && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h3 className="text-sm font-semibold text-foreground">Choose a ride</h3>
              {vehicles.map((vehicle, i) => (
                <VehicleCard
                  key={vehicle.name}
                  {...vehicle}
                  selected={selectedVehicle === i}
                  onSelect={() => setSelectedVehicle(i)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {showVehicles && <MoodSelector selected={mood} onSelect={setMood} />}

        {/* Book button */}
        {showVehicles && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-8"
          >
            <button
              onClick={handleBook}
              className="w-full rounded-xl bg-foreground py-4 text-base font-bold text-background transition-transform active:scale-[0.98]"
            >
              Book {vehicles[selectedVehicle].name} · {vehicles[selectedVehicle].price}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookRide;
