import React from "react";

const PaginationBar = ({ setPage, currentPage, totalPages, from, to, total }) => {
    return (
        <div className="mt-16 flex items-center justify-between bg-zinc-900/30 backdrop-blur-xl border border-white/5 px-6 py-4 rounded-[2rem] shadow-2xl">
        <div className="flex flex-1 justify-between sm:hidden">
            <a
            href="#"
            className="relative inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            onClick={(event) => {
                event.preventDefault();
                setPage((prev) => (prev - 1 >= 1 ? prev - 1 : prev));
            }}
            >
            Past
            </a>
            <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            onClick={(event) => {
                event.preventDefault();
                setPage((prev) => (totalPages >= prev + 1 ? prev + 1 : prev));
            }}
            >
            Next
            </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
            <p className="text-sm text-zinc-400 font-light tracking-wide">
                Showing <span className="font-bold text-white">{from ?? 0}</span> to{" "}
                <span className="font-bold text-white">{to ?? 0}</span> of{" "}
                <span className="font-bold text-white">{total ?? 0}</span>
                curations
            </p>
            </div>
            <div>
            <nav
                className="isolate inline-flex -space-x-px rounded-xl shadow-sm bg-white/5 p-1 border border-white/10"
                aria-label="Pagination"
            >
                <a
                href="#"
                className="relative inline-flex items-center rounded-lg px-3 py-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors focus:z-20"
                onClick={(event) => {
                    event.preventDefault();
                    setPage((prev) => (prev > 1 ? prev - 1 : prev));
                }}
                >
                <span className="sr-only">Previous</span>
                <i className="ph-bold ph-caret-left"></i>
                </a>
                <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-primary-500 rounded-lg px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary-500/30"
                >
                {currentPage ?? 1}
                </a>
                {totalPages > 1 &&
                <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
                onClick={(event) => {
                    event.preventDefault();
                    setPage(2);
                }}
                >
                2
                </a>
                }
                {totalPages > 2 &&
                <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors rounded-lg md:inline-flex"
                onClick={(event) => {
                    event.preventDefault();
                    setPage(3);
                }}
                >
                3
                </a>
                }
                {totalPages > 3 &&
                <>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-zinc-600">
                ...
                </span>
                <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors rounded-lg md:inline-flex"
                onClick={(event) => {
                    event.preventDefault();
                    setPage(3);
                }}
                >
                {totalPages}
                </a>
                </>
                }
                <a
                href="#"
                className="relative inline-flex items-center rounded-lg px-3 py-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors focus:z-20"
                onClick={(event) => {
                    event.preventDefault();
                    setPage((prev) => (totalPages >= prev + 1 ? prev + 1 : prev));
                }}
                >
                <span className="sr-only">Next</span>
                <i className="ph-bold ph-caret-right"></i>
                </a>
            </nav>
            </div>
        </div>
        </div>
    );
};

export default PaginationBar;
