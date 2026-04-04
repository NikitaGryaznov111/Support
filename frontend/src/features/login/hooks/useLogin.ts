import { useMutation } from '@tanstack/react-query';
import { showError } from '@/shared/utils/showError';
import { loginUser } from '../services/login.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (user: { name: string; password: string }) =>
      loginUser(user).then((res) => res.data),
    onSuccess: (user) => {
      // TODO В случае продакшна поменяй сохранение токена
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('userId', user.user.userId);
      navigate('/');
      toast.success('Вы вошли в систему!');
    },
    onError: showError,
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
