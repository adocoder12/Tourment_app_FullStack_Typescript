import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getCategories } from "@/redux/services/category";
// import { getTeams } from "@/redux/services/team";

// Styles
import style from "./style.module.css";

// Lazy-loaded components
const TeamList = lazy(() => import("@/components/teamsList/TeamList"));
const TeamDisplay = lazy(() => import("@/components/TeamDisplay/TeamDisplay"));

// Components
import Loader from "@/components/Loader/Loader";

const TeamsPage = () => {
  const dispatch = useAppDispatch();

  // Get all categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { categories } = useAppSelector((state) => state.categories);

  return (
    <div className={style.TeamsPageContainer}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/allTeams"
            index
            element={<TeamList categories={categories} />}
          />
          <Route path="/:id" element={<TeamDisplay />} />
          {/* Add a default route or redirect if needed */}
          <Route path="/" element={<Navigate to="/allTeams" />} />
        </Routes>
      </Suspense>
      <Outlet />
    </div>
  );
};

export default TeamsPage;
