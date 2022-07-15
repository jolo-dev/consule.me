import { OAuth } from './oauth'

const githubAuthUri = 'https://github.com/login/oauth/authorize'

export interface GithubIssue {
  repository: {
    url: string;
    name: string;
  },
  url: string;
  number: number;
  title: string;
  created_at: string;
  state: string;
}

export interface GithubIssueResult {
  githubIssues: GithubIssue[]
}

export const getGithubAuthUrl = (params: Omit<OAuth, 'authUri'>) => {
  return getOauthUrl({ authUri: githubAuthUri ,...params}).replace('nonce', 'state')
}