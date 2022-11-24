import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shazamCoreAPI = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '92b5e996f8msh14233fd0fb6b11bp123f82jsn192255bb4fc5')

            return headers
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => `/charts/world`
        }),
        getSongDetails: builder.query({
            query: ({ songid }) => `/tracks/details?track_id=${songid}` 
        }),
        getSongRelated: builder.query({
            query: ({ songid }) => `/tracks/related?track_id=${songid}` 
        }),
        getArtistDetails: builder.query({
            query: ({ artistid }) => `/artists/details?artist_id=${artistid}` 
        }),
        getSongsByCountry: builder.query({
            query: (countryCode) => `/charts/country?country_code=${countryCode}` 
        }),
        getSongsByGenre: builder.query({
            query: (genreListId) => `/charts/genre-world?genre_code=${genreListId}` 
        }),
        getSongsBySearch: builder.query({
            query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` 
        })
    })
})


export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery,
} = shazamCoreAPI

