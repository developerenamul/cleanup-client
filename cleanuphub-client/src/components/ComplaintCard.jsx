// ComplaintCard.jsx
import { Link } from "react-router";

const ComplaintCard = ({ issue }) => {
  return (
    <div className="shadow-lg rounded-xl overflow-hidden flex flex-col justify-between bg-white hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <img
        src={issue.image}
        alt={issue.title}
        className="h-40 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-lg mb-1 line-clamp-2">{issue.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {issue.category} • {issue.location}
          </p>
          <p className="text-gray-700 text-sm line-clamp-3 mb-3">
            {issue.description.slice(0, 80)}...
          </p>
        </div>

        {/* Button */}
        <Link
          to={`/issues/${issue._id}`}
          className="btn btn-sm bg-green-600 text-white mt-auto hover:bg-green-700 hover:scale-105 hover:shadow-md transition-all duration-300"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ComplaintCard;
