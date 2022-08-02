import StarIcon from '@mui/icons-material/Star';
import React, { Dispatch, SetStateAction } from 'react';
import { Popup } from 'react-map-gl';
import TimeAgo from 'react-timeago';
import { Pin } from '../models/Pin';

const PopupCard: React.FC<{
	pin: Pin;
	setCurrentPlaceId: Dispatch<SetStateAction<string>>;
}> = ({ pin, setCurrentPlaceId }) => {
	const Stars = () => {
		let list = [];
		for (let i = 0; i < Array(pin.rating).length; i++) {
			list.push(<StarIcon className='star' key={i} />);
		}

		return <>{list.map((l) => l)}</>;
	};

	return (
		<Popup
			longitude={pin.longitude}
			latitude={pin.latitude}
			anchor='top'
			onClose={() => setCurrentPlaceId('')}
		>
			<div className='card'>
				<label>Place</label>
				<h4 className='place'>{pin.title}</h4>
				<label>Review</label>
				<p className='desc'>{pin.desc}</p>
				<label>Rating</label>
				<div className='stars'>
					<Stars></Stars>
				</div>
				<label>Information</label>
				<span className='username'>
					Created by <b>{pin.username}</b>
				</span>
				<span className='date'>
					<TimeAgo date={pin.createdAt} />
				</span>
			</div>
		</Popup>
	);
};

export default PopupCard;
