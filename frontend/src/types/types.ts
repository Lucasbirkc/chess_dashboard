interface Game {
    opponent: string;
    opening_name: string;
    rating: number;
    result: "win" | "loss" | "draw";
    timestamp: string;
}

export interface RecentGamesResponse {
    games: Game[];
}