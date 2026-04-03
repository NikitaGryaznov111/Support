import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegistration } from "../hooks/useRegistration";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { registration, isLoading } = useRegistration();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await registration(user);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "name") {
      setUser({ ...user, name: value });
    }
    if (id === "email") {
      setUser({ ...user, email: value });
    }
    if (id === "password") {
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
          htmlFor="email"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Почта
        </label>
        <Input
          id="email"
          type="text"
          placeholder="Введите электронную почту"
          value={user.email}
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
      {/* {loginMutation.isError && (
				<div className='text-sm text-red-500'>
					{loginMutation.error?.response
						? loginMutation.error.response?.data?.ERROR ?? loginMutation.error.response?.data?.message
						: 'Ошибка входа. Проверьте правильность данных.'}
				</div>
			)} */}

      <Button
        type="submit"
        className="w-full"
        disabled={
          isLoading ||
          !user.name.trim() ||
          !user.password.trim() ||
          !user.email.trim()
        }
      >
        {isLoading ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
