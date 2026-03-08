import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Package, Utensils, Bike, Train, ShieldCheck, CalendarClock, Users } from "lucide-react";
import SideMenu from "@/components/SideMenu";

const allServices = [
  { icon: <Car className="h-7 w-7" />, label: "Ride", desc: "Get a ride in minutes", color: "bg-primary/15 text-primary" },
  { icon: <Package className="h-7 w-7" />, label: "Package", desc: "Send packages fast", color: "bg-uber-green/15 text-uber-green" },
  { icon: <Utensils className="h-7 w-7" />, label: "Eats", desc: "Food delivery", color: "bg-uber-yellow/15 text-uber-yellow" },
  { icon: <CalendarClock className="h-7 w-7" />, label: "Reserve", desc: "Schedule ahead", color: "bg-uber-surge/15 text-uber-surge" },
  { icon: <Bike className="h-7 w-7" />, label: "Bikes", desc: "Rent nearby bikes", color: "bg-primary/15 text-primary" },
  { icon: <Train className="h-7 w-7" />, label: "Transit", desc: "Public transport", color: "bg-uber-green/15 text-uber-green" },
  { icon: <ShieldCheck className="h-7 w-7" />, label: "Safety", desc: "Emergency help", color: "bg-uber-surge/15 text-uber-surge" },
  { icon: <Users className="h-7 w-7" />, label: "Group Ride", desc: "Split fares", color: "bg-uber-yellow/15 text-uber-yellow" },
];
// Route map for services that have dedicated pages
const serviceRoutes: Record<string, string> = {
  Ride: "/book",
  Package: "/package",
  Eats: "/eats",
  Reserve: "/reserve",
  Safety: "/safety",
};

const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-20">
      <SideMenu />
      <div className="px-5 pt-12 pb-6 pl-16">
        <h1 className="text-2xl font-bold text-foreground">Services</h1>
        <p className="text-sm text-muted-foreground">Explore what's available</p>
      </div>

      <div className="px-5 grid grid-cols-2 gap-3">
        {allServices.map((s, i) => (
          <motion.button
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => serviceRoutes[s.label] && navigate(serviceRoutes[s.label])}
            className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 transition-all hover:bg-secondary"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.color}`}>
              {s.icon}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">{s.label}</p>
              <p className="text-[11px] text-muted-foreground">{s.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      
    </div>
  );
};

export default Services;
