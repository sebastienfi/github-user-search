import { ID } from '@datorama/akita'
import axios from 'axios'
import { saveSession } from '../storage'

import { Selection } from './selection.model'
import { selectionQuery } from './selection.query'
import { SelectionStore, selectionStore } from './selection.store'

export class SelectionService {
	constructor(private selectionStore: SelectionStore) {}

	update(userId: ID, selection: Selection) {
		this.selectionStore.upsert(userId, selection)
		saveSession(selectionQuery.selectAll())
	}
}

export const selectionService = new SelectionService(selectionStore)
