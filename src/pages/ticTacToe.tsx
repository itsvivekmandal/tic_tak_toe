
import { JSX } from "react";
import { useEffect, useState } from "react";
import Celebration from "@/components/Celebration";

const TicTacToe = (): JSX.Element => {
    const [turn, setTurn] = useState<boolean>(false);
    const [blocks, setBlocks] = useState<string[]>(Array(9).fill(""));
    const [remember, setRemember] = useState<number[]>([]);
    const [winner, setWinner] = useState<string|null>();
    const [winningLine, setWinningLine] = useState<string|null>(null);
    const [moveCount, setMoveCount] = useState<number>(0);

    // All winning combinations
    const winningCombinations: number[][] = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal
        [2, 4, 6], // diagonal
    ];

    const winningLines: string[] = [
        'top-10 right-0 w-60 -rotate-1 origin-top-left',
        'top-30 right-0 w-60 -rotate-1 origin-top-left',
        'top-50 right-0 w-60 -rotate-1 origin-top-left',
        'top-0 left-10 w-60 rotate-90 origin-top-left',
        'top-0 left-30 w-60 rotate-90 origin-top-left',
        'top-0 left-50 w-60 rotate-90 origin-top-left',
        'top-0 left-0 w-84 rotate-45 origin-top-left',
        'top-0 right-0 w-84 -rotate-45 origin-top-right'
    ];

    // Set move
    const move = (i: number) => {
        if(winner == null && moveCount < 9) {
            setBlocks(prev => {
                const next = [...prev];
                
                if(next[i] == '') {
                    next[i] = turn ? 'O':'X';
                    setTurn(!turn);
                    setRemember(prev => prev.includes(i) ? prev : [...prev, i]);
                }
                
                checkWinner(next);
                const newMoveCount = moveCount + 1;
                setMoveCount(newMoveCount);
                console.log(moveCount);
                return next;
            });
        }

    }
    // Undo function
    const undo = () => {
        const last = remember.pop();
        if(last !== undefined && last !== null) {
            setBlocks((prev) => {
                const next = [...prev];
                next[last as number] = '';
                
                setTurn(!turn);

                const newMoveCount = moveCount - 1;
                setMoveCount(newMoveCount);

                setWinner(null);
                setWinningLine(null);
                
                return next;
            });
        }
    }
    // Reset function
    const reset = () => {
        setBlocks(Array(9).fill(""));
        setRemember([]);
        setTurn(false);
        setWinner(null);
        setWinningLine(null);
        setMoveCount(0);
    }

    const checkWinner = (blocks: string[]): void => {
        let count = 0;
        for(const combo of winningCombinations) {
            const [a, b, c] = combo;
            if(blocks[a] && blocks[a] === blocks[b] && blocks[b] === blocks[c]) {
                setWinner(blocks[combo[0]]);
                setWinningLine(winningLines[count]);
                console.log(winningLines[count]);
            }
            count++;
        }
    }

    return (
        <div className="felx">
            <div className="flex-col text-center p-4 text-3xl font-bold">
                <h1>Happy Gaming</h1>
            </div>
            <div className="flex justify-center gap-4 py-10 text-lg font-bold">
                <button className={` text-white px-4 py-2 rounded-full shadow-md transition
                    ${remember.length !== 0 ? "bg-green-500 hover:bg-green-600": 'bg-gray-300'}
                `}
                    disabled={remember.length === 0}
                    onClick={undo}
                >
                    Undo
                </button>
                <button className={`text-white px-4 py-2 rounded-full shadow-md transition
                    ${remember.length !== 0 ? "bg-[#7952b3] hover:bg-[#6842a0]": 'bg-gray-300'}
                `}
                    disabled={remember.length === 0}
                    onClick={reset}
                >
                    Reset
                </button>
            </div>
            {(winner || moveCount == 9) && (
                <div className="relative flex-col text-center p-5 text-3xl font-bold">
                    {winner && <h1>{winner} is the winner!</h1>}
                    {(winner == null &&  moveCount == 9) && <h1>Match draw!</h1>}
                </div>
                )
            }
            {winner && <Celebration winner={winner} />}
            <div className="game flex items-center justify-center">
                <div className="relative grid grid-cols-3 shadow-xl rounded-lg mx-auto w-60 h-60">
                    {
                        [...Array(9)].map((index, i) => (
                            <button 
                                key={i}
                                className={`flex items-center justify-center text-3xl font-bold border-indigo-500 w-20 h-20 cursor-pointer
                                ${i % 3 !== 2 ? "border-r-4" : ""}
                                ${i < 6 ? "border-b-4" : ""}
                                `}
                                onClick={() => move(i)}
                            >
                                {blocks[i]}
                                
                            </button>
                        ))
                    }
                    {winningLine ? (<div className={`absolute h-[3px] bg-red-500 animate-grow-line ${winningLine}`}></div>):""}
                </div>
            </div>
        </div>
    )
};

export default TicTacToe;