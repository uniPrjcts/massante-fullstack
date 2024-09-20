import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css"

const FeaturedProperties = () => {
    const {data, loading, error} = useFetch("/api/hotels?featured=true");

    return (
        <div className="fProp">
            {loading ? "Loading, por favor aguarde" : (<>
            {data.map(item => (
            <div className="fpItem" key={item._id}>
                <img src={item.fotos[0]} className="fpImg" />
                <span className="fpNome">{item.nome}</span>
                <span className="fpCity">{item.cidade}</span>
                <span className="fpPreco">A partir de {item.taxa_base}</span>
                {item.rating && <span className="fpRating">
                    <button>{item.rating}</button>
                    <span>Wow</span>
                </span>}
            </div>))}</>)}
        </div>
    );
}

export default FeaturedProperties;
