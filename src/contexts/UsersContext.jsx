import { createContext, useContext, useState, useEffect } from "react";
import { useGetUsers } from "../features/users/useUser";

const UsersContext = createContext();

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const { data, isLoading, error } = useGetUsers();

  useEffect(() => {
    if (data) setUsers(data?.data);
  }, [data]);

  return (
    <UsersContext.Provider value={{ users, isLoading, error }}>
      {children}
    </UsersContext.Provider>
  );
}

function useUsersContext() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("Users context was used outside the UsersProvider");
  }
  return context;
}

export { UsersProvider, useUsersContext };
