
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function SearchResultPage() {
    const { search } = useLocation();
    const { searchedProducts } = useSelector((state) => state.products);
    const query = new URLSearchParams(search).get("query");
    return (
        <div>
            <p>Search Results for: {query}</p>
            {/* fetch and display results here */}
        </div>
    )
}

export default SearchResultPage