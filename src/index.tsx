import { serve } from "bun";
import { QRKRouter } from "./lib/qrk";
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import team from "./pages/team/index.html"

function concatStreams<T>(...streams: ReadableStream<T>[]): ReadableStream<T> {
  return new ReadableStream<T>({
    async start(controller) {
      for (const stream of streams) {
        const reader = stream.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
      }
      controller.close();
    },
  });
}

const streamFromString = (str: string) =>
  new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(str));
      controller.close();
    },
  });


const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    // "/team": team,
    "/*": {
      async GET(req) {
        const url = new URL(req.url);
        const path = url.pathname.slice(1);
        const {stream, component} = await QRKRouter(`./src/pages/${path}`, req)
        const reactStream = await stream
        return new Response(concatStreams(reactStream, streamFromString(component)))
      }, 
    },

    "/assets/*": {
      async GET(req) {
        const url = new URL(req.url);
        const path = url.pathname.slice(1);
        const file = Bun.file(`./src/${path}`);
        return new Response(file.stream(), { headers: { "Content-Type": "image/svg+xml" } });
      },
    },

    "/styles/*": {
      async GET(req) {
        const url = new URL(req.url);
        const path = url.pathname.slice(1);
        const params = url.searchParams

        const stylesheet = params.get("src")

        if (stylesheet) {
          const css = await Bun.file(stylesheet).text();
                      
          const result = await postcss([
              tailwindcss,
              autoprefixer,
          ]).process(css, { 
              from: path,
              to: undefined,
          });

          return new Response(result.css, { headers: { "Content-Type": "text/css" } })
        }

        const errResponse = Response.error()
        return errResponse
      }
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production",
  port: parseInt(process.env.PORT) || 3000
});

console.log(`🚀 Server running at ${server.url}`);
