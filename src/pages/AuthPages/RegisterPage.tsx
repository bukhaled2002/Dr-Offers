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
import { useTranslation } from "react-i18next";

export function RegisterPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });
  const navigate = useNavigate();
  const role =
    new URLSearchParams(window.location.search).get("role") || "visitor";

  const onSubmit = async ({
    email,
    name,
    password,
    phone_number,
  }: RegisterSchema) => {
    try {
      const res = await instance.post("/auth/signup", {
        email,
        name,
        password,
        role,
        phone_number,
      });
      const responseData = res.data?.data || res.data;
      const { access_token, refresh_token } = responseData;
      login(access_token, refresh_token);
      navigate(role === "owner" ? "/setting/dashboard" : "/");
      // navigate(`/auth/verify-otp?email=${email}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message === "PHONE_NUMBER_EXISTS"
          ? t("register.phoneNumberExists")
          : error?.response?.data?.message === "EMAIL_EXISTS"
            ? t("register.emailExists")
            : t("register.somethingWentWrong"),
      );
    }
  };

  return (
    <AuthPageLayout title={t("register.title")}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t("register.name")}
          </label>
          <Input
            {...register("name")}
            type="text"
            placeholder={t("register.namePlaceholder")}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t("register.email")}
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder={t("register.emailPlaceholder")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t("register.phoneNumber")}
          </label>
          <Input
            {...register("phone_number")}
            type="tel"
            placeholder={t("register.phonePlaceholder")}
          />
          {errors.phone_number && (
            <p className="text-red-600 text-sm">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t("register.password")}
          </label>
          <Input
            {...register("password")}
            type="password"
            placeholder="********"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t("register.confirmPassword")}
          </label>
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="********"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md"
        >
          {isSubmitting ? t("register.submitting") : t("register.signUp")}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {t("register.alreadyHaveAccount")}{" "}
        <Link
          to="/auth/login"
          className="text-[#8B2F1D] hover:underline font-medium"
        >
          {t("register.signIn")}
        </Link>
      </div>
      <div className="mt-3 text-center text-sm text-gray-600">
        {t("register.or")}{" "}
        {role === "owner" ? (
          <Link
            to="/auth/register?role=visitor"
            className="text-[#8B2F1D] hover:underline font-medium"
          >
            {t("register.registerAsVisitor")}
          </Link>
        ) : (
          <Link
            to="/auth/register?role=owner"
            className="text-[#8B2F1D] hover:underline font-medium"
          >
            {t("register.registerAsBrand")}
          </Link>
        )}
      </div>
    </AuthPageLayout>
  );
}
