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

// DENO does not have a global handlers for exeptions
// but unhandled rejections!

denoland: {
  const listener = Deno.listen({ port: 5000 });
  for await (const conn of listener) {
    for await (const { request: req, respondWith: res } of Deno.serveHttp(
      conn
    )) {
      try {
        const d = await req.json();
        res(new Response());
      } catch (e) {
        res(new Response(null, { status: 400 }));
      }
    }
  }
}

denoland: {
  import { serve } from 'https://deno.land/std/http/mod.ts';

  globalThis.addEventListener('unhandledrejection', (e) => {
    console.log(Date.now() + ':' + e.reason); // 1660629861046:NotFound: No such file or directory (os error 2)
    // this code below will prevent exits!
    e.preventDefault();
  });

  setInterval(async () => {
    const file = await Deno.readTextFile('./non-existent.txt');
    console.log('FILE:', file);
  }, 5000);
  serve(() => new Response('!!'), { port: 8080 });
}
