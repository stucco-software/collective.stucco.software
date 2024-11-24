<script type="text/javascript">
  export let data
  export let form
</script>

<h1>Profile</h1>
<dl>
  <dt>Auth Provider</dt>
  <dd>{data['http://www.w3.org/ns/solid/terms#oidcIssuer']}</dd>

  <dt>Arbitrary data</dt>
  <dd>{data['http://http://localhost:5173/data']}</dd>
</dl>


<form
  action="/profile"
  method="POST">
  <label>Arbitrary</label>
  <input type="text" name="= some:data">
  <button>Okay</button>
</form>