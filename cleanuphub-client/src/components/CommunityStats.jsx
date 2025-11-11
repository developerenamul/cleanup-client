// CommunityStats.jsx
const CommunityStats = ({ stats }) => {
  return (
    <div className="bg-gray-100 py-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Community Stats</h2>
      <div className="flex justify-center gap-10">
        <div>
          <p className="text-4xl font-bold">{stats.users}</p>
          <p>Registered Users</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{stats.resolved}</p>
          <p>Issues Resolved</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{stats.pending}</p>
          <p>Pending Issues</p>
        </div>
      </div>
    </div>
  );
};
export default CommunityStats;
