import type { PropsWithChildren } from "react";

export function Headshot({imageSrc, children, name}: {imageSrc: string, name: string} & PropsWithChildren) {
    return (
        <div className="px-16 flex justify-between w-full">
            <div className="inline p-4 border-b-2 md:border-r-2 md:border-b-0">
                <img src={imageSrc} className="h-48 min-w-48"/>
            </div>
            <div className="inline p-4">
                <h1 className="text-2xl font-bold pb-2">{name}</h1>
                {children}
            </div>
        </div>
    )
}