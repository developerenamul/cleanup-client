import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const MyContributions = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/contributions?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setContributions(data));
    }
  }, [user]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.text("My Contribution Report", 14, 15);
    doc.text(`User: ${user?.displayName || "N/A"}`, 14, 23);
    doc.text(`Email: ${user?.email}`, 14, 30);

    // Table
    const tableData = contributions.map((c, index) => [
      index + 1,
      c.title,
      c.category || "N/A",
      `৳${c.amount}`,
      new Date(c.date).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: [["#", "Issue Title", "Category", "Paid Amount", "Date"]],
      body: tableData,
      startY: 40,
    });

    // Footer
    const total = contributions.reduce((sum, c) => sum + Number(c.amount), 0);
    doc.text(`Total Paid: ৳${total}`, 14, doc.autoTable.previous.finalY + 10);

    // Save PDF
    doc.save("My_Contributions_Report.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Contributions</h2>

      {contributions.length > 0 ? (
        <>
          <div className="overflow-x-auto mb-5">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Issue Title</th>
                  <th>Category</th>
                  <th>Paid Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c, index) => (
                  <tr key={c._id}>
                    <td>{index + 1}</td>
                    <td>{c.title}</td>
                    <td>{c.category || "N/A"}</td>
                    <td>৳{c.amount}</td>
                    <td>{new Date(c.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={handleDownloadPDF} className="btn btn-neutral">
            Download Report
          </button>
        </>
      ) : (
        <p>No contributions found.</p>
      )}
    </div>
  );
};

export default MyContributions;
