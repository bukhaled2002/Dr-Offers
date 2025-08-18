import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SplashScreen from "./components/SplashScreen.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/useAuth.tsx";
import "./i18n"; // import once

const queryClient = new QueryClient();

function AppWrapper() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
