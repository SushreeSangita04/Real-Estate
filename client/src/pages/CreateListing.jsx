import React, { useState } from 'react'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function CreateListing() {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    //  const [files,setFiles]=useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
        imageUrls: []
    });
    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
            })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData, [e.target.id]: e.target.checked
            })
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData(
                { ...formData, [e.target.id]: e.target.value }
            )
        }
    }
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (+formData.regularPrice < +formData.discountPrice)
                return setError('Discounted price must be lower than regular price');
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userRef: currentUser._id }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`)
        }
        catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }



    const handleImageUpload = async (e) => {
        const files = e.target.files;
        const imageUrl = [];

        // Upload multiple files to Cloudinary
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "CreateListing");  // Update this with your upload preset

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/dvnew2n80/image/upload`,  // Replace with your Cloudinary ID
                {
                    method: "POST",
                    body: data,
                }
            );

            const img = await res.json();
            // console.log(img.secure_url);
            imageUrl.push(img.secure_url);  // Save the image URL to the list
        }

        setFormData({
            ...formData,
            imageUrls: imageUrl,
        });
    };

    return (
        <main className='max-w-4xl p-3 mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:flex-row'>
                <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                        <span className='ml-2 font-normal text-gray-600'>The first image will be the cover (max 6)</span>
                    </p>
                <div className='flex gap-4'>
                        {/* <input type="file" id="imageUpload" name="imageUpload" accept="image/*"/> */}
                        <input onChange={handleImageUpload} className='w-full p-3 border border-gray-300 rounded' type='file' id='images' accept='image/*' multiple />
                        {/* <input type="submit" value="Upload"/>  */}
                        {/* <p className='text-sm text-green-700'>Wait for 2 mins for the image to upload</p> */}
                        {/* multiple */}
                        {/* <button type='button'  onClick={handleImageSubmit} className='p-3 text-green-700 uppercase border border-green-700 rounded hover:shadow-lg disabled:opacity-80 '>Upload</button> */}
                    </div>
                    <input type='text' onChange={handleChange} value={formData.name} placeholder='Name' className='p-3 border rounded-lg' id='name' maxLength='62' minLength='10' required />
                    <textarea type='text' onChange={handleChange} value={formData.description} placeholder='Description' className='p-3 border rounded-lg' id='description' required />
                    <input type='text' onChange={handleChange} value={formData.address} placeholder='Address' className='p-3 border rounded-lg' id='address' required />
                    
                    <div className='flex flex-wrap gap-6 '>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} checked={formData.type === 'sale'} type='checkbox' id='sale' className='w-5'></input>
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} checked={formData.type === 'rent'} type='checkbox' id='rent' className='w-5'></input>
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} checked={formData.parking} type='checkbox' id='parking' className='w-5'></input>
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' onChange={handleChange} checked={formData.furnished} id='furnished' className='w-5'></input>
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} checked={formData.offer} type='checkbox' id='offer' className='w-5'></input>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input onChange={handleChange} value={formData.bedrooms} type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input onChange={handleChange} value={formData.bathrooms} type='number' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                            <p>Baths</p>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <input type='number' onChange={handleChange} value={formData.regularPrice} id='regularPrice' min='50' max='10000000' required className='p-3 border border-gray-300 rounded-lg' />
                            <div className=''>
                                <p>Regular price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className="flex items-center gap-2">
                                <input type='number' onChange={handleChange} value={formData.discountPrice} id='discountPrice' min='0' max='10000000' required className='p-3 border border-gray-300 rounded-lg' />
                                <div className=''>
                                    <p>Discounted price</p>
                                    <span className='text-xs'>($ / month)</span>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    {/* <p className='font-semibold'>Images:
                        <span className='ml-2 font-normal text-gray-600'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-4'>  
                        <input onChange={handleImageUpload} className='w-full p-3 border border-gray-300 rounded' type='file' id='images' accept='image/*' multiple />
                        <p className='text-sm text-green-700'>Wait for 2 mins for the image to upload</p>
                        </div> */}
                    <div className="flex items-center gap-2">
                            <input type='number' onChange={handleChange} value={formData.regularPrice} id='regularPrice' min='50' max='10000000' required className='p-3 border border-gray-300 rounded-lg' />
                            <div className=''>
                                <p>Regular price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className="flex items-center gap-2">
                                <input type='number' onChange={handleChange} value={formData.discountPrice} id='discountPrice' min='0' max='10000000' required className='p-3 border border-gray-300 rounded-lg' />
                                <div className=''>
                                    <p>Discounted price</p>
                                    <span className='text-xs'>($ / month)</span>
                                </div>
                            </div>
                        )}
                    <button disabled={loading} className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80'>{loading ? 'Creating...' : 'Create Listing'}</button>
                    {error && <p className='text-sm text-red-700'>{error}</p>}
                </div>
            </form>
        </main>
    )
}
