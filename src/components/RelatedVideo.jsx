import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calcDate, viewCount } from './HomeVideo';

export default function RelatedVideo({ video }) {
	const navigate = useNavigate();
	const onClickHandler = (e) => {
		e.preventDefault();
		navigate(`/watch/${video?.id?.videoId}`);
	};

	return (
		<div className='flex gap-x-3 cursor-pointer' onClick={onClickHandler}>
			<img className='w-40 h-24 rounded-md' src={video?.snippet?.thumbnails?.maxres?.url} />
			<div className='flex flex-col gap-y-1'>
				<p className='text-sm font-semibold line-clamp-2'>{video?.snippet?.title}</p>
				<div className='flex flex-col'>
					<span className='text-xs text-gray-500 font-medium'>{video?.snippet?.channelTitle}</span>
					<div>
						<span className='text-xs text-gray-500 font-medium'>
							조회수 {viewCount(video?.statistics?.viewCount)}회 · {calcDate(video?.snippet?.publishedAt)} 전
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
