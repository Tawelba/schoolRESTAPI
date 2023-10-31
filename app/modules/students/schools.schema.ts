import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createSchoolSchema = z.object({
  level: z.string(),
  name: z.string(),
  regd_no: z.string().optional(),
  motto: z.string().optional(),
  address: z.string(),
  postal_code: z.string().optional(),
  phone: z.string(),
  city: z.string(),
  region: z.string(),
  logo: z.string().optional()
})

export type createSchoolInput = z.infer<typeof createSchoolSchema>

export const { schemas: schoolSchemas, $ref } = buildJsonSchemas({
    createSchoolSchema,
})