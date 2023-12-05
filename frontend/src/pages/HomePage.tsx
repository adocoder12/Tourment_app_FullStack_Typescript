import TeamStandings from "@/components/TeamStanding/TeamStanding";
//css
import style from "./homepage.module.css";
//react
import { useEffect } from "react";
//redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getTeams } from "@/redux/services/team";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <>
      <div className={style.homepageContainer}>
        <TeamStandings teams={teams!} />
      </div>
    </>
  );
}
