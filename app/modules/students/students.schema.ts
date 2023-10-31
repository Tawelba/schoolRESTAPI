import { string, z } from "zod";

const studentSchema = z.object({
    admission_id: z.string(),
    admission_date: z.date(),
    firstname: z.string(),
    othernames: z.string().optional(),
    gender: string(),
    date_of_birth: z.string(),
    phone: z.string().optional(),
    address: z.string(),
    city: z.string(),
    region: z.string()
})