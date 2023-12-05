import { Suspense } from "react";
//css
import style from "./style.module.css";
//components
import Avatar from "@/components/avatar/Avatar";
import Loader from "@/components/Loader/Loader";

//redux
import { useAppSelector } from "@/redux/hooks/hooks";

export default function TeamList() {
  const { categories } = useAppSelector((state) => state.categories);
  return (
    <>
      <div className={style.TeamsListContainer}>
        {categories && categories.length > 0 ? (
          categories!.map((category, categoryIndex) => (
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
                        path={`/teams/${team.name}`}
                        src={`${team.badge}`}
                        addImage={false}
                      />
                      <span>{team.name}</span>
                    </div>
                  </Suspense>
                ))}
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
