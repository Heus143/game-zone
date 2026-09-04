import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/categories.css";

function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:3000/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map(
          (product) => product.category
        )
      )
    ].filter(Boolean);
  }, [products]);

  const getProductCount = (category) => {
    return products.filter(
      (product) =>
        product.category === category
    ).length;
  };

  const openCategory = (category) => {
    navigate(
      `/products?category=${encodeURIComponent(category)}`
    );
  };

  if (loading) {
    return (
      <div className="categories-page">
        <div className="categories-loading">
          <h2>Loading Categories...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-page">
        <div className="categories-error">
          <h2>{error}</h2>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="categories-page">

      <div className="categories-header">

        <p>GAMEZONE</p>

        <h1>
          Gaming Categories
        </h1>

        <span>
          Explore gaming products by category.
        </span>

      </div>

      <div className="categories-grid">

        {categories.map((category) => (

          <div
            className="category-card"
            key={category}
            onClick={() =>
              openCategory(category)
            }
          >

            <div className="category-icon">
              🎮
            </div>

            <h2>
              {category}
            </h2>

            <p>
              {getProductCount(category)} Products
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openCategory(category);
              }}
            >
              Explore →
            </button>

          </div>

        ))}

      </div>

      {categories.length === 0 && (
        <div className="categories-error">
          <h2>
            No Categories Found
          </h2>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            View Products
          </button>
        </div>
      )}

    </div>
  );
}

export default Categories;