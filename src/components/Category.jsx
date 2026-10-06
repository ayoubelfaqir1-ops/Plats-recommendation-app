const Category = ({ name, color, isSelected, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`whitespace-nowrap flex items-center space-x-2.5 px-5 py-2.5 rounded-full font-semibold text-sm backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer ${
                isSelected
                    ? "bg-primary-500 text-white border border-primary-400 shadow-[0_0_20px_rgba(255,67,20,0.35)]"
                    : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
            }`}
        >
            <span
                className="w-2.5 h-2.5 rounded-full transition-transform"
                style={{ backgroundColor: color || "#f97316" }}
            />
            <span>{name}</span>
        </button>
    );
};

export default Category;