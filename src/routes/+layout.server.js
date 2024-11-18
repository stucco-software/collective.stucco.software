export async function load({ params, locals, cookies }) {
  return {
    message: 'Stucco Software Data Collective',
    session: locals.session
  }
}