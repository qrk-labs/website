import { ThemeToggle, useTheme } from "@/lib/theme";

const isPalestineTime = () => typeof localStorage === 'object' && ((new Date().getMonth() == 9 && new Date().getDate() == 7) || localStorage.getItem("pstime"))
const logoPair = () => isPalestineTime() ? ['/assets/mix-light.svg', '/assets/mix-dark.svg'] : ['/assets/pure-light.svg', '/assets/pure-dark.svg']

export function Header({links, page}: {links: {label: string, href: string}[], page?: string}) {
    const { theme } = useTheme();
    const [light, dark] = logoPair();
    return (
        <header className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center gap-4">
                <img src={theme === 'light' ? light : dark} alt="QRK" className="h-10" />
                {page ? <h1 className="text-2xl">{page.toUpperCase()}</h1> : null}
            </div>
            <nav>
                {links.map((link) => (
                    <a className="text-sm font-light mx-2 hover:text-primary" href={link.href} key={link.label}>{link.label}</a>
                ))}
            </nav>
            <ThemeToggle/>
        </header>
    )
}