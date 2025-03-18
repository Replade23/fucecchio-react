import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p>Benvenuto, {user.email}</p>
          <button onClick={() => signOut(auth)}>Logout</button>
        </>
      ) : (
        <p>Non sei autenticato</p>
      )}
    </div>
  );
};

export default AuthStatus;
