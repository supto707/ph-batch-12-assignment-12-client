import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-4xl font-bold mt-4 mb-6">Page Not Found</h2>
        <p className="text-xl mb-8 opacity-70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="inline-block px-8 py-3 bg-green-500 text-white text-lg rounded hover:bg-green-600 active:bg-green-700 transition font-medium">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
