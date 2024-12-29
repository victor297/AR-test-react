import { createContext, useContext, useState, useEffect } from "react";
import { useGetUsers } from "../features/users/useUser";
import { useGetCircles } from "../features/circles/useCircles";

const CirclesContext = createContext();

function CirclesProvider({ children }) {
  const [circles, setCircles] = useState([]);
  const { data, isLoading, error } = useGetCircles();

  useEffect(() => {
    if (data) setCircles(data?.data?.circles);
  }, [data]);

  return (
    <CirclesContext.Provider value={{ circles, isLoading, error }}>
      {children}
    </CirclesContext.Provider>
  );
}

function useCirclesContext() {
  const context = useContext(CirclesContext);
  if (context === undefined) {
    throw new Error("Users context was used outside the CirclesProvider");
  }
  return context;
}

export { CirclesProvider, useCirclesContext };
