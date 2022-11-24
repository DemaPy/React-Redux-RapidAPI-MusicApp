import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';

import {Error, Loader, SongCard} from '../components'
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(true)
    const {activeSong, isPlaying} = useSelector(state => state.player)
    const {data, isFetching, error} = useGetSongsByCountryQuery(country)



    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_ZvWa34wzJ9yz17hI7zMrh4DfU0mA2`)
            .then(res => setCountry(res?.data?.location?.country))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [country])

    if (isFetching && loading) {
        return <Loader title={"Loading songs around you..."} />
    }

    if (error && country) {
        return <Error/>
    }


    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-white text-left mt-4 mb-10 text-3xl'>Around You 
                <span className='font-black'> {country}</span>
            </h2>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((song, index) => (
                    <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} data={data} i={index}/>
                ))}
            </div>
        </div>
    )
};

export default AroundYou;