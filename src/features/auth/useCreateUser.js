import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createNewUser as createUserAPI } from "../../services/apiAuth";
export function useCreateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: createUser,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: createUserAPI,
    onSuccess: async (resp) => {
      console.log(resp);
      //   localStorage.setItem("acesssToken", JSON.stringify(resp.accessToken));
      //   dispatch(auth(resp.data));
      // navigate("/dashboard/users");
      toast.success("New User Created");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return { createUser, isLoading, isError };
}
