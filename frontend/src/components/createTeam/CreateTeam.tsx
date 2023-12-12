import style from "./createTeam.module.css";
//
import { useState, useEffect } from "react";

//redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createTeam } from "@redux/services/team";
import { getCategories } from "@/redux/services/category";
//Componnents
import Avatar from "../avatar/Avatar";
import Dropdown from "../dropdown/Dropdown";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState<string>("");
  const [shortName, setShortName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [founded, setFounded] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //redux
  const dispatch = useAppDispatch();
  const { message, error } = useAppSelector((state) => state.teams);
  const { categories } = useAppSelector((state) => state.categories);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSelectCategory = (category: string) => {
    setCategory(category);
  };

  const handleSelectFile = (file: File) => {
    setSelectedFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please upload an image");
    }

    const formData = new FormData();
    formData.append("badge", selectedFile!);
    formData.append("name", teamName);
    formData.append("shortName", shortName);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("zipCode", zipCode);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("founded", founded);
    formData.append("categoryId", category);
    formData.append("userId", user?.id as string);

    dispatch(createTeam(formData)); // Pass newTeam object as argument

    setTeamName("");
    setShortName("");
    setAddress("");
    setCity("");
    setPhone("");
    setEmail("");
    setFounded("");
    setZipCode("");
    setCategory("");
  };
  return (
    <>
      <div className={style.formContainer}>
        <h2 className={style.title}>Create Team</h2>

        <div className={style.upload}>
          <Avatar
            alt="TeamPic"
            width="80"
            height="80"
            addImage={true}
            // handlePhoto={handlePhoto}
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
                onChange={(e) => setTeamName(e.target.value)}
                value={teamName}
              />
              <span>name</span>
            </label>
            <label>
              <input
                className={style.input}
                type="text"
                onChange={(e) => setShortName(e.target.value)}
                value={shortName}
                required
              />
              <span>Short name</span>
            </label>
            <label>
              <input
                className={style.input}
                type="text"
                inputMode="numeric"
                onChange={(e) => setFounded(e.target.value)}
                value={founded}
                required
              />
              <span>Founded</span>
            </label>
          </div>
          <div className={style.labelWrapper}>
            <label>
              <input
                className={style.input}
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
              />
              <span>Address</span>
            </label>
            <label>
              <input
                className={style.input}
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
              />
              <span>City</span>
            </label>
          </div>
          <div className={style.labelWrapper}>
            <label>
              <input
                className={style.input}
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
              <span>Phone</span>
            </label>
            <label>
              <input
                className={style.input}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <span>Email</span>
            </label>
          </div>
          <div className={style.labelWrapper}>
            <label>
              <input
                className={style.input}
                type="text"
                onChange={(e) => setZipCode(e.target.value)}
                value={zipCode}
                required
              />
              <span>Zip code</span>
            </label>
            <Dropdown
              setDropdownID={handleSelectCategory}
              title="Select category"
              dropdownList={categories}
            />
          </div>
          <button className={style.submit}>Create Team 🥳</button>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
}
