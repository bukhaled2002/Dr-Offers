import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BrandOwnerJoinProps {
  targetPage: "brandLanding" | "register"; // decides navigation
}

const BrandOwnerJoin: React.FC<BrandOwnerJoinProps> = ({ targetPage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (targetPage === "brandLanding") {
      navigate("/brand-landing");
    } else if (targetPage === "register") {
      navigate("/auth/register?role=owner");
    }
  };

  return (
    <div className="bg-primary text-white p-10 text-center mt-12 rounded-xl">
      <h2 className="text-3xl font-bold mt-6">
        JOIN AS BRAND OWNER ON <br /> DR OFFERS PLATFORM
      </h2>
      <p className="mt-4">
        Join Us and Explore below and be one of the business owners
      </p>
      <Button
        className="bg-black/40 hover:bg-black/20 text-white mt-4 cursor-pointer"
        onClick={handleClick}
      >
        Explore
      </Button>
    </div>
  );
};

export default BrandOwnerJoin;
