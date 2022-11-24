import { useParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {DetailsHeader, Error, Loader, RelatedSongs } from '../components'

import { setActiveSong, playPause } from "../redux/features/playerSlice"; 
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";


const SongDetails = () => {
    const dispatch = useDispatch()
    const { songid } = useParams()
    const {data: songData, isFetching: isFetchingSongData, error: songDataError} = useGetSongDetailsQuery({songid})
    const {data, isFetching, error } = useGetSongRelatedQuery({songid})
    const {activeSong, isPlaying} = useSelector(state => state.player)

    const handlePauseClick = () => {
        dispatch(playPause(false))
      }
    
    const handlePlayClick = () => {
        dispatch(setActiveSong({
          song,
          data,
          i
        }))
        dispatch(playPause(true))
    }

    if (isFetchingSongData || isFetching) {
        return <Loader title={"Searching song details..."} />
    }

    if (songDataError || error) {
        return <Error />
    }



    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={""} songData={songData} />

            <div className="mb-10">
                <h2 className="text-white text-3xl text-bold">Lyrics</h2>

                <div className="mt-5">
                    {songData?.sections[1].type === 'LYRICS' ? 
                        songData?.sections[1].text.map((line, i) => (
                            <p className="text-gray-400 text-base my-1">{line}</p>
                        )) : <p className="text-gray-400 text-base my-1">Sorry, no lyrics found.</p>
                    }
                </div>
            </div>

            <RelatedSongs 
                data={data}
                activeSong={activeSong}
                isPlaying={isPlaying}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        
        </div>
    )
};

export default SongDetails;
