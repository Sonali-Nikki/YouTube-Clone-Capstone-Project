import { useState } from 'react';
import { IoMdClose } from "react-icons/io";

function SignIn({ setSignin, setRegister, setSignedIn, setUsername, setAvatar }) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');


    function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signin failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('avatar', data.user.avatar);

      setSignedIn(true);
      setUsername(data.user.username);
      setAvatar(data.user.avatar);

      setSignin(false);
    } catch (err) {
      setError(err.message);
    }
  };


  function close() {
        setSignin(false);
    }

    function toggle() {
        setSignin(false);
        setRegister(true);
    }

    return (
        <div className="signin-register-content">
            <IoMdClose size={20} onClick={close} className='cross' />
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <input name="username" type='text' value={formData.username} placeholder="Username" onChange={handleChange} required />
                <input name="password" type="password" value={formData.password} placeholder="Password" onChange={handleChange} required />
                <button type="submit">Sign In</button>
                {error && <p className="error">{error}</p>}
            </form>
            <button onClick={toggle}>Register</button>
        </div>
    )
}

export default SignIn;