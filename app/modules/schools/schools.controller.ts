import { FastifyReply, FastifyRequest } from "fastify";
import { createSchool, getAllSchools, updateSchool } from "./schools.service";
type ParamsType = { id: number }
export const createSchoolHandler =async (
  request:FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const school = await createSchool(request.body)
    reply.code(201).send(school);
  } catch (e:any) {
    if(e.code == 'P2002'){
      console.log(request)
      reply.code(409).send({message: 'School already exists'})
    }
    reply.code(500).send(e.message)
  }
}

export const getSchoolsHandler =async (
  request:FastifyRequest,
  reply: FastifyReply
) => {
  const schools = await getAllSchools()
  return reply.code(200).send(schools)
}

export const updateSchoolHandler =async (
  
  request:FastifyRequest<{ Params: ParamsType }>,
  reply: FastifyReply
) => {
  const id = Number(request.params.id);
  try {
    const updatedSchool = await updateSchool(id, request.body)
    return reply.code(200).send(updatedSchool)
  } catch (e) {
    console.log(id)
    reply.code(409).send(e)
  }
}