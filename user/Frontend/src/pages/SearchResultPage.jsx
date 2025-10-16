
import { useLocation } from "react-router-dom";

function SearchResultPage() {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("query");
    return (
        <div>
            <p>Search Results for: {query}</p>
            {/* fetch and display results here */}
        </div>
    )
}

export default SearchResultPage