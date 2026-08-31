import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";

import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [color, setColor] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:3000/products"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(
      location.search
    );

    setCategory(
      params.get("category") || ""
    );
  }, [location.search]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map(
          (product) => product.category
        )
      )
    ].filter(Boolean);
  }, [products]);

  const colors = useMemo(() => {
    return [
      ...new Set(
        products.map(
          (product) => product.color
        )
      )
    ].filter(Boolean);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const searchText =
        search.toLowerCase().trim();

      result = result.filter((product) =>
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(searchText)
      );
    }

    if (category) {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    if (color) {
      result = result.filter(
        (product) =>
          product.color === color
      );
    }

    if (minPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) >=
          Number(minPrice)
      );
    }

    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) <=
          Number(maxPrice)
      );
    }

    if (rating) {
      result = result.filter(
        (product) =>
          Number(product.rating) >=
          Number(rating)
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    if (sort === "rating-high") {
      result.sort(
        (a, b) =>
          Number(b.rating) -
          Number(a.rating)
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [
    products,
    search,
    category,
    color,
    minPrice,
    maxPrice,
    rating,
    sort
  ]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setColor("");
    setSort("");

    navigate("/products");
  }, [navigate]);

  const openProduct = useCallback(
    (id) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));

      alert("Product added to cart");
    },
    [dispatch]
  );

  return (
    <div className="products-page">

      <div className="products-header">

        <p>
          GAMEZONE
        </p>

        <h1>
          Gaming Products
        </h1>

        <span>
          Explore gaming gear for your
          ultimate setup.
        </span>

      </div>

      <div className="filters-container">

        <div className="filter-search">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="filter-group">

          <select
            value={category}
            onChange={(e) => {
              const value =
                e.target.value;

              setCategory(value);

              if (value) {
                navigate(
                  `/products?category=${encodeURIComponent(
                    value
                  )}`
                );
              } else {
                navigate("/products");
              }
            }}
          >

            <option value="">
              All Categories
            </option>

            {categories.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>

        </div>

        <div className="filter-group">

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
          />

        </div>

        <div className="filter-group">

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
          />

        </div>

        <div className="filter-group">

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
          >

            <option value="">
              All Ratings
            </option>

            <option value="4">
              ⭐ 4+
            </option>

            <option value="4.5">
              ⭐ 4.5+
            </option>

            <option value="4.7">
              ⭐ 4.7+
            </option>

          </select>

        </div>

        <div className="filter-group">

          <select
            value={color}
            onChange={(e) =>
              setColor(e.target.value)
            }
          >

            <option value="">
              All Colors
            </option>

            {colors.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>

        </div>

        <div className="filter-group">

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >

            <option value="">
              Sort By
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating-high">
              Rating: High to Low
            </option>

            <option value="name">
              Name: A-Z
            </option>

          </select>

        </div>

        <button
          type="button"
          className="clear-filters"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>

      <div className="products-count">

        <span>
          {filteredProducts.length} Products Found
        </span>

      </div>

      {loading && (
        <div className="products-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading products...
          </p>

        </div>
      )}

      {error && !loading && (
        <div className="products-error">

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>

        </div>
      )}

      {!loading &&
        !error &&
        filteredProducts.length > 0 && (

          <div className="products-grid">

            {filteredProducts.map(
              (product) => (

                <div
                  className="product-card"
                  key={product.id}
                  onClick={() =>
                    openProduct(product.id)
                  }
                >

                  <div className="product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                    />

                  </div>

                  <div className="product-info">

                    <p className="product-category">
                      {product.category}
                    </p>

                    <h2>
                      {product.name}
                    </h2>

                    <p className="product-description">
                      {product.description}
                    </p>

                    <div className="product-rating">
                      ⭐ {product.rating}
                    </div>

                    <div className="product-bottom">

                      <strong>
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          handleAddToCart(
                            product
                          );
                        }}
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>
        )}

      {!loading &&
        !error &&
        filteredProducts.length === 0 && (

          <div className="no-products">

            <div className="no-products-icon">
              🔍
            </div>

            <h2>
              No Products Found
            </h2>

            <p>
              Try changing your search
              or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>
        )}

    </div>
  );
}

export default Products;