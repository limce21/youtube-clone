import React, { useEffect, useState } from 'react';
import { calcDate, viewCount } from './HomeVideo';

export default function SearchVideo({ video }) {
	const [info, setInfo] = useState();
	const [channel, setChannel] = useState();
	const [isInfoLoading, setIsInfoLoading] = useState(false);
	const [isChannelLoading, setIsChannelLoading] = useState(false);

	useEffect(() => {
		setIsInfoLoading(true);
		fetch(`data/list_by_video_information.json`)
			.then((res) => res.json())
			.then((data) => setInfo(data.items[0]))
			.finally(() => setIsInfoLoading(false));

		setIsChannelLoading(true);
		fetch(`data/list_by_channel_information.json`)
			.then((res) => res.json())
			.then((data) => setChannel(data.items[0]))
			.finally(() => setIsChannelLoading(false));
	}, []);

	if (isInfoLoading || isChannelLoading) return <p>Loading...</p>;
	return (
		<div className='flex'>
			<img className='w-96 flex justify-center mr-4 rounded-xl h-52' src={info?.snippet.thumbnails.maxres.url} />
			<div className='flex flex-col gap-y-3'>
				<div>
					<p className='text-lg font-medium'>{video?.snippet.title}</p>
					<p className='text-xs'>
						조회수 {viewCount(info?.statistics.viewCount)}회 · {calcDate(info?.snippet.publishedAt)} 전
					</p>
				</div>
				<div className='flex gap-x-2 align-middle'>
					<img className='w-6 h-6 rounded-full' src={channel?.snippet.thumbnails.high.url} />
					<span className='text-xs align-middle'>{channel?.snippet.title}</span>
				</div>
				<div className='text-xs'>{video?.snippet.description}</div>
			</div>
		</div>
	);
}
