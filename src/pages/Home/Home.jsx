import Navbar from "../../components/Navbar";
import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Footer from "../../components/Footer";

// Import images
import carousel1 from '../../assets/carousel1.jpg';
import carousel2 from "../../assets/carousel2.jpg";
import carousel3 from "../../assets/carousel3.jpg";
import product1 from "../../assets/product1.jpg";
import interior from "../../assets/interior.jpeg";
import exterior from "../../assets/exterior.jpg";
import paint from "../../assets/paint.jpeg";
import tools from "../../assets/tools.jpg";

const Home = () => {
    const testimonialsRef = useRef(null);

    const scrollTestimonials = (direction) => {
        if (testimonialsRef.current) {
            testimonialsRef.current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
    };

    const carouselImages = [carousel1, carousel2, carousel3];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? carouselImages.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === carouselImages.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div>
            <Navbar />

            {/* Explore Products Carousel */}
            <div className="relative w-full overflow-hidden h-[300px]">
                {/* Slide container */}
                <div
                    className="flex transition-transform duration-500 ease-in-out "
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {carouselImages.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Slide ${idx}`}
                            className="w-full flex-shrink-0 h-[300px] opacity-90"
                        />
                    ))}
                </div>

                {/* Explore button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button className="bg-orange-500 text-white px-6 py-2 rounded font-semibold">
                        Explore Products
                    </button>
                </div>

                {/* Left arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-20 cursor-pointer"
                >
                    <FaArrowLeft />
                </button>

                {/* Right arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-20 cursor-pointer"
                >
                    <FaArrowRight />
                </button>
            </div>

            {/* Top Selling Product */}
            <section className="py-8 px-4">
                <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
                <div className="max-w-xs bg-white shadow rounded p-4">
                    <img src={product1} alt="Product" className="w-full h-60 object-cover mb-2" />
                    <h3 className="font-semibold text-lg">Product Name</h3>
                    <p className="text-gray-700">Price: $29.99</p>
                    <p className="text-green-600">In Stock</p>
                </div>
            </section>

            {/* Categories */}
            <section className="py-8 px-4">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[{ name: "Interior", img: interior },
                    { name: "Exterior", img: exterior },
                    { name: "Paint Protection", img: paint },
                    { name: "Detailing Tools", img: tools }
                    ].map((cat, i) => (
                        <div key={i} className="bg-gray-100 rounded overflow-hidden">
                            <img src={cat.img} alt={cat.name} className="w-full h-62 object-cover" />
                            <p className="text-center py-2 font-medium">{cat.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            {/* Testimonials */}
            <section className="py-8 px-4">
                <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
                <div className="relative">
                    <button
                        onClick={() => scrollTestimonials("left")}
                        className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full"
                    >
                        <FaArrowLeft />
                    </button>

                    <div
                        ref={testimonialsRef}
                        className="flex overflow-x-auto space-x-4 scrollbar-hide"
                    >
                        {[{
                            name: "User 1",
                            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
                            review: "These products completely changed my car care routine. Highly recommend!"
                        },
                        {
                            name: "User 2",
                            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
                            review: "Fast shipping and excellent quality. Will buy again!"
                        },
                        {
                            name: "User 3",
                            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
                            review: "Customer service was amazing. The products exceeded my expectations."
                        },
                        {
                            name: "User 4",
                            avatar: "https://randomuser.me/api/portraits/men/4.jpg",
                            review: "Affordable and effective. My go-to brand now!"
                        }].map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="min-w-[150px] bg-white shadow rounded p-4 flex flex-col items-center text-center"
                            >
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full mb-2 object-cover"
                                />
                                <p className="text-sm italic">"{testimonial.review}"</p>
                                <p className="text-xs text-gray-600 mt-2 font-medium">- {testimonial.name}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollTestimonials("right")}
                        className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </section>

            <Footer />

        </div>
    );
};

export default Home;
