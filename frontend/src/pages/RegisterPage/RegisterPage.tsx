//component for register page
import RegisterForm from "@/components/registerForm/RegisterForm";

import style from "./style.module.css";

export default function RegisterPage() {
  return (
    <div className={style.container}>
      <div className={style.mesaggeWrapper}>
        <h1>Register</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima dolore
          veritatis laudantium?
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
