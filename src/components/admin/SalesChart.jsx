import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { salesData } from "../../data/adminStats";


function SalesChart(){
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-dark">Summary</h2>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        Order
                    </span>

                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                        Income Growth
                    </span>
                </div>
            </div>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day"/>
                          <YAxis tickFormatter={(value) => `${value / 1000}k`}/>
                          <Tooltip />
                          <Line type= "monotone" dataKey="orders" stroke="#4ade80" strokeWidth={2} dot={false}/>
                          <Line type= "monotone" dataKey="income" stroke="#047857" strokeWidth={2} dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default SalesChart;