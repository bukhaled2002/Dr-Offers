import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { AuthPageLayout } from "./AuthPageLayout";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "@/schemas/register.schema";
import { toast } from "react-toastify";
import instance from "@/api/axiosInstance";
import { useAuth } from "@/context/useAuth";

export function RegisterPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });
  const navigate = useNavigate();

  const onSubmit = async ({ email, name, password }: RegisterSchema) => {
    try {
      const res = await instance.post("/auth/signup", {
        email,
        name,
        password,
        role: "visitor",
        phone_number: "+201210102429",
      });
      const responseData = res.data?.data || res.data;
      const { access_token, refresh_token } = responseData;
      login(access_token, refresh_token);
      navigate(`/auth/verify-otp?email=${email}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <AuthPageLayout title="Sign up">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            {...register("name")}
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2F1D] focus:border-transparent"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
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
            placeholder="examle@gmail.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2F1D] focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="********"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2F1D] focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Re-Type Password
          </label>
          <Input
            {...register("confirmPassword")}
            id="confirm-password"
            type="password"
            placeholder="********"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2F1D] focus:border-transparent"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-primary hover:bg-[#7A2818] text-white py-2 px-4 rounded-md font-medium transition-colors"
        >
          {isSubmitting ? "Submitting..." : "SIGN UP"}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-[#8B2F1D] hover:underline font-medium"
        >
          Sign in
        </Link>
      </div>
    </AuthPageLayout>
  );
}
