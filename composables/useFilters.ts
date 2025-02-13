import { ref, watch } from 'vue'
import { debounce } from 'lodash'

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
    const data = ref(initialData)
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

    const updateData = debounce(() => {
        data.value = data.value.map(item => ({
            ...item,
            display: item.age >= filters.value.age
        }))
    }, 500)

    watch(filters, updateData, { deep: true })

    return {
        filters,
        filteredData: data
    }
}