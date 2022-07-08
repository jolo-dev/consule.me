import { createClient } from '@urql/vue';

export const useUrqlClient = () => {
    const config = useRuntimeConfig()
    return createClient({
        url: config.stepzenGraphql,
        fetchOptions: {
        headers: { authorization: 'Apikey ' + config.stepZenApiKey }
        }
    })
}