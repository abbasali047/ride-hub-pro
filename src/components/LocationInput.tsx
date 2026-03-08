import { MapPin, Navigation } from "lucide-react";

interface LocationInputProps {
  pickup: string;
  destination: string;
  onPickupChange: (val: string) => void;
  onDestinationChange: (val: string) => void;
  onSwap?: () => void;
}

const LocationInput = ({ pickup, destination, onPickupChange, onDestinationChange }: LocationInputProps) => {
  return (
    <div className="relative rounded-xl bg-card p-4">
      {/* Timeline dots */}
      <div className="absolute left-8 top-[2.2rem] h-[calc(100%-3.5rem)] w-0.5 bg-border" />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="relative z-10 flex h-6 w-6 items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
        </div>
        <input
          type="text"
          value={pickup}
          onChange={(e) => onPickupChange(e.target.value)}
          placeholder="Pickup location"
          className="flex-1 bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative z-10 flex h-6 w-6 items-center justify-center">
          <MapPin className="h-4 w-4 text-primary" />
        </div>
        <input
          type="text"
          value={destination}
          onChange={(e) => onDestinationChange(e.target.value)}
          placeholder="Where to?"
          className="flex-1 bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-2 transition-colors hover:bg-uber-surface">
        <Navigation className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
};

export default LocationInput;
