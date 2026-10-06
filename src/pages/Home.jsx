import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPlats } from "../services/plats.service";
import { getCategories } from "../services/categories.service";
import { getRecommended } from "../services/recommended.service";
import { useDebounce } from "../hooks/useDebounce";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import HeroSection from "../components/HeroSection.jsx";
import CategoriesFilter from "../components/CategoriesFilter.jsx";
import PlatList from "../components/PlatList.jsx";
import PaginationBar from "../components/PaginationBar.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Read initial filters from URL
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const categoryFromUrl = searchParams.get("category") || null;
    const initialSearch = searchParams.get("search") || "";

    const [searchInput, setSearchInput] = useState(initialSearch);
    const debouncedSearch = useDebounce(searchInput, 350);

    // Sync debounced search to URL query params
    useEffect(() => {
        const nextParams = new URLSearchParams(searchParams);
        if (debouncedSearch) {
            nextParams.set("search", debouncedSearch);
        } else {
            nextParams.delete("search");
        }
        // When search query changes, reset to page 1
        if (debouncedSearch !== initialSearch) {
            nextParams.set("page", "1");
        }
        setSearchParams(nextParams, { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    // Handle Category Selection
    const handleSelectCategory = (categoryId) => {
        const nextParams = new URLSearchParams(searchParams);
        if (categoryId) {
            nextParams.set("category", categoryId);
        } else {
            nextParams.delete("category");
        }
        nextParams.set("page", "1");
        setSearchParams(nextParams);
    };

    // Handle Page Selection
    const handleSetPage = (newPage) => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("page", String(newPage));
        setSearchParams(nextParams);
    };

    // Query Plats from backend with pagination, search, and category_id
    const {
        data: platsData,
        isLoading: platsLoading,
        error: platsError,
    } = useQuery({
        queryKey: ["plats", pageFromUrl, debouncedSearch, categoryFromUrl],
        queryFn: () =>
            getPlats({
                page: pageFromUrl,
                search: debouncedSearch,
                category_id: categoryFromUrl,
                per_page: 8,
            }),
        keepPreviousData: true,
    });

    // Query Categories
    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 10,
    });

    // Query User's AI Recommendations
    const { data: recommendationsData } = useQuery({
        queryKey: ["recommended"],
        queryFn: getRecommended,
        staleTime: 1000 * 60 * 5,
    });

    // Create an efficient O(1) map of plat_id -> latest recommendation
    const recommendationsMap = useMemo(() => {
        const list = Array.isArray(recommendationsData)
            ? recommendationsData
            : Array.isArray(recommendationsData?.data)
            ? recommendationsData.data
            : [];
        const map = {};
        list.forEach((rec) => {
            const platId = rec.plat?.id || rec.plat_id;
            if (platId && !map[platId]) {
                map[platId] = rec;
            }
        });
        return map;
    }, [recommendationsData]);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col">
                <Navbar
                    search={searchInput}
                    setSearch={setSearchInput}
                    showSearch={true}
                />

                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative z-10">
                    <HeroSection />

                    <CategoriesFilter
                        categories={categoriesData || []}
                        selectedCategory={categoryFromUrl}
                        onSelectCategory={handleSelectCategory}
                    />

                    <PlatList
                        plats={platsData?.data || []}
                        loading={platsLoading}
                        error={platsError}
                        recommendationsMap={recommendationsMap}
                    />

                    <PaginationBar
                        currentPage={platsData?.current_page || 1}
                        totalPages={platsData?.last_page || 1}
                        from={platsData?.from || 0}
                        to={platsData?.to || 0}
                        total={platsData?.total || 0}
                        setPage={handleSetPage}
                    />
                </main>

                <Footer />
            </div>
        </ProtectedRoute>
    );
};

export default Home;
