import { motion } from "framer-motion";
import { MapPin, Navigation2 } from "lucide-react";

interface MapPlaceholderProps {
  showRoute?: boolean;
  driverLocation?: boolean;
}

const MapPlaceholder = ({ showRoute, driverLocation }: MapPlaceholderProps) => {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom: "56.25%" }}>
      {/* Google Maps iframe embed of Jaipur */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113580.67323498857!2d75.71607645!3d26.885416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Jaipur Google Map"
      />

      {/* Overlay elements for ride UI */}
      {showRoute && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute top-1/3 left-1/4 h-0.5 w-[45%] bg-primary"
          style={{ transform: "rotate(-30deg)", transformOrigin: "left" }}
        />
      )}

      {/* Pickup pin */}
      {showRoute && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-none absolute top-[35%] left-[25%] flex flex-col items-center"
        >
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-foreground" />
            <div className="absolute inset-0 h-3 w-3 rounded-full bg-foreground/50 pulse-dot" />
          </div>
        </motion.div>
      )}

      {/* Destination pin */}
      {showRoute && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pointer-events-none absolute top-[55%] right-[25%] flex flex-col items-center"
        >
          <MapPin className="h-6 w-6 text-primary" />
        </motion.div>
      )}

      {/* Driver car */}
      {driverLocation && (
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="pointer-events-none absolute top-[40%] left-[35%]"
        >
          <Navigation2 className="h-6 w-6 text-accent rotate-45" />
        </motion.div>
      )}

      {/* Center button */}
      <button className="absolute bottom-3 right-3 z-10 rounded-full bg-card p-2 shadow-lg">
        <Navigation2 className="h-4 w-4 text-foreground" />
      </button>
    </div>
  );
};

export default MapPlaceholder;
