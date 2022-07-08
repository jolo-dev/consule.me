import { createUuid } from './utils'

export interface GoogleCalendarResult {
    googleCalendar: {
      items: [{ id: string }]
    }
  }
  
export interface GoogleCalendarEventsResult {
    googleCalendarEvents: {
      items: [
        {
          summary: string
          description: string
          start: {
            dateTime: string
          }
          end: {
            dateTime: string
          }
        }
      ]
    }
  }


const googleAuthUri = 'https://accounts.google.com/o/oauth2/v2/auth'
const nonce = createUuid()

interface GoogleAuth {
    clientId: string;
    redirectUri: string;
    scopes?: string[];
    secretId?: string;
    googleAuthUri?: string;
    nonce?: string;
}

export const getGoogleAuthUrl = (param: GoogleAuth) => {
    return `${googleAuthUri}?client_id=${param.clientId}&response_type=code&scope=${param.scopes.join(' ')}&redirect_uri=${param.redirectUri}&nonce=${nonce}`
}

export const getOauthCode = async (code: string, param: GoogleAuth) => {
    const response = await $fetch<{access_token: string}>('https://oauth2.googleapis.com/token', {
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