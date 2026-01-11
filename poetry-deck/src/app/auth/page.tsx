"use client";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const handleBypass = () => {
    // In a real app, you'd handle authentication here.
    // For now, we'll just redirect to the profile page.
    router.push("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f1efea]">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <p className="text-center mb-6">Authentication is currently bypassed for testing.</p>
        <button
          onClick={handleBypass}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Proceed to Profile
        </button>
      </div>
    </div>
  );
}