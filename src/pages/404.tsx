import IndexLayout from "@/layout";

export default function _404({req}: {req: Bun.BunRequest}) {
    const url = new URL(req.url);
    const path = url.pathname;
    return (
        <IndexLayout title="Page Not Found">
            <div className="text-center my-auto">
                <h1 className="text-[12rem] font-bold">404</h1>
                <h3 className="text-[4rem]">{path} not found.</h3>
            </div>
        </IndexLayout>
    )
}