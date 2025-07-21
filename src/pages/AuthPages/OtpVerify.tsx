import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { AuthCard } from "@/components/AuthCard";
import instance from "@/api/axiosInstance";

export function OtpVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    console.log(email);
    if (!email) return toast.error("Missing email address");
    console.log("res");

    if (otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    try {
      setIsLoading(true);
      console.log(otp);
      const res = await instance.post("/auth/email-verify", { otp });
      console.log(res);
      toast.success("OTP verified successfully");
      navigate(`/auth/login?verified=true&email=${email}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return toast.error("Missing email address");
    try {
      const res = await instance.get("/auth/email-resend");
      console.log(res);
      toast.success("OTP resent successfully");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <AuthCard
      title="Verify Your Email OTP"
      description="Enter the 6-digit code sent to your email"
    >
      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
        <InputOTPGroup className="flex w-full justify-between">
          {Array.from({ length: 6 }).map((_, idx) => (
            <InputOTPSlot
              key={idx}
              index={idx}
              className="rounded-md h-14 w-10"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <Button
        onClick={handleVerify}
        className="w-full bg-[#8B2F1D] hover:bg-[#7A2818] text-white"
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify"}
      </Button>

      <button
        type="button"
        onClick={handleResend}
        className="text-sm text-[#8B2F1D] hover:underline w-full text-center"
      >
        Resend OTP
      </button>
    </AuthCard>
  );
}
