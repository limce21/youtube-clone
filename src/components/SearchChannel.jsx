import React, { useEffect, useState } from 'react';
import { viewCount } from './HomeVideo';

export default function SearchChannel({ video }) {
	const [channel, setChannel] = useState();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.id.channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
		)
			.then((res) => res.json())
			.then((data) => setChannel(data.items[0]))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) return <p>Loading...</p>;
	return (
		<div className='flex'>
			<div className='w-96 flex justify-center mr-4'>
				<img className='w-32 h-32 rounded-full' src={video?.snippet.thumbnails.high.url} />
			</div>
			<div className='flex flex-col gap-y-1'>
				<p className='my-2 text-lg font-medium'>{video?.snippet.title}</p>
				<p className='text-xs'>
					{channel?.snippet.customUrl} · 구독자 {viewCount(channel?.statistics.subscriberCount)}명
				</p>
				<p className='text-xs'>{video?.snippet.description}</p>
			</div>
		</div>
	);
}
