import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard.component";
import "./CategoryPreview.styles.scss";

/*
QUESTA FUNZIONE PRENDE IL TITOLO DELLA CATEGORIA E LA LISTA DEI PRODOTTI E RESTITUISCE UN FILTER di 4 elementi di quella categoria e poi passa al prossimo prodotto
*/

const CategoryPreview = ({ title, products }) => {
  return (
    <>
      <div className="category-preview-container">
        <h2>
          <Link className="title" to={title}> {title.toUpperCase()}</Link>
        </h2>

        <div className="preview">
          {products
            .filter((_, index) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
};
export default CategoryPreview;
