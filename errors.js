const http = require('http');

process.on('unhandledRejection', (e) =>
  console.log({
    rej: e,
  })
);

process.on('uncaughtException', (e) =>
  console.log({
    ex: e,
  })
);

http
  .createServer((req, res) => {
    // throw 'jamon!';
    Promise.reject('hola!');
  })
  .listen(5000);

// https://medium.com/deno-the-complete-reference/unhandled-rejection-denos-equivalent-of-node-js-12d2fce1418
// DENO does not have global handlers at the moment!

// const listener = Deno.listen({ port: 5000 });
// for await (const conn of listener) {
//   for await (const { request: req, respondWith: res } of Deno.serveHttp(conn)) {
//     try {
//       const d = await req.json();
//       res(new Response());
//     } catch (e) {
//       res(new Response(null, { status: 400 }));
//     }
//   }
// }
