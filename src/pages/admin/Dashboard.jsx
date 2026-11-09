import { stats } from "../../data/adminStats";
import StatCard from "../../components/admin/StatCard";
import SalesChart from "../../components/admin/SalesChart";
import TopProducts from "../../components/admin/TopProducts";
import RecentOrders from "../../components/admin/RecentOrders";
import TopCustomers from "../../components/admin/TopCustomer";

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

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-4 mt-6">
        <SalesChart />
        <TopProducts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-4 mt-6">
        <RecentOrders />
        <TopCustomers />
      </div>
    </div>
  );
}

export default Dashboard;