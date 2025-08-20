import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import instance from "@/api/axiosInstance";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const [isSent, setIsSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const { t } = useTranslation();

  // Create schema inside component to access t function
  const forgotPasswordSchema = z.object({
    email: z.string().email(t("forgotPassword.errors.invalidEmail")),
  });

  type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit = async ({ email }: ForgotPasswordForm) => {
    try {
      await instance.get("/auth/password/reset", {
        params: { email, reset_password_page_pathname: "/auth/reset-password" },
      });
      toast.success(t("forgotPassword.success"));
      setSentEmail(email);
      setIsSent(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorKey = err?.response?.data?.message;
      toast.error(
        t(`forgotPassword.errors.${errorKey}`) ||
          t("forgotPassword.errors.default")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <AuthCard
        title={
          isSent ? t("forgotPassword.checkEmail") : t("forgotPassword.title")
        }
        description={
          isSent
            ? t("forgotPassword.checkInbox", { email: sentEmail })
            : t("forgotPassword.description")
        }
      >
        {!isSent && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("forgotPassword.emailLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("forgotPassword.emailPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#8B2F1D] hover:bg-[#7A2818] text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? t("forgotPassword.sending")
                  : t("forgotPassword.sendLink")}
              </Button>
            </form>
          </Form>
        )}
      </AuthCard>
    </div>
  );
}
