import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import LandingPage from "./pages/landing_page/LandingPage";
import SignIn from "./pages/auth_page/SignIn";
import HomePage from "./pages/home/HomePage";
import ErrorPage from "./pages/error_page/ErrorPage";

// Wrapper component to prevent navigation when signed in
const ProtectedHome = () => {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      // Prevent going back when signed in
      window.history.pushState(null, "", "/home");
      const handlePopState = () => {
        window.history.pushState(null, "", "/home");
      };
      window.addEventListener("popstate", handlePopState);
      
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isSignedIn]);

  return (
    <SignedIn>
      <HomePage />
    </SignedIn>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SignedOut>
              <LandingPage />
            </SignedOut>
          }
        />
        <Route path="/signin/*" element={<SignIn />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/home"
          element={
            <>
              <ProtectedHome />
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="*"
          element={
            <SignedIn>
              <Navigate to="/home" replace />
            </SignedIn>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
