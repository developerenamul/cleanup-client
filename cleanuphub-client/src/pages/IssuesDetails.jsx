import { Link, useLoaderData } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const IssuesDetails = () => {
  const issue = useLoaderData();
  const { user } = useContext(AuthContext);
  const [contributors, setContributors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");

  const {
    _id,
    title,
    category,
    location,
    description,
    image,
    date,
    amount: suggestedAmount,
  } = issue;

  // Fetch contributors for this issue
  useEffect(() => {
    fetch(`http://localhost:5000/contributions/byIssue?issueId=${_id}`)
      .then((res) => res.json())
      .then((data) => setContributors(data));
  }, [_id]);

  // Calculate total collected amount
  const totalCollected = contributors.reduce(
    (sum, c) => sum + Number(c.amount),
    0
  );
  const progress = Math.min((totalCollected / suggestedAmount) * 100, 100);

  // Handle contribution form submit
  const handleContribution = (e) => {
    e.preventDefault();
    const form = e.target;
    const contribution = {
      issueId: _id,
      title,
      contributorName: form.name.value,
      email: user.email,
      phone: form.phone.value,
      address: form.address.value,
      amount: amount,
      date: new Date(),
      additional: form.additional.value,
      image: user.photoURL || "👤",
    };

    fetch("http://localhost:5000/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contribution),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Contribution successful!");
        setShowModal(false);
        form.reset();
        setAmount("");
        // reload contributors
        fetch(`http://localhost:5000/contributions/byIssue?issueId=${_id}`)
          .then((res) => res.json())
          .then((data) => setContributors(data));
      });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={image}
            alt={title}
            className="w-full h-80 object-cover rounded-t-2xl"
          />
        </figure>
        <div className="card-body">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">🏷️ {category}</p>
          <p className="text-gray-600">📍 {location}</p>
          <p className="mt-3">{description}</p>
          <p className="mt-2 text-gray-500">
            📅 {new Date(date).toDateString()}
          </p>
          <p className="font-semibold text-lg mt-2">
            💰 Budget: ৳{suggestedAmount}
          </p>

          {/* Progress bar */}
          <div className="mt-4">
            <progress
              className="progress progress-success w-full"
              value={progress}
              max="100"
            ></progress>
            <p className="text-sm text-gray-600 mt-1">
              Collected ৳{totalCollected} / ৳{suggestedAmount}
            </p>
          </div>

          {user ? (
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-sm bg-green-600 text-white mt-auto hover:bg-green-700 hover:scale-105 hover:shadow-md transition-all duration-300 mt-6"
            >
              Pay Clean-Up Contribution
            </button>
          ) : (
            <div
              className="btn
              btn-sm
              bg-green-600
              text-white
              mt-auto
              hover:bg-green-700
              hover:scale-105
              hover:shadow-md
              transition-all
              duration-300
              mt-6"
            >
              <Link to={"/login"}>Login To See All Issues</Link>
            </div>
          )}
        </div>
      </div>

      {/* Contributors Table */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Contributors</h3>
        {contributors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {contributors.map((c) => (
                  <tr key={c._id}>
                    <td>
                      <img
                        src={c.image}
                        alt={c.contributorName}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td>{c.contributorName}</td>
                    <td>৳{c.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No contributors yet.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-3">Contribute to {title}</h3>
            <form onSubmit={handleContribution} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={title}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Contribution Amount"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input input-bordered w-full"
              />
              <textarea
                name="additional"
                placeholder="Additional info (optional)"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <div className="modal-action">
                <button type="submit" className="btn btn-neutral">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default IssuesDetails;
