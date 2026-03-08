import { motion } from "framer-motion";
import { Send } from "lucide-react";

// Pre-written messages for quick communication with the driver
// Saves time vs typing, especially on bumpy rides lol
const quickMessages = [
  "I'm on my way!",
  "I'm at the pickup point",
  "Please wait, coming in 2 min",
  "Can you come to the gate?",
];

interface QuickChatProps {
  onSend: (message: string) => void;
}

/**
 * Quick message bubbles for rider-driver communication.
 * Tapping a bubble sends it instantly (no typing needed).
 */
const QuickChat = ({ onSend }: QuickChatProps) => {
  return (
    <div className="rounded-xl bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Quick Message</h3>
      <div className="flex flex-wrap gap-2">
        {quickMessages.map((msg) => (
          <motion.button
            key={msg}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSend(msg)}
            className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-uber-surface"
          >
            <Send className="h-3 w-3 text-muted-foreground" />
            {msg}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickChat;
