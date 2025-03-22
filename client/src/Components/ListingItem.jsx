import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md';
import { FaBath,FaBed } from 'react-icons/fa'
export default function ListingItem({ listing }) {
  return (
    <div className='w-full sm:w-[330px] overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg'>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0] || "https://www.investopedia.com/thmb/X9xQZtw5p2-AE82gGS3bugBJD3I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mortgage-real-estate-investing-guide-4222543-v1-b49c49405ee14779adb25d2879411414.png"} alt="listing cover" className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
        <div className="flex flex-col w-full gap-2 p-3">
          <p className='text-lg font-semibold truncate text-slate-700'>
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className='w-4 h-4 text-green-700' />
            <p className='w-full text-sm text-gray-600 truncate'>{listing.address}</p>
          </div>
          {/* Install line clamp from tailwind css for 2 lines of description then truncate */}
          <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
          <p className='mt-2 font-semibold text-slate-500'>$
            {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="flex gap-4 text-slate-700">
            <div className="text-xs font-bold">
              <FaBed className='text-lg'></FaBed>
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
            </div>
            <div className="text-xs font-bold">
              <FaBath className='text-lg'></FaBath>
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
