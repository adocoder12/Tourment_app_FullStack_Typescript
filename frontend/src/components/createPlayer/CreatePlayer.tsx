import style from "./style.module.css";
import { useState, useEffect } from "react";

//redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createPlayer } from "@/redux/services/player";
import { getTeams } from "@/redux/services/team";

//component
import Dropdown from "../dropdown/Dropdown";
import Avatar from "../avatar/Avatar";

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
  //img
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //teams
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const { message, error } = useAppSelector((state) => state.players);
  const { user } = useAppSelector((state) => state.auth);

  const handleSelectGender = (genderID: string) => {
    setGender(genderID);
  };

  const handleSelectPosition = (positionID: string) => {
    setPosition(positionID);
  };
  const handleSelectFile = (file: File) => {
    setSelectedFile(file);
  };

  //submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please upload an image");
    }

    const formData = new FormData();
    formData.append("badge", selectedFile!);
    formData.append("name", name);
    formData.append("lastname", lastName);
    formData.append("nickname", nickname);
    formData.append("age", age);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("position", position);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("clubId", user!.myTeam!._id!);

    dispatch(createPlayer(formData));

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
      <div className={style.formContainer}>
        <h2 className={style.title}>Create Player</h2>
        <div className={style.upload}>
          <Avatar
            alt="playerPic"
            width="80"
            height="80"
            addImage={true}
            handleSelectFile={handleSelectFile}
          />
        </div>
        <form
          className={style.form}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
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
      </div>
    </>
  );
}
