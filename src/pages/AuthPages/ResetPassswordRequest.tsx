import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { Link } from "react-router";
import z from "zod";

// Define the schema for password reset
const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function ResetPassswordRequest() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            You can reset your password by providing your email address{" "}
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="text-center">
            <h2 className=" text-2xl font-semibold">Reset your password</h2>
            <p className="text-gray-500 mt-1">
              You can reset your password by providing your email address
            </p>
          </div> */}
          <div className="space-y-2 mt-5">
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
              placeholder="test1@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2F1D] focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#8B2F1D] hover:bg-[#7A2818] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md font-medium transition-colors"
          >
            {isSubmitting ? "Sending..." : "RESET PASSWORD"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//   <div className="mb-6">
//     <h2 className="text-2xl font-bold text-gray-900">
//       Verify Your Email OTP
//     </h2>
//     <p className="text-sm text-gray-500 mt-1">
//       Enter the 6-digit code sent to{" "}
//     </p>
//   </div>
//   <div className="space-y-6">
//     <div className="mt-6 text-center text-sm text-gray-600">
//       Remember your password?{" "}
//       <Link
//         to="/auth/login"
//         className="text-[#8B2F1D] hover:underline font-medium"
//       >
//         Sign in
//       </Link>
//     </div>
//   </div>
// </div>
