import OfferForm from "@/components/OfferForm";
import { useParams } from "react-router-dom";
import { useUpdateOffer } from "@/hooks/useUpdateOffer";
import { useOffer } from "@/hooks/useOffer";
import { useTranslation } from "react-i18next";

export default function EditOfferPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const offerId = Number(id);
  const { data: offer, isLoading, error } = useOffer(offerId);

  const updateOffer = useUpdateOffer();

  if (isLoading) return <p>{t("offerPage.loading")}</p>;
  if (error) return <p>{t("offerPage.loadError")}</p>;
  if (!offer) return <p>{t("offerPage.notFound")}</p>;

  return (
    <OfferForm
      defaultValues={offer}
      submitText={t("offerPage.updateButton")}
      isSubmitting={updateOffer.isPending}
      onSubmit={(data) => updateOffer.mutateAsync({ id: id!, ...data })}
    />
  );
}
