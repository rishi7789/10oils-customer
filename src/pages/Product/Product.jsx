import { useState, useEffect } from "react";
import { apiGetNoToken } from "../../api/axios";
import { snackbar } from "../../context/SnackbarProvider";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 2;
    const { token } = useAuth();
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("All");

    const getProducts = async () => {
        try {
            const response = await apiGetNoToken('/getProducts');
            if (response.data.status === 200) {
                snackbar(response.data.message, 'success');
                setProducts(response.data.data);
                setFilteredProducts(response.data.data);
            } else {
                snackbar(response.data.message, 'error');
            }
        } catch (error) {
            snackbar("Failed to fetch products", 'error');
        }
    };

    const getCategories = async () => {
        try {
            const response = await apiGetNoToken('/getCategories');
            if (response.data.status === 200) {
                snackbar(response.data.message, 'success');
                setCategories(response.data.data);
            } else {
                snackbar(response.data.message, 'error');
            }
        } catch (error) {
            snackbar("Failed to fetch categories", 'error');
        }
    };

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    // const handleBuyNow = () => {
    //     if (!token) {
    //         snackbar("Login first to buy", "error");
    //         return;
    //     }
    //     // Continue with buy logic...
    // };

    const { addToCart } = useCart();

    const handleAddToCart = (product) => {

        if (product.stock <= 0) {
            snackbar("Out of Stock", "error");
            return;
        }

        addToCart(product);
        snackbar("Added to cart", "success");
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        setCurrentPage(1);
        if (categoryId === "All") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.categoryId?._id === categoryId);
            setFilteredProducts(filtered);
        }
    };

    // Pagination logic
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Navbar />
            <div className="p-4">
                {/* Filter Dropdown */}
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <label className="font-medium">Filter by category:</label>
                    <select
                        value={selectedCategoryId}
                        onChange={handleCategoryChange}
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="All">All</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 w-150 sm:grid-cols-2 gap-6">
                    {currentProducts.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-2 flex flex-col items-center text-center"
                        >
                            <img
                                src={product.images[0].replace(
                                    "https://gvcc-test-bucket.8edf79e3d9388dbe6f1b6f57f15731b6.r2.cloudflarestorage.com", //this is private url
                                    "https://pub-61ad9d5d30f1469183ed72e08040b631.r2.dev" //this is public url
                                )}
                                alt="product"
                                className="h-38"
                            />
                            <h3 className="mt-4 font-semibold text-lg">
                                {product.name}
                            </h3>
                            <div className="mt-2 flex justify-between w-full text-gray-700 text-sm">
                                <span>₹{product.salePrice}</span>
                                <span>
                                    {product.stock > 0
                                        ? `In Stock: ${product.stock}`
                                        : "Out of Stock"}
                                </span>
                            </div>
                            <div className="mt-4 flex gap-2 w-full">
                                {/* <button
                                    onClick={handleBuyNow}
                                    className="bg-orange-500 hover:bg-orange-600  text-white text-sm px-3 py-2 rounded flex-1"
                                >
                                    Buy Now
                                </button> */}
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-2 rounded flex-1"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center gap-2">
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 rounded ${currentPage === page
                                    ? "bg-orange-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Product;