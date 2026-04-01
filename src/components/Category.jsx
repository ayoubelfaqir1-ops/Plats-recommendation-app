const Category = ({Name,Color}) => {
    console.log(Color);
    return (
        <button className="whitespace-nowrap flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 hover:text-white rounded-full font-medium text-sm backdrop-blur-md transition-all active:scale-95">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: Color }}></div>
            <span>{Name}</span>
        </button>
    );
}
export default Category;