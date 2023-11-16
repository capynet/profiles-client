import {serverSupabaseUser, serverSupabaseClient} from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient(event)

    const {data} = await client.from('profiles').upsert({
        name: body.name,
        location: body.location,
        updated_at: new Date().toISOString().toLocaleString(),
        user: user.id
    }).select().single()


    return {res: data}
})