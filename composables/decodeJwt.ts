import * as jose from 'jose'

export const decodeJwt = (token: string) => {
    try {
      const claims = jose.decodeJwt(token)
      console.log(claims);
      
      return claims
    } catch (e) {
      const error = e.toString()
      throw new Error(error);
    }
  };