import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "react-toastify";
import { useState } from "react";
import instance from "@/api/axiosInstance";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const [isReset, setIsReset] = useState(false);
  const { t } = useTranslation();

  // Create schema inside component to access t function
  const resetPasswordSchema = z
    .object({
      password: z.string().min(6, t("resetPassword.errors.passwordMinLength")),
      confirmPassword: z
        .string()
        .min(1, t("resetPassword.errors.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("resetPassword.errors.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

  type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async ({ password }: ResetPasswordForm) => {
    console.log(token, password);
    if (!token) return toast.error(t("resetPassword.errors.invalidToken"));

    try {
      const response = await instance.post(`/auth/password/reset/${token}`, {
        password,
      });
      console.log(response);
      toast.success(t("resetPassword.success"));
      setIsReset(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || t("resetPassword.errors.resetFailed")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <AuthCard
        title={
          isReset ? t("resetPassword.successTitle") : t("resetPassword.title")
        }
        description={
          isReset
            ? t("resetPassword.successDescription")
            : t("resetPassword.description")
        }
      >
        {!isReset ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-6"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("resetPassword.newPasswordLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("resetPassword.newPasswordPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("resetPassword.confirmPasswordLabel")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t(
                          "resetPassword.confirmPasswordPlaceholder"
                        )}
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
                  ? t("resetPassword.resettingButton")
                  : t("resetPassword.resetButton")}
              </Button>
            </form>
          </Form>
        ) : (
          <>
            <Button>
              <Link to={"/auth/login"}>
                {t("resetPassword.goToLoginButton")}
              </Link>
            </Button>
          </>
        )}
      </AuthCard>
    </div>
  );
}
