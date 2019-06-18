import React from 'react'
import Board from '../Board/Board'
import './Game.css'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            nextIsX: true,
            stepNumber: 0,
        }
    }

    render() {
        // console.log(this.state.history)
        // console.log(this.state.stepNumber)
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = Game.calculateWinner(current.squares);
        let status;
        let moves;

        if (winner) {
            status = 'winner:' + winner;
        } else {
            status = 'Next player: ' + (this.state.nextIsX ? "X" : "O");
        }

        moves = history.map((step, move) => {
            let descr;
            descr = move ?
                'step#' + move :
                'start game';
            return (
                <li key={move}>
                    <button onClick={() => {
                                this.jumpTo(move)
                            }}>{descr}</button>
                </li>);
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleOnclick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{moves}</div>
                </div>
            </div>
        );
    }

    handleOnclick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (Game.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.nextIsX ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares: squares}]),
            nextIsX: !this.state.nextIsX,
            stepNumber: history.length
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            nextIsX: (step % 2) === 0,
        });
    }

    static calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}

export default Game;