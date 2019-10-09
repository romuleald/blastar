export type CardState = {
    value: string;
    isVisible: boolean;
};

export type PlayerState = {
    name?: string;
    initialCardNumber: number;
    initialCardView: number;
    cards: CardState[];
};

export type BlastarState = {
    players: {Player?};
    stockCards: CardState[];
    wasteCards: CardState[];
    roomId: number;
    currentPlayerName: string;
    isGameStarted: boolean;
    isCardViewerVisible: false;
    cardListToView: CardState[];
};
