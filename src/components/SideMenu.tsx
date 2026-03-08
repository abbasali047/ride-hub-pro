import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, LogIn, Clock, Activity, User, HelpCircle, Shield, Car } from "lucide-react";

// Navigation items for the side drawer
// Each item maps to a route in our app
const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: LogIn, label: "Login", path: "/login" },
  { icon: Car, label: "Book Ride", path: "/book" },
  { icon: Clock, label: "Activity", path: "/activity" },
  { icon: Activity, label: "Services", path: "/services" },
  { icon: User, label: "Account", path: "/account" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
  { icon: Shield, label: "Safety", path: "/safety" },
];

/**
 * Hamburger side menu with slide-in drawer animation.
 * Shows user profile at the top and nav links below.
 * Active route is highlighted with primary color.
 */
const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* Floating hamburger button — always visible in top-left */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-12 left-5 z-50 rounded-full bg-card p-2.5 shadow-lg border border-border transition-transform active:scale-95"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* Dark backdrop overlay when drawer is open */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Slide-in drawer panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 z-[70] w-72 bg-card border-r border-border flex flex-col"
          >
            {/* User profile section at the top */}
            <div className="flex items-center justify-between px-5 pt-12 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  {/* Hardcoded user for now — will come from auth later */}
                  <p className="text-sm font-bold text-foreground">John Doe</p>
                  <p className="text-[11px] text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full bg-secondary p-2">
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>

            {/* Navigation links with staggered animation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {menuItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavigate(item.path)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>

            {/* App version footer */}
            <div className="px-5 py-4 border-t border-border">
              <p className="text-[10px] text-muted-foreground text-center">RideX v1.0 · Jaipur, India 🇮🇳</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
