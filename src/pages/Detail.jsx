import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { calcDate, viewCount } from '../components/HomeVideo';
import RelatedVideo from '../components/RelatedVideo';
import Youtube from 'react-youtube';

export default function Detail() {
	const { videoId } = useParams();
	const [video, setVideo] = useState([]);
	const [channel, setChannel] = useState();
	useEffect(() => {
		fetch(
			// `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
			`data/list_by_video_information.json`
		)
			.then((res) => res.json())
			.then((data) => {
				setVideo(data.items[0]);
				fetch(
					// `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data.items[0].snippet.channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
					`data/list_by_channel_information.json`
				)
					.then((res) => res.json())
					.then((data) => {
						setChannel(data.items[0]);
					});
			});
	}, [videoId]);

	const [isClick, setIsClick] = useState(false);

	const onClickHandler = () => {
		setIsClick((prev) => !prev);
	};

	const { data: relatedVideos } = useQuery(['relatedVideos', videoId], async () => {
		return await fetch(
			// `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&relatedToVideoId=${videoId}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
			`data/list_by_related_video.json`
		).then((res) => res.json());
	});

	return (
		<div className='flex p-6 justify-start flex-wrap w-auto gap-x-7'>
			<div className='flex flex-col w-8/12 gap-3 h-screen'>
				<Youtube videoId={video?.id} style={{ width: '100%', height: '70%' }} opts={{ width: '100%', height: '100%' }} />
				<div className='text-xl font-semibold'>{video?.snippet?.title}</div>
				<div className='flex gap-3'>
					<img src={channel?.snippet?.thumbnails?.high?.url} className='w-10 h-10 rounded-full' />
					<div className='flex flex-col'>
						<span className='text-base font-semibold'>{video?.snippet?.channelTitle}</span>
						<span className='text-xs text-slate-600'>구독자 {viewCount(channel?.statistics?.subscriberCount)}명</span>
					</div>
				</div>
				<div className={`w-auto bg-gray-100 rounded-xl ${isClick ? '' : 'hover:bg-gray-200'} p-3 text-sm leading-relaxed mb-2`} onClick={onClickHandler}>
					<p>
						조회수 <span className='font-semibold'>{viewCount(video?.statistics?.viewCount)}</span>
						{'회 '}
						<span className='font-semibold'>{calcDate(video?.snippet?.publishedAt)}</span> 전
					</p>
					<p className={`${isClick ? 'mb-3' : 'line-clamp-2'} whitespace-pre-wrap`}>{video?.snippet?.description}</p>
					<span>&nbsp;&nbsp;{isClick ? '간략히' : '더보기'}</span>
				</div>
				<span>댓글 {video?.statistics?.commentCount}개</span>
			</div>
			<div className='w-96 flex-shrink-0 flex flex-col gap-y-2'>
				{relatedVideos?.items?.map((video) => (
					<RelatedVideo video={video} />
				))}
			</div>
		</div>
	);
}
