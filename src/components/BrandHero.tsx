import { useTranslation, Trans } from "react-i18next";

export default function BrandHero() {
  const { t } = useTranslation();

  return (
    <section className="section-container min-h-[70vh] flex items-center justify-center">
      <div className="text-4xl md:text-5xl leading-14 lg:leading-18 font-bold text-center space-y-4">
        <h1>{t("brand_hero_heading_1")}</h1>
        <h1>
          <Trans
            i18nKey="brand_hero_heading_2"
            components={{ highlight: <span className="bg-[#F9ED32]" /> }}
          />
        </h1>
      </div>
    </section>
  );
}
