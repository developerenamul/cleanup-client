// import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";

const AllIssues = () => {
  //   const [issues, setIssues] = useState([]);

  const issues = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        All Reported Issues
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl"
          >
            <figure>
              <img
                src={issue.image}
                alt={issue.title}
                className="h-56 w-full object-cover rounded-t-2xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">
                {issue.title}
              </h2>
              <p className="text-sm text-gray-600">📍 {issue.location}</p>
              <p className="text-sm text-gray-600">
                🏷️ Category: {issue.category}
              </p>
              <p className="text-sm font-medium text-gray-700">
                💰 Budget: ৳{issue.amount}
              </p>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/issues/${issue._id}`}
                  className="btn btn-sm btn-neutral hover:bg-black text-white"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllIssues;
