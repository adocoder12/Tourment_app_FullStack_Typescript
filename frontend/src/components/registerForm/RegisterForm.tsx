import style from "./style.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

//redux
import { useAppDispatch, useAppSelector } from "@redux/hooks/hooks";
import { register } from "@redux/services/auth";

export default function RegisterForm() {
  const [username, setUsernam] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");

  const dispath = useAppDispatch();
  const { error, message } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Password don't match");
      return;
    }
    const user = {
      username,
      email,
      password,
    };
    dispath(register(user));
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <p className={style.title}>Register </p>
        <p className={style.message}>
          Signup now and get full access to our app.
        </p>
        <label>
          <input
            className={style.input}
            type="text"
            required
            value={username}
            onChange={(e) => setUsernam(e.target.value)}
          />
          <span>Username</span>
        </label>

        <label>
          <input
            className={style.input}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            required
          />
          <span>Email</span>
        </label>

        <label>
          <input
            className={style.input}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
          <span>Password</span>
        </label>
        <label>
          <input
            className={style.input}
            type="password"
            placeholder=""
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmpassword}
            required
          />
          <span>Confirm password</span>
        </label>
        <button className={style.submit}>Submit</button>
        <p className={style.signin}>
          Already have an acount ? <Link to="/login">Signin</Link>{" "}
        </p>
        {error && <p className={style.error}>{error}</p>}
        {message && <p className={style.message}>{message}</p>}
      </form>
    </>
  );
}
