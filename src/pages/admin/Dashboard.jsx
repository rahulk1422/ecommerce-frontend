import { stats } from "../../data/adminStats";
import StatCard from "../../components/admin/StatCard";

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dark">Welcome Back, Admin!</h1>
      <p className="text-gray-500 mt-1">
        Here's what is happening with your store today
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mt-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            bg={stat.bg}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;