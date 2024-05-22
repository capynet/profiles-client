import type User from "~/Models/User";

export default interface Product {
    id: number
    user: string
    created_at: Date
    name: string
    description?: string
    published: boolean
    verified: boolean
    updated_at: Date
    location?: [number, number]
}