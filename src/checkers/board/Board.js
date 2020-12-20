import React from 'react';
import './Board.css';
import 'fontsource-roboto';
import Row from "./Row";

// ==================== END IMPORTS ====================

export default function Board(props) {
    const { board, pending, move, onClick } = props;

    // ==================== END VARIABLES ====================

    return (
        <div className="board-row">
            {
                board.map((arr, index) => {
                    return (
                        <Row key={index}
                             pending={pending}
                             move={move}
                             onClick={(x, y, value) => onClick(x, y, value)}
                             rowArray={arr}
                             rowIndex={index} />
                    );
                })
            }
        </div>
    );
};

// ==================== END BOARD ====================
