import {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  useDispatch
} from "react-redux";

import {
  addToCart
} from "../redux/slices/cartSlice";

import "../styles/product-details.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:3000/products/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Product not found"
          );
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = useCallback(() => {
    setQuantity(
      (previousQuantity) =>
        previousQuantity + 1
    );
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity(
      (previousQuantity) =>
        Math.max(
          1,
          previousQuantity - 1
        )
    );
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product) {
      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    alert("Product added to cart");
  }, [
    product,
    quantity,
    dispatch
  ]);

  const handleBuyNow = useCallback(() => {
    if (!product) {
      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    navigate("/cart");
  }, [
    product,
    quantity,
    dispatch,
    navigate
  ]);

  if (loading) {
    return (
      <div className="product-loading">

        <div className="product-spinner"></div>

        <h2>
          Loading product...
        </h2>

      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-loading">

        <h2>
          {error || "Product not found"}
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate("/products")
          }
        >
          Back to Products
        </button>

      </div>
    );
  }

  return (
    <div className="product-details-page">

      <div className="product-details-wrapper">

        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/products")
          }
        >
          ← Back to Products
        </button>

        <div className="product-details-container">

          <div className="product-details-image">

            <img
              src={product.image}
              alt={product.name}
              loading="eager"
            />

          </div>

          <div className="product-details-info">

            <p className="details-category">
              {product.category}
            </p>

            <h1>
              {product.name}
            </h1>

            <div className="details-rating">
              ⭐ {product.rating}
            </div>

            <h2 className="details-price">
              ₹
              {Number(
                product.price
              ).toLocaleString("en-IN")}
            </h2>

            <p className="details-description">
              {product.description}
            </p>

            <p className="details-option">
              <strong>
                Color:
              </strong>{" "}
              {product.color || "Black"}
            </p>

            <p className="details-option">
              <strong>
                Stock:
              </strong>{" "}
              {product.stock || "In Stock"}
            </p>

            <div className="quantity-section">

              <strong>
                Quantity
              </strong>

              <div className="quantity-box">

                <button
                  type="button"
                  onClick={
                    decreaseQuantity
                  }
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={
                    increaseQuantity
                  }
                >
                  +
                </button>

              </div>

            </div>

            <div className="details-buttons">

              <button
                type="button"
                className="add-cart-button"
                onClick={
                  handleAddToCart
                }
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="buy-now-button"
                onClick={
                  handleBuyNow
                }
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;