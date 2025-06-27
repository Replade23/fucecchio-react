import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registrazione completata!");
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };

  return (
    <form className="flex py-4 gap-4 flex-col items-center" onSubmit={handleSignUp}>
      <input className="border-2 border-slate-400 rounded-lg text-slate-800 placeholder-slate-400 text-lg w-full px-2" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="border-2 border-slate-400 rounded-lg text-slate-800 placeholder-slate-400 text-lg w-full px-2" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-primary w-40 px-4 py-1 rounded-4xl cursor-pointer" type="submit">Registrati</button>
    </form>
  );
};

export default SignUp;
