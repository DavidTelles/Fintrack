import * as z from "zod";

export const CreateUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8)
});

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.email(),
    password: z.string(),
    createdAt: z.date()
});