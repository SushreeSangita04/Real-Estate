import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
export default function Search() {
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false);
    const [listings,setListings]=useState([]);
    console.log(listings);
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    useEffect(() => {
        //fetch attribute values from url of search bar to sidebar
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }
        //fetch listing according to search from database(using getListings API)
        const fetchListings=async()=>{
           setLoading(true);
           const searchQuery=urlParams.toString();
           const res=await fetch(`/api/listing/get?${searchQuery}`);
           const data=await res.json();
           setListings(data);
           setLoading(false);

        }
        fetchListings();

    }, [location.search]);
    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale')
            setSidebardata({ ...sidebardata, type: e.target.id })
        if (e.target.id === 'searchTerm')
            setSidebardata({ ...sidebardata, searchTerm: e.target.value })
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer')
            setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false, });
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order });
        }
    }
    const handleSubmit = (e) => {
        //adding details of search from sidebar to url
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);//navigates to search page(described as in the App.jsx page) Also described in Header.jsx page

    }
    return (
        <div className='flex flex-col md:flex-row'>
            <div className="border-b-2 p-7 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className="flex items-center gap-2">
                        <label className='font-semibold whitespace-nowrap'>
                            Search Term:
                        </label>
                        <input type="text" value={sidebardata.searchTerm} onChange={handleChange} id='searchTerm' placeholder='Search...' className='w-full p-3 border rounded-lg' />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <label className='font-semibold'>Type:</label>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sidebardata.type === 'all'} type="checkbox" id='all' className='w-5' />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sidebardata.type === 'rent'} type="checkbox" id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sidebardata.type === 'sale'} type="checkbox" id='sale' className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sidebardata.offer} type="checkbox" id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <label className='font-semibold'>Amenities:</label>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sidebardata.parking} type="checkbox" id='parking' className='w-5' />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handleChange} checked={sidebardata.furnished} type="checkbox" id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='font-semibold'>Sort:</label>
                        <select onChange={handleChange} defaultValue={'createdAt_desc'} id="sort_order" className='p-3 border rounded-lg'>
                            <option value='regularPrice_desc'>Price-High to Low</option>
                            <option value='regularPrice_asc'>Price-Low to High</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>
                    <button className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className="">
                <h1 className='p-3 mt-5 text-3xl font-semibold border-b text-slate-700'>Listing results:</h1>
            </div>
        </div>
    )
}
