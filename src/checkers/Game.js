import React from 'react';
import './Game.css';
import 'fontsource-roboto';
import Board from "./board/Board";
import {cloneDeep} from "lodash"
import GameMenu from "./GameMenu";

// ==================== END IMPORTS ====================

export default function Game() {
    const [history, setHistory] = React.useState([{
        board: [
            [0, null, 0, null, 0, null, 0, null],
            [null, 0, null, 0, null, 0, null, 0],
            [0, null, 0, null, 0, null, 0, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, 1, null, 1, null, 1, null, 1],
            [1, null, 1, null, 1, null, 1, null],
            [null, 1, null, 1, null, 1, null, 1],
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

    const jumps = (x, y, value, mirror) => {
        if (value === 0) {
            if (mirror[x + 1][y + 1] === 1) {
                if (x + 2 < 8 && y + 2 < 8) {
                    if (mirror[x + 2][y + 2] === null) {
                        mirror[x + 2][y + 2] = 2;
                        jumps(x + 2, y + 2, value, mirror);
                    }
                }
            }
            if (mirror[x + 1][y - 1] === 1) {
                if (x + 2 < 8 && y - 2 > -1) {
                    if (mirror[x + 2][y - 2] === null) {
                        mirror[x + 2][y - 2] = 2;
                        jumps(x + 2, y - 2, value, mirror);
                    }
                }
            }
        }
        else if (value === 1) {
            if (mirror[x - 1][y + 1] === 0) {
                if (x - 2 > -1 && y + 2 < 8) {
                    if (mirror[x - 2][y + 2] === null) {
                        mirror[x - 2][y + 2] = 2;
                        jumps(x - 2, y + 2, value, mirror);
                    }
                }
            }
            if (mirror[x - 1][y - 1] === 0) {
                if (x - 2 > -1 && y - 2 > -1) {
                    if (mirror[x - 2][y - 2] === null) {
                        mirror[x - 2][y - 2] = 2;
                        jumps(x - 2, y - 2, value, mirror);
                    }
                }
            }
        }

    }

    const calculateMoves = (x, y, value, mirror) => {
        if (value === 0) {
            if (x + 1 < 8 && y + 1 < 8) {
                if (mirror[x + 1][y + 1] === null)
                    mirror[x + 1][y + 1] = 2;
                if (mirror[x + 1][y + 1] === 1) {
                    if (x + 2 < 8 && y + 2 < 8) {
                        if (mirror[x + 2][y + 2] === null) {
                            mirror[x + 2][y + 2] = 2;
                            jumps(x + 2, y + 2, value, mirror);
                        }
                    }
                }
            }
            if (x + 1 < 8 && y - 1 > -1) {
                if (mirror[x + 1][y - 1] === null)
                    mirror[x + 1][y - 1] = 2;
                if (mirror[x + 1][y - 1] === 1) {
                    if (x + 2 < 8 && y - 2 > -1) {
                        if (mirror[x + 2][y - 2] === null) {
                            mirror[x + 2][y - 2] = 2;
                            jumps(x + 2, y - 2, value, mirror);
                        }
                    }
                }
            }
        } else if (value === 1) {
            if (x - 1 > -1 && y + 1 < 8) {
                if (mirror[x - 1][y + 1] === null)
                    mirror[x - 1][y + 1] = 2;
                if (mirror[x - 1][y + 1] === 0) {
                    if (x - 2 > -1 && y + 2 < 8) {
                        if (mirror[x - 2][y + 2] === null) {
                            mirror[x - 2][y + 2] = 2;
                            jumps(x - 2, y + 2, value, mirror);
                        }
                    }
                }
            }
            if (x - 1 > -1 && y - 1 < 8) {
                if (mirror[x - 1][y - 1] === null)
                    mirror[x - 1][y - 1] = 2;
                if (mirror[x - 1][y - 1] === 0) {
                    if (x - 2 > -1 && y - 2 < 8) {
                        if (mirror[x - 2][y - 2] === null) {
                            mirror[x - 2][y - 2] = 2;
                            jumps(x - 2, y - 2, value, mirror);
                        }
                    }
                }
            }
        }
    }

    const movePiece = (x, y, value) => {
        const past = move + 1 !== history.length
            ? history.slice(0, move + 1)
            : [...history];

        if (!selection) {
            const mirror = cloneDeep(past[move].board);

            mirror[x][y] = 2;
            calculateMoves(x, y, value, mirror);

            setHistory([...past, {board: mirror}]);
            setSelection({ x: x, y: y, value: value});
            setMove(move + 1);
            setPending(true);
        } else {
            if (selection.x === x && selection.y === y) {
                // alert("doth clicked me old piece")
                const past = cloneDeep(history.slice(0, move));
                setHistory(past);
                setSelection(null);
                setMove(move - 1);
                setPending(false);
                return;
            } else if (selection.value === 0) {
                if (y === selection.y + 1) {
                    // alert("doth clicked a new black piece down to the right ")
                    history[move].board = cloneDeep(history[move - 1].board);
                    history[move].board[x][y] = 0
                } else if (y === selection.y - 1) {
                    // alert("doth clicked a new black piece down to the left ")
                    history[move].board = cloneDeep(history[move - 1].board);
                    history[move].board[x][y] = 0
                } else if (y === selection.y + 2) {
                    history[move].board = cloneDeep(history[move - 1].board);
                    history[move].board[x - 1][y - 1] = null
                    history[move].board[x][y] = 0
                } else if (y === selection.y - 2) {
                    history[move].board = cloneDeep(history[move - 1].board);
                    history[move].board[x - 1][y + 1] = null
                    history[move].board[x][y] = 0
                }
            } else if (selection.value === 1) {
                if (y === selection.y + 1) {
                    // alert("doth clicked a new red piece up to the right ")
                    history[move].board = cloneDeep(history[move - 1].board);
                    history[move].board[x][y] = 1
                } else if (y === selection.y - 1) {
                    // alert("doth clicked a new red piece up to the left ")
                    history[move].board = cloneDeep(history[move - 1].board);
                    history[move].board[x][y] = 1
                } else if (y === selection.y + 2) {
                    history[move].board = cloneDeep(history[move - 1].board);
                    history[move].board[x + 1][y - 1] = null
                    history[move].board[x][y] = 1
                } else if (y === selection.y - 2) {
                    history[move].board = cloneDeep(history[move - 1].board);
                    history[move].board[x + 1][y + 1] = null
                    history[move].board[x][y] = 1
                }
            }

            history[move].board[selection.x][selection.y] = null;
            setHistory(history);
            setSelection(null);
            setPending(false);
        }
    }

    // ==================== END UTILITIES ====================

    console.log(history)

    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <Board board={history[move].board}
                           pending={pending}
                           move={move}
                           onClick={(x, y, value) => movePiece(x, y, value)}
                    />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
            <br />
            <GameMenu back={back} reset={reset} forward={forward}  />
        </div>
    );
}

// ==================== END GAME ====================
