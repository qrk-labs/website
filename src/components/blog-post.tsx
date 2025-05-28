import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

export default function BlogPost({meta, children}: {meta: any, children: string}) {
    return (
        <div>
            <h1 className="text-6xl font-light pb-8">{meta.title}</h1>
            <div className="flex justify-between items-center my-4 dark:text-[#444] text-[#aaa]">
                <p className="font-bold">FROM {" "}<span className="text-foreground font-light">{meta.author}</span></p>
                <p className="font-bold">DATE {" "} <span className="text-foreground font-light">{new Date(meta.publishedAt).toLocaleDateString()}</span></p>
            </div>
            <hr />
            <div className="pt-4 text-xl">
                <Markdown remarkPlugins={[remarkGfm]}>
                    {children}
                </Markdown>
            </div>
        </div>
    )
}