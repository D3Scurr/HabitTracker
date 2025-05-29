import React, {useState} from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        try{
            const response = await fetch("http://localhost:3001/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email,password})
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token',data.token);
            onLogin(data.token);
        } catch(err) {
            setError(err.message);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;