import { motion } from "framer-motion";
import { Users, Zap } from "lucide-react";

interface VehicleCardProps {
  name: string;
  description: string;
  price: string;
  eta: string;
  capacity: number;
  icon: string;
  selected: boolean;
  surge?: boolean;
  onSelect: () => void;
}

/**
 * Selectable card for each vehicle type in the booking flow.
 * Shows vehicle icon, name, capacity, ETA, price, and surge indicator.
 */
const VehicleCard = ({ name, description, price, eta, capacity, icon, selected, surge, onSelect }: VehicleCardProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
        selected
          ? "bg-primary/10 border border-primary/30"
          : "bg-card border border-transparent hover:bg-secondary"
      }`}
    >
      {/* Vehicle emoji icon */}
      <div className="text-4xl">{icon}</div>
      
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{name}</span>
          {/* Passenger capacity indicator */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3 w-3" />
            <span className="text-xs">{capacity}</span>
          </div>
          {/* Surge pricing badge — only shown when demand is high */}
          {surge && (
            <div className="flex items-center gap-0.5 rounded-full bg-uber-surge/20 px-1.5 py-0.5">
              <Zap className="h-3 w-3 text-uber-surge" />
              <span className="text-[10px] font-bold text-uber-surge">1.5x</span>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{eta} · {description}</p>
      </div>

      {/* Price on the right */}
      <div className="text-right">
        <span className="font-bold text-foreground">{price}</span>
      </div>
    </motion.button>
  );
};

export default VehicleCard;
