import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getCategories } from "@/redux/services/category";

// Styles
import style from "./style.module.css";

// Lazy-loaded components
const TeamList = lazy(() => import("@/components/teamsList/TeamList"));

// Components
import Loader from "@/components/Loader/Loader";
const TeamDisplay = lazy(() => import("@/components/TeamDisplay/TeamDisplay"));

const TeamsPage = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={style.TeamsPageContainer}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/:id" element={<TeamDisplay />} />
          <Route
            path="/allTeams"
            element={<TeamList categories={categories!} />}
          />
          {/* Add a default route or redirect if needed */}
          <Route path="/" element={<Navigate to="/all" />} />
        </Routes>
      </Suspense>
      <Outlet />
    </div>
  );
};

export default TeamsPage;
