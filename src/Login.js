import React, {useState} from "react";

function Login({ onLogin, sendMessage }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleUsername = async (email) => {
    try {
        const res = await fetch("http://localhost:3001/api");
        const data = await res.json();

        for (const item of data.LoginData) {
            if (item.email === email) {
                setUsername(item.username); // still set state for internal use
                return item.username; // return it for external use
            }
        }
    } catch (err) {
        console.error("Failed to fetch Username:", err);
    }
};

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        try{
            const response = await fetch("http://localhost:3001/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,email,password})
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token',data.token);
            onLogin(data.token);

            const fetchedUsername = await handleUsername(email);
            if(fetchedUsername){
                sendMessage(fetchedUsername);
            }

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