import { Link, useLocation } from "react-router-dom";

interface ErrorPageProps {
  title?: string;
  message?: string;
  showSignUp?: boolean;
}

const ErrorPage = ({ 
  title: propTitle,
  message: propMessage,
  showSignUp = true 
}: ErrorPageProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const error = searchParams.get('error');
  
  let title = propTitle;
  let message = propMessage;

  // Handle specific OAuth errors
  if (error?.includes('oauth')) {
    title = "Account Not Found";
    message = "It seems you don't have an account with this social provider. Please sign up first to continue.";
  } else if (!title) {
    title = "Account Not Found";
    message = message || "It seems you don't have an account yet. Please sign up to access the app.";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <i className="fas fa-exclamation-circle text-5xl text-red-500"></i>
        </div>
        <h1 className="text-2xl font-bold text-black mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <div className="space-y-4">
          {showSignUp && (
            <Link to="/home">
              <button className="w-full bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Sign Up Now
              </button>
            </Link>
          )}
          <Link to="/">
            <button className="w-full bg-gray-100 text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
