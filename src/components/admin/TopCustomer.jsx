import { topCustomers } from "../../data/adminStats";

function TopCustomers() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h2 className="font-semibold text-dark mb-4">Weekly Top Customers</h2>

      <div className="space-y-4">
        {topCustomers.map((customer) => (
          <div key={customer.id} className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
              {customer.name.charAt(0)}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-dark">{customer.name}</p>
              <p className="text-xs text-gray-500">{customer.orders} Orders</p>
            </div>

            <button className="text-xs font-medium text-primary border border-gray-200 rounded-lg px-3 py-1">
              View
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCustomers;