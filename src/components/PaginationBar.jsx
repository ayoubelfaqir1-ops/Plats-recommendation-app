const PaginationBar = ({ setPage, currentPage = 1, totalPages = 1, from = 0, to = 0, total = 0 }) => {
    if (!total || totalPages <= 1) return null;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="mt-16 flex items-center justify-between bg-zinc-900/30 backdrop-blur-xl border border-white/5 px-6 py-4 rounded-[2rem] shadow-2xl">
            {/* Mobile controls */}
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    type="button"
                    disabled={currentPage <= 1}
                    className="relative inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    className="relative ml-3 inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>

            {/* Desktop controls */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-zinc-400 font-light tracking-wide">
                        Showing <span className="font-bold text-white">{from}</span> to{" "}
                        <span className="font-bold text-white">{to}</span> of{" "}
                        <span className="font-bold text-white">{total}</span> curations
                    </p>
                </div>

                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-xl shadow-sm bg-white/5 p-1 border border-white/10"
                        aria-label="Pagination"
                    >
                        <button
                            type="button"
                            disabled={currentPage <= 1}
                            className="relative inline-flex items-center rounded-lg px-3 py-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <span className="sr-only">Previous</span>
                            <i className="ph-bold ph-caret-left"></i>
                        </button>

                        {/* Page 1 */}
                        <button
                            type="button"
                            className={`relative inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                                currentPage === 1
                                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            }`}
                            onClick={() => handlePageChange(1)}
                        >
                            1
                        </button>

                        {/* Page 2 if exists */}
                        {totalPages >= 2 && (
                            <button
                                type="button"
                                className={`relative inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                                    currentPage === 2
                                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                                onClick={() => handlePageChange(2)}
                            >
                                2
                            </button>
                        )}

                        {/* Page 3 if exists */}
                        {totalPages >= 3 && (
                            <button
                                type="button"
                                className={`relative inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                                    currentPage === 3
                                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                                onClick={() => handlePageChange(3)}
                            >
                                3
                            </button>
                        )}

                        {/* Ellipsis if more than 4 pages */}
                        {totalPages > 4 && (
                            <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-zinc-600">
                                ...
                            </span>
                        )}

                        {/* Last page if totalPages > 3 */}
                        {totalPages > 3 && (
                            <button
                                type="button"
                                className={`relative inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                                    currentPage === totalPages
                                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                                onClick={() => handlePageChange(totalPages)}
                            >
                                {totalPages}
                            </button>
                        )}

                        <button
                            type="button"
                            disabled={currentPage >= totalPages}
                            className="relative inline-flex items-center rounded-lg px-3 py-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <span className="sr-only">Next</span>
                            <i className="ph-bold ph-caret-right"></i>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default PaginationBar;
