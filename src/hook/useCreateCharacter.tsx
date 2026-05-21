import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LocalStorageService } from "../services/local/LocalStorageService"
import type { NewCharacter } from "../types/Character"

export const useCreateCharacter = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newCharacter: NewCharacter) => LocalStorageService.createCharacter(newCharacter),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["characters"] });
        }
    });
    return mutation;
};

export const useDeleteCharacter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => LocalStorageService.deleteCharacter(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["characters"] });
        }
    });
};

export const useUpdateCharacter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<NewCharacter> }) =>
            LocalStorageService.updateCharacter(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["characters"] });
        }
    });
};
