import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

    const { data, loading, error } = useFetch("/api/hotels/countByCity?cidades=curitiba,ponta grossa,carambeí");

    console.log(data);

    return (
        <div className="featured">
            {loading ? "Loading, por favor espere." : (<><div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Curitiba</h1>
                    <h2>{data[0]} hotéis</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://www.viajeparana.com/sites/viaje-parana/arquivos_restritos/files/imagem/2019-02/catedral_01_0.jpg" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Ponta Grossa</h1>
                    <h2>{data[1]} hotéis</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://ancientengrtech.wisc.edu/wp-content/uploads/sites/1059/2020/10/windmills-netherlands-hero-image-768x403.jpg" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Carambeí</h1>
                    <h2>{data[2]} hotéis</h2>
                </div>
            </div></>)}
        </div>
    );
}

export default Featured;
