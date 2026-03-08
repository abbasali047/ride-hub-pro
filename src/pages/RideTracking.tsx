import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import MapPlaceholder from "@/components/MapPlaceholder";
import RideStatusBar from "@/components/RideStatusBar";
import DriverCard from "@/components/DriverCard";
import QuickChat from "@/components/QuickChat";
import { useToast } from "@/hooks/use-toast";

type RideStatus = "searching" | "matched" | "arriving" | "in_ride" | "completed";

const RideTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<RideStatus>("searching");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStatus("matched"), 3000),
      setTimeout(() => setStatus("arriving"), 7000),
      setTimeout(() => setStatus("in_ride"), 11000),
      setTimeout(() => setStatus("completed"), 18000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (status === "completed") {
      setTimeout(() => navigate("/rating"), 1500);
    }
  }, [status, navigate]);

  const handleQuickMessage = (msg: string) => {
    toast({
      title: "Message sent",
      description: msg,
    });
  };

  return (
    <div className="min-h-screen bg-background">
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
        <MapPlaceholder showRoute driverLocation={status !== "searching"} />
        
        <RideStatusBar status={status} />

        {status !== "searching" && (
          <>
            <DriverCard
              name="Michael Chen"
              rating={4.92}
              trips={3847}
              car="Toyota Camry 2023"
              plate="ABC 1234"
              safetyScore={98}
              avatar="👨‍✈️"
            />

            <QuickChat onSend={handleQuickMessage} />
          </>
        )}

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
