import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import '../LoginSignup.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(['The given email and password combination do not exist.']);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const showPass = () => {
    const password = document.querySelector('#id_password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    const eye = document.querySelector('#id_eye')
    const classy = eye.getAttribute('class') === 'far fa-eye eye' ? 'far fa-eye-slash eye' : 'far fa-eye eye';
    eye.setAttribute('class', classy)
  }




  return (
    <form className='formContainer' onSubmit={onLogin}>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='inputField'>
        <div className='errmss' />
        <input
          className='realInput'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='inputField'>
        <div className='errmss' />
        <input
          id='id_password' 
          className='passInput'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <i
          class="far fa-eye eye"
          id='id_eye'
          type='checkbox'
          onClick={showPass}
        />
      </div>
      <button disabled={password.length === 0 || email.length === 0} className='btn' type='submit'>Log In</button>
    </form>
    
  );
};

export default LoginForm;
