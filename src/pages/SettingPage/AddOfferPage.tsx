import OfferForm from "@/components/OfferForm";
import { useAuth } from "@/context/useAuth";
import { useAddOffer } from "@/hooks/useAddOffer";

export default function AddOfferPage() {
  const { brands } = useAuth();
  const addOffer = useAddOffer();

  return (
    <OfferForm
      submitText="Add Offer"
      isSubmitting={addOffer.isPending}
      onSubmit={(data) => addOffer.mutate({ ...data, brand_id: brands[0].id })}
    />
  );
}
