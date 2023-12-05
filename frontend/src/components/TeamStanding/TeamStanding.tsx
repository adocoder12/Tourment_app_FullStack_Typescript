// TeamStandings.js
import styles from "./style.module.css";

//Components
import Avatar from "../avatar/Avatar";
//img
// import teamLogo1 from "@/assets/teamsPic/EQ03_Irmaofc.png";

//interfaces
import { ITeam } from "@utils/interfaces/team";

interface Props {
  teams: ITeam[];
}

const TeamStandings = ({ teams }: Props) => {
  const tableHeaders = [
    "Team",
    "Played",
    "Won",
    "Drawn",
    "Lost",
    "Goals For",
    "Goals Against",
    "Points",
  ];

  return (
    <section className={styles.container}>
      <h2>League </h2>
      <div className={styles.scrollContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams && teams.length > 0 ? (
              teams.map((team) => (
                <tr key={team._id}>
                  <td className={styles.teamInfo}>
                    <Avatar
                      alt="TeamLogo"
                      width="50"
                      height="50"
                      src={`${team.badge}`}
                      path={`/teams/${team.name}`}
                    />
                    {team.name}
                  </td>
                  <td>{team.stats?.played}</td>
                  <td>{team.stats?.wins}</td>
                  <td>{team.stats?.draws}</td>
                  <td>{team.stats?.loses}</td>
                  <td>{team.stats?.goalsFor}</td>
                  <td>{team.stats?.goalsAgainst}</td>
                  <td>{team.stats?.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>No teams available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TeamStandings;
