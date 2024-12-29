import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { editCircle as editCircleApi } from "../../services/apiCircles";

export function useEditCircle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: editCircle,
    isLoading,
    isError,
  } = useMutation({
    mutationFn:  editCircleApi,
    onSuccess: async (circle) => {
      console.log(circle);
      toast.success("Circle edited successfully");
    //   navigate("/dashboard/circles");
      queryClient.invalidateQueries({
        queryKey: ["circles"],
      });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Error editing circle");
    },
  });

  return { editCircle, isLoading, isError };
}
