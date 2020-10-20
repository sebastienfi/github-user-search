import { setLoading } from '@datorama/akita'
import axios from 'axios'
import { from, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { GitHubConfig } from '../github.config'
import { GitHubUser } from './GitHubUser.model'
import { gitHubUserQuery } from './user.query'
import { GitHubUserStore, gitHubUserStore } from './user.store'

export class GitHubUserService {
	constructor(private gitHubUserStore: GitHubUserStore) {}

	getUsers(search: string): Observable<GitHubUser[]> {
		this.gitHubUserStore.setLoading(true)
		return from(axios.get(GitHubConfig.API_URL + GitHubConfig.SEARCH_USERS_ENDPOINT + '?q=' + encodeURI(search))).pipe(
			tap(res => {
				console.log('getUsers', res.data)
				this.gitHubUserStore.set(res.data.items)
				this.gitHubUserStore.setLoading(false)
			}),
			map(res => res.data),
		)
	}

	getUser(username: string): Observable<GitHubUser> {
		return from(axios.get(GitHubConfig.API_URL + GitHubConfig.USER_ENDPOINT + encodeURI(username))).pipe(
			tap(res => {
				this.gitHubUserStore.update(username, user => {
					return {
						...user,
						...res.data,
					}
				})
			}),
			map(res => {
				return gitHubUserQuery.getEntity(res.data.id)
			}),
		)
	}

	toggleIsRateLimitReached(): Observable<GitHubUser> {
		return this.gitHubUserStore.update(state => ({
			...state,
			errors: {
				...state.errors,
				isIsRateLimitReached: !state.errors.isRateLimitReached,
			},
		}))
	}
}

export const gitHubUserService = new GitHubUserService(gitHubUserStore)
