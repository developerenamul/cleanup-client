// ComplaintCard.jsx
import { Link } from "react-router";

const ComplaintCard = ({ issue }) => {
  return (
    <div className="shadow-lg rounded-xl overflow-hidden">
      <img
        src={issue.image}
        alt={issue.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{issue.title}</h3>
        <p className="text-sm text-gray-600">
          {issue.category} • {issue.location}
        </p>
        <p className="text-gray-700 mt-2">
          {issue.description.slice(0, 60)}...
        </p>
        <Link
          to={`/issues/${issue._id}`}
          className="btn btn-sm bg-green-600 text-white mt-3"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ComplaintCard;
