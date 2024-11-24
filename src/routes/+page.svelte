<script type="text/javascript">
  // import { fetch } from '@inrupt/solid-client-authn-browser'
  // import { QueryEngine } from '@comunica/query-sparql-solid'

  // const sparql = new QueryEngine()

  export let data

  const getit = async () => {
    console.log('whats this do tho', data.session.webId)
  }
</script>

<h1>Welcome to the Stucco Software Collective</h1>

{#if data?.session?.isLoggedIn}
  <h2>CRUD!</h2>
  <button on:click={getit}>okay</button>
{/if}