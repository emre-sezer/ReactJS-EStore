import "./category.styles.scss";
import { useParams  } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
    <h2 className="current-category-title">{category}</h2>
    <div className="current-category-container">
     
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
    </>

  );
};

export default Category;
