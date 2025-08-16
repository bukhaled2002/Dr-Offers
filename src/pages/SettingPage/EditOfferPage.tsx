import OfferForm from "@/components/OfferForm";
import { useParams } from "react-router-dom";
import { useUpdateOffer } from "@/hooks/useUpdateOffer";
import { useOffer } from "@/hooks/useOffer";

export default function EditOfferPage() {
  const { id } = useParams();
  const offerId = Number(id);
  const { data: offer, isLoading, error } = useOffer(offerId);

  const updateOffer = useUpdateOffer();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load offer.</p>;
  if (!offer) return <p>Offer not found.</p>;

  return (
    <OfferForm
      defaultValues={offer}
      submitText="Update Offer"
      isSubmitting={updateOffer.isPending}
      onSubmit={(data) => updateOffer.mutate({ id: id!, ...data })}
    />
  );
}
