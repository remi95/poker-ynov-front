import React from 'react';
import {getInitials} from "../../../helpers/game";

export const ButtonRole = (props) => {

    return (
        <div>
            {
                props.role
                    ?   <div className="btn-role">
                            {getInitials(props.role)}
                        </div>
                    : null
            }
        </div>
    )
};