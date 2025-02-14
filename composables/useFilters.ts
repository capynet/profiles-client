import {ref, watch} from 'vue'
import debounce from 'lodash/debounce'
import type {Item, Filters} from '~/Models/Filters'

export function useFilters(initialData: Ref<Item[] | undefined>) {
    const data = ref<Item[]>([])
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
    const sortBy = ref<'newest' | 'near' | 'price'>('newest')

    const applyFilters = () => {
        if (!initialData.value) return

        let filtered = initialData.value.map(item => ({
            ...item,
            display: item.age >= filters.value.age &&
                item.price <= filters.value.priceMax &&
                (filters.value.paymentMethod.cash && item.paymentMethods.includes('cash') ||
                    filters.value.paymentMethod.creditCard && item.paymentMethods.includes('creditCard') ||
                    filters.value.paymentMethod.bizum && item.paymentMethods.includes('bizum')) &&
                (filters.value.spokenLangs.spanish && item.languages.includes('spanish') ||
                    filters.value.spokenLangs.english && item.languages.includes('english') ||
                    filters.value.spokenLangs.germany && item.languages.includes('germany') ||
                    filters.value.spokenLangs.italian && item.languages.includes('italian') ||
                    filters.value.spokenLangs.catalan && item.languages.includes('catalan'))
        }))

        filtered.sort((a, b) => {
            switch (sortBy.value) {
                case 'newest':
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                case 'price':
                    return a.price - b.price
                case 'near':
                    const userLat = 36.7213
                    const userLng = -4.4217
                    const distA = Math.sqrt(Math.pow(a.location.lat - userLat, 2) + Math.pow(a.location.lng - userLng, 2))
                    const distB = Math.sqrt(Math.pow(b.location.lat - userLat, 2) + Math.pow(b.location.lng - userLng, 2))
                    return distA - distB
            }
        })

        data.value = filtered
    }

    const debouncedApplyFilters = debounce(applyFilters, 500)

    // Watch for changes in initialData and apply filters
    watch(initialData, applyFilters, {immediate: true})

    // Watch for filter changes
    watch([filters, sortBy], debouncedApplyFilters, {deep: true})

    return {
        filters,
        filteredData: data,
        sortBy
    }
}