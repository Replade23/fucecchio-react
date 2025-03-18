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
    <form className="flex flex-col items-center" onSubmit={handleSignUp}>
      <input className="border" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="border" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-blue-500 w-40 px-1 py-1 rounded-4xl" type="submit">Registrati</button>
    </form>
  );
};

export default SignUp;
