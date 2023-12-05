import { useParams } from "react-router-dom";
//Components
import Avatar from "../avatar/Avatar";
import styles from "./style.module.css";

//interfaces
import { IPlayer } from "@utils/interfaces/players";
import { ITeam } from "@utils/interfaces/team";

interface Props {
  playerStat?: IPlayer["stats"] | undefined;
  playerTeam?: ITeam | undefined;
  playerName?: IPlayer["name"] | undefined;
  playerCategory?: IPlayer["category"] | undefined;
  img?: string;
}
export default function ClubInfo({
  img,
  playerStat,
  playerTeam,
  playerName,
  playerCategory,
}: Props) {
  const player = {
    name: playerName ? playerName : "Player A",
    clubName: playerTeam ? playerTeam?.name : "Club A",
    category: playerCategory ? playerCategory : "League A",
    clubStats: {
      g: playerStat?.goals.toString() || "0",
      A: playerStat?.assists.toString() || "0",
      P: playerStat?.matchesPlayed.toString() || "0",
    },
    lastMatch: {
      opponent: "Club B",
      result: "W 2-1",
    },
  };

  const { id } = useParams<{ id: string }>();

  return (
    <>
      <div className={styles.clubInfo}>
        <div className={styles.clubDetails}>
          <Avatar
            alt={`Player Avatar ${player.name}`}
            width="70"
            height="70"
            path={`/myTeam/${playerTeam?._id || id}`}
            src={img ? img : ""}
          />
          <div className={styles.info}>
            <h4>{player.clubName}</h4>
            <p>{player.category}</p>
          </div>
        </div>

        <div className={styles.stats}>
          {Object.entries(player.clubStats)?.map(([key, value]) => (
            <div key={key}>
              <p>{key}</p>
              <p>{value?.toString()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
