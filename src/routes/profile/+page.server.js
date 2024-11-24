import { error } from '@sveltejs/kit';
import { getSessionFromStorage } from "@inrupt/solid-client-authn-node"
import { QueryEngine } from '@comunica/query-sparql-solid'
import rdfkv from 'rdf-kv.js'

const eng = new QueryEngine()

export async function load({ params, locals, cookies }) {
  let start = new Date()
  let now = new Date()
  let last = now
  console.log('start load fn', now - start, now - last)
  if (!locals.session) {
    error(404, {
      message: 'Not found'
    })
  }
  last = now
  now = new Date()
  console.log('Check for locals', now - start, now - last)
  const session = await getSessionFromStorage(locals.session.sessionId)
  last = now
  now = new Date()
  console.log('Hydrate Session', now - start, now - last)
  console.log(session.info.webId)
  eng.invalidateHttpCache()
  const bindingsStream = await eng.queryBindings(`
    SELECT ?p ?o
    WHERE {
      <${session.info.webId}> ?p ?o
    } LIMIT 100`, {
    sources: [session.info.webId],
    noCache: true,
    fetch: session.fetch,
  })
  last = now
  now = new Date()
  console.log('Start Query', now - start, now - last)
  const bindings = await bindingsStream.toArray()
  last = now
  now = new Date()
  console.log('Converted to Array', now - start, now - last)
  let data = bindings
    .map(b => {
      let obj = {}
      let key = [...b][0][1].value
      let val = [...b][1][1].value
      obj[key] = val
      return obj
    })
    .reduce((acc, cur) => {
      return Object.assign(acc, cur)
    }, {})
  last = now
  now = new Date()
  console.log('end load fn', now - start, now - last)
  return data
}

export const actions = {
  default: async ({locals, request}) => {
    let start = new Date()
    let now = new Date()
    let last = now
    console.log('start POST fn', now - start, now - last)
    const session = await getSessionFromStorage(locals.session.sessionId)
    last = now
    now = new Date()
    console.log('hydrate session', now - start, now - last)
    const FormBody = await request.formData()
    last = now
    now = new Date()
    console.log('start rdf kv to triples', now - start, now - last)
    const triples = rdfkv(session.info.webId, FormBody)
    last = now
    now = new Date()
    console.log('end rdf kv to triples', now - start, now - last)
    let res = await eng.queryVoid(`
      PREFIX some:  <http://http://localhost:5173/>
      DELETE { ${triples.delete} }
      INSERT { ${triples.insert} }
      WHERE  { <${session.info.webId}> ?p ?o }`, {
      sources: [session.info.webId],
      fetch: session.fetch,
    })
    last = now
    now = new Date()
    console.log('end POST fn', now - start, now - last)
  }
}