import style from "./style.module.css";
//images
import svg from "@assets/undraw_junior_soccer_6sop 1.svg";

//components
import CreatePlayer from "@/components/createPlayer/CreatePlayer";

export default function CreateTeamPage() {
  return (
    <>
      <div className={style.Container}>
        <div className={style.imgContainer}>
          <img src={svg} alt="main-img" />
        </div>
        <CreatePlayer />
      </div>
    </>
  );
}
