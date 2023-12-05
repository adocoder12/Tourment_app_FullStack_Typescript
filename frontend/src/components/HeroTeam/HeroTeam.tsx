// PlayerHero.js
import styles from "./style.module.css";

//react

//components
import Avatar from "../avatar/Avatar";
import NextMatchCard from "../NextMatchCard/NextMatchCard";
import ClubInfo from "../clubInfo/ClubInfo";

//img
import teamLogo2 from "@/assets/teamsPic/EQ10_Caracasfc.png";
//redux
import { useAppSelector } from "@/redux/hooks/hooks";

//interfaces
import { ITeam } from "@/utils/interfaces/team";

// interface Props {
//   img?: string;
// }

export default function HeroTeam() {
  const { player } = useAppSelector((state) => state.players);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.avatarContainer}>
          {/* Replace the avatar path with your actual image path */}
          <Avatar
            alt={`Player Avatar ${player?.name}`}
            width="150"
            height="150"
          />
        </div>
        <div className={styles.playerInfo}>
          <h3>
            {player ? player?.name + " " + player.lastname : "Player Name"}
          </h3>
          <p>{player ? player?.position : "Player position"}</p>

          <div className={styles.icons}>
            {/* Add football icons or any other relevant icons */}
            ⚽️ ⚽️ ⚽️
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <ClubInfo
          img={teamLogo2}
          playerName={player?.name}
          playerCategory={player?.category}
          playerStat={player?.stats}
          playerTeam={player?.club as ITeam}
        />
        <NextMatchCard />
      </div>
    </section>
  );
}
