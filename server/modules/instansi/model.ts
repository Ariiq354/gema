import { z } from "zod";

export const createInstansiSchema = z.object({
  nama: z.string().min(1),
  isActive: z.boolean().optional(),
});

export type CreateInstansiSchema = z.infer<typeof createInstansiSchema>;
