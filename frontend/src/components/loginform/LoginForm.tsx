import style from "./style.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

//redux
import { useAppDispatch, useAppSelector } from "@redux/hooks/hooks";
import { login } from "@redux/services/auth";
export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispath = useAppDispatch();
  const { error, message } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    dispath(login(user));

    setUsername("");
    setPassword("");
  };
  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <p className={style.title}>Login</p>
        <label>
          <input
            className={style.input}
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <span>Username</span>
        </label>

        <label>
          <input
            className={style.input}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span>Password</span>
        </label>

        <button className={style.submit}>Submit</button>
        <p className={style.signin}>
          Dont you have an acount ? <Link to="/register">SignUp</Link>{" "}
        </p>
        {error && <p className={style.error}>{error}</p>}
        {message && <p className={style.message}>{message}</p>}
      </form>
    </>
  );
}
