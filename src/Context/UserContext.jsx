import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.config";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserName(currentUser.displayName);
        setUserEmail(currentUser.email);
        setUserUid(currentUser.uid);
      } else {
        setUser(null);
        setUserUid(null);
        setUserName(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userUid, userName, userEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
