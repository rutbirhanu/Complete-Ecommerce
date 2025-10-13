import BrandContainer from "../components/BrandContainer"
import CarouselComp from "../components/CarouselComp"
import CategoryCard from "../components/CategoryCard"
import ItemCard from "../components/ItemCard"
import NavCatagoryContainer from "../components/NavCatagoryContainer"
// import { setProduct } from "../redux/productSlice"
import { useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import { NavgationCategories } from "../assets/data/categories"
import TitleComponent from "../components/TitleComponent"
import Footer from "../components/Footer"


function HomePage() {
  const { products } = useSelector((state) => state.product);
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="font-sans">
      <NavBar />

      {/* Categories container */}
      <div className="flex flex-row gap-[35px] mx-6 mb-4 overflow-x-auto scrollbar-hide">
        {NavgationCategories.map((item) => (
          <NavCatagoryContainer
            key={item.title}
            category={item.title}
            imgSource={item.image}
          />
        ))}
      </div>

      <CarouselComp />
      <br />
      <br />

      {/* Category card container 1 */}
      <div className="my-12 flex items-center justify-evenly overflow-x-auto scrollbar-hide">
        <CategoryCard
          imgSource="https://i.mdel.net/oftheminute/images/2019/08/stas_55_04.jpg"
          category="Women"
          desc="Blouse, Skirt, Dresses and more ..."
        />
        <CategoryCard
          imgSource="https://www.essence.com/wp-content/uploads/2020/12/Fernando-Cabral-Mens-Health-UK-July-2019-by-Jon-Gorrigan.jpg"
          category="Men"
          desc="Tees, Polos, and more ..."
        />
        <CategoryCard
          imgSource="https://ae01.alicdn.com/kf/S591bb2f59f8b4e0dbb879c2170241f87K.jpg_640x640q90.jpg"
          category="Kids"
          desc="Pajamas, Outfits, and more ..."
        />
        <CategoryCard
          imgSource="https://i.pinimg.com/736x/b3/67/c8/b367c80640373452b88be9911b62ddad.jpg"
          category="Home"
          desc="Decor, Appliances, and more ..."
        />
      </div>

      {/* Category card container 2 */}
      <div className="my-12 flex items-center justify-evenly overflow-x-auto scrollbar-hide">
        <CategoryCard
          imgSource="https://www.modelsdirectblog.com/wp-content/uploads/2020/11/shutterstock_1121333510.jpg"
          category="Sports"
          desc="Lululemon, Alo and more ..."
        />
        <CategoryCard
          imgSource="https://www.rebelsport.com.au/on/demandware.static/-/Library-Sites-rebel-shared-library/default/dw4cc1588e/category/womens/cards/240329-XPLP-Womens-Footwear-Sneakers-Category-Heritage.jpg"
          category="Sneaker"
          desc="Nike, Jordan, Adidas, and more"
        />
        <CategoryCard
          imgSource="https://accessorizelondon.in/cdn/shop/files/MA-28187004001_1_8a091db7-0510-47d6-8eff-f95c927c4dd6.webp?crop=center&height=720&v=1697534229&width=720"
          category="Handbags"
          desc="Authentic, designer, trend"
        />
        <CategoryCard
          imgSource="https://static.vecteezy.com/system/resources/previews/030/680/146/non_2x/toys-with-white-background-high-quality-ultra-hd-free-photo.jpg"
          category="Toys"
          desc="Building blocks, dolls"
        />
        <br />
      </div>
      <br />

      {/* Top brands */}
      <TitleComponent title="Top brands" />
      <div className="flex justify-evenly items-center overflow-x-auto gap-12 scrollbar-hide">
        <BrandContainer imgSource="https://lecoureurnordique.ca/cdn/shop/products/nike-zoom-fly-4-homme-le-coureur-nordique-33_700x700.jpg?v=1668773341" />
        <BrandContainer imgSource="https://www.shutterstock.com/image-photo/moscow-russia-october-07-2017-600nw-729667363.jpg" />
        <BrandContainer imgSource="https://img.freepik.com/premium-photo/isolated-sony-a7-iii-mirrorless-camera-front-view-white-backgroun-white-background-clean_655090-800284.jpg" />
        <BrandContainer imgSource="https://www.kickscrew.com/cdn/shop/products/main-square_761b9a58-6644-4d07-8c53-40c080413482_540x.jpg?v=1694121580" />
        <BrandContainer imgSource="https://sdcdn.io/mac/ca/mac_sku_SMXF28_1x1_0.png?width=1080&height=1080" />
      </div>
      <br />
      <br />

      {/* Category items */}
      <div>
        {Object.keys(groupedProducts).map((category) => (
          <div className="my-8" key={category}>
            <TitleComponent title={category} />
            <div className="flex items-center overflow-x-auto m-4 scrollbar-hide">
              {groupedProducts[category].map((product) => (
                <ItemCard
                  key={product._id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  description={product.description}
                  id={product._id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}


export default HomePage