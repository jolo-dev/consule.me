import { createClient } from '@urql/vue';

const config = useRuntimeConfig()

export const useUrqlClient = createClient({
    url: config.stepzenGraphql,
    fetchOptions: {
      headers: { authorization: 'Apikey ' + config.stepZenApiKey }
    }
  })