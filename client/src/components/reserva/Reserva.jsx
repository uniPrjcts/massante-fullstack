import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserva.css";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserva = ({ setOpen, hotelId }) => {
  const [quartosSelecionados, setQuartosSelecionados] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  // Atualize a URL da API para apontar para o backend
  const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/quarto/${hotelId}`);

  useEffect(() => {
    if (error) {
      console.error("Error fetching room data:", error);
      setFetchError("Failed to load room data. Please try again.");
    }
  }, [error]);

  useEffect(() => {
    console.log("Data received:", data);
  }, [data]);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = dates[0] && dates[0].startDate && dates[0].endDate
    ? getDatesInRange(dates[0].startDate, dates[0].endDate)
    : [];

  const isAvailable = (quarto) => {
    if (!quarto || !quarto.datasOcupado) return true;
    const isFound = quarto.datasOcupado.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const selecionado = e.target.checked;
    const value = e.target.value;
    setQuartosSelecionados(
      selecionado
        ? [...quartosSelecionados, value]
        : quartosSelecionados.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        quartosSelecionados.map((quartoId) =>
          axios.put(`http://localhost:8800/api/quartos/disponibilidade/${quartoId}`, { datasOcupado: alldates })
        )
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Error during reservation:", err);
      alert("Failed to make reservation. Please try again.");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (fetchError) return <div>Erro: {fetchError}</div>;
  if (!data || !Array.isArray(data) || data.length === 0) return <div>Nenhum quarto disponível</div>;

  return (
    <div className="reserva">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Selecione os quartos:</span>
        {data.map((item) => (
          item && (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.titulo || 'Sem título'}</div>
                <div className="rDesc">{item.desc || 'Sem descrição'}</div>
                <div className="rMax">
                  Capacidade: <b>{item.capacidade || 'N/A'}</b>
                </div>
                <div className="rPreco">R${item.preco},00</div>
              </div>
              <div className="rSelectedRooms">
                <div className="rSelectRooms">
                  <div className="quarto">
                    <label>{item.numeroQuarto}</label>
                    <input
                      type="checkbox"
                      value={item._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(item)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
        <button onClick={handleClick} className="rButton">
          Reservar
        </button>
      </div>
    </div>
  );
};

export default Reserva;
