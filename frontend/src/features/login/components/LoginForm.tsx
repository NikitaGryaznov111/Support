import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLogin } from '../hooks/useLogin';

const LoginForm = () => {
  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const { login, isLoading } = useLogin();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(user);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === 'name') {
      setUser({ ...user, name: value });
    }
    if (id === 'password') {
      setUser({ ...user, password: value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Имя
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Введите имя"
          value={user.name}
          onChange={handleInput}
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Пароль
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Введите пароль"
          value={user.password}
          onChange={handleInput}
          disabled={isLoading}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !user.name.trim() || !user.password.trim()}
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
};

export default LoginForm;
