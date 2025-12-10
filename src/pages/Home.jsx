import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}`)
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-clean section-padding">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-hero text-gray-900 mb-6">
                Find The <span className="font-black">Most Appropriate Garment</span> For You <span className="text-accent">To Produce</span>
              </h1>
              <p className="text-subtitle mb-8 max-w-lg">
                Incredible Experience With Premium Quality Garments. We Have Developed State Of The Art Production Facilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary-clean">
                  Get Started
                </button>
                <button className="btn-outline-clean">
                  View Products
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-2xl p-8 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
                  alt="Garment Production" 
                  className="w-full h-80 object-cover rounded-xl"
                />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                  <div className="stats-clean text-center px-4 py-2 rounded-lg">
                    <div className="text-2xl font-bold">150+</div>
                    <div className="text-sm opacity-80">Products</div>
                  </div>
                  <div className="stats-clean text-center px-4 py-2 rounded-lg">
                    <div className="text-2xl font-bold">87</div>
                    <div className="text-sm opacity-80">Orders</div>
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -top-4 -right-4 clean-card p-4 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-sm">Top Production</div>
                    <div className="text-xs text-gray-500">Premium Quality Assured</div>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-sm">
                  ★★★★★
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title text-gray-900 mb-4">
              All The Best Garments From Us For You
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              We Have Developed State Of The Art Production Facilities
            </p>
          </motion.div>

          <div className="property-grid">
            {Array.isArray(products) && products.slice(0, 6).map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="clean-card overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/400'} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <div className="flex text-yellow-400 text-sm">
                      ★★★★★
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {product.description?.substring(0, 80)}...
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </div>
                    <Link 
                      to={`/products/${product._id}`}
                      className="text-primary-600 text-sm font-medium hover:text-primary-700"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline-clean">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-section-title text-gray-900 mb-6">
                See More Clearly With The <span className="text-accent">360°</span> Production View
              </h2>
              <p className="text-subtitle mb-8">
                Track every stage of production with our advanced monitoring system. From cutting to finishing, get real-time insights into your garment manufacturing process.
              </p>
              <button className="btn-primary-clean">
                Learn More
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                alt="Production View" 
                className="w-full h-80 object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title text-gray-900 mb-4">
              See Other People <span className="text-gray-400">Who Have Lived In</span> Our Production
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Production Manager',
                text: 'Working with GarmentTracker has been a game-changer for our team. The quality and attention to detail in every garment is outstanding.',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
              },
              {
                name: 'Michael Chen',
                role: 'Fashion Designer',
                text: 'I had an excellent experience with GarmentTracker. Not just focused on sales, but genuinely invested in finding the right production solution.',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Brand Owner',
                text: 'The team at GarmentTracker made the entire production process seamless. They were professional, knowledgeable, and truly cared about our success.',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="clean-card p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section-title mb-6">
              Interested To Start Your Production?
            </h2>
            <p className="text-xl mb-8 opacity-80">
              contact@garmenttracker.com
            </p>
            <Link to="/register" className="btn-primary-clean">
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;