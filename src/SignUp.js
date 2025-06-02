import React, { useState } from 'react';

export default function SignUp()
{
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        fetch('http://localhost:3001/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                updates: [
                    {type: "SignUp", value: { email: email, password: password }}
                ]
            })
        })
        .then(res => res.json())
        .catch(err => console.error("Failed to update SignUp data: ",err));
    }


    return(
        <form onSubmit={handleSubmit}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required/>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
            <button type='submit'>Create account</button>
        </form>
    )
}