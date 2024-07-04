import React from 'react'
import { Link } from 'react-router-dom';

const Failed = () => {
  return (
    <div>
       <div className="h-[80vh] w-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <p className="text-4xl">Page Not Found</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Go to Home
        </Link>
      </div>
    </div>
    </div>
);
}

export default Failed
