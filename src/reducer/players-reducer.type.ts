export type CardState = {
    value: string;
    isVisible: boolean;
};

export type PlayerState = {
    name: string;
    initialCardNumber: number;
    initialCardView: number;
    cards: CardState[];
};

export type BlastarState = {
    players: {[playerName: string]: PlayerState};
    stockCards: string[];
    wasteCards: string[];
    roomId: number;
    currentPlayerName: string;
    isGameStarted: boolean;
    isCardViewerVisible: boolean;
    cardListToView: CardState[];
};
