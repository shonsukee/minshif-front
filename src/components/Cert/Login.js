import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert(`Login successflly! Hi, ${user.email}`);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorCode} - ${errorMessage}`);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p>
        You don't have an account? <Link to="/sign_up">Sign up now!!</Link>
      </p>
    </div>
  );
};

export default Login;
