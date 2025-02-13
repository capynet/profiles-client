export interface Profile {
    id: string
    name: string
    description: string
    phone?: string
    phone_whatsapp?: boolean
    phone_telegram?: boolean
    price: number
    age: number
    paymentMethods: string[]
    languages: string[]
    image: string
    location: {
        name: string
        lat: number
        lng: number
    }
    address: string
    display: boolean
    verified?: boolean
    updatedAt: string
}

export default Profile