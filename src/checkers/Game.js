import React from 'react';
import './Game.css';
import 'fontsource-roboto';
import Board from "./board/Board";
import { cloneDeep } from "lodash"
import GameMenu from "./GameMenu";

// ==================== END IMPORTS ====================

export default function Game() {
    // 0 -- selected piece
    // 1 -- black piece
    // 2 -- red piece
    const [history, setHistory] = React.useState([{
        board: [
            [{value: 1, isKing: false}, null, {value: 1, isKing: false}, null, {value: 1, isKing: false}, null, {value: 1, isKing: false}, null],
            [null, {value: 1, isKing: false}, null, {value: 1, isKing: false}, null, {value: 1, isKing: false}, null, {value: 1, isKing: false}],
            [{value: 1, isKing: false}, null, {value: 1, isKing: false}, null, {value: 1, isKing: false}, null, {value: 1, isKing: false}, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, {value: 2, isKing: false}, null, {value: 2, isKing: false}, null, {value: 2, isKing: false}, null, {value: 2, isKing: false}],
            [{value: 2, isKing: false}, null, {value: 2, isKing: false}, null, {value: 2, isKing: false}, null, {value: 2, isKing: false}, null],
            [null, {value: 2, isKing: false}, null, {value: 2, isKing: false}, null, {value: 2, isKing: false}, null, {value: 2, isKing: false}],
        ],
    }]);
    const [move, setMove] = React.useState(0);
    const [selection, setSelection] = React.useState(null);
    const [pending, setPending] = React.useState(false);

    // ==================== END VARIABLES ====================

    const back = () => {
        if (move - 1 < 0) {
            alert("slow down there");
            return
        }
        setMove(move - 1);
        setSelection(null);
    }

    const reset = () => {
        setHistory([{board: cloneDeep(history[0].board)}]);
        setMove(0);
        setSelection(null);
        setPending(false);
    }

    const forward = () => {
        if (move + 1 > history.length - 1) {
            alert("stop, bitch.");
            return
        }
        setMove(move + 1);
        setSelection(null);
    }

    const calculateJumps = (x, y, piece, mirror) => {
        console.log(piece)

        // set the piece
        if (x < 8 && x > -1 && y < 8 && y > -1) {
            if (mirror[x][y] === null)
                mirror[x][y] = { value: 0 };
            else return;
        }

        // black piece
        if (piece.value === 1) {
            if (x + 1 < 8) {
                // to the right
                if (mirror[x + 1][y + 1] && mirror[x + 1][y + 1].value === 2) {
                    calculateJumps(x + 2, y + 2, piece, mirror);
                }
                // to the left
                if (mirror[x + 1][y - 1] && mirror[x + 1][y - 1].value === 2) {
                    calculateJumps(x + 2, y - 2, piece, mirror);
                }
                // king
                if (piece.isKing) {
                    // to the right
                    if (mirror[x - 1][y + 1] && mirror[x - 1][y + 1].value === 2) {
                        calculateJumps(x - 2, y + 2, piece, mirror);
                    }
                    // to the left
                    if (mirror[x - 1][y - 1] && mirror[x - 1][y - 1].value === 2) {
                        calculateJumps(x - 2, y - 2, piece, mirror);
                    }
                }
            }
        } else if (piece.value === 2) {
            if (x - 1 > -1) {
                // to the right
                if (mirror[x - 1][y + 1] && mirror[x - 1][y + 1].value === 1) {
                    calculateJumps(x - 2, y + 2, piece, mirror);
                }
                // to the left
                if (mirror[x - 1][y - 1] && mirror[x - 1][y - 1].value === 1) {
                    calculateJumps(x - 2, y - 2, piece, mirror);
                }
                if (piece.isKing) {
                    // to the right
                    if (mirror[x + 1][y + 1] && mirror[x + 1][y + 1].value === 1) {
                        calculateJumps(x + 2, y + 2, piece, mirror);
                    }
                    // to the left
                    if (mirror[x + 1][y - 1] && mirror[x + 1][y - 1].value === 1) {
                        calculateJumps(x + 2, y - 2, piece, mirror);
                    }
                }
            }
        } // red piece
    }

    const calculateMoves = (x, y, piece, mirror) => {
        if (mirror) {
           // down
            if (piece.value === 1 || piece.isKing) {
                if (x + 1 < 8) {
                    // right
                    if (y + 1 < 8) {
                        // empty
                        if (mirror[x + 1][y + 1] === null)
                            mirror[x + 1][y + 1] = { value: 0 };
                        // black opponent for red king
                        else if (mirror[x + 1][y + 1].value === 1 && piece.value === 2)
                            calculateJumps(x + 2, y + 2, piece, mirror);
                        // red opponent for a black piece/king
                        else if (mirror[x + 1][y + 1].value === 2 && piece.value === 1)
                            calculateJumps(x + 2, y + 2, piece, mirror);
                    }
                    // left
                    if (y - 1 > -1) {
                        // empty
                        if (mirror[x + 1][y - 1] === null)
                            mirror[x + 1][y - 1] = {value: 0};
                        // black opponent for red king
                        else if (mirror[x + 1][y - 1].value === 1 && piece.value === 2)
                            calculateJumps(x + 2, y - 2, piece, mirror);
                        // red opponent for a black piece/king
                        else if (mirror[x + 1][y - 1].value === 2 && piece.value === 1)
                            calculateJumps(x + 2, y - 2, piece, mirror);
                    }
                }
            }

            // up
            if (piece.value === 2 || piece.isKing) {
                if (x - 1 > -1) {
                    // right
                    if (y + 1 < 8) {
                        // empty
                        if (mirror[x - 1][y + 1] === null)
                            mirror[x - 1][y + 1] = { value: 0 };
                        // black opponent for red king
                        else if (mirror[x - 1][y + 1].value === 1 && piece.value === 2)
                            calculateJumps(x - 2, y + 2, piece, mirror);
                        // red opponent for a black piece/king
                        else if (mirror[x - 1][y + 1].value === 2 && piece.value === 1)
                            calculateJumps(x - 2, y + 2, piece, mirror);
                    }
                    // left
                    if (y - 1 > -1) {
                        // empty
                        if (mirror[x - 1][y - 1] === null)
                            mirror[x - 1][y - 1] = { value: 0 };
                        // black opponent for red king
                        else if (mirror[x - 1][y - 1].value === 1 && piece.value === 2)
                            calculateJumps(x - 2, y - 2, piece, mirror);
                        // red opponent for a black piece/king
                        else if (mirror[x - 1][y - 1].value === 2 && piece.value === 1)
                            calculateJumps(x - 2, y - 2, piece, mirror);
                    }
                }
            }
        }
    }

    const movePiece = (x, y) => {
        // clicked the old piece
        if (selection.x === x && selection.y === y) {
            // alert("doth clicked me old piece")
            const past = cloneDeep(history.slice(0, move));

            // clean up, clean up, everybody do your share
            setHistory(past);
            setSelection(null);
            setMove(move - 1);
            setPending(false);
            return;
        }

        // copy of the board
        history[move].board = cloneDeep(history[move].board);

        while (selection.x !== x) {
            // up
            if (selection.x < x && selection.x + 1 < 8) {
                // right move
                if (y >= selection.y
                    && selection.y + 1 < 8
                    && history[move].board[selection.x + 1][selection.y + 1]
                    && history[move].board[selection.x + 1][selection.y + 1].value === 0) {

                    // up move to a red king
                    if (selection.x + 1 === 7 && selection.piece.value === 1)
                        selection.piece.isKing = true;

                    history[move].board[selection.x + 1][selection.y + 1] = selection.piece;
                    history[move].board[selection.x][selection.y] = null;
                    selection.x += 1;
                    selection.y += 1;
                    continue;
                } else if (y <= selection.y
                    && selection.y - 1 > -1
                    && history[move].board[selection.x + 1][selection.y - 1]
                    && history[move].board[selection.x + 1][selection.y - 1].value === 0) {

                    // up move to a red king
                    if (selection.x + 1 === 7 && selection.piece.value === 1)
                        selection.piece.isKing = true;

                    history[move].board[selection.x + 1][selection.y - 1] = selection.piece;
                    history[move].board[selection.x][selection.y] = null;
                    selection.x += 1;
                    selection.y -= 1;
                    continue;
                } // left move

                // right jump
                if (y >= selection.y
                    && selection.y + 2 < 8
                    && history[move].board[selection.x + 2][selection.y + 2]
                    && history[move].board[selection.x + 2][selection.y + 2].value === 0) {

                    // down jump right to a black king
                    if (selection.x - 2 === 0 && selection.piece.value === 1)
                        selection.piece.isKing = true;

                    history[move].board[selection.x + 2][selection.y + 2] = selection.piece;
                    history[move].board[selection.x + 1][selection.y + 1] = null;
                    history[move].board[selection.x][selection.y] = null;
                    selection.x += 2;
                    selection.y += 2;
                    continue;
                } else if (y <= selection.y
                    && selection.y - 2 > -1
                    && history[move].board[selection.x + 2][selection.y - 2]
                    && history[move].board[selection.x + 2][selection.y - 2].value === 0) {

                    // down jump right to a black king
                    if (selection.x - 2 === 0 && selection.piece.value === 1)
                        selection.piece.isKing = true;

                    history[move].board[selection.x + 2][selection.y - 2] = selection.piece;
                    history[move].board[selection.x + 1][selection.y - 1] = null;
                    history[move].board[selection.x][selection.y] = null;
                    selection.x += 2;
                    selection.y -= 2;
                    continue;
                }
            } // left jump

            // down
            if (selection.x > x && selection.x - 1 > -1) {
                // right move
                if (y >= selection.y
                    && selection.y + 1 < 8
                    && history[move].board[selection.x - 1][selection.y + 1]
                    && history[move].board[selection.x - 1][selection.y + 1].value === 0) {

                    // up move to a red king
                    if (selection.x - 1 === 0 && selection.piece.value === 2)
                        selection.piece.isKing = true;

                    history[move].board[selection.x - 1][selection.y + 1] = selection.piece;
                    history[move].board[selection.x][selection.y] = null;
                    selection.x -= 1;
                    selection.y += 1;
                    continue;
                } else if (y <= selection.y
                    && selection.y - 1 > -1
                    && history[move].board[selection.x - 1][selection.y - 1]
                    && history[move].board[selection.x - 1][selection.y - 1].value === 0) {

                    // up move to a red king
                    if (selection.x - 1 === 0 && selection.piece.value === 2)
                        selection.piece.isKing = true;

                    history[move].board[selection.x - 1][selection.y - 1] = selection.piece;
                    history[move].board[selection.x][selection.y] = null;
                    selection.x -= 1;
                    selection.y -= 1;
                    continue;
                } // left move

                // right jump
                if (y >= selection.y
                    && selection.y + 2 < 8
                    && history[move].board[selection.x - 2][selection.y + 2]
                    && history[move].board[selection.x - 2][selection.y + 2].value === 0) {

                    // down jump right to a red king
                    if (selection.x - 2 === 0 && selection.piece.value === 2)
                        selection.piece.isKing = true;

                    history[move].board[selection.x - 2][selection.y + 2] = selection.piece;
                    history[move].board[selection.x - 1][selection.y + 1] = null;
                    history[move].board[selection.x][selection.y] = null;
                    selection.x -= 2;
                    selection.y += 2;
                    continue;
                } else if (y <= selection.y
                    && selection.y - 2 > -1
                    && history[move].board[selection.x - 2][selection.y - 2]
                    && history[move].board[selection.x - 2][selection.y - 2].value === 0) {

                    // down jump left to a red king
                    if (selection.x - 2 === 0 && selection.piece.value === 2)
                        selection.piece.isKing = true;

                    history[move].board[selection.x - 2][selection.y - 2] = selection.piece;
                    history[move].board[selection.x - 1][selection.y - 1] = null;
                    history[move].board[selection.x][selection.y] = null;
                    selection.x -= 2;
                    selection.y -= 2;
                    continue;
                }
            } // left jump
        } // while

        // clean up the old selections
        history[move].board = history[move].board.map((item) => {
            return item.map((smallerItem) => {
                return (smallerItem && smallerItem.value === 0) ? null : smallerItem
            })
        });

        setHistory(history);
        setSelection(null);
        setPending(false);
    }

    const handleClick = (x, y, piece) => {
        // get a current copy of the history
        const past = move + 1 !== history.length
            ? history.slice(0, move + 1)
            : [...history];

        // if no piece is currently selected
        if (!selection) {
            // get a current copy of the board
            const mirror = cloneDeep(past[move].board);

            // change the button
            mirror[x][y] = { value: 0, isKing: piece.isKing};

            // select the possible moves
            calculateMoves(x, y, piece, mirror);

            setSelection({ x: x, y: y, piece: piece});
            setPending(true);
            setHistory([...past, {board: mirror}]);
            setMove(move + 1);
        } else {
            movePiece(x, y, piece)
        }
    }

    // ==================== END FUNCTIONS ====================

    console.log(history)

    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <Board board={history[move].board}
                           pending={pending}
                           move={move}
                           onClick={(x, y, piece) => handleClick(x, y, piece)}
                    />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
            <br />
            <GameMenu pending={pending} back={back} reset={reset} forward={forward}  />
        </div>
    );
}

// ==================== END GAME ====================
