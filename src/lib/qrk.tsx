import Markdowner from "markdowner";
import { join } from "node:path";
import { renderToReadableStream } from "react-dom/server";

export async function QRKRouter(path: string, req: Bun.BunRequest) {
    const pageFile = Bun.file(join(path, "/index.tsx"))
    const _404pageFile = Bun.file("src/pages/404.tsx")

    if (!await pageFile.exists() && !await _404pageFile.exists()) throw new Error(`Page ${path} does not exist and a 404 page was not provided`);
    else if (!await pageFile.exists() && await _404pageFile.exists()) {
        const _404Comp = await import("" + "src/pages/404.tsx");

        return {
            stream: renderToReadableStream(<_404Comp.default req={req}/>),
            component: ""
        }
    }

    const pageComp = await import(join("../../", path, "index.tsx"));
    const jsBuild = await Bun.build({
        entrypoints: ['src/root.tsx'],
        define: {
            "window.$$ROOT": "./" + join(path.split("/").slice(2).join("/"), "index.tsx"),
            "window.qrkrouter": "true",
        },
        root: ".",
        minify: true,
        plugins: [Markdowner]
    })

    const script = `
    <script type="application/javascript" type="module">
        ${(await jsBuild.outputs[0].text()).replace(/<\//g, '<\\/')
            .replace(/<\/script>/gi, '<\\/script>')}
    </script>`

    return {
        stream: renderToReadableStream(<pageComp.default req={req}/>),
        component: script,
    }
}