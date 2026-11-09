import { recentOrders } from "../../data/adminStats";

const statusStyles = {
  Pending: "bg-yellow-50 text-yellow-700",
  Canceled: "bg-red-50 text-red-600",
  Shipped: "bg-green-50 text-green-700",
};

function RecentOrders() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-dark">Recent Orders</h2>
        <button className="text-sm text-primary font-medium border border-gray-200 rounded-lg px-3 py-1">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-140">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="py-3 font-medium">Product</th>
              <th className="py-3 font-medium">Customer</th>
              <th className="py-3 font-medium">Order ID</th>
              <th className="py-3 font-medium">Date</th>
              <th className="py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => {
              const badgeStyle = statusStyles[order.status];

              return (
                <tr key={order.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 text-dark">{order.product}</td>
                  <td className="py-3 text-primary">{order.customer}</td>
                  <td className="py-3 text-gray-500">{order.orderId}</td>
                  <td className="py-3 text-gray-500">{order.date}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${badgeStyle}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default RecentOrders;