import Navbar from "../components/Navbar";
import { WinRateCard } from "../components/WinRateCard";
import { PeakRatingCard } from "../components/PeakRatingCard";


export default function Dashboard() {
    return (
        <>
            <div className="min-h-screen bg-background">
                {/* Navigation section */}
                <Navbar></Navbar>

                {/* Main section cards */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Win rate */}
                        <WinRateCard></WinRateCard>

                        {/* Peak rating */}
                        <PeakRatingCard></PeakRatingCard>

                        {/* Top 5 openings */}
                        <div className="bg-primary text-white p-4">
                            Custom Color Test
                        </div>
                        {/* Performance Review */}
                    </div>
                </main>
            </div>
        </>
    )
}