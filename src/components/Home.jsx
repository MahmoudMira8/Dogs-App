import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const [dogs, setDogs] = useState([]);
    const [searched, setSearched] = useState(false);
    const [text, setText] = useState("");

    const data = async () => {
        const {data} = await axios.get("https://api.thedogapi.com/v1/breeds");
        setDogs(data);
        console.log(data);
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        searchForDog();
        setSearched(true);
    }

    const searchForDog = async () => {
        const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${text}`);
        setDogs(data);
    }

    useEffect(() => {
        data()
    }, [])

  return (
    <>

        <section id="home" className='mx-auto max-w-screen-lg flex flex-col items-center justify-center gap-y-9 w-full pt-8'>
            <div className='mx-auto max-w-screen-sm flex flex-col items-center justify-center gap-y-4 w-full'>
                <h1 className='text-white text-5xl'>The Dog App</h1>
                <p className='text-white'>This application is powered by  
                    <a 
                        className='text-purple-600	'
                        href="https://thedogapi.com"
                    >
                        The dog api
                    </a>
                </p>
                <form
                    onSubmit={handelSubmit}
                    autoComplete="off"
                    className='w-96'
                >
                    <input
                     type="text"
                     name='search'
                     id='search'
                     placeholder='Search for a dog / breed'
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                     className='p-4 rounded-md w-full bg-slate-400 text-white placeholder-white'
                         />
                </form>
            </div>
            <div>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20'>

                    {!searched ? (
                        dogs.map((dog)=> (
                            <Link
                                className='bg-slate-700 p-4 rounded hover:bg-slate-600 transition-all duration-200'
                                to={`/${dog.name}`}
                                key={dog.id}
                            >
                                <div>
                                    <img
                                        src={dog.image.url}
                                        alt={dog.name}
                                        loading="lazy"
                                        className='rounded md:h-72 w-full object-cover'
                                        />
                                        <h2 className='text-white text-lg font-bold mt-5'>
                                            {dog.name}
                                        </h2>
                                        <p className='text-slate-400'>Bred for: {dog.bred_for}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <>
                  {dogs.map((dog) => (
                    <Link
                      to={`/${dog.name}`}
                      key={dog.id}
                      className="bg-slate-700 p-4 rounded hover:bg-slate-600 transition-all duration-200"
                    >
                      <div>
                        <img
                          src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                          alt={dog.name}
                          className="rounded md:h-72 w-full object-cover"
                        />
                        <h3 className="text-white text-lg font-bold mt-4">
                          {dog.name}
                        </h3>
                        <p className="text-slate-400">
                          Bred For: {dog.bred_for}
                        </p>
                      </div>
                    </Link>
                  ))}
                </>
                    )
                        
                    }
                </div>
                
            </div>
        </section>
    </>
  )
}

export default Home