import "./index.css";
import { Header } from "../../components/header";

import Statement, { meta } from "./statement.md"
import BlogPost from "@/components/blog-post";

export default function MissionPage() {
  return (
    <>
      <Header links={[{label: 'Home', href: '/'}, {label: 'Team', href: '/team'}, {label: 'Mission', href: '/mission'}]} />
      <div className="container mx-auto p-8 relative z-10 mt-28">
        <BlogPost meta={meta}>
          {Statement}
        </BlogPost>
      </div>
    </>
  );
}