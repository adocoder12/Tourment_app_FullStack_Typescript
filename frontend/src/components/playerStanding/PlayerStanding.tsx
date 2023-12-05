// PlayerStandings.js

import styles from "./PlayerStandings.module.css";
import Avatar from "../avatar/Avatar";

//interfaces
// import { IPlayer } from "@utils/interfaces/players";
import { ITeam } from "@utils/interfaces/team";

interface Props {
  players: ITeam["players"];
  playerIdHandler: (id: string) => void;
}

const PlayerStandings = ({ players, playerIdHandler }: Props) => {
  const tableHeaders = [
    "Player",
    "Matches Played",
    "Goals",
    "Assists",
    "Red Cards",
    "Yellow Cards",
  ];

  const handleSelect = (id: string) => {
    playerIdHandler(id);
    console.log(id);
  };
  return (
    <section className={styles.container}>
      <h2>Players</h2>
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
            {players?.map((player) => (
              <tr key={player._id} onClick={() => handleSelect(player._id!)}>
                <td className={styles.playerInfo}>
                  {/* <img
                    src={`player-avatar-${player.id}.png`}
                    alt={`Player Avatar ${player.name}`}
                    className={styles.playerAvatar}
                  /> */}
                  <Avatar
                    alt="UserPic"
                    width="40"
                    height="40"
                    path={`/player/${player._id}`}
                  />
                  {player.name}
                </td>
                <td>{player.stats?.matchesPlayed}</td>
                <td>{player.stats?.goals}</td>
                <td>{player.stats?.assists}</td>
                <td>{player.stats?.redCards}</td>
                <td>{player.stats?.yellowCards}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PlayerStandings;
