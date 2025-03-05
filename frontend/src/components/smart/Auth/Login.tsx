import { useState } from 'react';
import AuthServices from '../../../api/AuthServices';
import styles from './AuthStyles.module.scss';
import { useNavigate } from 'react-router-dom';
import { TypeAuthUser } from '../../../utils/types';
import { AxiosResponse } from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    password: '',
  });
  const handleSubmitEvent = async (event: any) => {
    event.preventDefault();
    const userLogin: AxiosResponse<TypeAuthUser> | null =
      await AuthServices.login(input);
    if (userLogin?.data.user) {
      localStorage.setItem('token', userLogin.data.accessToken);
      localStorage.setItem('userId', userLogin.data.user.userId);
      navigate(`/${userLogin.data.user.userId}`);
    } else if (
      String(userLogin?.data) === 'Пользователь с таким именем не найден'
    ) {
      alert('Такой пользователь не зарегистрирован');
    } else if (String(userLogin?.data) === 'Неверный пароль') {
      alert('Неверный пароль');
    }
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setInput({ ...input, name: value });
    }

    if (name === 'password') {
      setInput({ ...input, password: value });
    }
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmitEvent} className={styles.form}>
        <h4 className={styles.formHeader}>Вход</h4>
        <div className="form_control">
          <label htmlFor="user-name">Имя:</label>
          <input
            value={input.name}
            type="text"
            id="user-name"
            name="name"
            onChange={handleInput}
          />
        </div>
        <div className="form_control">
          <label htmlFor="password">Пароль:</label>
          <input
            value={input.password}
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
          />
        </div>

        <button type="submit" className={styles.formButton}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
