import { NavLink } from "react-router-dom";
import { useState } from "react";
//css
import style from "./header.module.css";
//icons
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

//redux
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slicer/authSlicer";

//components
import Avatar from "../avatar/Avatar";
import { Iuser } from "@/utils/interfaces/user";

interface Props {
  user: Iuser | undefined;
}

export default function Header({ user }: Props) {
  const [showLinks, setShowLinks] = useState<boolean>(false);
  const [menuClass, setMenuClass] = useState<string>("menu hidden");

  // const { id } = useParams();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];

  const handleShowLinks = () => {
    if (!showLinks) {
      setMenuClass(`${style.menu} ${style.visible}`);
    } else {
      setMenuClass(`${style.menu} ${style.hidden}`);
    }
    setShowLinks(!showLinks);
  };

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className={`${style.header}`}>
        <nav className={style.navBar}>
          {user && <Avatar alt="UserPic" width="70" height="70" />}
          <div className={style.logo}>
            <NavLink to={"/"}>Brand</NavLink>
          </div>
          <FaBars
            size={30}
            color="rgb(159, 159, 159)"
            className={style.burguerMenu}
            onClick={handleShowLinks}
          />
          {showLinks && (
            <div className={`${menuClass}`} onClick={handleShowLinks}>
              <FaX
                size={25}
                color="rgb(159, 159, 159)"
                className={style.closeMenu}
                onClick={handleShowLinks}
              />
              <ul className={style.navLinks}>
                {user ? (
                  <>
                    <li className={style.userList}>
                      <NavLink to="/teams/allTeams">Teams</NavLink>
                    </li>
                    <li className={style.userList}>
                      <NavLink to={`${user.username}/myTeam/${user.myTeam}`}>
                        my Team{" "}
                        <FaAngleLeft size={12} className={style.angleIcon} />
                      </NavLink>

                      <ul className={style.submenu}>
                        <li className={style.submenuList}>
                          <NavLink
                            to={`${user.username}/myTeam/${user.myTeam}/createTeam`}
                          >
                            create Team
                          </NavLink>
                        </li>
                        <li className={style.submenuList}>
                          <NavLink to={`${user.username}/team/updateTeam`}>
                            Update Team
                          </NavLink>
                        </li>
                        <li className={style.submenuList}>
                          <NavLink to={`${user.username}/team/delete`}>
                            Delete Team
                          </NavLink>
                        </li>
                        {/* Players links */}
                        <li className={style.submenuSecondary}>
                          <li className={style.subUserList}>
                            <NavLink
                              to={`${user.username}/myTeam/${user.myTeam}/players`}
                            >
                              Players{" "}
                              <FaAngleLeft
                                size={12}
                                className={style.angleIcon}
                              />
                            </NavLink>
                          </li>
                          <ul className={style.subUserList}>
                            <li className={style.submenuSecondaryList}>
                              <NavLink
                                to={`${user.username}/myTeam/${user.myTeam}/players/createPlayer`}
                              >
                                create Player
                              </NavLink>
                            </li>
                            <li className={style.submenuSecondaryList}>
                              <NavLink
                                to={`${user.username}/player/updatePlayer`}
                              >
                                Update Player
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>

                    <li className={style.submenuList}>
                      <NavLink onClick={handleLogout} to="/">
                        Logout
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    {navLinks.map((link) => (
                      <li>
                        <NavLink to={link.path}>{link.name}</NavLink>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
