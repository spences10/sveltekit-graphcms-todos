export async function get(req) {
  req.locals.user = ''

  return {
    status: 302,
    headers: {
      location: '/',
    },
  }
}
