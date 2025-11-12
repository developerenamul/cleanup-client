import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const [myIssues, setMyIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch issues created by logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/issues?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyIssues(data))
        .catch(() => toast.error("Failed to load your issues"));
    }
  }, [user?.email]);

  // Handle delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/issues/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Issue deleted successfully!");
        setMyIssues(myIssues.filter((issue) => issue._id !== id));
        setShowDeleteModal(false);
      });
  };

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedIssue = {
      title: form.title.value,
      category: form.category.value,
      amount: form.amount.value,
      description: form.description.value,
      status: form.status.value,
    };

    fetch(`http://localhost:5000/issues/${selectedIssue._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedIssue),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Issue updated successfully!");
        setShowUpdateModal(false);
        form.reset();
        // refresh list
        fetch(`http://localhost:5000/issues?email=${user.email}`)
          .then((res) => res.json())
          .then((data) => setMyIssues(data));
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Issues</h2>
      {/* shadow-md rounded-lg */}
      {/* table w-full  table*/}
      {myIssues.length === 0 ? (
        <p>No issues Added Yet.</p>
      ) : (
        <div className="overflow-x-auto  md:overflow-x-visible">
          <table className="table table-zebra w-full min-w-[600px] md:min-w-0">
            <thead className="bg-gray-100">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myIssues.map((issue) => (
                <tr key={issue._id}>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>৳{issue.amount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        issue.status === "ongoing"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setShowUpdateModal(true);
                      }}
                      className="btn btn-xs bg-blue-600 text-white mr-2 hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setShowDeleteModal(true);
                      }}
                      className="btn btn-xs bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* ===== Update Modal ===== */}
      {showUpdateModal && selectedIssue && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-3">Update Issue</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={selectedIssue.title}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="category"
                defaultValue={selectedIssue.category}
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                name="amount"
                defaultValue={selectedIssue.amount}
                className="input input-bordered w-full"
              />
              <textarea
                name="description"
                defaultValue={selectedIssue.description}
                className="textarea textarea-bordered w-full"
              ></textarea>

              {/* ✅ Status Dropdown */}
              <select
                name="status"
                defaultValue={selectedIssue.status}
                className="select select-bordered w-full"
              >
                <option value="ongoing">Ongoing</option>
                <option value="ended">Ended</option>
              </select>

              <div className="modal-action">
                <button type="submit" className="btn btn-neutral">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
      {/* ===== Delete Modal ===== */}
      {showDeleteModal && selectedIssue && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              Are you sure you want to delete this issue?
            </h3>
            <p className="text-gray-600 mt-2">{selectedIssue.title}</p>
            <div className="modal-action">
              <button
                onClick={() => handleDelete(selectedIssue._id)}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyIssues;
