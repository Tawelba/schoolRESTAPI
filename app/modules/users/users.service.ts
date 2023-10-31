import { hashPassword } from "../../utils/hash";
import { prisma } from "../../utils/prisma"
import { createUserInput } from "./users.schema"

export const createUser = async (input: createUserInput) => {
    const {password, ...rest} = input;
    const { hash, salt } = hashPassword(password);

    const user = await prisma.user.create({
        data: {...rest, salt: salt, password: hash}
    })
    return user;
}

export const findUserByEmail =async (email:string) => {
    return await prisma.user.findUnique({
        where: {email}
    })
}

export const findUsers =async () => {
    return await prisma.user.findMany(
        {where: {active: true},
        select: {id: true, email: true, role: true, active: true}
    }
    )
}