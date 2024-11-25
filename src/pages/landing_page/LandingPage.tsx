import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import ResourceCard from "../../components/ResourceCard";
import { features, resources } from "../../config/config";


const LandingPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-40 pb-32 flex content-center items-center justify-center min-h-screen bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <h1 className="text-6xl font-bold text-black mb-8">
                Share the <span className="text-gray-600">Good News</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Join our community in spreading the message of hope, love, and salvation through Jesus Christ.
              </p>
              {!isSignedIn && (
                <Link to="/signin">
                  <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors">
                    Start Your Journey
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="mission" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-black mb-16">Our Mission</h2>
          <div className="flex flex-wrap">
            {features.map((feature, index) => (
              <div key={index} className="w-full md:w-4/12 px-4 mb-8">
                <Card {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-black mb-6">Resources</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Discover tools and materials to help you grow in your faith and share the Gospel effectively.
          </p>
          <div className="flex flex-wrap">
            {resources.map((resource, index) => (
              <div key={index} className="w-full md:w-4/12 px-4 mb-8">
                <ResourceCard {...resource} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-8">
                Start Sharing Today
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Be part of a community dedicated to spreading God's love and message to the world.
              </p>
              {!isSignedIn && (
                <Link to="/signin">
                  <button className="bg-white text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
                    Join Now
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
