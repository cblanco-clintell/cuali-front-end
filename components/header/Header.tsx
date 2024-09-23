import React from 'react';

interface CreditProps {
  amount: number;
  color: string;
}

interface UserAvatarProps {
  src: string;
}

const Credit: React.FC<CreditProps> = ({ amount, color }) => (
  <div className="flex gap-3 items-center self-stretch px-2 my-auto text-xs font-semibold text-slate-700">
    <div className={`flex shrink-0 self-stretch my-auto w-3 h-3 ${color} rounded-full`} />
    <div className="self-stretch my-auto">{amount} credits</div>
  </div>
);

const UserAvatar: React.FC<UserAvatarProps> = ({ src }) => (
  <div className="flex items-center self-stretch px-2 my-auto w-14">
    <div className="flex gap-3 items-center self-stretch my-auto w-10">
      <img loading="lazy" src={src} alt="User avatar" className="object-contain self-stretch my-auto w-10 aspect-square min-h-[40px]" />
    </div>
  </div>
);

const Header: React.FC = () => {
  return (
    <header className="flex flex-col justify-between px-8 max-md:px-5">
      <nav className="flex flex-col justify-between w-full min-h-[62px] max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
          <h1 className="flex gap-6 items-center self-stretch my-auto text-base font-semibold text-gray-900 whitespace-nowrap">
            <div className="flex gap-2 items-center self-stretch my-auto">
              <div className="gap-3 self-stretch my-auto">Overview</div>
            </div>
          </h1>
          <div className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
            <div className="flex flex-col self-stretch px-2 my-auto text-base text-gray-500 whitespace-nowrap w-[100px]">
              <div className="flex flex-col w-full">
                <div className="flex flex-col items-start">
                  <div className="flex flex-col">
                    <button className="flex gap-1 items-center px-3.5 py-2.5 rounded-lg">
                      <span className="gap-2 self-stretch my-auto">Updates</span>
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f288935232c2b601ff5bd7f94908d897dfaab83742491521bc37030849a2b7c?placeholderIfAbsent=true&apiKey=f7e29149ec0d4a46a228424b3e258d04" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Credit amount={120} color="bg-lime-300 fill-lime-300" />
            <UserAvatar src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5801b2d62176613f944407e739c1e9c398bcff4dd3c311aac2dadfc6f7a6c30?placeholderIfAbsent=true&apiKey=f7e29149ec0d4a46a228424b3e258d04" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;