export default function useUser() {
    const supabase = useSupabaseClient()
    const supabaseUser = useSupabaseUser()
    type Model = User
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

    const getUserProfile = async () => {
        return {
            name: 'Marcelo',
            description: 'lorem ipsum',
            published: true,
            verified: false,
            location: [3534535334553, 65465465456],
            created_at: Date.now(),
            updated_at: Date.now(),
        }
    }

    return {getFullUser, getUserProfile}
}

