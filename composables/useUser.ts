export default function useUser() {
    const supabase = useSupabaseClient()
    const supabaseUser = useSupabaseUser()

    const getFullUser = async () => {
        const {data: extenderUserData} = await useAsyncData('extenderUserData', async () => {
            const {data} = await supabase
                .from('profiles')
                .select('*')
                .eq('user', supabaseUser.value.id)
                .single()
            return data
        })

        return {...supabaseUser.value, extended: extenderUserData.value}
    }

    return {getFullUser}
}

