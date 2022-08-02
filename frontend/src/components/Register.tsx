import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import './register.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { axiosInstance } from '../config/axios';
import CloseIcon from '@mui/icons-material/Close';

const Register: React.FC<{
	setShowRegister: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowRegister }) => {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const register = async (e: any) => {
		e.preventDefault();

		const username = usernameRef?.current?.value;
		const email = emailRef?.current?.value;
		const password = passwordRef?.current?.value;

		if (username && email && password) {
			const newUser = {
				username,
				email,
				password,
			};

			try {
				await axiosInstance.post('/users/register', newUser);
				setError(false);
				setSuccess(true);
			} catch (error) {
				setError(true);
			}
		}
	};

	return (
		<div className='register'>
			<CloseIcon className='close' onClick={() => setShowRegister(false)} />
			<div className='logo'>
				<LocationOnIcon />
				Kazuha
			</div>
			<form onSubmit={register}>
				<input type='text' placeholder='username' ref={usernameRef} />
				<input type='email' placeholder='email' ref={emailRef} />
				<input type='password' placeholder='password' ref={passwordRef} />
				<button type='submit' className='registerBtn'>
					Register
				</button>
			</form>
			{success && (
				<span className='success'>Successfull. You can login now!</span>
			)}
			{error && <span className='error'>Something went wrong</span>}
		</div>
	);
};

export default Register;
