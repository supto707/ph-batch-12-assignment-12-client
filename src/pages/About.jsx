const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <p className="text-lg">
          Welcome to GarmentTracker, your comprehensive solution for managing garment production workflows. 
          We specialize in helping small and medium-sized garment factories streamline their operations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="card bg-white shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold text-primary">500+</h3>
              <p>Products</p>
            </div>
          </div>
          <div className="card bg-white shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold text-primary">1,200+</h3>
              <p>Happy Clients</p>
            </div>
          </div>
          <div className="card bg-white shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold text-primary">5,000+</h3>
              <p>Orders Completed</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="text-lg">
          To provide efficient, reliable, and user-friendly production tracking solutions that help 
          garment manufacturers deliver quality products on time, every time.
        </p>

        <h2 className="text-3xl font-bold mt-8 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Real-time production tracking</li>
          <li>Easy order management</li>
          <li>Transparent communication</li>
          <li>Quality assurance at every step</li>
          <li>Timely delivery guarantee</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
