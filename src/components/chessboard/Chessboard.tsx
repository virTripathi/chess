import Tile from '../Tile/Tile';
import './Chessboard.css';
import React, { useRef } from 'react';

const horizontalAxis:Array<string> = Array.from({ length: 8 }, (_, i) => String.fromCharCode(97 + i));
const verticalAxis:Array<number> = Array.from({ length: 8 }, (_, i) => i + 1);

interface Piece {
    image: string|undefined,
    x: number,
    y: number
}

const pieces:Array<Piece> = []; 

for(let i = 0; i<2; i++) {
    const type:string = i===0?'_dark':'_light';
    const y:number = type==="_dark"?7:0;
    pieces.push({image: `assets/images/rook${type}.png`,x: 0,y});
    pieces.push({image: `assets/images/knight${type}.png`,x: 1,y});
    pieces.push({image: `assets/images/bishop${type}.png`,x: 2,y});
    pieces.push({image: `assets/images/queen${type}.png`,x: 3,y});
    pieces.push({image: `assets/images/king${type}.png`,x: 4,y});
    pieces.push({image: `assets/images/bishop${type}.png`,x: 5,y});
    pieces.push({image: `assets/images/knight${type}.png`,x: 6,y});
    pieces.push({image: `assets/images/rook${type}.png`,x: 7,y});
}

for(let i = 0;i<8;i++) {
    pieces.push({image: 'assets/images/pawn_light.png',x: i,y: 1})
}

for(let i = 0;i<8;i++) {
    pieces.push({image: 'assets/images/pawn_dark.png',x: i,y: 6})
}




export default function Chessboard() {
    var chessBoardRef = useRef<HTMLDivElement>(null);
    var activePiece: HTMLElement|null;
function grabPiece(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
    const element = e.target as HTMLElement;
    if(element.classList.contains('chess-piece')) {
        element.style.position = 'absolute';
        const x = e.clientX-50;
        const y = e.clientY-50;
        element.style.left = x+'px';
        element.style.top = y+'px';
        activePiece = element;
    }   
}

function movePiece(e:React.MouseEvent) {
    const chessBoard = chessBoardRef.current;
    if(activePiece && chessBoard) {
        const minX = chessBoard.offsetLeft ;
        const minY = chessBoard.offsetTop ;
        const maxX = chessBoard.offsetLeft+chessBoard.clientWidth -60;
        const maxY = chessBoard.offsetTop+chessBoard.clientHeight - 60;
        const x = e.clientX-50;
        const y = e.clientY-50;
        activePiece.style.position = 'absolute';
        if(x<minX) {
            activePiece.style.left = minX+'px';
        } else if(x>maxX) {
            activePiece.style.left = maxX+'px';
        } else {
            activePiece.style.left = x+'px';
        }

        if(y<minY) {
            activePiece.style.top = minY+'px';
        } else if(y>maxY) {
            activePiece.style.top = maxY+'px';
        } else {
            activePiece.style.top = y+'px';
        }
       
    }
}

function releasePiece(e:React.MouseEvent) {
    if(activePiece) {
        const x = e.clientX-50;
        const y = e.clientY-50;
        activePiece = null;
    }
}
    let board = [];
    let number;
    for(let j = verticalAxis.length-1; j>=0;j--) {
        for(let i = 0; i<horizontalAxis.length;i++) {
            let image:string|undefined = undefined;

            pieces.forEach(p=>{
                if(p.x == i && p.y == j) {
                    image = p.image;
                }
            });
            number = j+i+2;
            board.push(<Tile key={`${i},${j}`} number={number} image={image}/>);
        }
    }
    return <div 
    onMouseMove={e=>movePiece(e)} 
    onMouseDown={e=>grabPiece(e)} 
    onMouseUp={e=>releasePiece(e)} 
    id="chessboard"
    ref={chessBoardRef}>
        {board}
    </div>
}