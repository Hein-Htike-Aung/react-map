import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import './register.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { axiosInstance } from '../config/axios';
import CloseIcon from '@mui/icons-material/Close';

const Login: React.FC<{
	setShowLogin: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowLogin }) => {
	const [error, setError] = useState(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const register = async (e: any) => {
		e.preventDefault();

		const email = emailRef?.current?.value;
		const password = passwordRef?.current?.value;

		if (email && password) {
			try {
				const res = await axiosInstance.post('/users/login', {
					email,
					password,
				});

				localStorage.setItem('user', JSON.stringify(res.data));

				setShowLogin(false);
				setError(false);
			} catch (error) {
				setError(true);
			}
		}
	};

	return (
		<div className='register'>
			<CloseIcon className='close' onClick={() => setShowLogin(false)} />
			<div className='logo'>
				<LocationOnIcon />
				Kazuha
			</div>
			<form onSubmit={register}>
				<input type='email' placeholder='email' ref={emailRef} />
				<input type='password' placeholder='password' ref={passwordRef} />
				<button type='submit' className='registerBtn'>
					Login
				</button>
			</form>
			{error && <span className='error'>Something went wrong</span>}
		</div>
	);
};

export default Login;
