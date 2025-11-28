import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ServerService } from "../services/server/ServerService"
import type { NewCharacter } from "../types/Character"

export const useCreateCharacter = () =>{
    const mutation= useMutation({
        mutationFn:(newCharacter:NewCharacter)=> ServerService.createCharacter(newCharacter)
    })
    return mutation
}

export const useGetCreateCharacter = () =>{
    return useQuery({
        queryKey: ["created-characters"],
        queryFn: ServerService.getCreateCharacter
    })
}

export const useDeleteCharacter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => ServerService.deleteCharacter(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["created-characters"]);
        }
    });
};



//export const useEditCharacter = () => {
//    const queryClient = useQueryClient();
//
//    return useMutation({
//        mutationFn: ({ id, body }) => ServerService.updateCharacter(id, body),
//        onSuccess: () => {
//            queryClient.invalidateQueries(["created-characters"]);
//        }
//    });
//}