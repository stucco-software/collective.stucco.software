<script type="text/javascript">
  export let data
</script>

<nav>
  <a href="/">home</a>
  {#if data.session}
    {new URL(data.session.webId).origin}
    <form
      action="/auth?/logout"
      method="POST">
      <button>logout</button>
    </form>
  {:else}
    <form
      action="/auth?/login"
      method="POST">
      <button>loggin</button>
    </form>
  {/if}
</nav>

<slot></slot>
