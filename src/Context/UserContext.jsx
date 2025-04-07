// Libraries Imports
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// Local Imports
import { auth } from "../Config/firebase.config";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setIsUser(true);
        setUser(currentUser);
        console.log(isUser);
      } else {
        setUser(null);
        setIsUser(false);
        console.log(isUser);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserContextProvider };
