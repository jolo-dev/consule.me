export default defineEventHandler((event) => {
    const params = new URLSearchParams(event.req.url.split('?')[1]);
    const code = params.get('code');
  })