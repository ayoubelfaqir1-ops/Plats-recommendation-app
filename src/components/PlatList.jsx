import PlateCard from "./PlateCard";

const SkeletonCard = () => (
    <div className="bg-zinc-900/40 rounded-[2.5rem] p-3 border border-white/5 animate-pulse flex flex-col">
        <div className="w-full aspect-square rounded-[2rem] bg-zinc-800/60 mb-5"></div>
        <div className="px-3 pb-3 space-y-3">
            <div className="h-6 bg-zinc-800/80 rounded-lg w-3/4"></div>
            <div className="h-4 bg-zinc-800/40 rounded-lg w-full"></div>
            <div className="h-4 bg-zinc-800/40 rounded-lg w-2/3"></div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="h-7 bg-zinc-800/80 rounded-lg w-16"></div>
                <div className="h-6 bg-zinc-800/40 rounded-lg w-20"></div>
            </div>
        </div>
    </div>
);

const PlatList = ({ plats = [], loading, error, recommendationsMap = {} }) => {
    const dishList = Array.isArray(plats) ? plats : [];

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="col-span-full py-16 text-center rounded-[2.5rem] bg-red-500/5 border border-red-500/20 p-8">
                <i className="ph-bold ph-warning-circle text-4xl text-red-400 mb-3 block"></i>
                <p className="text-red-300 font-semibold text-lg">
                    Unable to load dishes
                </p>
                <p className="text-zinc-500 text-sm mt-1">
                    Please check your connection or backend server.
                </p>
            </div>
        );
    }

    if (dishList.length === 0) {
        return (
            <div className="col-span-full py-20 text-center rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8">
                <i className="ph-fill ph-fork-knife text-4xl text-zinc-600 mb-3 block"></i>
                <p className="text-white font-bold text-lg">No dishes found</p>
                <p className="text-zinc-500 text-sm mt-1">
                    Try adjusting your category filter or search query.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {dishList.map((plat) => (
                <PlateCard
                    key={plat.id}
                    id={plat.id}
                    image={plat.image}
                    name={plat.name}
                    description={plat.description}
                    price={plat.price}
                    isAvailable={plat.is_available}
                    categoryName={plat.category?.name}
                    recommendation={recommendationsMap?.[plat.id] || null}
                />
            ))}
        </div>
    );
};

export default PlatList;
