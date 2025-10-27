import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for reaching out! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
            <Navbar />

            <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Contact Us
                    </h1>
                    <p className="text-gray-600 text-lg mb-10">
                        Have questions, feedback, or just want to say hi?
                        We’d love to hear from you. Fill out the form below or reach us at{" "}
                        <span className="font-semibold text-indigo-600">support@10oils.com</span>.
                    </p>

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto"
                    >
                        <div className="mb-6">
                            <label
                                htmlFor="name"
                                className="block text-left text-gray-700 font-medium mb-2"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            // placeholder="John Doe"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block text-left text-gray-700 font-medium mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            // placeholder="john@example.com"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="message"
                                className="block text-left text-gray-700 font-medium mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Type your message here..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
