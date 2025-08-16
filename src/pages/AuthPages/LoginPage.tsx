import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AuthPageLayout } from "./AuthPageLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "@/api/axiosInstance"; // assumed API instance
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export function LoginPage() {
  const [authError, setAuthError] = useState<string | null>(null);

  const { login, role } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await instance.post("/auth/login", data);
      const responseData = res.data?.data || res.data;
      const { access_token, refresh_token } = responseData;

      setAuthError(null);
      login(access_token, refresh_token);
      navigate(role === "owner" ? "/setting/dashboard" : "/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setAuthError(err?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <AuthPageLayout title="Sign in" subtitle="Welcome back !!">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="test@gmail.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2F1D] focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-xs text-gray-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="********"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2F1D] focus:border-transparent"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        {authError && (
          <p className="text-red-600 text-sm text-center">{authError}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-[#8B2F1D] hover:bg-[#7A2818] text-white py-2 px-4 rounded-md font-medium transition-colors"
        >
          {isSubmitting ? "Signing in..." : "SIGN IN →"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        I don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-[#8B2F1D] hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
    </AuthPageLayout>
  );
}
