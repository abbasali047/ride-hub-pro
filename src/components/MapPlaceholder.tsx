import { motion } from "framer-motion";
import { MapPin, Navigation2 } from "lucide-react";

interface MapPlaceholderProps {
  showRoute?: boolean;
  driverLocation?: boolean;
}

const MapPlaceholder = ({ showRoute, driverLocation }: MapPlaceholderProps) => {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-uber-surface">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px w-full bg-foreground"
            style={{ top: `${(i + 1) * 5}%` }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px h-full bg-foreground"
            style={{ left: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>

      {/* Streets */}
      <div className="absolute top-1/3 left-0 right-0 h-3 bg-uber-border/30" />
      <div className="absolute top-0 bottom-0 left-1/4 w-3 bg-uber-border/30" />
      <div className="absolute top-0 bottom-0 right-1/3 w-3 bg-uber-border/30" />
      <div className="absolute bottom-1/4 left-0 right-0 h-2 bg-uber-border/20" />

      {showRoute && (
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          className="absolute top-1/3 left-1/4 h-0.5 w-[45%] bg-primary"
          style={{ transform: "rotate(-30deg)", transformOrigin: "left" }}
        />
      )}

      {/* Pickup pin */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-[35%] left-[25%] flex flex-col items-center"
      >
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-foreground" />
          <div className="absolute inset-0 h-3 w-3 rounded-full bg-foreground/50 pulse-dot" />
        </div>
      </motion.div>

      {/* Destination pin */}
      {showRoute && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-[55%] right-[25%] flex flex-col items-center"
        >
          <MapPin className="h-6 w-6 text-primary" />
        </motion.div>
      )}

      {/* Driver car */}
      {driverLocation && (
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-[40%] left-[35%]"
        >
          <Navigation2 className="h-6 w-6 text-uber-green rotate-45" />
        </motion.div>
      )}

      {/* Center button */}
      <button className="absolute bottom-3 right-3 rounded-full bg-card p-2 shadow-lg">
        <Navigation2 className="h-4 w-4 text-foreground" />
      </button>
    </div>
  );
};

export default MapPlaceholder;
