import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login effettuato!");
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };

  return (
    <form className="flex py-4 gap-4 flex-col items-center" onSubmit={handleLogin}>
      <input className="pl-2 border" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="pl-2 border" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-primary w-40 px-4 py-1 rounded-4xl cursor-pointer" type="submit">Accedi</button>
    </form>
  );
};

export default Login;
