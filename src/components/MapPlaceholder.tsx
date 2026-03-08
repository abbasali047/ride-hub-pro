import { motion } from "framer-motion";
import { MapPin, Navigation2 } from "lucide-react";

interface MapPlaceholderProps {
  showRoute?: boolean;
  driverLocation?: boolean;
}

/**
 * Map component that embeds a dark-themed Google Maps iframe of Jaipur.
 * We use CSS filters to invert the default light map into a dark style
 * since the Google Maps embed API doesn't support custom styling.
 */
const MapPlaceholder = ({ showRoute, driverLocation }: MapPlaceholderProps) => {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom: "28%" }}>
      {/* Google Maps iframe — centered on Jaipur city */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113580.67323498857!2d75.71607645!3d26.885416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        className="absolute inset-0 h-full w-full border-0"
        // CSS trick to make the map look dark — invert + hue rotate + desaturate
        style={{ filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.7) contrast(1.2)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Jaipur Google Map"
      />

      {/* Semi-transparent overlay so the map blends with our dark theme */}
      <div className="pointer-events-none absolute inset-0 bg-background/30" />

      {/* Animated dashed route line between pickup and destination */}
      {showRoute && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <motion.path
            d="M 25% 35% Q 35% 25%, 50% 40% T 75% 55%"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </svg>
      )}

      {/* More precise route using viewBox for percentage-based coordinates */}
      {showRoute && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M 25 35 C 32 28, 42 30, 50 38 S 65 52, 72 53"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="2 1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Glow effect behind the route for depth */}
          <motion.path
            d="M 25 35 C 32 28, 42 30, 50 38 S 65 52, 72 53"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      )}

      {/* Pickup marker with a pulsing dot animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        className="pointer-events-none absolute top-[35%] left-[25%] flex flex-col items-center"
      >
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-foreground shadow-[0_0_10px_hsl(var(--foreground)/0.5)]" />
          <div className="absolute inset-0 h-3 w-3 rounded-full bg-foreground/40 pulse-dot" />
        </div>
        <div className="mt-1 rounded-full bg-card/80 px-2 py-0.5 text-[8px] font-semibold text-foreground backdrop-blur-sm">
          Pickup
        </div>
      </motion.div>

      {/* Destination pin — drops in with a spring animation */}
      {showRoute && (
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.8 }}
          className="pointer-events-none absolute top-[50%] right-[25%] flex flex-col items-center"
        >
          <MapPin className="h-7 w-7 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
          <div className="mt-0.5 rounded-full bg-card/80 px-2 py-0.5 text-[8px] font-semibold text-foreground backdrop-blur-sm">
            Drop-off
          </div>
        </motion.div>
      )}

      {/* Animated driver car icon — moves around slightly to simulate driving */}
      {driverLocation && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [0, 8, 16, 12, 6, 0],
            y: [0, -4, -2, 3, 1, 0],
          }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            x: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute top-[40%] left-[35%]"
        >
          <div className="relative">
            <Navigation2 className="h-6 w-6 rotate-45 text-accent drop-shadow-[0_0_10px_hsl(var(--accent)/0.7)]" />
            <div className="absolute -inset-1 rounded-full bg-accent/20 blur-sm" />
          </div>
        </motion.div>
      )}

      {/* Re-center map button in bottom-right corner */}
      <button className="absolute bottom-3 right-3 z-10 rounded-full bg-card/90 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-secondary">
        <Navigation2 className="h-4 w-4 text-foreground" />
      </button>
    </div>
  );
};

export default MapPlaceholder;
