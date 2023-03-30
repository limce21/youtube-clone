import React from 'react';
import { useQuery } from '@tanstack/react-query';
import HomeVideo from '../components/HomeVideo';

export default function Home() {
	const {
		isLoading,
		error,
		data: videos
	} = useQuery(['hot'], async () => {
		return fetch(`data/list_by_most_popular.json`).then((res) => res.json());
	});

	return (
		<div className='flex flex-wrap justify-center gap-x-4 gap-y-10 m-5'>
			{videos?.items.map((video) => (
				<HomeVideo video={video} key={video.id} />
			))}
		</div>
	);
}
