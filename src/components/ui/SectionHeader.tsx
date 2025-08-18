import { useTranslation } from "react-i18next";

function SectionHeader({
  text,
  primaryText,
}: {
  text?: string;
  primaryText?: string;
}) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="relative my-5">
      <h2
        className={`text-xl font-semibold py-2 ${isArabic ? "text-right" : ""}`}
      >
        {text}
        <span className="text-[#6d2c13]">{primaryText}</span>
        <span
          className={`bg-primary h-[3px] w-60 absolute bottom-0 rounded-4xl ${
            isArabic ? "right-0" : "left-0"
          }`}
        />
      </h2>
    </div>
  );
}

export default SectionHeader;
