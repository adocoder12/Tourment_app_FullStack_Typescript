import { Suspense } from "react";
//css
import style from "./style.module.css";
//components
import Avatar from "@/components/avatar/Avatar";
import Loader from "@/components/Loader/Loader";
//interfaces

import { Icategory } from "@/utils/interfaces/category";
// import teamLogo1 from "@/assets/teamsPic/EQ03_Irmaofc.png";

interface Props {
  categories: Icategory[];
}

export default function TeamList({ categories }: Props) {
  return (
    <>
      <div className={style.TeamsListContainer}>
        {categories.map((category, categoryIndex) => (
          <div className={style.categoryContainer} key={categoryIndex}>
            <h2 className={style.title}>{category.name}</h2>
            <div className={style.teamsGrid}>
              {category.teams!.map((team) => (
                <Suspense key={team._id} fallback={<Loader />}>
                  <div className={style.teamsItem}>
                    <Avatar
                      alt={`Team Avatar ${team.name}`}
                      width="70"
                      height="70"
                      path={`/teams/${team._id}`}
                      src={`${team.badge}`}
                      addImage={false}
                    />
                    <span>{team.name}</span>
                  </div>
                </Suspense>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
