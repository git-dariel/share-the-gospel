import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ children, onClick }: NavLinkProps) => (
  <button
    onClick={onClick}
    className="text-black hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </button>
);

const NavBar = () => {
  const { isSignedIn} = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed w-full flex justify-center z-50 px-4 py-4">
      <nav className={`${
        isScrolled ? "bg-black/30 backdrop-blur-lg" : "bg-white"
      } rounded-full shadow-lg transition-all duration-300 max-w-3xl w-full px-4 py-2`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to={isSignedIn ? "/home" : "/"} className="flex items-center">
              <span className={`text-xl font-bold ${isScrolled ? "text-white" : "text-black"} transition-colors`}>
                GospelShare
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <NavLink to="/" onClick={() => scrollToSection("home")}>Home</NavLink>
                <NavLink to="/" onClick={() => scrollToSection("mission")}>Our Mission</NavLink>
                <NavLink to="/" onClick={() => scrollToSection("resources")}>Resources</NavLink>
                <div className="ml-4">
                  <Link to="/signin">
                    <button className={`${
                      isScrolled ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                    } px-4 py-2 rounded-full text-sm font-medium transition-colors`}>
                      Sign In
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/home">
                  <button className={`${
                    isScrolled ? "text-white" : "text-black"
                  } px-4 py-2 rounded-full text-sm font-medium transition-colors`}>
                    Feed
                  </button>
                </Link>
                <div className="ml-4">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10"
                      }
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            ) : (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-full ${
                  isScrolled ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-black"
                } focus:outline-none transition-colors`}
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && !isSignedIn && (
          <div className="md:hidden mt-4">
            <div className={`${
              isScrolled ? "bg-black/80" : "bg-white"
            } rounded-2xl p-4 shadow-lg backdrop-blur-lg transition-all duration-300`}>
              <div className="space-y-3">
                <button 
                  onClick={() => scrollToSection("home")}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium ${
                    isScrolled 
                      ? "text-white hover:bg-white/10" 
                      : "text-black hover:bg-black/5"
                  } transition-colors`}
                >
                  <i className="fas fa-home mr-3"></i>
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection("mission")}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium ${
                    isScrolled 
                      ? "text-white hover:bg-white/10" 
                      : "text-black hover:bg-black/5"
                  } transition-colors`}
                >
                  <i className="fas fa-bullseye mr-3"></i>
                  Our Mission
                </button>
                <button 
                  onClick={() => scrollToSection("resources")}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium ${
                    isScrolled 
                      ? "text-white hover:bg-white/10" 
                      : "text-black hover:bg-black/5"
                  } transition-colors`}
                >
                  <i className="fas fa-book-open mr-3"></i>
                  Resources
                </button>
                <div className="pt-3 border-t border-gray-200">
                  <Link to="/signin" className="block w-full">
                    <button className={`flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-medium ${
                      isScrolled
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-black text-white hover:bg-gray-800"
                    } transition-colors`}>
                      <i className="fas fa-sign-in-alt mr-3"></i>
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;