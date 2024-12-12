import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import ResourceCard from "../../components/ResourceCard";
import AnimatedText from "../../components/AnimatedText";
import ScrollAnimation from "../../components/ScrollAnimation";
import CrossModel from "../../components/CrossModel";
import { features, resources } from "../../config/config";

const LandingPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-5 flex content-center items-center justify-center min-h-screen">
        <div className="absolute inset-0 z-0 flex items-start justify-center md:mt-0 mt-32">
          <div className="h-[250px] md:h-[400px] w-[250px] md:w-[400px]">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <CrossModel position={[0, 0, 0]} scale={0.5} rotation={[0, 0, 0]} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
        </div>
        
        <div className="container mx-auto px-4 z-10 md:mt-0">
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full lg:w-8/12 px-2 md:px-4 text-center">
              <AnimatedText
                text="Share the Good News"
                className="text-3xl md:text-6xl font-bold text-center text-black mb-4 md:mb-8"
                delay={0.2}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 text-center px-2 md:px-4"
              >
                Join our community in spreading the message of hope, love, and salvation through Jesus Christ.
              </motion.p>
              {!isSignedIn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-center"
                >
                  <Link to="/signin">
                    <button className="bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-medium hover:bg-gray-800 transition-all hover:scale-105 transform">
                      Start Your Journey
                    </button>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="mission" className="py-12 md:py-20 bg-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-8 md:mb-16">Our Mission</h2>
          </ScrollAnimation>
          <div className="flex flex-wrap -mx-2 md:-mx-4">
            {features.map((feature, index) => (
              <ScrollAnimation key={index} className="w-full md:w-4/12 px-2 md:px-4 mb-6 md:mb-8" delay={index * 0.2}>
                <Card {...feature} />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-12 md:py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-4 md:mb-6">Resources</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 text-center mb-8 md:mb-16 max-w-3xl mx-auto px-2 md:px-4">
              Discover tools and materials to help you grow in your faith and share the Gospel effectively.
            </p>
          </ScrollAnimation>
          <div className="flex flex-wrap -mx-2 md:-mx-4">
            {resources.map((resource, index) => (
              <ScrollAnimation key={index} className="w-full md:w-4/12 px-2 md:px-4 mb-6 md:mb-8" delay={index * 0.2}>
                <ResourceCard {...resource} />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-12 md:py-20 bg-black relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full lg:w-6/12 px-2 md:px-4 text-center">
              <ScrollAnimation>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-8">
                  Start Sharing Today
                </h2>
              </ScrollAnimation>
              <ScrollAnimation delay={0.2}>
                <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 px-2 md:px-4">
                  Be part of a community dedicated to spreading God's love and message to the world.
                </p>
              </ScrollAnimation>
              {!isSignedIn && (
                <ScrollAnimation delay={0.4}>
                  <Link to="/signin">
                    <button className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-medium hover:bg-gray-100 transition-all hover:scale-105 transform">
                      Join Now
                    </button>
                  </Link>
                </ScrollAnimation>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
