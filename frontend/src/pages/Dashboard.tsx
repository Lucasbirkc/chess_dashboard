import Navbar from "../components/Navbar";
import { WinRateCard } from "../components/WinRateCard";
import { PeakRatingCard } from "../components/PeakRatingCard";
import { StatCard } from "../components/StatCard";
import { PerformanceReviewCard } from "../components/PerformanceReviewCard";
import { OpeningsListCard } from "../components/OpeningsListCard";
import { OpeningTrendChartCard } from "../components/OpeningsTrendChartCard";

export default function Dashboard() {
    // TEMP MOCK DATA
    const mockOpenings = [
        { name: "Italian Game", gamesPlayed: 145 },
        { name: "Sicilian Defense", gamesPlayed: 128 },
        { name: "French Defense", gamesPlayed: 98 },
        { name: "Queen's Gambit", gamesPlayed: 87 },
        { name: "Ruy Lopez", gamesPlayed: 76 },
    ];

    const mockPerformance = [
        { name: "Italian Game", wins: 89, losses: 43, draws: 13, trend: "up" as const },
        { name: "Sicilian Defense", wins: 71, losses: 42, draws: 15, trend: "up" as const },
        { name: "French Defense", wins: 48, losses: 38, draws: 12, trend: "neutral" as const },
        { name: "Queen's Gambit", wins: 52, losses: 28, draws: 7, trend: "up" as const },
        { name: "Ruy Lopez", wins: 38, losses: 31, draws: 7, trend: "down" as const },
    ];

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
                            <OpeningsListCard openings={mockOpenings} />
                        </StatCard>
                        {/* Performance Review Card - spans 2 columns */}
                        <div className="lg:col-span-2">
                            <StatCard title="Performance Review">
                                <PerformanceReviewCard data={mockPerformance} />
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