const nonce = createUuid()

export interface OAuth {
    authUri: string;
    clientId: string;
    redirectUri?: string;
    scopes?: string[];
    secretId?: string;
    googleAuthUri?: string;
    nonce?: string;
}

export const getOauthUrl = (param: OAuth) => {
    return `${param.authUri}?client_id=${param.clientId}&response_type=code&scope=${param.scopes.join(' ')}&redirect_uri=${param.redirectUri}&nonce=${nonce}`
}

export const getOauthCode = async (code: string, param: Omit<OAuth, 'authUri'>, tokenUri: string) => {
    const response = await $fetch<{access_token: string}>(tokenUri, {
        method: 'POST',
        body: {
            code,
            client_id: param.clientId,
            client_secret: param.secretId,
            redirect_uri: param.redirectUri,
            grant_type: 'authorization_code'
        }
    })
    return response
}

export const useAccessToken = () => useState<string>('accessToken', () => '')