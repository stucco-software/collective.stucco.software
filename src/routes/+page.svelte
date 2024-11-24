<script type="text/javascript">
  import { fetch } from '@inrupt/solid-client-authn-browser'
  import { QueryEngine } from '@comunica/query-sparql-solid'

  const sparql = new QueryEngine()

  export let data

  const getit = async () => {
    console.log('whats this do tho', data.session.webId, fetch)
    const bindingsStream = await sparql.queryBindings(`
      SELECT * WHERE {
          ?s ?p ?o
      } LIMIT 100`, {
      sources: [data.session.webId],
      fetch: fetch
    })
    bindingsStream.on('data', (binding) => {
      // console.log(binding.toString()) // Quick way to print bindings for testing
      // console.log(binding.has('s')) // Will be true

      // Obtaining values
      console.log(binding.get('s').value, binding.get('p').value, binding.get('o').value)
      // console.log(binding.get('s').termType)
      // console.log(binding.get('p').value)
      console.log(binding.get('o').value)
    });
    bindingsStream.on('end', () => {
      // The data-listener will not be called anymore once we get here.
      console.log('DING')
    })
    bindingsStream.on('error', (error) => {
      console.error(error);
    })
  }
</script>

<h1>Welcome to the Stucco Software Collective</h1>

{#if data?.session?.isLoggedIn}
  <h2>CRUD!</h2>
  <button on:click={getit}>okay</button>
{/if}