import { BlockList } from "net";
import { JSX } from "react";
import { useEffect, useState } from "react";

const TicTacToe = (): JSX.Element => {
    const [turn, setTurn] = useState<boolean>(false);
    const [blocks, setBlocks] = useState<string[]>(Array(9).fill(""));
    const [remember, setRemember] = useState<number[]>([]);
    const [winner, setWinner] = useState<number[]>([]);

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

    // Set move
    const move = (i: number) => {
        setBlocks(prev => {
            const next = [...prev];
            
            if(next[i] == '') {
                next[i] = turn ? 'O':'X';
                setTurn(!turn);
                setRemember(prev => prev.includes(i) ? prev : [...prev, i]);
                // console.log("Moves:", remember);
            }
            
            const winners = checkWinner();
            console.log(winners);
            if (winners) {
                alert(`Winner is ${blocks[winners[0]]}!`);
            }
            return next;
        });

    }
    // Undo function
    const undo = () => {
        const last = remember.pop();
        if(last !== undefined && last !== null) {
            setBlocks((prev) => {
                const next = [...prev];
                next[last as number] = '';
                
                setTurn(!turn);
                
                return next;
            });
        }
    }
    // Reset function
    const reset = () => {
        setBlocks(Array(9).fill(""));
        setRemember([]);
        setTurn(false);
    }

    // Check game is over or not
    // useEffect(() => {

    // }, [])
    const checkWinner = () => {
        console.log(winningCombinations);
        console.log(blocks);
        for(const combo of winningCombinations) {
            console.log(combo);
            const [a, b, c] = combo;
            if(blocks[a] && blocks[a] === blocks[b] && blocks[b] === blocks[c]) {
                // console.log(combo);
                return combo;
            }
        }

        return null;
    }

    return (
        <div className="felx">
            <div className="flex-col text-center p-5 text-3xl font-bold">
                <h1>Happy Gaming</h1>
            </div>
            <div className="flex justify-center gap-2 p-6 text-lg font-bold">
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
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-3 shadow-xl rounded-lg mx-auto w-60 h-60">

                    {
                        [...Array(9)].map((index, i) => (
                            <button 
                                key={i}
                                className={`flex items-center justify-center text-3xl font-bold border-indigo-500 w-20 h-20 cursor-pointer
                                ${i % 3 !== 2 ? "border-r-4" : ""}
                                ${i < 6 ? "border-b-4" : ""}`}
                                onClick={() => move(i)}
                            >
                                {blocks[i]}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default TicTacToe;