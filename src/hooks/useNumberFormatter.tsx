import { useTranslation } from "react-i18next";

export const useNumberFormatter = () => {
  const { i18n } = useTranslation();

  return (value: number, options: Intl.NumberFormatOptions = {}) => {
    const lang = i18n.language.startsWith("ar") ? "ar-SA" : "en-US";
    return new Intl.NumberFormat(lang, options).format(value);
  };
};
