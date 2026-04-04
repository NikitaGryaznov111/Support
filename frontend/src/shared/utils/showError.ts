import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const showError = (
  error: AxiosError<{ ERROR?: string; message?: string }>,
) => {
  const message =
    error?.response?.data?.ERROR ||
    error?.response?.data?.message ||
    error?.message ||
    'Ошибка';
  return toast.error(message);
};
