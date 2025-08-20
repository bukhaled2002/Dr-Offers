import { Link } from "react-router-dom";

export default function LoginRequiredPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-4">You're not logged in</h1>
      <p className="text-gray-600 mb-6">
        Please log in to access this page or feature.
      </p>
      <Link
        to="/auth/login"
        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
