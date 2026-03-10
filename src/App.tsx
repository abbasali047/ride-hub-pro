// Main app entry point — sets up routing, providers, and global UI (toasts)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/book" element={<ProtectedRoute><BookRide /></ProtectedRoute>} />
            <Route path="/ride-tracking" element={<ProtectedRoute><RideTracking /></ProtectedRoute>} />
            <Route path="/rating" element={<ProtectedRoute><Rating /></ProtectedRoute>} />
            <Route path="/activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/package" element={<ProtectedRoute><PackageDrop /></ProtectedRoute>} />
            <Route path="/eats" element={<ProtectedRoute><Eats /></ProtectedRoute>} />
            <Route path="/reserve" element={<ProtectedRoute><Reserve /></ProtectedRoute>} />
            <Route path="/safety" element={<ProtectedRoute><Safety /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
