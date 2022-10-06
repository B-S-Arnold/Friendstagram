import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import DemoUser from './DemoUser';
import '../LoginSignup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [emailerrors, setemailerrors] = useState([])
  const [passerrors, setpasserrors] = useState([])
  const [allerrors, setallerrors] = useState([])
  const [unerrors, setunerrors] = useState([])
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

  if (username.includes(' ') && !unerrors.includes('Username cannot have a space.')) {
    unerrors.push('Username cannot have a space.')
    setunerrors(unerrors)
  }
  if (!username.includes(' ') && unerrors.includes('Username cannot have a space.')) {
    setunerrors(unerrors.splice(1, 0, 'Username cannot have a space.'))
  }

  if (username.length > 30 && !unerrors.includes('Username must cannot be over 30 characters')) {
    unerrors.push('Username must cannot be over 30 characters')
    setunerrors(unerrors)
  }
  if (username.length <= 30 && unerrors.includes('Username must cannot be over 30 characters')) {
    setunerrors(unerrors.splice(1, 0, 'Username must cannot be over 30 characters'))
  }

  //ERRORS

  //ALL FIELDS REQUIRED
  if ((!email || !username || !password || !fullName || !repeatPassword) && !allerrors.includes('All fields are required')) {
    allerrors.push('All fields are required')
    setallerrors(allerrors)
  }
  if ((email && username && password && fullName && repeatPassword) && allerrors.includes('All fields are required')) {
    setallerrors(allerrors.splice(1,0,'All fields are required'))
  }
  
  // PASSWORD ERRORS

  if (password !== repeatPassword && !passerrors.includes('Password and Repeat Password must match.')) {
    passerrors.push('Password and Repeat Password must match.')
    setpasserrors(passerrors)
  }
  if ((password.length < 8 || password.length > 25) && !passerrors.includes('Password must be between 8 and 25 characters.')) {
    passerrors.push('Password must be between 8 and 25 characters.')
    setpasserrors(passerrors)
  }
  
  if (password.length >= 8 && password.length <= 25 && passerrors.includes('Password must be between 8 and 25 characters.')) {
    setpasserrors(passerrors.splice(1, 0, 'Password must be between 8 and 25 characters.'))
  }
  
  if (password === repeatPassword && passerrors.includes('Password and Repeat Password must match.')){
    setpasserrors(passerrors.splice(1,0,'Password and Repeat Password must match.'))
  }

  //EMAIL ERRORS
  function validEmail() {
    const splitAtEmail = email.split('@')[email.split('@').length-1]
    // console.log("split at email", splitAtEmail)
    if (splitAtEmail) {
      const splitDotEmail = splitAtEmail.split('.')[splitAtEmail.split('.').length-1]
      // console.log('split DOT EMAIL', splitDotEmail)
      if (splitDotEmail){
        // console.log('BOOLEAN', splitDotEmail.length > 2)
        return splitDotEmail.length >= 2;
      }
    }
  }

  if ((!email.includes('@') || email.length > 250 || !validEmail()) && !emailerrors.includes('Email address must be valid and under 250 characters.')) {
    emailerrors.push('Email address must be valid and under 250 characters.')
    setemailerrors(emailerrors)
  }

  if (email.includes('@') && email.length <= 250 && validEmail() && emailerrors.includes('Email address must be valid and under 250 characters.')) {
    setemailerrors(emailerrors.splice(1, 0, 'Email address must be valid and under 250 characters.'))
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
    return <Navigate to='/' />;
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
          <div className='errors '>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
              <div className='errors'>
                {allerrors.map((error, ind) => (
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
              disabled={errors.length > 0}
          
          <button className='btn' disabled={allerrors.length>0 || passerrors.length>0 || emailerrors.length>0 || unerrors.length>0} type='submit'>Sign up</button>
        </form>
      </div>
      <div className='redirContainer'>
        <div className='switchdiv'>
          
          Have an account? 
          
          <NavLink to='/' exact={'true'} className='link' >
            Log in
          </NavLink>
          
        </div>
        </div>
        <div className='errcont'>
        {passerrors?.length>0?
          <div className='errors passerr'>
            {passerrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div> : <></>}
          {emailerrors?.length>0? <div className='errors emerr'>
            {emailerrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>: <></>}
          {unerrors?.length > 0 ? <div className='errors unerr'>
            {unerrors.map((error, ind) => (
              <div key={ind}>{error}</div>
              ))}
            </div> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
