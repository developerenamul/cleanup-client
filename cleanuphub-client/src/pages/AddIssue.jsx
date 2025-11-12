import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const AddIssue = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newIssue = {
      title: form.title.value,
      category: form.category.value,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      amount: parseFloat(form.amount.value),
      status: "ongoing",
      date: new Date(),
      email: user?.email,
    };

    fetch("http://localhost:5000/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIssue),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Issue added successfully!");
          form.reset();
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-base-100 shadow-xl p-8 rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Report a New Issue
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Issue Title"
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          className="select select-bordered w-full"
          required
          defaultValue="" // ✅ defaultValue দিয়ে প্রাথমিক অবস্থা নির্ধারণ
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Garbage">Garbage</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Broken Public Property">Broken Public Property</option>
          <option value="Road Damage">Road Damage</option>
        </select>

        <input
          name="location"
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          name="image"
          type="url"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Suggested Budget (৳)"
          className="input input-bordered w-full"
          required
        />

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100 text-gray-600"
        />

        <button type="submit" className="btn btn-neutral w-full">
          Submit Issue
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddIssue;
