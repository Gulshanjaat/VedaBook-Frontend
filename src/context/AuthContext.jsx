import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [conversationId,
    setConversationId] =
    useState(null);

  const [selectedPDFs,
    setSelectedPDFs] =
    useState([]);

  const [selectedTexts,
    setSelectedTexts] =
    useState([]);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (
      storedUser &&
      storedUser !== "undefined"
    ) {

      setUser(
        JSON.parse(storedUser)
      );

    }

    setLoading(false);

  }, []);

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    setConversationId(null);

    setSelectedPDFs([]);

    setSelectedTexts([]);

  };

  return (

    <AuthContext.Provider
      value={{

        user,

        setUser,

        loading,

        logout,

        conversationId,

        setConversationId,

        selectedPDFs,

        setSelectedPDFs,

        selectedTexts,

        setSelectedTexts,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth =
() => useContext(AuthContext);