import React from 'react';

export const Results = (props) => {

    return (
        <div id={'results'}>
            <div className={'timer-container'}>
                <div className={'timer active'} />
            </div>
            <table>
                <thead>
                <tr>
                    <th>Joueur</th>
                    <th>Combinaison</th>
                    <th>Argent gagné</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.players.map(player =>
                        props.winnerIds.includes(player.user.id)
                            ?   <tr key={player.user.id}>
                                    <td>{player.user.username}</td>
                                    <td>
                                        {
                                            props.allPlayersDropped
                                                ? 'Est le dernier joueur restant'
                                                : player.combination
                                        }
                                    </td>
                                    <td>{player.earnedMoney}€</td>
                                </tr>
                            : null
                    )
                }
                </tbody>
            </table>

        </div>
    )
};