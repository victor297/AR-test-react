import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { assignCircleToUser as assignCircleAPI } from "../../services/apiCircles";

export function useAssignCircle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: assignCircleToUser,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: assignCircleAPI,
    onSuccess: async (resp) => {
      console.log(resp);
      toast.success("Circle assigned to user successfully");
      navigate("/dashboard/circles");
      queryClient.invalidateQueries({
        queryKey: ["circles"],
      });
    },
    onError: (err) => {
      console.log("Error", err);
    },
  });

  return { assignCircleToUser, isLoading, isError };
}
