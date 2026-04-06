import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPlats } from "../services/plats.service";
import { getCategories } from "../services/categories.service";
import { getRecommended } from "../services/recommended.service";

import Navbar from "./../components/Navbar.jsx";
import Footer from "./../components/Footer.jsx";
import HeroSection from "./../components/HeroSection.jsx";
import CategoriesFilter from "./../components/CategoriesFilter.jsx";
import PlatList from "../components/PlatList.jsx";
import PaginationBar from "../components/PaginationBar.jsx";
import ProtectedRoute from "./../components/ProtectedRoute.jsx";

const Home = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const {
        data: platsData,
        isLoading: platsLoading,
        error: platsError,
    } = useQuery({
        queryKey: ["plats", page, search],
        queryFn: () => getPlats({ page, search }),
        keepPreviousData: true,
    });

    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 10, // cache 10 min
    });

    useQuery({
        queryKey: ["recommended"],
        queryFn: getRecommended,
    });

    console.log(platsData);

    return (
        <ProtectedRoute>
        <Navbar search={search} setSearch={setSearch}></Navbar>
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
            <HeroSection></HeroSection>
            <CategoriesFilter categories={categoriesData}></CategoriesFilter>
            <PlatList search={search} plats={platsData?.data || []} loading={platsLoading} error={platsError}></PlatList>
            <PaginationBar
            page={page}
            setPage={setPage}
            currentPage={platsData?.current_page}
            totalPages={platsData?.last_page}
            from={platsData?.from}
            to={platsData?.to}
            total={platsData?.total}
            ></PaginationBar>
        </main>
        <Footer></Footer>
        </ProtectedRoute>
    );
};
export default Home;
