import React from 'react';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    image?: string;
}


export default function ProfileImage({ user }: { user: User }) {
    if (user.image) {
        return <img className="rounded-full" src={user.image} alt="Profile Image" />;
    }

    return (
        <div className="bg-purple text-white flex items-center justify-center w-7 h-7 rounded-full mt-1">
            <span className="text-white">{user?.first_name ? user.first_name[0] : user.username[0]}</span>
        </div>
    );
};