"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProfileImage from '@/components/common/ProfileImage';
import { FiLogOut } from "react-icons/fi";
import { logout as setLogout } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/auth/authApiSlice';

const Profile: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const [logout] = useLogoutMutation();

    const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
	};

    return (
        <div className="flex gap-5 justify-between px-2 mt-6 w-full text-sm leading-5 border-t border-gray-200 ">
            <div className="mt-2 grid grid-cols-7 gap-4">
                <ProfileImage user={user}/>
                <div className="col-span-5 overflow-hidden overflow-ellipsis">
                    <div className="font-semibold text-gray-900 text-sm">{user.first_name || 'Cuali'} {user.last_name }</div>
                    <div className="text-slate-600 text-xs">{user.email}</div>
                </div>
                <button className="" onClick={handleLogout}>
                    <FiLogOut className="text-slate-600" />
                </button>
            </div>
        </div>
    );
};

export default Profile;