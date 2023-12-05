import styles from "./NextMatchCard.module.css";

//components
import Avatar from "../avatar/Avatar";
//img
import teamLogo2 from "@/assets/teamsPic/EQ10_Caracasfc.png";
import teamLogo from "@/assets/teamsPic/EQ03_Irmaofc.png";

const NextMatchCard = () => {
  // Replace this data with your actual match data
  const nextMatch = {
    homeTeam: "PSV",
    awayTeam: "Arsenal",
    date: "2023-12-15", // Replace with the actual date
    time: "20:00", // Replace with the actual time
  };

  return (
    <div className={styles.nextMatchCard}>
      <div className={styles.schedule}>
        <p className={styles.date}>
          {new Date(nextMatch.date).toLocaleDateString()}
        </p>
        <p className={styles.time}>{nextMatch.time}</p>
      </div>
      <div className={styles.matchDetails}>
        <div className={styles.teams}>
          <div className={styles.team}>
            <Avatar alt="teamPic" width="40" height="40" src={teamLogo} />
            <p>{nextMatch.homeTeam}</p>
          </div>
          <div className={styles.scores}>
            <p>0</p>
            <span className={styles.vs}>vs</span>
            <p>0</p>
          </div>
          <div className={styles.team}>
            <Avatar alt="teamPic" width="40" height="40" src={teamLogo2} />
            <p>{nextMatch.awayTeam}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextMatchCard;
