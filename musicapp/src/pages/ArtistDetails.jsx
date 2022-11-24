import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import {DetailsHeader, Error, Loader, RelatedSongs } from '../components'

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";


const ArtistDetails = () => {
    const { id: artistid } = useParams()
    const {data: artistData, isFetching: artistDetailsFetching, error} = useGetArtistDetailsQuery({artistid})
    const {activeSong, isPlaying} = useSelector(state => state.player)

    if (artistDetailsFetching) {
        return <Loader title={"Loading artist details..."} />
    }

    if (error) {
        return <Error />
    }

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistid} artistData={artistData} />

            <RelatedSongs 
                data={Object.values(artistData?.songs)}
                artistId={artistid}
                activeSong={activeSong}
                isPlaying={isPlaying}
            />
        
        </div>
    )
};

export default ArtistDetails;
