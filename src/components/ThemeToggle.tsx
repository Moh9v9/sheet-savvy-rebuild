
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Force theme type to either 'dark' or 'light' to ensure proper toggling
  const currentTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-primary/10"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {currentTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
}
