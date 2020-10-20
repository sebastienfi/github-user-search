import './App.css'

import React, { useEffect, useState } from 'react'

import { Grid, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import useObservable from './hooks/useObservable'
import { GitHubUser } from './store/user/GitHubUser.model'
import { gitHubUserQuery } from './store/user/user.query'
import { gitHubUserService } from './store/user/user.service'
import { gitHubUserStore } from './store/user/user.store'

import SearchInput from './components/SearchInput/SearchInput'
import UserItem from './components/UserItem/UserItem'
import logo from './logo.svg'

const useStyles = makeStyles(theme => ({
	appContainer: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		margin: '32px auto',
		maxWidth: 600,
	},
	searchContainer: {
		position: 'relative',
	},
	flyover: {
		position: 'absolute',
		top: 100,
		overflowY: 'scroll',
		overflowX: 'hidden',
		backgroundColor: 'white',
		border: 'solid 1px lightgray',
		height: 500,
		width: '100%',
	},
}))

function App() {
	const ghUsers$ = useObservable<GitHubUser[]>(gitHubUserQuery.githubUsers$)
	const isLoading = useObservable<boolean>(gitHubUserQuery.isLoading$)

	const [error, setError] = useState()
	const classes = useStyles()
	const [searchValue, setSearchValue] = useState<string>()

	// Handles default state of store.
	useEffect(() => {
		gitHubUserStore.setLoading(false)
	}, [])

	// Handles updating search results based on modified input.
	useEffect(() => {
		if (searchValue) {
			const sub = gitHubUserService.getUsers(searchValue).subscribe({
				error: error => setError(error),
			})
			return () => sub.unsubscribe()
		}
	}, [searchValue])

	return (
		<Grid container spacing={4} className={classes.appContainer}>
			<Grid item xs={12}>
				<Grid container className={classes.searchContainer}>
					<Grid item xs={12}>
						<SearchInput
							placeholder='Rechercher un utilisateur sur GitHub'
							fullWidth={true}
							onChange={value => setSearchValue(value)}
							onSearch={value => setSearchValue(value)}
							isLoading={isLoading}
						/>
					</Grid>
					<Grid item xs={12}>
						{searchValue && ghUsers$ && ghUsers$.length > 0 && (
							<Grid container className={classes.flyover}>
								{ghUsers$.map((user, idx) => (
									<Grid item xs={12} key={idx}>
										<UserItem user={user} />
									</Grid>
								))}
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>

			{error && (
				<Grid item xs={12}>
					<Typography variant='h3'>{error}</Typography>
				</Grid>
			)}
			{searchValue && !ghUsers$ && (
				<Grid item xs={12}>
					<Typography variant='h3'>Aucun utilisateur ne correspond à cette recherche.</Typography>
				</Grid>
			)}
		</Grid>
	)
}

export default App
