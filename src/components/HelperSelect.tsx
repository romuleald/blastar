import * as R from 'ramda';
import React from 'react';
import {connect} from 'react-redux';
import {selectPlayerList} from '../selectors/playerSelectors';
import {addPunitiveCard} from '../actionCreators/gameActionCreators';

const _HelperSelect = ({playerList, addPunitiveCardAction}) => {
    const firstPlayerName = R.pathOr(null, [0, 'name'], playerList);
    const [playerName, setPlayerName] = React.useState(firstPlayerName);

    React.useEffect(() => {
        setPlayerName(firstPlayerName);
    }, [firstPlayerName]);

    return (
        <div>
            <h3>Add card</h3>
            player
            <select name="player" onChange={event => setPlayerName(event.target.value)}>
                {playerList.map(({name}, index) => (
                    <option key={index} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <button onClick={() => addPunitiveCardAction(playerName)}>Add</button>
        </div>
    );
};

const mapStateToProps = state => ({
    playerList: selectPlayerList(state)
});

const mapDispatchToProps = dispatch => ({
    addPunitiveCardAction: playerName => playerName && dispatch(addPunitiveCard({name: playerName}))
});

export const HelperSelect = connect(
    mapStateToProps,
    mapDispatchToProps
)(_HelperSelect);
