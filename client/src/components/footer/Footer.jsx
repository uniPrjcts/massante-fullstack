import "./footer.css";

const Footer = () => {
    const anoAtual = new Date().getFullYear();
    return (
        <div className="footer">
            <div className="fLists">
                <ul className="fList">
                    <li className="fListItem">Footer 1</li>
                    <li className="fListItem">Footer 2</li>
                    <li className="fListItem">Footer 3</li>
                    <li className="fListItem">Footer 4</li>
                    <li className="fListItem">Footer 5</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Footer 1</li>
                    <li className="fListItem">Footer 2</li>
                    <li className="fListItem">Footer 3</li>
                    <li className="fListItem">Footer 4</li>
                    <li className="fListItem">Footer 5</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Footer 1</li>
                    <li className="fListItem">Footer 2</li>
                    <li className="fListItem">Footer 3</li>
                    <li className="fListItem">Footer 4</li>
                    <li className="fListItem">Footer 5</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Footer 1</li>
                    <li className="fListItem">Footer 2</li>
                    <li className="fListItem">Footer 3</li>
                    <li className="fListItem">Footer 4</li>
                    <li className="fListItem">Footer 5</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Footer 1</li>
                    <li className="fListItem">Footer 2</li>
                    <li className="fListItem">Footer 3</li>
                    <li className="fListItem">Footer 4</li>
                    <li className="fListItem">Footer 5</li>
                </ul>
            </div>
            <div className="fText">Copyright Massante {anoAtual} ©</div>
        </div>
    );
}

export default Footer;
