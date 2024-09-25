import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";

const useSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const registerUser = async (values) => {
        if(values.password !== values.passwordConfirm) {
            return setError('Password are not the same');

        }

        try {
            setError(null);
            setLoading(true);
            const res = await fetch('https://authentication-app-server.vercel.app/signup', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.status === 201) {
                message.success(data.message);
                login(data.toke, data.user);
            } else if (res.status === 400) {
                setError(data.message);
            } else {
                message.error('Register failed');
            }
        } catch (error) {
            message.error(error);
        } finally {
            setLoading(false);
        }
    }
  return {loading, error, registerUser};
}

export default useSignup
