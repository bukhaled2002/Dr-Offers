import OfferForm from "@/components/OfferForm";
import { useAuth } from "@/context/useAuth";
import { useAddOffer } from "@/hooks/useAddOffer";
import { useTranslation } from "react-i18next";

export default function AddOfferPage() {
  const { t } = useTranslation();
  const { brands } = useAuth();
  const addOffer = useAddOffer();

  return (
    <OfferForm
      submitText={t("offerPage.addButton")}
      isSubmitting={addOffer.isPending}
      onSubmit={(data) =>
        addOffer.mutateAsync({ ...data, brand_id: brands[0].id })
      }
    />
  );
}
