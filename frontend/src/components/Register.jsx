// importing necessaary hooks and components
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";

function Register({ setSignin, setRegister }) {

// state variable to store register form data and error
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: ''
  });
  const [error, setError] = useState('');

// function to update form data when the user types
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// function to submit register form
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setRegister(false);
    } catch (err) {
      setError(err.message);
    }
  };

// function to close form
    function close() {
        setRegister(false);
    }

// function to toggle between register form and sign in form
    function toggle() {
        setRegister(false);
        setSignin(true);
    }

// rendering register from
    return (
        <div className="signin-register-content">
            <IoMdClose size={20} onClick={close} className='cross' />
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input name="avatar" placeholder="Avatar URL" onChange={handleChange} />
                <button type="submit">Register</button>
                {error && <p className="error">{error}</p>}
            </form>
            <button onClick={toggle}>Sign In</button>
        </div>
    )
}

export default Register;