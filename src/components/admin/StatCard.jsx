import { TrendingDown, TrendingUp } from "lucide-react";

function StatCard({ title, value, change, bg}){
    let badgeStyle = "bg-green-1100 text-green-700";
    let Icon = TrendingUp;

    if(change < 0){
        badgeStyle = "bg-red-100 text-red-600";
        Icon = TrendingDown;
    }
    return (
        <div className={`rounded-2xl p-5 ${bg}`}>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-dark mt-2">{value}</p>

            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badgeStyle}`}>
                <Icon size={14}/>
                {Math.abs(change)}%
            </span>
        </div>
        
    )
}

export default StatCard;