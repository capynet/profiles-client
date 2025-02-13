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
        priceMax: 200,
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

    const applyFilters = () => {
        data.value = data.value.map(item => ({
            ...item,
            display: item.age >= filters.value.age &&
                item.price <= filters.value.priceMax
        }))
    }

    const debouncedApplyFilters = debounce(applyFilters, 500)

    // Initial filter without debounce
    applyFilters()

    watch(filters, debouncedApplyFilters, { deep: true })

    return {
        filters,
        filteredData: data
    }
}