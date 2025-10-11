import { useParams } from 'react-router-dom';
import { Items } from "../assets/data/items"
import ItemCard from '../components/ItemCard';
import "./pages.css"
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useState } from 'react';


function CategoryItemsPage() {
    const { category } = useParams();
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [brand, setBrand] = useState("");
    const [sortBy, setSortBy] = useState("");

    // Extract unique brands for filtering
    const brands = [...new Set(Items.map((item) => item.brand))];

    // Filtering logic
    const filteredItems = Items.filter((item) => {
        return (
            item.category === category &&
            item.price >= priceRange[0] &&
            item.price <= priceRange[1] &&
            (brand ? item.brand === brand : true)
        );
    });

    // Sorting logic
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortBy === "price_low_high") return a.price - b.price;
        if (sortBy === "price_high_low") return b.price - a.price;
        if (sortBy === "name_asc") return a.name.localeCompare(b.name);
        if (sortBy === "name_desc") return b.name.localeCompare(a.name);
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-7xl mx-auto pr-6 py-3 flex flex-col lg:flex-row gap-10">
                {/* Sidebar Filters */}
                <aside className="lg:w-1/4 bg-white p-6 rounded-2xl shadow-md sticky left-0 top-40 bottom-30 self-start">
                    <h5 className="text-sm font-semibold mb-4 text-gray-800">Filters</h5>

                    {/* Price Range */}
                    <div className="mb-6">
                        <h6 className="text-gray-700 font-medium mb-2">Price Range</h6>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                            className="w-full accent-blue-500"
                        />
                    </div>

                    {/* Brand Filter */}
                    <div className="mb-6">
                        <h6 className="text-gray-700 font-medium mb-2">Brand</h6>
                        <select
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">All Brands</option>
                            {brands.map((b, i) => (
                                <option key={i} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort By */}
                    <div>
                        <h6 className="text-gray-700 font-medium mb-2">Sort By</h6>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Default</option>
                            <option value="price_low_high">Price: Low → High</option>
                            <option value="price_high_low">Price: High → Low</option>
                            <option value="name_asc">Name: A → Z</option>
                            <option value="name_desc">Name: Z → A</option>
                        </select>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <h3 className="text-xl font-bold mb-6 text-center text-gray-800 capitalize">
                        {category} Category
                    </h3>

                    {sortedItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center mt-10">
                            <img
                                src="https://cdn.dribbble.com/users/453325/screenshots/5573953/empty_state.png"
                                alt="Empty"
                                className="h-64 mb-4"
                            />
                            <p className="text-gray-600 text-lg">No items found in this category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {sortedItems.map((product) => (
                                <ItemCard
                                    key={product.id}
                                    name={product.name}
                                    image={product.image}
                                    price={product.price}
                                    id={product.id}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
}



export default CategoryItemsPage