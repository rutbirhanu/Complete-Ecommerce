import { useParams } from 'react-router-dom';
import { Items } from "../assets/data/items"
import ItemCard from '../components/ItemCard';
import "./pages.css"
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function CategoryItemsPage() {
    const { category } = useParams();
    const filterdItems = Items.filter(item => item.category === category);

    return (
        <div>
            <NavBar />
            <h5 style={{ margin: "1em 20px 30px 4em" }}>{category} Category</h5>
            <div className='category-items-page-container'>
                {filterdItems.length === 0 ? (
                    <div style={{ width:"100vw"}}>
                    <img  src="https://cdn.dribbble.com/users/453325/screenshots/5573953/empty_state.png" height="250px" style={{margin:"1px auto", display:"flex", justifyContent:"center"}} />
                    </div>
                ) : (
                    <>
                        {
                            filterdItems.map(product => (
                                <ItemCard key={product.id} name={product.name} image={product.image} price={product.price} id={product.id} />
                            ))
                        }
                    </>)}
            </div>
            <Footer />
        </div>
    )
}

export default CategoryItemsPage