import IndexLayout from "@/layout";
import { TeamPage } from "./App";

export default function Mission () {
    return (
        <IndexLayout title="QRK | Team">
            <TeamPage />
        </IndexLayout>
    )
}

export const Root = TeamPage;