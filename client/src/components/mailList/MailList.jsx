import "./mailList.css"

const MailList = () => {
    return (
        <div className="mail">
            <h1 className="mailTilte">Aproveite nossas ofertas exclusivas!</h1>
            <span className="mailDesc">Assine já e iremos lhe mandar as melhores ofertas!</span>
            <div className="mailInputContainer">
                <input type="text" placeholder="email@email.com" />
                <button>Assinar</button>
            </div>
        </div>
    );
}

export default MailList;
