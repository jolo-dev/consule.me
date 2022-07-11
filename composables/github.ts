import { OAuth } from './oauth'

const githubAuthUri = 'https://github.com/login/oauth/authorize'

export const getGithubAuthUrl = (params: Omit<OAuth, 'authUri'>) => {
  return getOauthUrl({ authUri: githubAuthUri ,...params}).replace('nonce', 'state')
}