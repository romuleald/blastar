import * as R from 'ramda';
import React from 'react';
import {connect} from 'react-redux';
import {flipCard, viewPlayerCard, dropPlayerCard} from '../actionCreators/playerActionCreators';
import {gameCards} from '../rules/gameCards';
import hiddenCardIllustration from './logo_radioactif.png';
import {CardState} from '../reducer/players-reducer.type';

type GameCardProps = {
    title: string;
    isVisible: boolean;
};

const GameCard: React.FC<GameCardProps> = ({title, isVisible, children}) => {
    const picture: string | undefined = R.path([title, 'picture'], gameCards);
    return (
        <div className="card-container">
            <div className="card">
                <img
                    className="card-picture"
                    src={isVisible && picture ? picture : hiddenCardIllustration}
                    alt="card"
                />
            </div>
            {children}
        </div>
    );
};

type Actions = {
    label: string;
    onClick;
};

type CardProps = {
    title: string;
    isVisible?: boolean;
    actionList?: Actions[];
};

export const Card: React.FC<CardProps> = ({title, isVisible, actionList = []}) => (
    <GameCard title={title} isVisible={isVisible}>
        {actionList.map(({label, onClick}, index) => (
            <button key={index} onClick={onClick}>
                {label}
            </button>
        ))}
    </GameCard>
);

type ActionCallBackType = {
    playerName: string;
    cardIndex: number;
};

type PlayerCardListProps = {
    cards: CardState[];
    playerName: string;
    flipCardAction: (ActionCallBackType) => {};
    viewPlayerCardAction: (ActionCallBackType) => {};
    dropPlayerCardAction: (ActionCallBackType) => {};
};

const _PlayerCardList: React.FC<PlayerCardListProps> = ({
    cards,
    playerName,
    flipCardAction,
    viewPlayerCardAction,
    dropPlayerCardAction
}) => (
    <div className="cards">
        {cards.map(({value: title, isVisible}, index) => (
            <Card
                key={index}
                title={title}
                isVisible={isVisible}
                actionList={[
                    {label: 'FLIP', onClick: flipCardAction({playerName, cardIndex: index})},
                    {label: 'VIEW', onClick: viewPlayerCardAction({playerName, cardIndex: index})},
                    {label: 'DROP', onClick: dropPlayerCardAction({playerName, cardIndex: index})}
                ]}
            />
        ))}
    </div>
);

const mapDispatchToProps = dispatch => ({
    flipCardAction: ({playerName, cardIndex}) => () => dispatch(flipCard({playerName, cardIndex})),
    viewPlayerCardAction: ({playerName, cardIndex}) => () => dispatch(viewPlayerCard({playerName, cardIndex})),
    dropPlayerCardAction: ({playerName, cardIndex}) => () => dispatch(dropPlayerCard({playerName, cardIndex}))
});

export const PlayerCardList = connect(
    null,
    mapDispatchToProps
)(_PlayerCardList);
