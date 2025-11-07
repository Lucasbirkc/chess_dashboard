import Navbar from "../components/Navbar";
import TestCard from "../components/testCard";


export default function Dashboard() {
    return (
        <>
            <Navbar></Navbar>
            <div>
                Hello Dashboard!
            </div>
            <TestCard username="Lucas">
            </TestCard>
        </>
    )
}