import { GitHubUser } from '../user/GitHubUser.model'

export class SearchUsersResponse {
	total_count: number
	incomplete_results: boolean
	items: GitHubUser[]
}
