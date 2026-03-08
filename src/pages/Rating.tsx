import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getRandomDriver } from "@/data/drivers";

const tips = [
  { label: "No tip", value: 0 },
  { label: "₹10", value: 10 },
  { label: "₹20", value: 20 },
  { label: "₹50", value: 50 },
  { label: "₹100", value: 100 },
  { label: "₹200", value: 200 },
];

const compliments = ["Great conversation", "Expert navigation", "Clean car", "Smooth ride", "Above & beyond"];

const Rating = () => {
  const navigate = useNavigate();
  const driver = useMemo(() => getRandomDriver(), []);
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [selectedCompliments, setSelectedCompliments] = useState<string[]>([]);

  const toggleCompliment = (c: string) => {
    setSelectedCompliments((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleSubmit = () => {
    toast({
      title: "Thanks for rating! ⭐",
      description: `You rated ${rating} stars${selectedTip ? ` with a ₹${selectedTip} tip` : ""}`,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-5 pt-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm space-y-6"
      >
        {/* Driver info */}
        <div className="text-center">
          <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-card flex items-center justify-center text-4xl">
            {driver.avatar}
          </div>
          <h2 className="text-xl font-bold text-foreground">How was your trip?</h2>
          <p className="text-sm text-muted-foreground">{driver.name} · {driver.car}</p>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileTap={{ scale: 1.3 }}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
              className="p-1"
            >
              <Star
                className={`h-10 w-10 transition-colors ${
                  star <= (hoveredStar || rating)
                    ? "fill-uber-yellow text-uber-yellow"
                    : "text-uber-border"
                }`}
              />
            </motion.button>
          ))}
        </div>

        {/* Compliments */}
        {rating > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="mb-3 text-sm font-semibold text-foreground text-center">Compliments</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {compliments.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCompliment(c)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    selectedCompliments.includes(c)
                      ? "bg-primary/15 border border-primary/30 text-primary"
                      : "bg-card text-foreground border border-transparent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tip */}
        {rating > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="mb-3 text-sm font-semibold text-foreground text-center">Add a tip</h3>
            <div className="grid grid-cols-4 gap-2">
              {tips.map((tip) => (
                <button
                  key={tip.value}
                  onClick={() => setSelectedTip(tip.value)}
                  className={`flex items-center justify-center gap-1 rounded-xl py-3 text-sm font-medium transition-all ${
                    selectedTip === tip.value
                      ? "bg-uber-green/15 border border-uber-green/30 text-uber-green"
                      : "bg-card text-foreground border border-transparent"
                  }`}
                >
                  {tip.value > 0 && <DollarSign className="h-3 w-3" />}
                  {tip.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submit */}
        {rating > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="w-full rounded-xl bg-foreground py-4 text-base font-bold text-background"
          >
            Done
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Rating;
