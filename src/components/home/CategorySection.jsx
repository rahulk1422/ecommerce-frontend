import { categories } from "../../data/categories"

function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            {categories.map((category) =>{
                const Icon = category.icon;

                return(
                    <div key={category.id} className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:shadow cursor-pointer transition">
                         <Icon className="text-primary" size={28}/>
                         <p className="text-sm font-medium text-center">{category.name}</p>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default CategorySection