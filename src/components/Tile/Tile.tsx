import './Tile.css';

interface Props {
    number: number,
    image: string|undefined
}

export default function Tile({number, image}:Props) {
    const className: string = number % 2 === 0 ? 'green' : 'white';

    return <span className={`tile ${className}`}>
        {image && <div className='chess-piece' style={{backgroundImage:`url(${image})`}}>

        </div>}
        {/* <img src={image} alt=""/> */}
    </span>;
}