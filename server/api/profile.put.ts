import {serverSupabaseUser, serverSupabaseClient} from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient(event)

    const res = await client.from('products')
        .update({
            name: body.name,
            description: body.description,
            published: body.published,
            // location: body.location,
            updated_at: new Date().toISOString().toLocaleString(),
        })
        .eq('user', user.id)
        .select().single()

    return {res}
})