import Category from './Category';
import categories from "./categories.json";

const CategoriesFilter = () => {
    const categoriesRecent = categories.slice(0,4);
    return (
        <div className="mb-12">
            <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar pb-4 pt-2">
                <button class="whitespace-nowrap flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white border border-primary-400/50 rounded-full font-bold text-sm shadow-[0_0_25px_rgba(255,67,20,0.3)] transition-transform active:scale-95">
                    <i class="ph-fill ph-sparkle text-lg"></i>
                    <span>All Curations</span>
                </button>
                {categoriesRecent.map((category) => (
                    <Category 
                    key={category.id} 
                    Name={category.name} 
                    Color={category.color} />
                ))}
            </div>
        </div>
    );
}
export default CategoriesFilter;
