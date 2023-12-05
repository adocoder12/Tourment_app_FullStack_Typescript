import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import TeamStandings from "@/components/TeamStanding/TeamStanding";
import PlayerStandings from "@/components/playerStanding/PlayerStanding";
import HeroTeam from "@/components/HeroTeam/HeroTeam";

import style from "./style.module.css";

//redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getTeam } from "@/redux/services/team";
import { getPlayer } from "@/redux/services/player";

//interfaces

export default function TeamDisplay() {
  const { id } = useParams();
  const [playerId, setPlayerId] = useState<string>("");
  const dispatch = useAppDispatch();

  // const { myteam } = useAppSelector((state) => state.auth);
  const { teams, team } = useAppSelector((state) => state.teams);

  const playerIdHandler = (id: string) => {
    setPlayerId(id);
  };

  //get id param team
  useEffect(() => {
    dispatch(getTeam(id as string));
  }, [dispatch, id]);

  // get user player selected
  useEffect(() => {
    dispatch(getPlayer(playerId as string));
  }, [dispatch, playerId]);

  return (
    <>
      <div className={style.teamContainer}>
        <HeroTeam />
        <div className={style.teamstandings}>
          <TeamStandings teams={teams!} />
          <PlayerStandings
            players={team?.players}
            playerIdHandler={playerIdHandler}
          />
        </div>
        <Outlet />
      </div>
    </>
  );
}
