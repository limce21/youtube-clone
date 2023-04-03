import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function HomeVideo({ video }) {
	const navigate = useNavigate();
	const { data: channel } = useQuery(['channel', video?.id], async () => {
		const res = await fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.snippet.channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
		);
		const json = await res.json();
		return json;
	});

	const onClickHandler = (e) => {
		e.preventDefault();
		navigate(`/watch/${video?.id}`);
	};

	return (
		<div className='w-96 h-80 flex flex-col justify-start gap-y-3 cursor-pointer' onClick={onClickHandler}>
			<img src={video?.snippet?.thumbnails?.maxres?.url} className='rounded-xl  hover:rounded-none ease-in duration-200' />
			<div className='flex gap-x-3 pr-8'>
				<img src={channel ? channel?.items[0]?.snippet?.thumbnails?.high?.url : ''} className='w-9 h-9 rounded-full' />
				<div className='flex flex-col gap-y-1'>
					<p className='text-base font-semibold line-clamp-2'>{video?.snippet?.title}</p>
					<div className='flex flex-col'>
						<span className='text-sm text-gray-500 font-medium'>{video?.snippet?.channelTitle}</span>
						<div>
							<span className='text-sm text-gray-500 font-medium'>
								조회수 {viewCount(video?.statistics?.viewCount)}회 · {calcDate(video?.snippet?.publishedAt)} 전
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function viewCount(view) {
	if (view >= 10000000) {
		return `${parseInt(view / 10000000)}억`;
	} else if (view >= 10000) {
		return `${parseInt(view / 10000)}만`;
	} else if (view >= 1000) {
		return `${parseInt(view / 1000)}천`;
	} else {
		return `${view}`;
	}
}

export function calcDate(date) {
	const nowDate = new Date();
	const publishedAt = new Date(date);
	const diff = nowDate - publishedAt;
	if (diff >= 1000 * 60 * 60 * 24 * 365) {
		return parseInt(diff / (1000 * 60 * 60 * 24 * 365)) + '년';
	} else if (diff >= 1000 * 60 * 60 * 24 * 30) {
		return parseInt(diff / (1000 * 60 * 60 * 24 * 30)) + '달';
	} else if (diff >= 1000 * 60 * 60 * 24 * 7) {
		return parseInt(diff / (1000 * 60 * 60 * 24 * 7)) + '주';
	} else if (diff >= 1000 * 60 * 60 * 24) {
		return parseInt(diff / (1000 * 60 * 60 * 24)) + '일';
	} else if (diff >= 1000 * 60 * 60) {
		return parseInt(diff / (1000 * 60 * 60)) + '시간';
	} else if (diff >= 1000 * 60) {
		return parseInt(diff / (1000 * 60)) + '분';
	} else {
		return '방금';
	}
}
