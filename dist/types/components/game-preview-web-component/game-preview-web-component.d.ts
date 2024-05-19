export declare class GamePreviewWebComponent {
    /**
     * Club Id from my-club
     */
    club: string;
    /**
     * Game Id from my-club
     */
    game: string;
    /**
     * Name of the Game
     */
    name: string;
    teamAway: string;
    teamAwayLogo: string;
    teamHome: string;
    teamHomeLogo: string;
    city: string;
    location: string;
    dateTime: string;
    date: string;
    time: string;
    liga: string;
    private getGameId;
    private getClubId;
    private formatDate;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): any;
}
