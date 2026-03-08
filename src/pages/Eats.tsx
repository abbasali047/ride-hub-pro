import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, Leaf, Drumstick, Search } from "lucide-react";

// Filter type for veg/non-veg toggle
type FilterType = "all" | "veg" | "nonveg";

/**
 * Restaurant data for Jaipur's most popular eateries.
 * Curated list of famous veg and non-veg spots across the city.
 * Prices are approximate for two people.
 */
const restaurants = [
  {
    name: "Laxmi Mishthan Bhandar (LMB)",
    area: "Johari Bazaar",
    rating: 4.5,
    time: "25–35 min",
    price: "₹200 for two",
    type: "veg" as const,
    cuisine: "Rajasthani, Sweets",
    image: "🏪",
    popular: "Ghevar, Raj Kachori, Paneer Tikka",
    featured: true,
  },
  {
    name: "Handi Restaurant",
    area: "MI Road",
    rating: 4.3,
    time: "30–40 min",
    price: "₹500 for two",
    type: "nonveg" as const,
    cuisine: "Mughlai, North Indian",
    image: "🍖",
    popular: "Handi Mutton, Chicken Tikka, Biryani",
    featured: true,
  },
  {
    name: "Rawat Mishthan Bhandar",
    area: "Station Road",
    rating: 4.4,
    time: "20–30 min",
    price: "₹150 for two",
    type: "veg" as const,
    cuisine: "Snacks, Sweets",
    image: "🧁",
    popular: "Pyaaz Kachori, Mawa Kachori, Samosa",
    featured: true,
  },
  {
    name: "Niros Restaurant",
    area: "MI Road",
    rating: 4.2,
    time: "30–40 min",
    price: "₹600 for two",
    type: "nonveg" as const,
    cuisine: "Continental, Chinese, Indian",
    image: "🍽️",
    popular: "Butter Chicken, Paneer Lababdar, Sizzlers",
    featured: false,
  },
  {
    name: "Chokhi Dhani",
    area: "Tonk Road",
    rating: 4.6,
    time: "45–55 min",
    price: "₹800 for two",
    type: "veg" as const,
    cuisine: "Rajasthani Thali",
    image: "🏜️",
    popular: "Dal Baati Churma, Gatte ki Sabzi, Ker Sangri",
    featured: true,
  },
  {
    name: "Suvarna Mahal",
    area: "Rambagh Palace",
    rating: 4.7,
    time: "40–50 min",
    price: "₹2500 for two",
    type: "nonveg" as const,
    cuisine: "Royal Rajasthani, Fine Dining",
    image: "👑",
    popular: "Laal Maas, Safed Maas, Jungli Maas",
    featured: false,
  },
  {
    name: "Santosh Bhojnalaya",
    area: "Bapu Bazaar",
    rating: 4.1,
    time: "15–25 min",
    price: "₹120 for two",
    type: "veg" as const,
    cuisine: "Rajasthani, Thali",
    image: "🍛",
    popular: "Rajasthani Thali, Missi Roti, Kadhi Pakora",
    featured: false,
  },
  {
    name: "Al Bake",
    area: "Tonk Road",
    rating: 4.0,
    time: "20–30 min",
    price: "₹250 for two",
    type: "nonveg" as const,
    cuisine: "Shawarma, Arabian",
    image: "🌯",
    popular: "Chicken Shawarma, Rumali Roll, Falafel",
    featured: false,
  },
  {
    name: "Surya Mahal",
    area: "MI Road",
    rating: 4.3,
    time: "25–35 min",
    price: "₹300 for two",
    type: "veg" as const,
    cuisine: "South Indian, Chinese",
    image: "🥘",
    popular: "Dosa, Chole Bhature, Pav Bhaji",
    featured: false,
  },
  {
    name: "Spice Court",
    area: "Civil Lines",
    rating: 4.4,
    time: "30–40 min",
    price: "₹700 for two",
    type: "nonveg" as const,
    cuisine: "Rajasthani, Mughlai",
    image: "🌶️",
    popular: "Laal Maas, Keema Baati, Mutton Korma",
    featured: true,
  },
  {
    name: "Tapri Central",
    area: "Central Park",
    rating: 4.2,
    time: "15–20 min",
    price: "₹180 for two",
    type: "veg" as const,
    cuisine: "Café, Beverages, Snacks",
    image: "☕",
    popular: "Kulhad Chai, Maggi, Bun Maska",
    featured: false,
  },
  {
    name: "Sethi Bar-Be-Que",
    area: "C-Scheme",
    rating: 4.1,
    time: "30–40 min",
    price: "₹550 for two",
    type: "nonveg" as const,
    cuisine: "BBQ, Tandoor, North Indian",
    image: "🔥",
    popular: "Tandoori Chicken, Seekh Kebab, Fish Tikka",
    featured: false,
  },
];

const Eats = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  // Filter restaurants based on selected category and search text
  // Matches against name, cuisine type, and area
  const filtered = restaurants.filter((r) => {
    const matchesFilter = filter === "all" || r.type === filter;
    const matchesSearch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      r.area.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Split into featured (popular carousel) and regular list
  const featured = filtered.filter((r) => r.featured);
  const others = filtered.filter((r) => !r.featured);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Page header with back button */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="rounded-full bg-card p-2">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Eats in Jaipur</h1>
      </div>

      <div className="px-5 space-y-4">
        {/* Search input — searches across restaurant name, cuisine, and area */}
        <div className="flex items-center gap-3 rounded-xl bg-card px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants, cuisines..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* Veg / Non-Veg filter pills */}
        <div className="flex gap-2">
          {[
            { key: "all" as FilterType, label: "All", icon: null },
            { key: "veg" as FilterType, label: "Veg", icon: <Leaf className="h-3.5 w-3.5" /> },
            { key: "nonveg" as FilterType, label: "Non-Veg", icon: <Drumstick className="h-3.5 w-3.5" /> },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === f.key
                  ? f.key === "veg"
                    ? "bg-green-600 text-white"
                    : f.key === "nonveg"
                    ? "bg-red-600 text-white"
                    : "bg-foreground text-background"
                  : "bg-card text-foreground"
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Horizontally scrollable "Popular in Jaipur" carousel */}
        {featured.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-2">⭐ Popular in Jaipur</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
              {featured.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="min-w-[220px] rounded-2xl bg-card p-4 shrink-0"
                >
                  {/* Restaurant icon + name */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{r.image}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground">{r.area}</p>
                    </div>
                  </div>
                  {/* Rating, delivery time, and veg/non-veg badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5">
                      <Star className="h-3 w-3 text-primary fill-primary" />
                      <span className="text-[10px] font-bold text-primary">{r.rating}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{r.time}</span>
                    <div className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      r.type === "veg" ? "bg-green-600/15 text-green-500" : "bg-red-600/15 text-red-500"
                    }`}>
                      {r.type === "veg" ? "VEG" : "NON-VEG"}
                    </div>
                  </div>
                  {/* Popular dishes for this restaurant */}
                  <p className="text-[10px] text-muted-foreground truncate">🔥 {r.popular}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">{r.price}</span>
                    <button className="rounded-lg bg-primary/15 px-3 py-1.5 text-[10px] font-bold text-primary">
                      Order
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Full restaurant listing below the carousel */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {featured.length > 0 ? "All Restaurants" : "Restaurants"}
          </h2>
          <div className="space-y-2">
            {others.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 rounded-xl bg-card p-4"
              >
                <span className="text-2xl">{r.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">{r.name}</p>
                    {/* Small colored dot to indicate veg (green) or non-veg (red) */}
                    <div className={`shrink-0 h-2.5 w-2.5 rounded-full border ${
                      r.type === "veg" ? "border-green-500 bg-green-500" : "border-red-500 bg-red-500"
                    }`} />
                  </div>
                  <p className="text-[11px] text-muted-foreground">{r.cuisine} · {r.area}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">🔥 {r.popular}</p>
                </div>
                {/* Right side: rating, ETA, and price */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-3 w-3 text-primary fill-primary" />
                    <span className="text-xs font-bold text-foreground">{r.rating}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{r.time}</p>
                  <p className="text-[10px] font-semibold text-foreground">{r.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty state when no restaurants match the search/filter */}
        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground text-sm">No restaurants found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eats;
