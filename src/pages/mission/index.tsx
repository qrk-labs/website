import IndexLayout from "@/layout";
import MissionPage from "./App";

export default function Mission() {
  return (
    <IndexLayout title="QRK | Mission">
      <MissionPage/>
    </IndexLayout>
  )
}

export const Root = MissionPage;