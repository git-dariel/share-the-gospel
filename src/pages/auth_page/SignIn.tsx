import { SignIn as ClerkSignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const SignIn = () => {
  const location = useLocation();
  const isSignUp = location.search.includes('sign-up=true');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <SignedOut>
        {isSignUp ? (
          <SignUp
            routing="path"
            path="/home"
            afterSignUpUrl="/home"
            redirectUrl="/signin?sign-up=true"
          />
        ) : (
          <ClerkSignIn 
            routing="path"
            path="/signin"
            afterSignInUrl="/home"
            afterSignUpUrl="/signin?sign-up=true"
            redirectUrl="/home"
            appearance={
              {
                elements: {
                  footerAction: {
                    display: "none"
                  }
                }
              }
            }
          />
        )}
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};

export default SignIn;
