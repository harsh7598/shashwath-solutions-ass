"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Train Booking App</h1>
      <div className="space-x-4">
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
