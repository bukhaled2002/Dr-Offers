import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthCard } from "@/components/AuthCard";
import instance from "@/api/axiosInstance";
import { useAuth } from "@/context/useAuth";
import { toast } from "react-toastify";

export function OtpVerify() {
  const [searchParams] = useSearchParams();
  const { user, verifyEmail } = useAuth();
  const navigate = useNavigate();
  const email = searchParams.get("email") || user?.email;

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0); // Seconds

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSendOtp = async () => {
    if (!email) return toast.error("Missing email address");
    try {
      setIsLoading(true);
      const res = await instance.get("/auth/email-resend");
      console.log(res);
      toast.success("OTP has been sent to your email.");
      setIsOtpSent(true);
      setResendCooldown(30); // Start 30s cooldown
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!email) return toast.error("Missing email address");

    if (otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    try {
      setIsLoading(true);
      const res = await instance.post("/auth/email-verify", { otp });
      console.log(res);
      toast.success("OTP verified successfully");
      verifyEmail();
      navigate(user?.role === "owner" ? "/brands/add" : `/`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
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
      setResendCooldown(30); // Reset cooldown
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <AuthCard
      title={
        isOtpSent ? "Verify Your Email OTP" : "Email Verification Required"
      }
      description={
        isOtpSent
          ? "Enter the 6-digit code sent to your email"
          : "We need to verify your email before continuing"
      }
    >
      {isOtpSent ? (
        <>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="flex w-full justify-between">
              {Array.from({ length: 6 }).map((_, idx) => (
                <InputOTPSlot
                  key={idx}
                  index={idx}
                  className="rounded-md h-14 w-10 font-semibold"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button
            onClick={handleVerify}
            className="w-full bg-primary hover:bg-[#7A2818] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>

          {resendCooldown > 0 ? (
            <p className="text-sm text-center text-gray-500 mt-2">
              You can resend OTP in {resendCooldown}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-[#8B2F1D] hover:underline w-full text-center mt-2"
            >
              Resend OTP
            </button>
          )}
        </>
      ) : (
        <Button
          onClick={handleSendOtp}
          className="w-full bg-[#8B2F1D] hover:bg-[#7A2818] text-white"
          disabled={isLoading}
        >
          {isLoading ? "Sending OTP..." : "Send OTP to Email"}
        </Button>
      )}
    </AuthCard>
  );
}
