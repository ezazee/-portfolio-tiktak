import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '@/store/authStore';
import { client } from '@/utils/client';

import { topics } from '@/utils/constants';
import { BASE_URL } from '@/utils';

const Upload = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setvideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false)
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState(topics[0].name);
    const [savingPost, setSavingPost] = useState(false);
    const { userProfile } : { userProfile: any } = useAuthStore();
    const router = useRouter();

    const uploadVideo = async(e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

        if(fileTypes.includes(selectedFile.type)){
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            })
            .then((data) => {
                setvideoAsset(data);
                setIsLoading(false);
            })
        } else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    }

    const handlePost = async () => {
        if(caption && videoAsset?._id && category) {
            setSavingPost(true);

            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }

            await axios.post(`${BASE_URL}/api/post`, document);

            router.push('/');
        }
    }

  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
        <div className='bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6'>
            <div className=''>
                <div>
                    <p className='text-2xl font-bold'>Upload Video</p>
                    <p className='mt-1 text-gray-400 text-md'>Post Video Untuk Akun Mu</p>
                </div>
                <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-blue-300 hover:bg-gray-100'>
                    {isLoading ? (
                        <p>Uploading....</p>
                    ) : (
                        <div>
                            {videoAsset ? (
                                <div>
                                    <video
                                    src={videoAsset.url}
                                    loop
                                    controls
                                    className='rounded-xl h-[450px] mt-16 bg-black'
                                    >

                                    </video>
                                </div>
                            ) : (
                                <label className='cursor-pointer'>
                                    <div className='flex flex-col items-center justify-center h-full'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <p className='text-xl font-bold'>
                                                <FaCloudUploadAlt className='text-6xl text-gray-300' />
                                            </p>
                                            <p className='text-xl font-semibold'>
                                                Upload Video
                                            </p>
                                        </div>
                                        <p className='mt-10 text-sm leading-10 text-center text-gray-400'>
                                            MP4 atau WEBM atau OGG <br />
                                            720x1280 atau lebih <br />
                                            Maximal Durasi 10 Menit <br />
                                            Maximal Ukuran 2GB 
                                        </p>
                                        <p className='bg-[#2966F3] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                            Pilih File
                                        </p>
                                    </div>
                                    <input 
                                        type="file"
                                        name='upload-video'
                                        onChange={uploadVideo}
                                        className='w-0 h-0'
                                    />
                                </label>
                            )}
                        </div>
                    )}
                    {wrongFileType && (
                        <p className='text-center text-xl text-blue-400 font-semibold mt-4 w-[250px]'>
                            Mohon Masukan File Video
                        </p>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-3 pb-10'>
                    <label className='font-medium text-md'> Caption </label>
                    <input 
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="p-2 border-2 border-gray-200 rounded outline-none text-md"
                    />
                    <label className='font-medium text-md'>Pilih Kategori</label>
                    <select 
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 capitalize border-2 border-gray-200 rounded outline-none cursor-pointer text-md lg:p-4"
                    >
                        {topics.map((topics) => (
                            <option
                                key={topics.name}
                                className="p-2 capitalize bg-white outline-none text-grey-700 text-md hover:bg-slate-300"
                                value={topics.name}
                            >
                                {topics.name}
                            </option>
                        ))}
                    </select>
                    <div className='flex gap-6 mt-10'>
                        <button
                            onClick={() => {}}
                            type="button"
                            className='p-2 font-medium border-2 border-gray-300 rounded outline-none text-md w-28 lg:w-44'
                        >
                            Batalkan Upload
                        </button>
                         <button
                            onClick={handlePost}
                            type="button"
                            className='bg-[#2966F3] text-white p-2 font-medium  rounded outline-none text-md w-28 lg:w-44'
                        >
                            Posting
                        </button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Upload