import { ApiService } from '../services/api/ApiService' 
import { useSingleCharacterStore } from '../stores/characterSingleStore' 
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useFetchSingleCharacters = (id: string) =>{
    const { set } = useSingleCharacterStore()
    const query = useQuery({
        queryKey: ['character'],
        queryFn: () => ApiService.getSingleCharacter(id)
    })

    useEffect (()=>{
        if(query.data){
            set({
                character: query.data
            });
            
        }
    },[query.data, set]);
    return query
}