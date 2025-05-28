import { plugin, type BunPlugin } from "bun"
import frontmatter from "front-matter";

const Markdowner: BunPlugin = {
    name: "markdowner",
    setup(build) {
        build.onLoad({ filter: /(\.md|\.mdx)$/ }, async (args) => {
            const markdownContent = await Bun.file(args.path).text()
            const { attributes, body } = frontmatter(markdownContent)

            return {
                contents: `
                    export const meta = ${JSON.stringify(attributes)};
                    const markdown = ${JSON.stringify(body)};
                    export default markdown;
                `,
                loader: "js"
            }
        })
    }
}

plugin(Markdowner)

export default Markdowner;