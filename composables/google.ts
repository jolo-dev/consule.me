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