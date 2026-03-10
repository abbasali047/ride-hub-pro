import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Phone, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (method === "phone") {
        const fullPhone = `+91${phone.replace(/\D/g, "")}`;
        if (!otpSent) {
          const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone });
          if (error) throw error;
          setOtpSent(true);
          toast({ title: "OTP Sent! 📱", description: "A verification code has been sent to your phone." });
        } else {
          const { error } = await supabase.auth.verifyOtp({ phone: fullPhone, token: otp, type: "sms" });
          if (error) throw error;
          toast({ title: "Welcome! 🎉", description: "Logged in successfully" });
          navigate("/");
        }
      } else {
        if (isLogin) {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          toast({ title: "Welcome back! 🎉", description: "Logged in successfully" });
          navigate("/");
        } else {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          });
          if (error) throw error;
          toast({ title: "Account created! 🎉", description: "Check your email to verify your account." });
        }
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="relative px-6 pt-14 pb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Uber</h1>
          <p className="mt-2 text-base text-muted-foreground">Move freely through Jaipur</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 rounded-t-3xl bg-card px-6 pt-6 pb-8"
      >
        {/* Toggle login/signup */}
        <div className="mb-6 flex rounded-xl bg-secondary p-1">
          <button
            onClick={() => { setIsLogin(true); setOtpSent(false); }}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              isLogin ? "bg-foreground text-background" : "text-muted-foreground"
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => { setIsLogin(false); setOtpSent(false); }}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              !isLogin ? "bg-foreground text-background" : "text-muted-foreground"
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Method toggle */}
        <div className="mb-5 flex gap-2">
          <button
            onClick={() => { setMethod("phone"); setOtpSent(false); }}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
              method === "phone" ? "bg-primary/15 text-primary border border-primary/30" : "bg-secondary text-foreground border border-transparent"
            }`}
          >
            <Phone className="h-3.5 w-3.5" /> Phone
          </button>
          <button
            onClick={() => { setMethod("email"); setOtpSent(false); }}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
              method === "email" ? "bg-primary/15 text-primary border border-primary/30" : "bg-secondary text-foreground border border-transparent"
            }`}
          >
            <Mail className="h-3.5 w-3.5" /> Email
          </button>
        </div>

        <div className="space-y-3">
          {/* Name (signup only, email method) */}
          {!isLogin && method === "email" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl bg-secondary px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              />
            </motion.div>
          )}

          {/* Phone */}
          {method === "phone" && (
            <div className="flex gap-2">
              <div className="flex items-center rounded-xl bg-secondary px-3 text-sm text-foreground">
                🇮🇳 +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="flex-1 rounded-xl bg-secondary px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Email */}
          {method === "email" && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl bg-secondary px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          )}

          {/* OTP (phone) */}
          {method === "phone" && otpSent && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full rounded-xl bg-secondary px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary tracking-[0.5em] text-center"
              />
            </motion.div>
          )}

          {/* Password (email) */}
          {method === "email" && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl bg-secondary px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          )}
        </div>

        {/* Forgot password */}
        {isLogin && method === "email" && (
          <button
            onClick={async () => {
              if (!email) {
                toast({ title: "Enter your email first", variant: "destructive" });
                return;
              }
              const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
              });
              if (error) {
                toast({ title: "Error", description: error.message, variant: "destructive" });
              } else {
                toast({ title: "Check your email 📧", description: "Password reset link sent." });
              }
            }}
            className="mt-2 text-xs font-medium text-primary"
          >
            Forgot password?
          </button>
        )}

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-4 text-base font-bold text-background disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {method === "phone" && !otpSent
                ? "Send OTP"
                : isLogin
                ? "Log in"
                : "Create account"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </motion.button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social login */}
        <div className="flex gap-3">
          <button
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: window.location.origin },
              });
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span className="text-lg">🔵</span> Google
          </button>
          <button
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: "apple",
                options: { redirectTo: window.location.origin },
              });
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span className="text-lg">🍎</span> Apple
          </button>
        </div>

        {/* Terms */}
        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          By continuing, you agree to our{" "}
          <span className="text-foreground underline">Terms of Service</span> and{" "}
          <span className="text-foreground underline">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
