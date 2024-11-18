import {
  getSessionFromStorage,
  getSessionIdFromStorageAll,
  Session
} from "@inrupt/solid-client-authn-node"

export async function handle({ event, resolve }) {
  let sessionId = event.cookies.get('session')
  if (!sessionId) {
    event.locals.session = null
    const response = await resolve(event)
    return response
  }
  const session = await getSessionFromStorage(sessionId)
  await session.handleIncomingRedirect(event.url.href)
  event.locals.session = session.info
  const response = await resolve(event)
  return response
}