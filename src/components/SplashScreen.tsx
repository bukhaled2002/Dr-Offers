import { useEffect, useState } from "react";
import logo from "/logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // بدء التأثيرات بعد تحميل المكون
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);

    // إخفاء الشاشة بعد ثانيتين
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // انتظار انتهاء تأثير الإخفاء
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div
        className={`text-center transition-all duration-1000 ease-out ${
          isAnimating ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <div className="mb-6">
          <img
            src={logo}
            alt="Dr. Offer Logo"
            className="w-32 h-32 mx-auto mb-4 animate-pulse"
          />
        </div>
        <h1 className="text-4xl font-bold text-black mb-2 animate-fade-in">
          Dr. Offer
        </h1>
        <p className="text-lg text-gray-600 animate-fade-in-delayed">
          أفضل العروض والتخفيضات
        </p>
        <div className="mt-8">
          <div className="w-16 h-1 bg-primary mx-auto rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
