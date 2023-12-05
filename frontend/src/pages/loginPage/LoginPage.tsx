import style from "./style.module.css";

//components
import LoginForm from "../../components/loginform/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className={style.loginContainer}>
        <LoginForm />
      </div>
    </>
  );
}
