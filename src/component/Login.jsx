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
    <form className="flex space-y-1 flex-col items-center" onSubmit={handleLogin}>
      <input className="border" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="border" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-blue-500 w-40 px-1 py-1 rounded-4xl" type="submit">Accedi</button>
    </form>
  );
};

export default Login;
