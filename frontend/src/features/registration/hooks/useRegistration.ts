import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { registerUser } from "../services/registration.service";
import { showError } from "@/shared/utils/showError";

export const useRegistration = () => {
  const mutation = useMutation({
    mutationFn: (newUser: { name: string; email: string; password: string }) =>
      registerUser(newUser),
    onSuccess: () => toast.success("Регистрация прошла успешно!"),
    onError: showError
  });

  return {
    registration: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
