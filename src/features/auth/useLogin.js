import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login as loginAPI } from "../../services/apiAuth";
import { useAuthContext } from "../../contexts/AuthContext";
// import { auth } from "./userSlice";

export function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: loginAPI,

    onSuccess: async (resp) => {
      console.log(resp);
      localStorage.setItem("acesssToken", JSON.stringify(resp.accessToken));
      toast.success("You are Logged In!");
      navigate("/dashboard");
    },
  });

  return { login, isLoading, isError };
}
