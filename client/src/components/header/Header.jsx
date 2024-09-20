import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import "./header.css";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
    const [OpenDate, setOpenDate] = useState(false);
    const [OpenOptions, setOpenOptions] = useState(false);
    const [destination, setDestination] = useState("");

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    const [options, setOptions] = useState({
        adultos: 1,
        criancas: 0,
        quartos: 1,
    });

    const handleOption = (name, operation) => {
        setOptions(prev => {return {
            ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        }})
    };

    const navigate = useNavigate();

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
        navigate("/hotels", { state: { destination, dates, options } });
    };

    const { user } = useContext(AuthContext);

    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Reservas</span>
                    </div>
                    {/* <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Hotéis</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div> */}
                </div>
                { type !== "list" && <><h1 className="headerTitle">Venha relaxar conosco.</h1>
                <p className="headerDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequatur dolore, illo unde nemo inventore.</p>
                {!user && <button className="headerButton">Sign up / Login</button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input
                            type="text"
                            placeholder="Onde você quer ir?"
                            className="headerSearchInput"
                            onChange={e => setDestination(e.target.value)}
                        />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <span onClick={() => setOpenDate(!OpenDate)} className="headerSearchIcon">
                            {`${format(dates[0].startDate, "dd/MM/yyyy", { locale: ptBR })} até ${format(dates[0].endDate, "dd/MM/yyyy", { locale: ptBR })}`}
                        </span>
                        {OpenDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            minDate={new Date()}
                            ranges={dates}
                            locale={ptBR}
                            className="date"
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span onClick={() => setOpenOptions(!OpenOptions)} className="headerSearchIcon">
                            {`${options.adultos} adultos . ${options.criancas} crianças . ${options.quartos} quartos`}
                            {OpenOptions && <div className="options">
                                <div className="optionsItem">
                                    <span className="optionText">Adultos</span>
                                    <div className="optionCounter">
                                        <button disabled={options.adultos <= 1} className="optionCounterButton" onClick={() => handleOption("adultos", "d")}>-</button>
                                            <span className="optionCounterNum">{options.adultos}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("adultos", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionsItem">
                                    <span className="optionText">Crianças</span>
                                    <div className="optionCounter">
                                        <button disabled={options.criancas <= 0} className="optionCounterButton" onClick={() => handleOption("criancas", "d")}>-</button>
                                            <span className="optionCounterNum">{options.criancas}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("criancas", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionsItem">
                                    <span className="optionText">Quartos</span>
                                    <div className="optionCounter">
                                        <button disabled={options.quartos <= 1} className="optionCounterButton" onClick={() => handleOption("quartos", "d")}>-</button>
                                            <span className="optionCounterNum">{options.quartos}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("quartos", "i")}>+</button>
                                    </div>
                                </div>
                            </div>}
                        </span>
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerSearchButton" onClick={() => handleSearch()}>Pesquisar</button>
                    </div>
                </div></>}
            </div>
        </div>
    );
}

export default Header;
