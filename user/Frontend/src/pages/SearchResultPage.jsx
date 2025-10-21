
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../redux/productSlice";
import ItemCard from "../components/ItemCard";

function SearchResultPage() {
    const { search } = useLocation();
    const dispatch = useDispatch();
    const { searchedProducts } = useSelector((state) => state.product);
    const query = new URLSearchParams(search).get("query");

    useEffect(() => {
        if (query) {
            dispatch(searchProducts(query));
        }
    }, [query, dispatch]);


    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <h1 className="text-2xl font-semibold mb-6">
                Search Results for {'"'}<span className="text-blue-600">{query}</span>{'"'}
            </h1>

            {(searchedProducts?.length ?? 0) === 0 ? (
                <p className="text-gray-600">No products found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {searchedProducts.map((p) => (
                        <ItemCard
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            image={p.image}
                            price={p.price}
                            description={p.description}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchResultPage