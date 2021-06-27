import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {

    async execute (name: string) {
        const tagRepository = getCustomRepository(TagsRepositories);

        if (!name) {
            throw new Error("É necessário informar um nome.");
        };

        const userAlreadyExists = await tagRepository.findOne({ 
            name,
        });

        if (userAlreadyExists) {
            throw new Error("Já existe uma tag cadastrada com esse nome.");
        }

        const tag = tagRepository.create({
            name
        });

        await tagRepository.save(tag);

        return tag;
    }
}

export { CreateTagService };