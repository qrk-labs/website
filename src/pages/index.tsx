import IndexLayout from "@/layout";
import { HomePage } from "./App";

export default function Home () {
  return (
    <IndexLayout title="QRK">
      <HomePage/>
    </IndexLayout>
  )
}

export const Root = HomePage;