import React from 'react';
import { NextPage } from 'next';
import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ items, mt }: { items: string[], mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: string) => (
      <p key={item} className='text-sm text-gray-400 cursor-pointer hover:underline' >
        {item}
      </p>
    ))}
  </div>
);

const Footer: NextPage = () => (
  <div className='hidden mt-6 xl:block'>
    <List items={footerList1} mt={false} />
    <List items={footerList2} mt />
    <List items={footerList3} mt />
    <p className='mt-5 text-sm text-gray-400'>© 2023 Ezazee</p>
  </div>
);

export default Footer;
