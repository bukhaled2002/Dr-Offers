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
import { useTranslation } from "react-i18next";

export function OtpVerify() {
  const { t } = useTranslation();
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
      timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSendOtp = async () => {
    if (!email) return toast.error(t("otp.missingEmail"));
    try {
      setIsLoading(true);
      const res = await instance.get("/auth/email-resend");
      console.log(res);
      toast.success(t("otp.sent"));
      setIsOtpSent(true);
      setResendCooldown(30); // Start 30s cooldown
    } catch (error) {
      console.error(error);
      toast.error(t("otp.failedSend"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!email) return toast.error(t("otp.missingEmail"));

    if (otp.length !== 6) {
      return toast.error(t("otp.invalidOtp"));
    }

    try {
      setIsLoading(true);
      await instance.post("/auth/email-verify", { otp });
      toast.success(t("otp.verified"));
      verifyEmail();
      navigate(user?.role === "owner" ? "/brands/add" : `/`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || t("otp.invalidOtp"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return toast.error(t("otp.missingEmail"));
    try {
      const res = await instance.get("/auth/email-resend");
      console.log(res);

      toast.success(t("otp.resent"));
      setResendCooldown(30); // Reset cooldown
    } catch (error) {
      console.error(error);
      toast.error(t("otp.failedResend"));
    }
  };

  return (
    <AuthCard
      title={
        isOtpSent ? t("otp.verifyTitle") : t("otp.verificationRequiredTitle")
      }
      description={
        isOtpSent
          ? t("otp.verifyDescription")
          : t("otp.verificationRequiredDescription")
      }
    >
      {isOtpSent ? (
        <>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="flex w-full justify-between " dir="ltr">
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
            {isLoading ? t("otp.verifying") : t("otp.verify")}
          </Button>

          {resendCooldown > 0 ? (
            <p className="text-sm text-center text-gray-500 mt-2">
              {t("otp.resendCooldown", { seconds: resendCooldown })}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-[#8B2F1D] hover:underline w-full text-center mt-2"
            >
              {t("otp.resend")}
            </button>
          )}
        </>
      ) : (
        <Button
          onClick={handleSendOtp}
          className="w-full bg-[#8B2F1D] hover:bg-[#7A2818] text-white"
          disabled={isLoading}
        >
          {isLoading ? t("otp.sending") : t("otp.sendToEmail")}
        </Button>
      )}
    </AuthCard>
  );
}
