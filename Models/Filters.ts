export interface Filters {
    age: number
    priceMax: number
    paymentMethod: {
        cash: boolean
        creditCard: boolean
        bizum: boolean
    }
    spokenLangs: {
        spanish: boolean
        english: boolean
        germany: boolean
        italian: boolean
        catalan: boolean
    }
}

export interface Item {
    id: string
    display: boolean
    name: string
    price: number
    age: number
    paymentMethods: string[]
    languages: string[]
    image: string
    description: string
    location: {
        name: string
        lat: number
        lng: number
    }
    updatedAt: string
}