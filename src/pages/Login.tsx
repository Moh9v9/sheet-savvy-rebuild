
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // For now, just log values, will use getUserByEmailAndPassword in next step
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6 min-w-[320px] max-w-[90vw]"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        <input
          className="border rounded px-4 py-2"
          type="email"
          required
          autoComplete="username"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border rounded px-4 py-2"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" className="mt-2 w-full">Sign In</Button>
      </form>
    </div>
  );
};

export default Login;
