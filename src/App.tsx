// Main app entry point — sets up routing, providers, and global UI (toasts)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page imports
import Index from "./pages/Index";
import BookRide from "./pages/BookRide";
import RideTracking from "./pages/RideTracking";
import Rating from "./pages/Rating";
import Activity from "./pages/Activity";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Account from "./pages/Account";
import PackageDrop from "./pages/PackageDrop";
import Eats from "./pages/Eats";
import Reserve from "./pages/Reserve";
import Safety from "./pages/Safety";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";

// Single query client instance for react-query caching
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Two toast systems: shadcn toaster + sonner for different use cases */}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<BookRide />} />
          <Route path="/ride-tracking" element={<RideTracking />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/services" element={<Services />} />
          <Route path="/package" element={<PackageDrop />} />
          <Route path="/eats" element={<Eats />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/account" element={<Account />} />
          {/* Catch-all for undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
