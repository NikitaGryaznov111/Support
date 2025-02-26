import { useState } from 'react';
import AuthServices from '../../../api/AuthServices';
const Registration = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const handleSubmitEvent = async (event: any) => {
    event.preventDefault();
    const newUser = await AuthServices.registerUser(input);
    console.log(newUser.data);
    localStorage.setItem('token', newUser.data.accessToken);
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setInput({ ...input, email: value });
    }
    if (name === 'password') {
      setInput({ ...input, password: value });
    }
  };
  return (
    <form onSubmit={handleSubmitEvent}>
      <h4>Регистрация</h4>
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

      <button type="submit" className="btn-submit">
        Click!
      </button>
    </form>
  );
};

export default Registration;
