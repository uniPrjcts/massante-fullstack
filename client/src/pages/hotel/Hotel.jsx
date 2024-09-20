import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./hotel.css";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserva from "../../components/reserva/Reserva";

const Hotel = () => {
    const [slideNum, setSlideNum] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const { data, loading, error } = useFetch(`/api/hotels/find/${id}`);

    const { dates, options } = useContext(SearchContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const MILESSEGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const daysDiff = Math.ceil(timeDiff / MILESSEGUNDOS_POR_DIA);
        return daysDiff;
    }

    const dias = dates.length > 0 && dates[0].startDate && dates[0].endDate
        ? dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate))
        : 0;

    const handleOpen = (i) => {
        setOpen(true);
        setSlideNum(i);
    }

    const handleMove = (direction) => {
        let newSlideNum;

        if (direction === "l") {
            newSlideNum = slideNum === 0 ? 5 : slideNum -1;
        } else {
            newSlideNum = slideNum === 5 ? 0 : slideNum +1  ;
        }

        setSlideNum(newSlideNum);
    }

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");
        }
    };

    return (
        <div>
            <Navbar/>
            <Header type="list"/>
            {loading ? "Loading, por favor aguarde" : (<><div className="hotelContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow left" onClick={() => handleMove("l")}/>
                    <div className="sliderWrapper">
                        <img src={data.fotos[slideNum]} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow right" onClick={() => handleMove("r")}/>
                </div>}
                <div className="hotelWrapper">
                    <button onClick={handleClick} className="reserveAgora">Reserve agora!</button>
                    <h1 className="hotelTitle">{data.nome}</h1>
                    <div className="hotelEndereco">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span>{data.endereco}</span>
                    </div>
                    <span className="hotelDistance">
                        {data.distancia} do centro
                    </span>
                    <span className="hotelPrecoMaisBaixo">
                        Preços a partir de {data.taxa_base}
                    </span>
                    <div className="hotelImgs">
                        {(data.fotos || []).map((foto, i) => (
                            <div className="hotelImgWrapper" key={i}>
                                <img
                                    onClick={() => handleOpen(i)}
                                    src={foto.src}
                                    alt=""
                                    className="hotelImg"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsText">
                            <h1 className="hotelTitle">{data.nome}</h1>
                            <p className="hotelDesc">{data.desc}</p>
                        </div>
                        <div className="hotelDetailsPreco">
                            <h1>Reserva perfeita para um sossego de {dias} dias!</h1>
                            <span>
                                Info sobre a localização e esse tipo de coisa.
                            </span>
                            <h2>
                                <b>R${dias * data.taxa_base * (options.adultos + options.criancas)},00</b> por {dias} noites <span className="wTaxes">sem impostos</span>
                            </h2>
                            <button onClick={handleClick}>Reserve agora!</button>
                        </div>
                    </div>
                </div>
                <MailList/>
                <Footer/>
            </div></>)}
            {openModal && <Reserva setOpen={setOpenModal} hotelId={id}/>}
        </div>
    );
}

export default Hotel;
