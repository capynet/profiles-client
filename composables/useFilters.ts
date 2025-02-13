// composables/useFilters.ts
import {ref, computed} from 'vue'

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

export function useFilters(initialData: any[]) {
    const filters = ref<Filters>({
        age: 18,
        priceMax: 1,
        paymentMethod: {
            cash: true,
            creditCard: true,
            bizum: true
        },
        spokenLangs: {
            spanish: true,
            english: true,
            germany: true,
            italian: true,
            catalan: true
        }
    })

    const filteredData = computed(() => {
        initialData.forEach(item => {
            if (item.age >= filters.value.age) {
                item.display = true
            } else {
                item.display = false
            }
        })

        return initialData
    })

    return {
        filters,
        filteredData
    }
}