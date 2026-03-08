import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import MapPlaceholder from "@/components/MapPlaceholder";
import RideStatusBar from "@/components/RideStatusBar";
import DriverCard from "@/components/DriverCard";
import QuickChat from "@/components/QuickChat";
import { useToast } from "@/hooks/use-toast";
import { getRandomDriver } from "@/data/drivers";

// Ride goes through these stages in order
type RideStatus = "searching" | "matched" | "arriving" | "in_ride" | "completed";

const RideTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<RideStatus>("searching");

  // Pick a random driver once when component mounts (memoized so it doesn't change on re-renders)
  const driver = useMemo(() => getRandomDriver(), []);

  // Simulate the ride lifecycle with timed status changes
  // In production, this would be replaced by real-time websocket updates
  useEffect(() => {
    const timers = [
      setTimeout(() => setStatus("matched"), 3000),     // driver found after 3s
      setTimeout(() => setStatus("arriving"), 7000),     // driver arriving after 7s
      setTimeout(() => setStatus("in_ride"), 11000),     // ride starts after 11s
      setTimeout(() => setStatus("completed"), 18000),   // ride ends after 18s
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-navigate to rating screen once ride is completed
  useEffect(() => {
    if (status === "completed") {
      setTimeout(() => navigate("/rating"), 1500);
    }
  }, [status, navigate]);

  // Handle quick chat messages — just shows a toast for now
  const handleQuickMessage = (msg: string) => {
    toast({
      title: "Message sent",
      description: msg,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back and close buttons */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="rounded-full bg-card p-2">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Your Ride</h1>
        <button onClick={() => navigate("/")} className="rounded-full bg-card p-2">
          <X className="h-5 w-5 text-foreground" />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* Live map with route and driver position */}
        <MapPlaceholder showRoute driverLocation={status !== "searching"} />
        
        {/* Progress bar showing current ride stage */}
        <RideStatusBar status={status} />

        {/* Driver details and quick chat — hidden while still searching */}
        {status !== "searching" && (
          <>
            <DriverCard
              name={driver.name}
              rating={driver.rating}
              trips={driver.trips}
              car={driver.car}
              plate={driver.plate}
              safetyScore={driver.safetyScore}
              avatar={driver.avatar}
            />

            <QuickChat onSend={handleQuickMessage} />
          </>
        )}

        {/* Searching animation — pulsing car emoji */}
        {status === "searching" && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="py-8 text-center"
          >
            <div className="text-4xl mb-3">🚗</div>
            <p className="text-sm text-muted-foreground">Finding the best driver for you...</p>
          </motion.div>
        )}

        {/* ETA card — shown during "arriving" and "in_ride" phases */}
        {(status === "arriving" || status === "in_ride") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl bg-card p-4"
          >
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {status === "arriving" ? "Arriving in" : "ETA to destination"}
              </span>
              <span className="font-bold text-foreground">
                {status === "arriving" ? "2 min" : "12 min"}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RideTracking;
