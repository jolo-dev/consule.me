import { createUuid } from './createUuid'

const googleAuthUri = 'https://accounts.google.com/o/oauth2/v2/auth'
const nonce = createUuid()

interface GoogleAuth {
    clientId: string;
    redirectUri: string;
    secretId?: string;
    googleAuthUri?: string;
    nonce?: string;
}

export const getGoogleAuthUrl = (param: GoogleAuth) => {
    return `${googleAuthUri}?client_id=${param.clientId}&response_type=code&scope=openid+email&redirect_uri=${param.redirectUri}&nonce=${nonce}`
}

export const getOauthCode = async (code: string, param: GoogleAuth) => {
    const response = await $fetch('https://oauth2.googleapis.com/token', {
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