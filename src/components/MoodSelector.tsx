import { motion } from "framer-motion";

const moods = [
  { emoji: "🤫", label: "Quiet ride", value: "quiet" },
  { emoji: "💬", label: "Chat OK", value: "chat" },
  { emoji: "🎵", label: "Music OK", value: "music" },
  { emoji: "❄️", label: "AC Max", value: "ac" },
];

interface MoodSelectorProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const MoodSelector = ({ selected, onSelect }: MoodSelectorProps) => {
  return (
    <div className="rounded-xl bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Ride Mood</h3>
      <div className="grid grid-cols-4 gap-2">
        {moods.map((mood) => (
          <motion.button
            key={mood.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mood.value)}
            className={`flex flex-col items-center gap-1.5 rounded-xl py-3 transition-all ${
              selected === mood.value
                ? "bg-primary/15 border border-primary/30"
                : "bg-secondary border border-transparent"
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-[10px] font-medium text-muted-foreground">{mood.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
