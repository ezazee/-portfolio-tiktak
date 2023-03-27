import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import useAuthStore from '../store/authStore';
const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#2966F3] rounded';

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';

  return (
    <div>
      <div
        className='block m-2 mt-3 ml-4 text-xl xl:hidden'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='flex flex-col justify-start w-20 p-3 mb-10 border-r-2 border-gray-100 xl:w-400 xl:border-0 '>
          <div className='border-gray-200 xl:border-b-2 xl:pb-4'>
            <Link href='/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='hidden text-xl capitalize xl:block'>
                  FYP Ceunah
                </span>
              </div>
            </Link>
          </div>
          
          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
