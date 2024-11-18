import { redirect } from '@sveltejs/kit'
import { host } from '$env/static/private'
import {
  getSessionFromStorage,
  Session
} from "@inrupt/solid-client-authn-node"

const redirectToSolidIdentityProvider = (url) => {
  redirect(302, url)
}

export const actions = {
  login: async ({cookies, request}) => {
    const session = new Session({ keepAlive: false })
    cookies.set('session', session.info.sessionId, {path: '/'})
    console.log(host)
    await session.login({
      redirectUrl: host,
      oidcIssuer: "https://login.stucco.software",
      clientName: "Stucco Data Collective",
      handleRedirect: redirectToSolidIdentityProvider,
    })
  },
  logout: async({cookies}) => {
    const sessionId = cookies.get('session')
    const session = await getSessionFromStorage(sessionId)
    await session.logout()
    cookies.delete('session', {path: '/'})
    redirect(302, host)
  }
}