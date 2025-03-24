import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import ListingItem from '../Components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      }
      catch (error) {
        console.log(error);
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch {
        console.log(error)
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, [])
  return (
    <div>
      {/* top */}
      <div className="flex flex-col max-w-6xl gap-6 px-3 mx-auto p-28 ">
        <h1 className='text-3xl font-bold text-slate-700 lg:text-6xl '>Your <span className='text-slate-500'>Perfect</span> Home,
          <br />
          Just a Tap Away.</h1>
        <br />
        <div className="text-xs text-gray-500 sm:text-sm">
          Sushvistas makes finding your perfect home simple with real-time listings and easy navigation.
          <br />
          Buy, sell, or rent—all in one place!
        </div>
        <Link className='text-xs font-bold text-blue-800 sm:text-sm hover:underline' to={'/search'}>Let's Get Started...</Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings && offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div style={{ background: `url(${listing.imageUrls[0]}) center no-repeat `, backgroundSize: "cover" }} className="h-[500px]" key={listing._id}></div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      {/* Sample Listings */}
      <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto my-10">
        {offerListings && offerListings.length>0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600 '>Recent Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                 Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length>0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600 '>Recent Places for Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                 Show more Places
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length>0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600 '>Recent Places for Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                 Show more Places
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
