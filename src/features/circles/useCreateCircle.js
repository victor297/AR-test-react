import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createCircles as createCircleApi } from "../../services/apiCircles";

export function useCreateCircle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: createCircle,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: createCircleApi,
    onSuccess: async (circle) => {
      console.log(circle);
      toast.success("Circle created successfully");
      navigate("/dashboard/circles");
      queryClient.invalidateQueries({
        queryKey: ["circles"],
      });
    },
    onError: (err) => {
      console.log("Error", err);
    },
  });

  return { createCircle, isLoading, isError };
}
