import React, { useState } from 'react'

import { Avatar, Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { Selection } from '../../store/selection/selection.model'
import { GitHubUser } from '../../store/user/GitHubUser.model'

const useStyles = makeStyles(theme => ({
	inputRoot: {
		border: 'solid 1px grey',
		height: 58,
		borderRadius: 5,
		padding: theme.spacing(4),
		fontSize: 18,
	},
	'@keyframes spinner': {
		'100%': { transform: 'rotate(360deg)' },
	},
	spinning: {
		animation: '$spinner 2500ms linear infinite',
	},
}))

const options = [
	{
		storeKey: 'option_1',
		label: 'Option 1',
	},
	{
		storeKey: 'option_2',
		label: 'Option 2',
	},
	{
		storeKey: 'option_3',
		label: 'Option 3',
	},
	{
		storeKey: 'option_4',
		label: 'Option 4',
	},
	{
		storeKey: 'option_5',
		label: 'Option 5',
	},
]

export declare interface UserItemViewProps {
	user: GitHubUser
	selection: Selection
	onSelectionChange: (storeKey: string, value: boolean) => void
}

const UserItemView = ({ user, selection, onSelectionChange }: UserItemViewProps) => {
	const classes = useStyles()

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Grid container spacing={4} alignItems='center' alignContent='center' style={{ padding: 16 }}>
			<Grid item xs={3}>
				<Avatar src={user.avatar_url} style={{ width: 50, height: 50 }} />
			</Grid>
			<Grid item xs={8}>
				<Typography variant='h5'>{user.login}</Typography>
			</Grid>
			<Grid item xs={1}>
				<IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id='long-menu'
					anchorEl={anchorEl}
					keepMounted
					open={open}
					onClose={handleClose}
					PaperProps={{
						style: {
							maxHeight: 48 * 4.5,
							width: '20ch',
						},
					}}
				>
					{options.map((option, idx) => {
						const isSelected = selection && selection[option.storeKey]

						return (
							<MenuItem key={idx} onClick={handleClose}>
								<FormControlLabel
									control={
										<Checkbox
											defaultChecked={isSelected}
											onChange={(e, checked) => onSelectionChange(option.storeKey, checked)}
											name={option.storeKey}
											color='primary'
										/>
									}
									label={option.label}
								/>
							</MenuItem>
						)
					})}
				</Menu>
			</Grid>
		</Grid>
	)
}

export default UserItemView
