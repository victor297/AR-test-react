import { useQuery } from "@tanstack/react-query";
import { getCircles, getCirclesAlone } from "../../services/apiCircles";

export function useGetCircles() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["circles"],
    queryFn: getCircles,
    cacheTime: 30 * 2500,
    // refetchInterval:1500
  });
  return { data, isLoading, error };
}

export function useGetCirclesAlone() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["circles"],
    queryFn: getCirclesAlone,
    cacheTime: 30 * 1000,
    // refetchInterval: 10000
  });
  return { data, isLoading, error };
}
