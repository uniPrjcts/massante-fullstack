import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {

    const {data, loading, error} = useFetch("/api/hotels/countByType");

    const images = [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
    ];

    return (
        <div className="pList">
            {loading ?
            ("Loading, por favor espere"
                ) : (
            <>
            {data &&
            images.map((img, i) => (
                <div className="pListItem"  >
                <img
                    src={img}
                    className="pListImg"
                />
                <div className="pListTitles">
                    <h1>{data[i]?.tipo}</h1>
                    <h2>{data[i]?.count} {data[i]?.tipo}</h2>
                </div>
            </div>
            ))}
            </>)}
        </div>
    );
};

export default PropertyList;
