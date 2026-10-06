import Category from "./Category";

const CategoriesFilter = ({
    categories = [],
    selectedCategory = null,
    onSelectCategory,
}) => {
    const categoryList = Array.isArray(categories) ? categories : [];

    return (
        <div className="mb-10">
            <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-3 pt-1">
                <button
                    type="button"
                    onClick={() => onSelectCategory?.(null)}
                    className={`whitespace-nowrap flex items-center space-x-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 active:scale-95 cursor-pointer ${
                        !selectedCategory
                            ? "bg-primary-500 text-white border border-primary-400/50 shadow-[0_0_25px_rgba(255,67,20,0.35)]"
                            : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
                    }`}
                >
                    <i className="ph-fill ph-sparkle text-lg"></i>
                    <span>All Curations</span>
                </button>

                {categoryList.map((category) => {
                    const isSelected = String(selectedCategory) === String(category.id);
                    return (
                        <Category
                            key={category.id}
                            name={category.name}
                            color={category.color}
                            isSelected={isSelected}
                            onClick={() =>
                                onSelectCategory?.(
                                    isSelected ? null : category.id
                                )
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CategoriesFilter;
