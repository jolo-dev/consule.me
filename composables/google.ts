import { OAuth } from './oauth'

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
            dateTime: string,
            date: string
          }
          end: {
            dateTime: string,
            date: string
          }
        }
      ]
    }
  }


const googleAuthUri = 'https://accounts.google.com/o/oauth2/v2/auth'

export const getGoogleAuthUrl = (params: Omit<OAuth, 'authUri'>) => {
  return getOauthUrl({ authUri: googleAuthUri ,...params})
}