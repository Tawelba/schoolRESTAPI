import { prisma } from "../../utils/prisma"

export const createSchool =async (CreateSchoolInput:any) => {
  return await prisma.school.create({
    data: CreateSchoolInput
  })
}
export async function getAllSchools() {
  return await prisma.school.findMany()
}

export const updateSchool = async (id:number, updateSchoolInput:any) => {
  return await prisma.school.update({
    where: {
      id
    },
    data: updateSchoolInput
  })
};