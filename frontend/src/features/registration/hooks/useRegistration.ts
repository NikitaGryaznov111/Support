import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../services/registration.service';
import { showError } from '@/shared/utils/showError';
import { ROUTES } from '@/routes/routes.config';

export const useRegistration = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newUser: { name: string; email: string; password: string }) =>
      registerUser(newUser).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Регистрация прошла успешно!');
      navigate(ROUTES.root);
    },
    onError: showError,
  });

  return {
    registration: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
