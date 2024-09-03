import {serverSupabaseUser, serverSupabaseClient} from '#supabase/server'
import useGeo from "~/composables/useGeo";
import useFileTools from "~/composables/useFileTools";

const {dataUrlToFile} = useFileTools()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient(event)
    const {genPoint} = useGeo()
    let storedImgData = null

    // 1 store image
    if (body.image !== undefined) {
        const imgAsFile = await dataUrlToFile(body.image, "probamos")

        const {data, error} = await client.storage.from('test').upload(`${user.id}.jpg`, imgAsFile, {
            upsert: true,
        })
        storedImgData = data
    }

    // Update product.
    const res = await client.from('products')
        .update({
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
            image: storedImgData
        })
        .eq('user', user.id)
        .select().single()

    return {res}
})