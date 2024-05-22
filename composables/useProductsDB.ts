import type Product from "~/Models/Product";
export default function useProductsDB() {
    type Model = Product
    const TABLE_NAME = 'products'
    const supabase = useSupabaseClient()

    const get = async (id: string) => {
        const query = await supabase
            .from(TABLE_NAME)
            .select(`*`)
            .eq('user', id)
            .single<Model>()

        return query.data
    }

    const add = async (item: Model) => {
        return await supabase.from(TABLE_NAME).upsert(item)
    }

    const put = async (item: Model) => {
        delete item.created_at
        delete item.location
        delete item.user
        item.updated_at = new Date()
        console.log('es este');
        console.log(item);
        return await supabase.from(TABLE_NAME).upsert(item)
    }

    const del = async (item: Model) => {
        return supabase.from(TABLE_NAME).delete().eq('id', item.id)
    }

    return {get, add, put, del}
}