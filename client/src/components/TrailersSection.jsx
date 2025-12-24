import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import Blurcircle from './Blurcircle'

const TrailersSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

    // Convert watch?v= to embed/
    const embedUrl = currentTrailer.videoUrl.replace("watch?v=", "embed/")

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20'>

            <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>
                Trailers
            </p>

            {/* Main Video */}
            <div className="relative mt-6">
                <Blurcircle top='-100px' right='-100px'/>

                <div className="w-full max-w-[960px] mx-auto aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-[960px] mx-auto">
                {dummyTrailers.map((item, index) => (
                    <img
                        key={index}
                        src={item.image}
                        alt="Trailer"
                        className={`rounded-xl cursor-pointer border 
                            ${currentTrailer.videoUrl === item.videoUrl ? "border-primary" : "border-transparent"}`}
                        onClick={() => setCurrentTrailer(item)}
                    />
                ))}
            </div>

        </div>
    )
}

export default TrailersSection
