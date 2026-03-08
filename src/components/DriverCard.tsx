import { motion } from "framer-motion";
import { Phone, MessageSquare, Shield, Star } from "lucide-react";

interface DriverCardProps {
  name: string;
  rating: number;
  trips: number;
  car: string;
  plate: string;
  safetyScore: number;
  avatar: string;
}

/**
 * Displays matched driver info: avatar, name, rating, trip count,
 * safety score badge, vehicle details, and call/message actions.
 */
const DriverCard = ({ name, rating, trips, car, plate, safetyScore, avatar }: DriverCardProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="rounded-2xl bg-card p-5"
    >
      {/* Top row: driver info + safety badge */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center text-2xl">
            {avatar}
          </div>
          <div>
            <h3 className="font-bold text-foreground">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-uber-yellow text-uber-yellow" />
              <span>{rating}</span>
              <span>·</span>
              <span>{trips} trips</span>
            </div>
          </div>
        </div>

        {/* Green safety score badge */}
        <div className="flex items-center gap-1 rounded-full bg-uber-green/15 px-2.5 py-1">
          <Shield className="h-3.5 w-3.5 text-uber-green" />
          <span className="text-xs font-bold text-uber-green">{safetyScore}</span>
        </div>
      </div>

      {/* Bottom row: car details + call/message buttons */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <div>
          <p className="text-sm font-medium text-foreground">{car}</p>
          <p className="text-xs text-muted-foreground">{plate}</p>
        </div>
        <div className="flex gap-2">
          {/* TODO: Hook these up to actual call/message functionality */}
          <button className="rounded-full bg-secondary p-3 transition-colors hover:bg-uber-surface">
            <Phone className="h-4 w-4 text-foreground" />
          </button>
          <button className="rounded-full bg-secondary p-3 transition-colors hover:bg-uber-surface">
            <MessageSquare className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverCard;
