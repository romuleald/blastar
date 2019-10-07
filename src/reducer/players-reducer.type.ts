export type CardType = {
    value: string;
    isVisible: boolean;
}

export type Player = {
    name?: string;
    initialCardNumber: number,
    initialCardView: number,
    cards: CardType[]
}

export type BlastarState = {
    players: { Player? };
    stockCards: CardType[];
    wasteCards: CardType[];
    roomId: number;
    currentPlayerName: string;
    isGameStarted: boolean;
    isCardViewerVisible: false;
    cardListToView: CardType[];
}
