import type { NewCharacter } from "../../types/Character";
import ServerAxiosInstance from "./serverAxiosInstance";

const getCreateCharacter = async () => {
    return await ServerAxiosInstance.get('/useCharacters');
};

const createCharacter = async (character: NewCharacter) => {
    return await ServerAxiosInstance.post('/useCharacters', character);
};

const deleteCharacter = async (id: number) => {
    return await ServerAxiosInstance.delete(`/useCharacters/${id}`);
};

export const ServerService = {
    createCharacter,
    getCreateCharacter,
    deleteCharacter
};
