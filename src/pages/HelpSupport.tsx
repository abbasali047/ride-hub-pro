import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Search, MessageCircle, Phone, Mail, ChevronDown, ChevronRight,
  Car, CreditCard, MapPin, Shield, User, Clock, HelpCircle, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// FAQ categories — each has a set of common questions
// These are the top issues reported by Jaipur riders
const faqCategories = [
  {
    icon: Car,
    title: "Rides & Booking",
    color: "bg-primary/15 text-primary",
    questions: [
      {
        q: "How do I book a ride?",
        a: "Tap 'Where to?' on the home screen, enter your destination, choose a vehicle type, and tap 'Book Ride'. A driver will be assigned within minutes.",
      },
      {
        q: "Can I schedule a ride in advance?",
        a: "Yes! Use the 'Reserve' option on the home screen. You can book up to 7 days ahead. Free cancellation up to 1 hour before pickup.",
      },
      {
        q: "How do I cancel a ride?",
        a: "Go to your active ride screen and tap 'Cancel Ride'. If the driver has already been assigned for more than 5 minutes, a ₹50 cancellation fee may apply.",
      },
      {
        q: "Why is surge pricing active?",
        a: "Surge pricing kicks in during high demand (rain, festivals, peak hours). Prices return to normal once demand settles. You'll always see the fare before confirming.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments & Pricing",
    color: "bg-uber-green/15 text-uber-green",
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and cash. You can set your preferred method in Account settings.",
      },
      {
        q: "How do I get a refund?",
        a: "Go to Activity → select the ride → Report an issue → Request refund. Refunds are processed within 5-7 business days to your original payment method.",
      },
      {
        q: "Why was I charged more than the estimate?",
        a: "Fare estimates can change due to route changes, traffic delays, tolls, or waiting time. The final fare is always calculated based on actual distance and time.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Safety & Security",
    color: "bg-uber-surge/15 text-uber-surge",
    questions: [
      {
        q: "What should I do in an emergency?",
        a: "Use the Emergency SOS button in the Safety Center. It alerts local authorities and shares your live location. You can also call 112 directly.",
      },
      {
        q: "How do I report a driver?",
        a: "After your ride, tap the rating screen → Report an issue. You can also go to Activity → select ride → Report. All reports are reviewed within 24 hours.",
      },
      {
        q: "Is my personal information safe?",
        a: "We use end-to-end encryption for all data. Drivers never see your phone number — calls are routed through our privacy system. Your payment details are tokenized.",
      },
    ],
  },
  {
    icon: User,
    title: "Account & Profile",
    color: "bg-uber-yellow/15 text-uber-yellow",
    questions: [
      {
        q: "How do I change my phone number?",
        a: "Go to Account → Edit Profile → Phone Number. You'll receive an OTP on your new number for verification. Old number will be unlinked automatically.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Account → Settings → Delete Account. Your data will be permanently removed within 30 days. Active subscriptions will be cancelled.",
      },
    ],
  },
];

// Quick action cards shown at the top for urgent issues
// These are the most common reasons people visit Help
const quickActions = [
  { icon: Car, label: "Trip issue", desc: "Problem with a recent ride", color: "bg-primary/15 text-primary" },
  { icon: CreditCard, label: "Payment help", desc: "Charges or refund queries", color: "bg-uber-green/15 text-uber-green" },
  { icon: MapPin, label: "Lost item", desc: "Left something in the car", color: "bg-uber-surge/15 text-uber-surge" },
  { icon: User, label: "Account issue", desc: "Login or profile problems", color: "bg-uber-yellow/15 text-uber-yellow" },
];

/**
 * Help & Support page — the main customer support hub.
 * Organized as: quick actions → searchable FAQs → contact options.
 * Designed so most users can self-serve without contacting support.
 */
const HelpSupport = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  // Track which FAQ items are expanded — using index string like "0-1" (category-question)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Toggle FAQ accordion — only one open at a time to keep things clean
  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Filter FAQs based on search — checks both question and answer text
  // Case-insensitive search across all categories
  const filteredCategories = faqCategories.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  // Simulate contacting support — in production this would open a real chat or call
  const handleContact = (method: string) => {
    toast({
      title: `${method} support`,
      description: method === "Call"
        ? "Connecting you to support at 1800-XXX-XXXX..."
        : method === "Chat"
          ? "Starting live chat with a support agent..."
          : "Opening email form for support@ridex.in...",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-card p-2.5 shadow-sm border border-border"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Help & Support</h1>
          <p className="text-xs text-muted-foreground">We're here to help 24/7</p>
        </div>
      </div>

      {/* ==================== Search Bar ==================== */}
      {/* Lets users quickly find answers without scrolling through everything */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-3 rounded-xl bg-card p-3 border border-border">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help (e.g., refund, cancel ride)"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* ==================== Quick Actions ==================== */}
      {/* Most common support reasons — shown as a 2x2 grid at the top */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 mb-6"
        >
          <h2 className="text-sm font-bold text-foreground mb-3">Quick Help</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => toast({ title: action.label, description: "A support agent will assist you shortly." })}
                className="flex flex-col items-start gap-2 rounded-xl bg-card p-4 border border-border hover:bg-secondary transition-colors text-left"
              >
                <div className={`h-9 w-9 rounded-full flex items-center justify-center ${action.color}`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{action.label}</p>
                  <p className="text-[10px] text-muted-foreground">{action.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ==================== FAQ Accordion ==================== */}
      {/* Grouped by category, each question expands to show the answer */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-bold text-foreground mb-3">
          {searchQuery ? `Results for "${searchQuery}"` : "Frequently Asked Questions"}
        </h2>

        {filteredCategories.length === 0 ? (
          // No results state — nudge user to contact support instead
          <div className="rounded-xl bg-card p-6 border border-border text-center">
            <HelpCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">No results found</p>
            <p className="text-xs text-muted-foreground mt-1">Try different keywords or contact our support team directly</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category, catIdx) => (
              <div key={category.title} className="rounded-xl bg-card border border-border overflow-hidden">
                {/* Category header with icon */}
                <div className="flex items-center gap-3 p-4 border-b border-border">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${category.color}`}>
                    <category.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{category.title}</span>
                </div>

                {/* Individual Q&A items */}
                {category.questions.map((faq, qIdx) => {
                  const faqId = `${catIdx}-${qIdx}`;
                  const isOpen = expandedFaq === faqId;

                  return (
                    <div
                      key={faqId}
                      className={qIdx < category.questions.length - 1 ? "border-b border-border" : ""}
                    >
                      {/* Question — tap to expand/collapse */}
                      <button
                        onClick={() => toggleFaq(faqId)}
                        className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                      >
                        <span className="text-sm text-foreground pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Answer — slides in with animation */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================== Contact Support ==================== */}
      {/* Three contact methods — call, chat, and email */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-bold text-foreground mb-3">Contact Us</h2>
        <div className="space-y-2">
          {/* Call support — fastest for urgent issues */}
          <button
            onClick={() => handleContact("Call")}
            className="flex w-full items-center gap-3 rounded-xl bg-card p-4 border border-border hover:bg-secondary transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-uber-green/15 flex items-center justify-center">
              <Phone className="h-5 w-5 text-uber-green" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">Call Support</p>
              <p className="text-[11px] text-muted-foreground">Available 24/7 · Avg wait 2 min</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Live chat — good for non-urgent issues */}
          <button
            onClick={() => handleContact("Chat")}
            className="flex w-full items-center gap-3 rounded-xl bg-card p-4 border border-border hover:bg-secondary transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">Live Chat</p>
              <p className="text-[11px] text-muted-foreground">Chat with a support agent now</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Email — for detailed issues that need documentation */}
          <button
            onClick={() => handleContact("Email")}
            className="flex w-full items-center gap-3 rounded-xl bg-card p-4 border border-border hover:bg-secondary transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-uber-yellow/15 flex items-center justify-center">
              <Mail className="h-5 w-5 text-uber-yellow" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">Email Us</p>
              <p className="text-[11px] text-muted-foreground">support@ridex.in · Reply in 24 hrs</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* App version footer — helpful for bug reports */}
      <div className="px-5 pb-8">
        <p className="text-[10px] text-muted-foreground text-center">
          RideX v1.0 · Need urgent help? Call 1800-XXX-XXXX
        </p>
      </div>
    </div>
  );
};

export default HelpSupport;
