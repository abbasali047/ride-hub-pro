import { motion } from "framer-motion";

interface RideStatusBarProps {
  status: "searching" | "matched" | "arriving" | "in_ride" | "completed";
}

const statusConfig = {
  searching: { label: "Finding your driver...", progress: 20, color: "bg-primary" },
  matched: { label: "Driver is on the way", progress: 40, color: "bg-uber-blue" },
  arriving: { label: "Driver is arriving", progress: 60, color: "bg-uber-yellow" },
  in_ride: { label: "On trip", progress: 80, color: "bg-uber-green" },
  completed: { label: "Trip completed!", progress: 100, color: "bg-uber-green" },
};

const RideStatusBar = ({ status }: RideStatusBarProps) => {
  const config = statusConfig[status];

  return (
    <div className="rounded-xl bg-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">{config.label}</span>
        {status === "searching" && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent"
          />
        )}
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${config.progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${config.color}`}
        />
      </div>
    </div>
  );
};

export default RideStatusBar;
