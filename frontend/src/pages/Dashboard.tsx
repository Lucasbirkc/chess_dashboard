import Navbar from "../components/Navbar";
import { WinRateCard } from "../components/WinRateCard";
import { PeakRatingCard } from "../components/PeakRatingCard";
import { StatCard } from "../components/StatCard";
import { OpeningsListCard } from "../components/OpeningsListCard";
import { OpeningTrendChartCard } from "../components/OpeningsTrendChartCard";
import { RecentGamesCard } from "@/components/RecentGamesCard";

export default function Dashboard() {
    // TEMP MOCK DATA
    const mockTrendData = [
        { month: "Jan", winRate: 58 },
        { month: "Feb", winRate: 61 },
        { month: "Mar", winRate: 59 },
        { month: "Apr", winRate: 63 },
        { month: "May", winRate: 65 },
        { month: "Jun", winRate: 67 },
    ];

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

                        {/* Top 5 Openings Card */}
                        <StatCard title="Top 5 Openings">
                            <OpeningsListCard/>
                        </StatCard>
                        {/* Performance Review Card - spans 2 columns */}
                        <div className="lg:col-span-2">
                            <StatCard title="Recent Games">
                                <RecentGamesCard></RecentGamesCard>
                            </StatCard>
                        </div>

                        {/* Most Played Opening Trend - spans 1 column */}
                        <StatCard title="Italian Game - Win Rate Trend">
                            <OpeningTrendChartCard data={mockTrendData} />
                        </StatCard>
                    </div>
                </main>
            </div>
        </>
    )
}