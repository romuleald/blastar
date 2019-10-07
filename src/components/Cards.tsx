import * as R from 'ramda';
import React, {FC} from 'react';
import {connect} from 'react-redux';
import {flipCard, viewPlayerCard, dropPlayerCard} from '../actionCreators/playerActionCreators';
import {gameCards} from '../rules/gameCards';
import hiddenCardIllustration from './logo_radioactif.png';
import {CardType} from "../reducer/players-reducer.type";

const GameCard = ({title, isVisible, children}) => {
    const picture = R.path([title, 'picture'], gameCards);
    return (
        <div className="card-container">
            <div className="card">
                <img className="card-picture"
                     src={isVisible && picture ? picture : hiddenCardIllustration}
                     alt="card"/>
            </div>
            {children}
        </div>
    );
};

type Actions = {
    label: string;
    onClick;
}
type CardProps = {
    children?;
    title: string;
    isVisible?: boolean;
    actionList?: Actions[];
}

export const Card: FC<CardProps> = ({title, isVisible, actionList = []}) => (
    <GameCard
        title={title}
        isVisible={isVisible}>
        {actionList.map(({label, onClick}, index) => (
            <button key={index} onClick={onClick}>{label}</button>
        ))}
    </GameCard>
);

type ActionCallBackType = {
    playerName: string;
    cardIndex: number;
}
type PlayerCardListProps = {
    cards: CardType[];
    playerName: string;
    flipCard: (ActionCallBackType) => {};
    viewPlayerCard: (ActionCallBackType) => {};
    dropPlayerCard: (ActionCallBackType) => {};
}
export const PlayerCardList: FC<PlayerCardListProps> = ({cards, playerName, flipCard, viewPlayerCard, dropPlayerCard}) =>
    <div className="cards">
        {cards.map(({value: title, isVisible}, index) =>
            <Card
                key={index}
                title={title}
                isVisible={isVisible}
                actionList={[
                    {label: 'FLIP', onClick: flipCard({playerName, cardIndex: index})},
                    {label: 'VIEW', onClick: viewPlayerCard({playerName, cardIndex: index})},
                    {label: 'DROP', onClick: dropPlayerCard({playerName, cardIndex: index})}
                ]}/>
        )}
    </div>;

const mapDispatchToProps = dispatch => ({
    flipCard: ({playerName, cardIndex}) => () => dispatch(flipCard({playerName, cardIndex})),
    viewPlayerCard: ({playerName, cardIndex}) => () => dispatch(viewPlayerCard({playerName, cardIndex})),
    dropPlayerCard: ({playerName, cardIndex}) => () => dispatch(dropPlayerCard({playerName, cardIndex}))
});

export default connect(null, mapDispatchToProps)(PlayerCardList);
