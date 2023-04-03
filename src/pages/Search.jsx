import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchChannel from '../components/SearchChannel';
import SearchVideo from '../components/SearchVideo';

export default function Search() {
	const { keyword } = useParams();
	const [videos, setVideos] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(`data/list_by_keyword.json`)
			.then((res) => res.json())
			.then((data) => setVideos(data.items))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className='flex flex-col gap-y-4 w-9/12 mx-auto'>
			{videos?.map((video) => (video.id.kind === 'youtube#channel' ? <SearchChannel video={video} /> : <SearchVideo video={video} />))}
		</div>
	);
}
