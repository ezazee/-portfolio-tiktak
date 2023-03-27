import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';

const Discover: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#2966F3] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#2966F3]';
  const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

  return (
    <div className='pb-6 xl:border-b-2 xl:border-gray-200'>
      <p className='hidden m-3 mt-4 font-semibold text-gray-500 xl:block'>
        Tag Kategori
      </p>
      <div className='flex flex-wrap gap-3'>
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}>
              <span className='text-2xl font-bold xl:text-md '>
                {item.icon}
              </span>
              <span className={`font-medium text-md hidden xl:block capitalize`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
