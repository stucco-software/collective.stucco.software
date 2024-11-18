import { redirect } from '@sveltejs/kit'
import {
  getSessionFromStorage,
  getSessionIdFromStorageAll,
  Session
} from "@inrupt/solid-client-authn-node"

const redirectToSolidIdentityProvider = (url) => {
  // Since we use Express in this example, we can call `res.redirect` to send the user to the
  // given URL, but the specific method of redirection depend on your app's particular setup.
  // For example, if you are writing a command line app, this might simply display a prompt for
  // the user to visit the given URL in their browser.
  console.log('some sort if weird redirect handler?', url)
  redirect(302, url)
};

export const actions = {
  login: async ({cookies, request}) => {
    const session = new Session({ keepAlive: false })
    cookies.set('session', session.info.sessionId, {path: '/'})
    await session.login({
      redirectUrl: `http://localhost:5174/auth/callback`,
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
    redirect(302, 'http://localhost:5174/')
  }
};