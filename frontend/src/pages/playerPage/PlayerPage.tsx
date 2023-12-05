import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//css
import style from "./style.module.css";
//interfaces

//components
import HeroTeam from "@/components/HeroTeam/HeroTeam";
import PlayerStandings from "@/components/playerStanding/PlayerStanding";
//Redux
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { getPlayer } from "@/redux/services/player";
import { getTeam } from "@/redux/services/team";

export default function PlayerPage() {
  const [playerId, setPlayerId] = useState<string>("");
  const { id } = useParams();
  // const { myteam } = useAppSelector((state) => state.auth);
  const { team } = useAppSelector((state) => state.teams);
  const dispatch = useAppDispatch();
  console.log("param" + id);

  const playerIdHandler = (id: string) => {
    setPlayerId(id);
  };

  useEffect(() => {
    dispatch(getTeam(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getPlayer(playerId as string));
  }, [dispatch, playerId]);

  return (
    <>
      <div className={style.playerContainer}>
        <HeroTeam />
        <PlayerStandings
          playerIdHandler={playerIdHandler}
          players={team?.players}
        />
      </div>
      <Outlet />
    </>
  );
}
