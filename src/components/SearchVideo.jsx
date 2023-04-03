import React, { useEffect, useState } from 'react';
import { calcDate, viewCount } from './HomeVideo';

export default function SearchVideo({ video }) {
	const [info, setInfo] = useState();
	const [channel, setChannel] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video.id.videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
		)
			.then((res) => res.json())
			.then((data) => {
				setInfo(data.items[0]);
				fetch(
					`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data.items[0].snippet.channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
				)
					.then((res) => res.json())
					.then((data) => {
						setChannel(data.items[0]);
					});
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) return <p>Loading...</p>;
	return (
		<div className='flex'>
			<img className='w-96 flex justify-center mr-4 rounded-xl h-52 object-cover' src={info?.snippet?.thumbnails?.maxres?.url} />
			<div className='flex flex-col gap-y-3'>
				<div>
					<p className='text-lg font-medium'>{video?.snippet?.title}</p>
					<p className='text-xs'>
						조회수 {viewCount(info?.statistics?.viewCount)}회 · {calcDate(info?.snippet?.publishedAt)} 전
					</p>
				</div>
				<div className='flex gap-x-2 align-middle'>
					<img className='w-6 h-6 rounded-full' src={channel?.snippet?.thumbnails?.high?.url} />
					<span className='text-xs align-middle'>{channel?.snippet?.title}</span>
				</div>
				<div className='text-xs'>{video?.snippet?.description}</div>
			</div>
		</div>
	);
}
