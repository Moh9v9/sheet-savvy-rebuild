
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmailAndPassword } from "@/services/googleSheets";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, LogIn } from "lucide-react";

// Replace with your logo import if available
const APP_TITLE = "Sheet Savvy";

const Login = () => {
  const navigate = useNavigate();
  const { user, login, initializing } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (!initializing && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, initializing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) return;

    setSubmitting(true);
    // Attempt login with sheets API
    const foundUser = await getUserByEmailAndPassword(email.trim(), password);
    setSubmitting(false);

    if (foundUser) {
      login(foundUser, rememberMe);
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid email or password");
    }
  };

  // Prevent showing page if checking localstorage
  if (initializing) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl glass-morphism p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col items-center mb-2">
          {/* Logo could be added here */}
          <div className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent text-3xl font-extrabold mb-1">{APP_TITLE}</div>
          <div className="text-muted-foreground font-medium text-base">Sign in to your account</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              type="email"
              required
              autoComplete="username"
              placeholder="Email address"
              value={email}
              className="pl-10"
              onChange={e => setEmail(e.target.value)}
              disabled={submitting}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              className="pl-10"
              onChange={e => setPassword(e.target.value)}
              disabled={submitting}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none text-muted-foreground">
            <Checkbox id="remember" checked={rememberMe} onCheckedChange={() => setRememberMe(v => !v)} />
            <span>Remember me</span>
          </label>
          <a className="text-primary hover:underline text-sm" href="#" tabIndex={-1}>Forgot password?</a>
        </div>
        {error && (
          <div className="text-destructive bg-destructive/10 rounded px-3 py-2 text-sm text-center">{error}</div>
        )}
        <Button
          type="submit"
          disabled={submitting || !email.trim() || !password.trim()}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
        >
          <LogIn size={18} />
          {submitting ? "Signing in..." : "Login"}
        </Button>
        <div className="text-center text-sm text-muted-foreground pt-2">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-primary hover:underline">Create an account</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
