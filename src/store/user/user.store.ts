import { EntityState, EntityStore, StoreConfig } from '@datorama/akita'

import { GitHubUser } from './GitHubUser.model'

export interface GitHubUserState extends EntityState<GitHubUser> {
	errors: {
		isRateLimitReached: boolean
	}
}

export const initialGitHubUserState: GitHubUserState = {
	errors: {
		isRateLimitReached: false,
	},
}

// export const createInitialGitHubUserState(): GitHubUserState {
// 	return {
// 		items: storage.getSession().user
// 		errors: {
// 			isRateLimitReached: false,
// 		}
// }
// }

// export function createInitialSessionState(): SessionState {
// 	return {
// 		user: storage.getSession().user ? storage.getSession().user : null,
// 		accessToken: storage.getSession().accessToken ? storage.getSession().accessToken : null,
// 		...storage.getSession(),
// 	}
// }

@StoreConfig({
	name: 'githubuser',
})
export class GitHubUserStore extends EntityStore<GitHubUserState> {
	constructor() {
		super(initialGitHubUserState)
	}
}

export const gitHubUserStore = new GitHubUserStore()
