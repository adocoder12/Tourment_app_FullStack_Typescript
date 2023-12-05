import style from "./style.module.css";
import { useState, useEffect } from "react";

//redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createPlayer } from "@/redux/services/player";
import { getTeams } from "@/redux/services/team";

//interfaces
import { IPlayer } from "@/utils/interfaces/players";

//component
import Dropdown from "../dropdown/Dropdown";

export default function CreateTeam() {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  //   const [teamID, setTeam] = useState<string>("");

  const dispatch = useAppDispatch();
  //   const { teams } = useAppSelector((state) => state.teams);
  const { message, error } = useAppSelector((state) => state.players);
  const { user } = useAppSelector((state) => state.auth);

  console.log(user?.myTeam);
  //   const handleSelectTeam = (teamID: string) => {
  //     setTeam(teamID);
  //   };

  const handleSelectGender = (genderID: string) => {
    setGender(genderID);
  };

  const handleSelectPosition = (positionID: string) => {
    setPosition(positionID);
  };

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  console.log("user team id " + user?.myTeam?._id);
  console.log("user tea," + user?.myTeam);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPlayer: IPlayer = {
      name: name,
      lastname: lastName,
      nickname: nickname,
      age: parseInt(age),
      height: height,
      weight: weight,
      position: position,
      gender: gender,
      phone: phone,
      email: email,
      number: parseInt(number),
      teamId: user!.myTeam!._id!,
    };

    console.log(newPlayer);

    dispatch(createPlayer(newPlayer));

    setName("");
    setLastName("");
    setNickname("");
    setAge("");
    setHeight("");
    setWeight("");
    setPosition("");
    setGender("");
    setPhone("");
    setEmail("");
    setNumber("");
  };
  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <h2 className={style.title}>Create Player</h2>
        <div className={style.labelWrapper}>
          <label>
            <input
              className={style.input}
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <span>name</span>
          </label>
          <label>
            <input
              className={style.input}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
            <span>Lastname</span>
          </label>
          <label>
            <input
              className={style.input}
              type="text"
              inputMode="numeric"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              required
            />
            <span>Age</span>
          </label>
        </div>
        <div className={style.labelWrapper}>
          <label>
            <input
              className={style.input}
              type="text"
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
              maxLength={20}
              required
            />
            <span>nickname</span>
          </label>
          <label>
            <input
              className={style.input}
              type="text"
              inputMode="numeric"
              onChange={(e) => setNumber(e.target.value)}
              maxLength={2}
              value={number}
              required
            />
            <span>number</span>
          </label>
        </div>
        <div className={style.labelWrapper}>
          <label>
            <input
              className={style.input}
              type="text"
              inputMode="numeric"
              onChange={(e) => setHeight(e.target.value)}
              value={height}
              maxLength={3}
              required
            />
            <span>height</span>
          </label>
          <label>
            <input
              className={style.input}
              type="text"
              inputMode="numeric"
              onChange={(e) => setWeight(e.target.value)}
              maxLength={3}
              value={weight}
              required
            />
            <span>weight</span>
          </label>
        </div>
        <div className={style.labelWrapper}>
          <label>
            <input
              className={style.input}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              maxLength={20}
              required
            />
            <span>Email</span>
          </label>
          <label>
            <input
              className={style.input}
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              inputMode="numeric"
              maxLength={10}
              required
            />
            <span>Phone</span>
          </label>
        </div>
        <div className={style.labelWrapper}>
          {/* <Dropdown
            setDropdownID={handleSelectTeam}
            title="Select Team"
            dropdownList={
              teams?.map((team) => ({
                id: team._id!,
                name: team.name!,
              })) || []
            }
          /> */}
          <Dropdown
            setDropdownID={handleSelectGender}
            title="Select gender"
            dropdownList={[
              { id: "male", name: "male" },
              { id: "female", name: "female" },
            ]}
          />
          <Dropdown
            setDropdownID={handleSelectPosition}
            title="Select position"
            dropdownList={[
              { id: "Goalkeeper", name: "Goalkeeper" },
              { id: "Defender", name: "Defender" },
              { id: "Midfielder", name: "Midfielder" },
              { id: "Forward", name: "Forward" },
            ]}
          />
        </div>
        <button className={style.submit}>Create Player 🥳</button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </>
  );
}
