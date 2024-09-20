import { format } from "date-fns";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./list.css";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
    const location = useLocation();
    const defaultDate = [{ startDate: new Date(), endDate: new Date(), key: 'selection' }];
    const defaultOptions = { adultos: 1, criancas: 0, quartos: 1 };

    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state?.dates || defaultDate);
    const [OpenDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state?.options || defaultOptions);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const { data, loading, error, reFetch } = useFetch(`/api/hotels?cidade=${destination}&min=${min || 0}&max=${max || 10000}`);

    const handleClick = () => {
        reFetch();
    }


    return (
        <div>
            <Navbar/>
            <Header type="list"/>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Pesquisa</h1>
                        <div className="lsItem">
                            <label >Destino</label>
                            <input placeholder={destination} type="text" />
                        </div>
                        <div className="lsItem">
                            <label >Data check-in</label>
                            <span onClick={() => setOpenDate(!OpenDate)}>
                                {`${format(dates[0].startDate, "dd/MM/yyyy")} até ${format(dates[0].endDate, "dd/MM/yyyy")}`}
                            </span>
                            {OpenDate && (<DateRange
                                onChange={item => setDates([item.selection])}
                                minDate={new Date()}
                                ranges={dates}
                            />)}
                        </div>
                        <div className="lsItem">
                            <label>Opções</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Preço min. <small>por noite</small></span>
                                    <input type="number" onChange={e => setMin(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Preço max. <small>por noite</small></span>
                                    <input type="number" onChange={e => setMax(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adultos</span>
                                    <input type="number" className="lsOptionInput" min={1} placeholder={options.adultos}/>
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Crianças</span>
                                    <input type="number" className="lsOptionInput" min={0} placeholder={options.criancas}/>
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Quartos</span>
                                    <input type="number" className="lsOptionInput" min={1} placeholder={options.quartos}/>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Pesquisar</button>
                    </div>
                    <div className="listResult">
                        {loading ? "Loading, aguarde por favor" : (<>
                        {data.map(item => (
                            <SearchItem item={item} key={item._id}/>
                        ))}
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
