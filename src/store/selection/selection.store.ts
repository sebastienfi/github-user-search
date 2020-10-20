import { EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { getSession } from '../storage'

import { Selection } from './selection.model'

export interface SelectionState extends EntityState<Selection> {
	items: any
}

// export const initialSelectionState: SelectionState = {

// 	items:

// }

export const createInitialSelectionState = (): SelectionState => {
	return {
		items: getSession(),
	}
}

@StoreConfig({
	name: 'selection',
})
export class SelectionStore extends EntityStore<SelectionState> {
	constructor() {
		super(createInitialSelectionState())
	}
}

export const selectionStore = new SelectionStore()
