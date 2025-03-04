import { useState } from 'react';
import AuthServices from '../../../api/AuthServices';
import styles from './AuthStyles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { getUser } from '../../../store/parts/authSlice';
import { TypeRegisterUser } from '../../../utils/types';
import { AxiosResponse } from 'axios';
const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleSubmitEvent = async (event: any) => {
    event.preventDefault();
    const newUser: AxiosResponse<TypeRegisterUser> | null =
      await AuthServices.registerUser(input);
    if (newUser) {
      localStorage.setItem('token', newUser.data.accessToken);
      dispatch(getUser(newUser.data));
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
    <div className={styles.registrationWrapper}>
      <form onSubmit={handleSubmitEvent} className={styles.registrationForm}>
        <h4 className={styles.registrationFormHeader}>Регистрация</h4>
        <div className="form_control">
          <label htmlFor="user-name">Name:</label>
          <input
            value={input.name}
            type="text"
            id="user-name"
            name="name"
            onChange={handleInput}
          />
          <div id="user-email" className="sr-only"></div>
        </div>
        <div className="form_control">
          <label htmlFor="user-email">Email:</label>
          <input
            value={input.email}
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            onChange={handleInput}
          />
          <div id="user-email" className="sr-only"></div>
        </div>
        <div className="form_control">
          <label htmlFor="password">Password:</label>
          <input
            value={input.password}
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
          />
          <div id="user-password" className="sr-only"></div>
        </div>

        <button type="submit" className={styles.registrationFormButton}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
