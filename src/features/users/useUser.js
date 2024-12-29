import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiRegUsers";

export function useGetUsers() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    cacheTime: "30 * 1000",
  });
  return { data, isLoading, error };
}
