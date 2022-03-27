import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import DemoUser from './DemoUser';
import '../LoginSignup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();





  const onSignUp = async (e) => {
    e.preventDefault();

    
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, fullName));
      if (data) {
        setErrors(data)
      }
    }
    
  };




  //ERRORS

  //ALL FIELDS REQUIRED
  if ((!email || !username || !password || !fullName || !repeatPassword) && !errors.includes('All fields are required')) {
    errors.push('All fields are required')
    setErrors(errors)
  }
  if ((email && username && password && fullName && repeatPassword) && errors.includes('All fields are required')) {
    setErrors(errors.splice(1,0,'All fields are required'))
    
  }
  
  // PASSWORD ERRORS

  if (password !== repeatPassword && !errors.includes('Password and Confirm Password must match.')) {
    errors.push('Password and Confirm Password must match.')
    setErrors(errors)
  }
  if (password.length < 8 && !errors.includes('Password must be 8 or more characters.')) {
    errors.push('Password must be 8 or more characters.')
    setErrors(errors)
  }
  
  if (password.length >= 8 && errors.includes('Password must be 8 or more characters.')) {
    setErrors(errors.splice(1, 0, 'Password must be 8 or more characters.'))
  }
  
  if (password === repeatPassword && errors.includes('Password and Confirm Password must match.')){
    setErrors(errors.splice(1,0,'Password and Confirm Password must match.'))
  }

  //EMAIL ERRORS
  if ((!email.includes('@') || !validEmail()) && !errors.includes('Email address must be valid. (example@domain.com)')) {
    errors.push('Email address must be valid. (example@domain.com)')
    setErrors(errors)
  }
  function validEmail() {
    const splitAtEmail = email.split('@')[email.split('@').length-1]
    console.log("split at email", splitAtEmail)
    if (splitAtEmail) {
      const splitDotEmail = splitAtEmail.split('.')[splitAtEmail.split('.').length-1]
      console.log('split DOT EMAIL', splitDotEmail)
      if (splitDotEmail){
        console.log('BOOLEAN', splitDotEmail.length > 2)
        return splitDotEmail.length >= 2;
      }
    }
  }

  if (email.includes('@') && validEmail() && errors.includes('Email address must be valid. (example@domain.com)')) {
    setErrors(errors.splice(1, 0, 'Email address must be valid. (example@domain.com)'))
  }

  
  

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='divContainer'>
      <div className='spacer' />
      <div className='contContainer'>

      <div className='phoneImg' />
      <div>
      <div className='signupContainer'>
        <div className='mainTitle'>
          Friendstagram
        </div>
        <div>
          <div className='blurb'>
            Sign up to see photos
          </div>
          <div className='blurb'>
            from your friends.
          </div>
        </div>
        <div>
          <DemoUser />
        </div>
        
        <div className='orLineContainer'>
          <hr className='loginline' />
          <div className='orWord'>
            OR
          </div>
          <hr className='loginline' />
        </div>
        <form className='formContainer' onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input
              className='inputField'
              placeholder='Email'
              type='email'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <input
              className='inputField'
              placeholder='Full Name'
              type='text'
              name='fullName'
              onChange={updateFullName}
              value={fullName}
            ></input>
          </div>
          <div>
            <input
              className='inputField'
              placeholder='Username'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <input
              className='inputField'
              placeholder='Password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input
              className='inputField'
              placeholder='Repeat Password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
              {/* TOOK DISABLED OUT OF SUBMIT BUTTON */}
              {/* disabled={errors.length > 0} */}
          
          <button className='btn' type='submit'>Sign up</button>
        </form>
      </div>
      <div className='redirContainer'>
        <div className='switchdiv'>
          
          Have an account? 
          
          <NavLink to='/' exact={true} className='link' activeClassName='active'>
            Log in
          </NavLink>
          
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
