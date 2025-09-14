interface Server {
  id: string
  name: string
  channelNotificationId: string
  personalAccessToken: string
  tokenExpirationDate?: Date
  githubOrganization?: string
  githubUsername?: string
}

interface Repos {
  id: string
  name: string
}

interface Junction {
  serverId: string
  repoId: string
}

export { Server, Repos, Junction }
