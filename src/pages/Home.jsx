import React from 'react';
import { useQuery } from '@tanstack/react-query';
import HomeVideo from '../components/HomeVideo';

export default function Home() {
	const { isLoading, data: videos } = useQuery(['hot'], async () => {
		return fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=KR&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
		).then((res) => res.json());
	});

	if (isLoading) return <div>isLoading</div>;
	return (
		<div className='flex flex-wrap justify-center gap-x-4 gap-y-10 m-5'>
			{videos?.items.map((video) => (
				<HomeVideo video={video} key={video.id} />
			))}
		</div>
	);
}
