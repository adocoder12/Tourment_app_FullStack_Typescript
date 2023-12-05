import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
//css
import style from "./style.module.css";
//redux
import { useAppSelector, useAppDispatch } from "@redux/hooks/hooks";
import { getTeams } from "@/redux/services/team";
import { getUserTeam } from "@/redux/services/user";
//components
import Loader from "@/components/Loader/Loader";
const TeamDisplay = lazy(() => import("@/components/TeamDisplay/TeamDisplay"));

//pages
const CreateTeamPage = lazy(
  () => import("@pages/createTeamPage/CreateTeamPage")
);
const PlayerPage = lazy(() => import("@pages/playerPage/PlayerPage"));
const CreatePlayerPage = lazy(
  () => import("@pages/createPlayerPage/CreatePlayerPage")
);

export default function MyTeamPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserTeam(user?.myTeam as string));
  }, [dispatch, user?.myTeam]);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div className={style.MyTeamContainer}>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Team */}
          <Route path=":id" element={<TeamDisplay />} />
          <Route path=":id/createTeam" element={<CreateTeamPage />} />
          {/* Player */}
          <Route path=":id/players" element={<PlayerPage />} />
          <Route
            path=":id/players/createPlayer"
            element={<CreatePlayerPage />}
          />
        </Routes>
      </Suspense>
      <Outlet />
    </div>
  );
}
