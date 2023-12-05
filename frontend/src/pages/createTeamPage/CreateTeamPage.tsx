import style from "./style.module.css";
//images
import svg from "@assets/GoalPic.svg";

//components
import CreateTeam from "@components/createTeam/CreateTeam";

export default function CreateTeamPage() {
  return (
    <>
      <div className={style.Container}>
        <div className={style.imgContainer}>
          <img src={svg} alt="main-img" />
        </div>
        <CreateTeam />
      </div>
    </>
  );
}
