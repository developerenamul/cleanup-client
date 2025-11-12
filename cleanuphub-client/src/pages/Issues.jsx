// import React, { useContext, useEffect, useState } from "react";
// // import { AuthContext } from "../context/AuthProvider";
// import { useNavigate } from "react-router";
// import { Link } from "react-router";
// import { AuthContext } from "../context/AuthContext";

// const Issues = () => {
//   const { user } = useContext(AuthContext);
//   const [issues, setIssues] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // যদি user লগিন থাকে, সব issue আনবে
//     // না থাকলে শুধু ৩টা recent issue আনবে
//     const url = user
//       ? "http://localhost:5000/issues"
//       : "http://localhost:5000/latestIssues";
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setIssues(data))
//       .catch((err) => console.error("Error loading issues:", err));
//   }, [user]);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         {user ? "All Community Issues" : "Recent Community Issues"}
//       </h2>

//       {/* যদি issue থাকে */}
//       {issues.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {issues.map((issue) => (
//             <div
//               key={issue._id}
//               className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition-all"
//             >
//               <img
//                 src={issue.image}
//                 alt={issue.title}
//                 className="w-full h-48 object-cover rounded-lg mb-3"
//               />
//               <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
//               <p className="text-gray-600 mb-3">
//                 {issue.description?.slice(0, 100)}...
//               </p>

//               {user ? (
//                 <Link
//                   to={`/issues/${issue._id}`}
//                   className="btn btn-success w-full"
//                 >
//                   View Details
//                 </Link>
//               ) : (
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="btn btn-outline w-full"
//                 >
//                   Login to Contribute
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No issues available</p>
//       )}

//       {/* লগিন না থাকলে নিচে CTA */}
//       {!user && (
//         <div className="text-center mt-8">
//           <p className="text-gray-700 mb-3">
//             Want to explore all issues and contribute?
//           </p>
//           <Link to="/login" className="btn btn-primary">
//             Login to See More
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Issues;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Issues = () => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = user
      ? "http://localhost:5000/issues"
      : "http://localhost:5000/latestIssues";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error loading issues:", err));
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        {user ? "All Community Issues" : "Recent Community Issues"}
      </h2>

      {issues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="flex flex-col h-full border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-col flex-1 p-4">
                <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                <p className="text-gray-600 flex-1">
                  {issue.description?.slice(0, 100)}...
                </p>

                <div className="mt-4">
                  {user ? (
                    <Link
                      to={`/issues/${issue._id}`}
                      className="btn btn-success w-full hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </Link>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="btn btn-sm bg-green-600 text-white mt-auto hover:bg-green-700 hover:scale-105 hover:shadow-md transition-all duration-300 mt-6"
                    >
                      Login to Contribute
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No issues available</p>
      )}

      {!user && (
        <div className="text-center mt-8">
          <p className="text-gray-700 mb-3">
            Want to explore all issues and contribute?
          </p>
          <Link
            to="/login"
            className="btn btn-sm bg-green-600 text-white mt-auto hover:bg-green-700 hover:scale-105 hover:shadow-md transition-all duration-300 mt-6"
          >
            Login to See More
          </Link>
        </div>
      )}
    </div>
  );
};

export default Issues;
