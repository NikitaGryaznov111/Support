import { useState } from 'react';
import AuthServices from '../../../api/AuthServices';
import styles from './AuthStyles.module.scss';
import { useNavigate } from 'react-router-dom';
import { TypeAuthUser } from '../../../utils/types';
import { AxiosResponse } from 'axios';
const Registration = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleSubmitEvent = async (event: any) => {
    event.preventDefault();
    const newUser: AxiosResponse<TypeAuthUser> | null =
      await AuthServices.registerUser(input);
    if (newUser) {
      localStorage.setItem('token', newUser.data.accessToken);
      localStorage.setItem('userId', newUser.data.user.userId);
      navigate(`/${newUser.data.user.userId}`);
    } else {
      alert('Такой пользваотель уже существует');
    }
    if (input.email === '' || input.password === '' || input.name === '') {
      alert('Заполнителя поля регистрации');
    }
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setInput({ ...input, name: value });
    }
    if (name === 'email') {
      setInput({ ...input, email: value });
    }
    if (name === 'password') {
      setInput({ ...input, password: value });
    }
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmitEvent} className={styles.form}>
        <h4 className={styles.formHeader}>Регистрация</h4>
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
          <label htmlFor="user-email">Электронная почта:</label>
          <input
            value={input.email}
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
