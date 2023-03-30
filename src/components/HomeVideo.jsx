import React from 'react';
import { useQuery } from '@tanstack/react-query';

export default function HomeVideo({ video }) {
	const { data: channel } = useQuery(['channel', video?.snippet?.channelId], async () => {
		const res = await fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.snippet.channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
		);
		const json = await res.json();
		return json;
	});

	const viewCount = (view) => {
		if (view >= 10000000) {
			return `${parseInt(view / 10000000)}억회`;
		} else if (view >= 10000) {
			return `${parseInt(view / 10000)}만회`;
		} else if (view >= 1000) {
			return `${parseInt(view / 1000)}천회`;
		} else {
			return `${view}회`;
		}
	};

	return (
		<div className='w-96 h-80 flex flex-col justify-start gap-y-3'>
			<img src={video?.snippet?.thumbnails?.maxres?.url} className='rounded-xl  hover:rounded-none ease-in duration-200' />
			<div className='flex gap-x-3 pr-8'>
				<img src={channel ? channel?.items[0]?.snippet?.thumbnails?.high?.url : ''} className='w-9 h-9 rounded-full' />
				<div className='flex flex-col gap-y-1'>
					<p className='text-base font-semibold line-clamp-2'>{video?.snippet?.title}</p>
					<div className='flex flex-col'>
						<span className='text-sm text-gray-500 font-medium'>{video?.snippet?.channelTitle}</span>
						<div>
							<span className='text-sm text-gray-500 font-medium'>조회수 {viewCount(video?.statistics?.viewCount)} · 1년 전</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
