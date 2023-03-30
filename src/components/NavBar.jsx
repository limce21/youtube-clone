import React from 'react';
import { Logo } from './icons/Logo';
import { BsSearch, BsFillMicFill, BsKeyboardFill } from 'react-icons/bs';
import { RiVideoUploadLine } from 'react-icons/ri';
import { AiOutlineBell } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import Profile from './Profile';

export default function NavBar() {
	return (
		<div className='flex justify-between h-16 px-5'>
			<div className='flex items-center gap-x-3'>
				<RxHamburgerMenu size='24' />
				<div className='flex items-center'>
					<Logo />
					<span className='font-logo text-xl text-base-light'>YouTube</span>
				</div>
			</div>
			<div className='flex items-center gap-x-5 w-2/5'>
				<div className='flex items-center border border-border-light rounded-full pl-4 w-full h-10 justify-between overflow-hidden'>
					<input type='text' className='w-72 focus:outline-none' placeholder='검색' />
					<button className='px-5 h-10 border-l border-border-light bg-slate-100 hover:bg-slate-200'>
						<BsSearch size='20' />
					</button>
				</div>
				<BsFillMicFill size='20' />
			</div>
			<div className='flex items-center gap-x-5'>
				<RiVideoUploadLine size='28' />
				<AiOutlineBell size='28' />
				<Profile size='32' />
			</div>
		</div>
	);
}
