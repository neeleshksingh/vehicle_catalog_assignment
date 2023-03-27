const Popup = ({manufacturer, onClose}) =>{
    return(
        <div>
            <h2>{manufacturer.head}</h2>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default Popup