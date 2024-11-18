<script type="text/javascript">
  import { onMount } from 'svelte'
  import { handleIncomingRedirect, getDefaultSession, fetch } from '@inrupt/solid-client-authn-browser'
  import { getPodUrlAll } from '@inrupt/solid-client'

  let webID
  onMount(async () => {
    console.log('deet doot')
    await handleIncomingRedirect()
    let session = getDefaultSession()
    console.log(session)
    console.log(session.info.webId)
    const mypods = await getPodUrlAll(session.info.webId, { fetch: fetch })
    const res = await fetch(session.info.webId)
    const profile = await res.text()
    console.log(profile)
    console.log(mypods)
  })

</script>
<h1>Neat that worked</h1>