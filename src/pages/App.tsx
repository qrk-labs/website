import CursorFollow from "@/components/cursor-follow";
import { Header } from "../components/header";

export function HomePage() {
  return (
    <>
      <CursorFollow/>
      <Header links={[{label: 'Home', href: '/'}, {label: 'Team', href: '/team'}, {label: 'Mission', href: '/mission'}]} />
      <div className="my-auto w-full mt-[40vh]">
        <h1 className="text-8xl my-4 text-center leading-tight">LIBERATE THE HUMAN</h1>
      </div>
    </>
  );
}