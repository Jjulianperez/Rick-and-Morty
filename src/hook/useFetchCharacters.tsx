import {useCharacterStore} from '../stores/charactersStore'
import { ApiService } from '../services/api/ApiService' 
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useFetchCharacters = () =>{
    const { set, page, characters } = useCharacterStore()
    const query = useQuery({
        queryKey: ['characters',page],
        queryFn: () => ApiService.getCharacters(page)
    })

    useEffect (()=>{
        if(query.data){
            set({
                characters: characters.concat(query.data.results),
                info: query.data.info,
            });
            
        }
    },[query.data, set]);
    return query
}