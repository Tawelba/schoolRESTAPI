import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./users.service";
import { createUserInput, loginInput } from "./users.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../../server";

export const createUserHandler = async (
    req: FastifyRequest<{Body: createUserInput}>,
    reply: FastifyReply
) => {
    const input = req.body;

    try {
        const user = await createUser(input)
        return reply.code(201).send(user)
    } catch (e: any) {
        if(e.code == 'P2002'){
            return reply.code(409).send({Error: 'Email already exists'})
        }
        return reply.code(500).send(e);
    }
}
export const loginHandler =async (
    request: FastifyRequest<{Body: loginInput}>,
    reply: FastifyReply
) => {
    const body = request.body;

    //find user by email
    const user = await findUserByEmail(body.email);
    if(!user) return (reply.code(401).send({
        message: 'Invalid email or password'
    }))

    //verify password
    const correctPassword = verifyPassword({
        candidatePassword: body.password,
        salt: user.salt,
        hash: user.password
    })

    //generate access token
    if(correctPassword) {
        const {password, salt, ...rest} = user;
        return {accessToken: server.jwt.sign(rest)}
    }
    
    //respond
    return reply.code(401).send({
        message: 'Invalid email or password'
    })
};

//Get all active users
export const getActiveUsersHandler =async () => {
    return await findUsers()
}