import PlateCard from './PlateCard'

const PlatList = ({ plats: platsProp, loading, error }) => {
  const platsRecents = Array.isArray(platsProp) ? platsProp.slice(0, 8) : [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {loading ? (
        <div className="col-span-full text-center text-zinc-400">Loading...</div>
      ) : error ? (
        <div className="col-span-full text-center text-red-400">Error loading data</div>
      ) : platsRecents.length === 0 ? (
        <div className="col-span-full text-center text-zinc-400">No dishes found</div>
      ) : (
        platsRecents.map((plat) => (
          <PlateCard
            key={plat.id}
            id={plat.id}
            image={plat.image}
            name={plat.name}
            description={plat.description}
            price={plat.price}
            isAvailable={plat.is_available}
            categoryName={plat.category?.name}
          />
        ))
      )}
    </div>
  );
};
export default PlatList;
