import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Package, Scale, Ruler, Info, Clock, Zap } from "lucide-react";
import LocationInput from "@/components/LocationInput";
import MapPlaceholder from "@/components/MapPlaceholder";

const packageSizes = [
  { label: "Small", desc: "Fits in a bag", icon: "📦", weight: "Up to 5 kg", price: "₹60" },
  { label: "Medium", desc: "Fits on a seat", icon: "📫", weight: "5–15 kg", price: "₹120" },
  { label: "Large", desc: "Fits in a trunk", icon: "🗃️", weight: "15–30 kg", price: "₹200" },
];

const deliveryTypes = [
  { label: "Standard", desc: "45–60 min", icon: <Clock className="h-4 w-4" />, price: "₹0" },
  { label: "Express", desc: "20–30 min", icon: <Zap className="h-4 w-4" />, price: "+₹50" },
];

const PackageDrop = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("Current Location");
  const [dropoff, setDropoff] = useState("");
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [instructions, setInstructions] = useState("");

  const handleDropoffChange = (val: string) => {
    setDropoff(val);
    if (val.length > 2) setShowOptions(true);
  };

  const basePrice = parseInt(packageSizes[selectedSize].price.replace("₹", ""));
  const expressExtra = selectedDelivery === 1 ? 50 : 0;
  const totalPrice = basePrice + expressExtra;

  const handleBook = () => {
    navigate("/ride-tracking");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="rounded-full bg-card p-2">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Send a Package</h1>
        </div>
      </div>

      <div className="px-5 space-y-4">
        <MapPlaceholder showRoute={showOptions} />

        <LocationInput
          pickup={pickup}
          destination={dropoff}
          onPickupChange={setPickup}
          onDestinationChange={handleDropoffChange}
        />

        {/* Package Size */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Package size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {packageSizes.map((size, i) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(i)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all ${
                        selectedSize === i
                          ? "bg-primary/15 ring-2 ring-primary"
                          : "bg-card hover:bg-secondary"
                      }`}
                    >
                      <span className="text-2xl">{size.icon}</span>
                      <span className="text-xs font-semibold text-foreground">{size.label}</span>
                      <span className="text-[10px] text-muted-foreground">{size.weight}</span>
                      <span className="text-xs font-bold text-primary">{size.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Type */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Delivery speed</h3>
                <div className="flex gap-2">
                  {deliveryTypes.map((type, i) => (
                    <button
                      key={type.label}
                      onClick={() => setSelectedDelivery(i)}
                      className={`flex flex-1 items-center gap-3 rounded-xl p-3 transition-all ${
                        selectedDelivery === i
                          ? "bg-primary/15 ring-2 ring-primary"
                          : "bg-card hover:bg-secondary"
                      }`}
                    >
                      <div className={`rounded-lg p-2 ${selectedDelivery === i ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                        {type.icon}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-foreground">{type.label}</p>
                        <p className="text-[10px] text-muted-foreground">{type.desc}</p>
                      </div>
                      <span className="ml-auto text-xs font-bold text-foreground">{type.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Special instructions</h3>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Fragile, handle with care..."
                  rows={2}
                  className="w-full rounded-xl bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              {/* Info banner */}
              <div className="flex items-start gap-3 rounded-xl bg-primary/10 p-3">
                <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground">
                  Your package will be picked up and delivered by a verified driver. 
                  You'll receive real-time tracking updates.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Book button */}
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-8"
          >
            <button
              onClick={handleBook}
              className="w-full rounded-xl bg-foreground py-4 text-base font-bold text-background transition-transform active:scale-[0.98]"
            >
              Send Package · ₹{totalPrice}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PackageDrop;
