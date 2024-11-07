import { z } from "zod";

export const createProjectSchema = z.object({
    projectName:z.string().trim().min(1,"Project name is required").regex(/^[A-Za-z]/,"Project Name should start only with letters"),
    client:z.string().trim().min(1,"Clinet name is required"),
    startDate:z.date({required_error: "A start date is required.",}),
    endDate: z.date({required_error: "A end date is required.",}),
    notes:z.string().trim().max(300,"Description cannot exceed 300 characters").optional()
})

export const taskSchema = z.object({
    taskName:z.string({invalid_type_error:"Task name is required"}).trim().min(1,"Task name is required").regex(/^[A-Za-z]/,"Task Name should start only with letters"),
})

export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>
export type TaskSchemaType = z.infer<typeof taskSchema>