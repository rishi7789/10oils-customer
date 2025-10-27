import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const About = () => {
    return (
        <>
            <Navbar />

            <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        About Us
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-10">
                        Welcome to <span className="font-semibold text-indigo-600">10 oils</span>,
                        where we believe in delivering pure, natural, and sustainable oils
                        that nurture your body and mind. Our mission is to provide products
                        that promote wellness and balance through nature’s finest ingredients.
                    </p>

                    {/* <div className="flex justify-center mb-10">
                        <img
                            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
                            alt="Essential Oils"
                            className="rounded-lg shadow-lg w-full max-w-md object-cover"
                        />
                    </div> */}

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Story
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Started with a passion for natural living, <span className="font-semibold">10 oils</span>
                        was founded to bring you authentic, high-quality essential oils sourced
                        directly from trusted farms. Every bottle is a promise of purity and
                        care — because you deserve the best nature has to offer.
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default About;
