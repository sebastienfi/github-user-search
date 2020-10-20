const SESSION_KEY = 'session'

export const getSession = () => {
	const session = localStorage.getItem(SESSION_KEY)
	return session ? JSON.parse(session) : {}
}

export const saveSession = session => {
	// TODO : debug le saveSession qui serialize pas.
	// localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const clearSesssion = () => localStorage.removeItem(SESSION_KEY)
