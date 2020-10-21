import React, { useMemo } from 'react'

import useObservable from '../../hooks/useObservable'
import { Selection } from '../../store/selection/selection.model'
import { selectionQuery } from '../../store/selection/selection.query'
import { selectionService } from '../../store/selection/selection.service'
import { GitHubUser } from '../../store/user/GitHubUser.model'

import UserItemView from './UserItem.view'

export declare interface UserItemProps {
	user: GitHubUser
}

const UserItem = ({ user }: UserItemProps) => {
	const selections$ = useObservable(selectionQuery.selections$)

	const userSelection: Selection = useMemo(() => selections$?.find((s: Selection) => s.id === user.id) as Selection, [
		user,
		selections$,
	])

	const onSelectionChange = (storeKey: string, value: boolean) => {
		selectionService.update(user.id, { ...userSelection, [storeKey]: value })
	}

	return <UserItemView user={user} selection={userSelection} onSelectionChange={onSelectionChange} />
}

export default UserItem
