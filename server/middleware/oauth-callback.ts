export default defineEventHandler((event) => {
  const qs = new URL(event.req.url, 'http://localhost:3000').searchParams;
  const code = qs.get('code');
  console.log(code);
  
  // If it exists, redirect the page with a 301 response else carry on
  // event.res.writeHead(301, { Location: '/' })
  // event.res.end()
})