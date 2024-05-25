import {serverSupabaseUser, serverSupabaseClient} from '#supabase/server'
import useGeo from "~/composables/useGeo";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient(event)
    const {genPoint} = useGeo()

    const res = await client.from('products').upsert({
        user: user.id,
        name: body.name,
        description: body.description,
        published: body.published,
        verified: body.verified,
        updated_at: new Date().toISOString().toLocaleString(),
        location: genPoint(body.location),
        phone: body.phone,
        phone_whatsapp: body.phone_whatsapp,
        phone_telegram: body.phone_telegram,
    }).select().single()

    return {res}
})