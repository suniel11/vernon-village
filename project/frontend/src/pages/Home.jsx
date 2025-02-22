import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div 
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            Welcome to Vernon Village
          </motion.h1>
          
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md"
          >
            Your hub for community connection, collaboration, and growth
          </motion.p>

          <motion.div variants={fadeIn}>
            <Link 
              to="/announcements"
              className="inline-block bg-white/90 text-purple-600 px-8 py-3 rounded-full 
              text-lg font-semibold hover:bg-white hover:scale-105 transition-all
              shadow-lg hover:shadow-xl"
            >
              View Announcements
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Vernon Village?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: '🏘️', 
                title: "Community Focused",
                text: "Connect with neighbors and local organizations"
              },
              { 
                icon: '📢', 
                title: "Transparent Communication",
                text: "Stay updated with real-time announcements"
              },
              { 
                icon: '🤝', 
                title: "Collaborative Spirit",
                text: "Participate in local initiatives and events"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">1k+</div>
              <div className="text-sm">Active Members</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm">Monthly Events</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm">Community Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Become part of Vernon Village today and start connecting with your neighbors
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-purple-600 text-white px-8 py-3 rounded-full
              hover:bg-purple-700 transition-colors font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-white text-purple-600 px-8 py-3 rounded-full
              border-2 border-purple-600 hover:bg-purple-50 transition-colors font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;