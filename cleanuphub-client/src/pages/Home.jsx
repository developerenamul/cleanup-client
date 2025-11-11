import Banner from "../components/Banner";
import Category from "../components/Category";
import CommunityStats from "../components/CommunityStats";
import VolunteerSection from "../components/VolunteerSection";
import ComplaintCard from "../components/ComplaintCard";
import { useState } from "react";
import { useLoaderData } from "react-router";

const Home = () => {
  const issues = useLoaderData();
  console.log(issues);

  const [stats, setStats] = useState({ users: 120, resolved: 45, pending: 75 });

  return (
    <div>
      <Banner />
      <Category />
      <section className="my-10">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Recent Complaints
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <ComplaintCard key={issue._id} issue={issue} />
          ))}
        </div>
      </section>
      <CommunityStats stats={stats} />
      <VolunteerSection />
    </div>
  );
};

export default Home;
