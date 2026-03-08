import { motion } from "framer-motion";
import { MapPin, ChevronRight } from "lucide-react";
import SideMenu from "@/components/SideMenu";
import SideMenu from "@/components/SideMenu";

const trips = [
  { id: 1, from: "Mansarovar", to: "Jaipur International Airport", date: "Mar 7, 2026", price: "₹450", status: "Completed" },
  { id: 2, from: "Hawa Mahal", to: "Vaishali Nagar", date: "Mar 5, 2026", price: "₹180", status: "Completed" },
  { id: 3, from: "Amer Fort", to: "C-Scheme", date: "Mar 3, 2026", price: "₹280", status: "Completed" },
  { id: 4, from: "Vaishali Nagar", to: "Nahargarh Fort", date: "Mar 1, 2026", price: "₹150", status: "Cancelled" },
  { id: 5, from: "World Trade Park", to: "Mansarovar", date: "Feb 28, 2026", price: "₹95", status: "Completed" },
];

const Activity = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <SideMenu />
      <div className="px-5 pt-12 pb-6 pl-16">
        <h1 className="text-2xl font-bold text-foreground">Activity</h1>
        <p className="text-sm text-muted-foreground">Your ride history</p>
      </div>

      <div className="px-5 space-y-2">
        {trips.map((trip, i) => (
          <motion.button
            key={trip.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex w-full items-center gap-3 rounded-xl bg-card p-4 transition-colors hover:bg-secondary"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">{trip.from} → {trip.to}</p>
              <p className="text-xs text-muted-foreground">{trip.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{trip.price}</p>
              <p className={`text-[10px] font-medium ${trip.status === "Cancelled" ? "text-uber-surge" : "text-uber-green"}`}>
                {trip.status}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      
    </div>
  );
};

export default Activity;
