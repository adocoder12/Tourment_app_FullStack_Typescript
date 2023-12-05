import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// Redux
import { useAppDispatch } from "@/redux/hooks/hooks";
import { getCategories } from "@/redux/services/category";
import { getTeams } from "@/redux/services/team";

// Styles
import style from "./style.module.css";

// Lazy-loaded components
const TeamList = lazy(() => import("@/components/teamsList/TeamList"));

// Components
import Loader from "@/components/Loader/Loader";
const TeamDisplay = lazy(() => import("@/components/TeamDisplay/TeamDisplay"));

const TeamsPage = () => {
  const dispatch = useAppDispatch();

  // Get all teams
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={style.TeamsPageContainer}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/allTeams" index element={<TeamList />} />
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
