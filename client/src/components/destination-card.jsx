import {Link} from 'react-router-dom';

export const DestinationCard = ({
    id,
    image,
    title,
    location
}) => {
    return (
        <Link to={`/destination/${id}`}>
            <div className='max-w-xs bg-gray-50 rounded-2xl shadow-lg  p-4 overflow-hidden'>
                <div className='w-full h-55 bg-gray-200 overflow-hidden rounded-xl'>
                    <img src={image} alt='{title}' className='w-full h-full object-cover' />
                </div>
                <div className='p-4 flex flex-col items-center'>
                    <h3 className='text-xl font-bold text-gray-800'>{title}</h3>
                    <p className='text-gray-500 text-sm mt-1'>{location}</p>
                </div>
            </div>
        </Link>
    );
};