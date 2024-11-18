import { getSessionFromStorage } from "@inrupt/solid-client-authn-node"

export async function handle({ event, resolve }) {
  let sessionId = event.cookies.get('session')
  if (!sessionId) {
    event.locals.session = null
  } else {
    const session = await getSessionFromStorage(sessionId)
    if (session) {
      await session.handleIncomingRedirect(event.url.href)
      event.locals.session = session.info
    } else {
      event.locals.session = null
    }
  }

  const response = await resolve(event)
  return response
}