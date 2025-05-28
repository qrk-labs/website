import hydratePage from "@/lib/hydrate";
import Styles from "@/lib/styles";
import { ThemeProvider } from "@/lib/theme";
import { useEffect, type PropsWithChildren } from "react";

export default async function IndexLayout(props: {title: string} & PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/svg+xml" href="../../assets/pure-dark.svg" />
                <title>{props.title}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="/styles/?src=styles/globals.css" />
            </head>
            <body>
                <div id="root" className="w-full h-full">
                    <ThemeProvider>
                        {props.children}
                    </ThemeProvider>
                </div>
            </body>
        </html>
    );
}