import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import './app.scss';
import Login from './components/Login';
import PopupCard from './components/PopupCard';
import Register from './components/Register';
import { axiosInstance } from './config/axios';
import { Pin } from './models/Pin';
import { User } from './models/User';

type coordinate = {
	longitude: number;
	latitude: number;
};

const App = () => {
	const userFromStorage = localStorage.getItem('user');

	const [currentUser, setCurrentUser] = useState<User | null>(
		userFromStorage && JSON.parse(userFromStorage),
	);

	const [pins, setPins] = useState<Pin[]>([]);
	const [currentPlacedId, setCurrentPlaceId] = useState('');
	const [newPlace, setNewPlace] = useState<coordinate | null>(null);
	const [title, setTitle] = useState<string>('');
	const [desc, setDesc] = useState<string>('');
	const [rating, setRating] = useState<number>(0);

	const [showRegister, setShowRegister] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

	const [viewport, setViewport] = useState({
		longitude: 96.1351,
		latitude: 16.8,
		zoom: 15,
	});

	useEffect(() => {
		if (userFromStorage) setCurrentUser(JSON.parse(userFromStorage));
	}, [userFromStorage]);

	useEffect(() => {
		const fetchAllPins = async () => {
			const res = await axiosInstance.get('/pins');

			setPins(res.data);
		};

		fetchAllPins();
	}, []);

	const onMapClick = (e: any) => {
		const { lng, lat } = e.lngLat;

		setNewPlace({
			longitude: lng,
			latitude: lat,
		});
	};

	const handleMarkerClick = (
		pinId: string,
		latitude: number,
		longitude: number,
	) => {
		setCurrentPlaceId(pinId);

		console.log(pinId);

		// Center popup
		setViewport({
			...viewport,
			latitude,
			longitude,
		});
	};

	const handleAddNew = async (e: any) => {
		e.preventDefault();

		const newPin = {
			username: currentUser,
			title,
			desc,
			rating,
			...newPlace,
		};

		try {
			const res = await axiosInstance.post(`/pins`, newPin);

			// Add New Pin
			setPins([...pins, res.data]);

			setNewPlace(null);
		} catch (error) {}
	};

	const handleLogout = () => {
		localStorage.setItem('user', '');

		setCurrentUser(null);
	};

	return (
		<div className='app'>
			<span>{currentPlacedId}</span>
			<div className='navbar'>
				<div className='buttonsContainer'>
					{currentUser?.username ? (
						<button onClick={handleLogout} className='button'>
							Log Out
						</button>
					) : (
						<div className='buttons'>
							<button onClick={() => setShowLogin(true)} className='button'>
								Login
							</button>
							<button className='button' onClick={() => setShowRegister(true)}>
								Register
							</button>
						</div>
					)}
				</div>
			</div>
			<Map
				initialViewState={viewport}
				mapboxAccessToken={process.env.REACT_APP_MPABOX}
				style={{ width: '100vw', height: '100vh', position: 'absolute' }}
				mapStyle='mapbox://styles/mapbox/streets-v9'
				onDblClick={onMapClick}
			>
				{pins.map((pin) => (
					<div key={pin._id}>
						<Marker
							longitude={pin.longitude}
							latitude={pin.latitude}
							anchor='bottom'
						>
							<LocationOnIcon
								style={{
									fontSize: 80,
									color:
										pin.username === currentUser?.username
											? 'tomato'
											: 'slateblue',
									cursor: 'pointer',
								}}
								onClick={() =>
									handleMarkerClick(pin._id, pin.latitude, pin.longitude)
								}
							/>
						</Marker>
						{currentPlacedId === pin._id && (
							<PopupCard pin={pin} setCurrentPlaceId={setCurrentPlaceId} />
						)}
					</div>
				))}
				{newPlace && (
					<Popup
						longitude={newPlace.longitude}
						latitude={newPlace.latitude}
						anchor='left'
						onClose={() => setNewPlace(null)}
					>
						<form onSubmit={handleAddNew}>
							<label>Title</label>
							<input
								type='text'
								placeholder='Enter title'
								onChange={(e) => setTitle(e.target.value)}
							/>
							<label>Review</label>
							<textarea
								placeholder='say us something about this place'
								onChange={(e) => setDesc(e.target.value)}
							></textarea>
							<label>Rating</label>
							<select onChange={(e) => setRating(+e.target.value)}>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
							</select>
							<button type='submit' className='submitBtn'>
								Add Pin
							</button>
						</form>
					</Popup>
				)}
			</Map>
			{showRegister && <Register setShowRegister={setShowRegister} />}
			{showLogin && <Login setShowLogin={setShowLogin} />}
		</div>
	);
};

export default App;
