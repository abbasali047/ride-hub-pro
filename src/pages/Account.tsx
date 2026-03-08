import { motion } from "framer-motion";
import { User, CreditCard, Shield, Bell, HelpCircle, LogOut, ChevronRight, Star } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import SideMenu from "@/components/SideMenu";

const menuItems = [
  { icon: <User className="h-5 w-5" />, label: "Edit Profile" },
  { icon: <CreditCard className="h-5 w-5" />, label: "Payment Methods" },
  { icon: <Shield className="h-5 w-5" />, label: "Safety Center" },
  { icon: <Star className="h-5 w-5" />, label: "My Rewards" },
  { icon: <Bell className="h-5 w-5" />, label: "Notifications" },
  { icon: <HelpCircle className="h-5 w-5" />, label: "Help & Support" },
];

const Account = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-5 pt-12 pb-6">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-16 w-16 rounded-full bg-card flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">John Doe</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-uber-yellow text-uber-yellow" />
              <span>4.85 · Gold member</span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { value: "247", label: "Trips" },
            { value: "₹18,400", label: "Spent" },
            { value: "12", label: "Rewards" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-card p-4 text-center">
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Menu */}
        <div className="rounded-xl bg-card overflow-hidden">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.03 }}
              className={`flex w-full items-center gap-3 p-4 transition-colors hover:bg-secondary ${
                i < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="flex-1 text-left text-sm font-medium text-foreground">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Account;
