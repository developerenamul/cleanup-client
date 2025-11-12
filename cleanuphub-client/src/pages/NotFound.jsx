import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 | Page Not Found";
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-3">404</h1>
      <p className="text-lg text-gray-600 mb-5">
        Oops! The page you're looking for doesn’t exist.
      </p>
      <a href="/" className="btn btn-neutral">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
