import { Bell, LayoutDashboard, Link, Package, Search, ShoppingBag, Store, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const menuItems = [
      {id:1, label : "Dashboard", to: "/admin", icon: LayoutDashboard, end:true},
      {id:2, label: "Products", to:"/admin/products", icon:ShoppingBag},
      {id:3, label: "Orders", to:"/admin/orders", icon:Package},
      {id:4, label:"Customers", to:"/admin/customers", icon:Users},
]

function AdminLayout(){
    return (
        <div className="min-h-screen flex bg-gray-bg">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-dark text-white p-4 shrink-0">
                 <h2 className="text-xl font-bold px-3 py-4">
                    ShopEasy <span className="text-primary">Admin</span>
                 </h2>
                 <nav className="flex-1 space-y-1 mt-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                 key = {item.id}
                                 to = {item.to}
                                 end = {item.end}
                                 className={({isActive}) => {
                                       let style = "text-gray-400 hover:text-white";

                                       if(isActive){
                                         style = "bg-white/10 text-white";
                                       }

                                       return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${style}`;
                                 }}
                            >
                                <Icon size={18}/>
                                {item.label}
                            </NavLink>
                        );     
                    })}
                 </nav>

                 <Link to="/"
                       className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white"
                 >
                       <Store size={18}/>
                        Back to Store
                 </Link>
            </aside>

            {/* Right side: topbar + page content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b-border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 w-72">
                        <Search size={18} className="text-gray-400"/>
                        <input 
                            type="text"
                            placeholder="Search"
                            className="ml-2 outline-none w-full text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Bell size={20} className="text-gray-500"/>
                        <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                            A
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;