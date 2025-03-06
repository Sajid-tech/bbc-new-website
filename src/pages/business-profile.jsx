import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BriefcaseIcon,
    CheckBadgeIcon
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa6";
import { useParams } from 'react-router-dom';

const BusinessProfile = () => {
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [productImages, setProductImages] = useState(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [visibleImages, setVisibleImages] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`https://businessboosters.club/public/api/getUserByShort/${id}`);

                if (response.data) {
                    if (response.data.profiles.length > 0) {
                        setProfileData(response.data.profiles[0]);
                    }
                    if (response.data.productimages) {
                        setProductImages(response.data.productimages);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();

        // Add resize event listener
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [id]);

    // Update visible images when window width or current index changes
    useEffect(() => {
        if (!productImages) return;

        const recentWorkImages = Object.keys(productImages)
            .filter(key => key.includes("product_image") && productImages[key])
            .map(key => `http://businessboosters.club/public/images/product_images/${productImages[key]}`);

        const imagesPerView = windowWidth >= 1024 ? 3 : windowWidth >= 768 ? 2 : 1;
        const start = currentImageIndex;
        let images = [];

        for (let i = 0; i < imagesPerView; i++) {
            const index = (start + i) % recentWorkImages.length;
            images.push(recentWorkImages[index]);
        }

        setVisibleImages(images);
    }, [productImages, currentImageIndex, windowWidth]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const formSubmitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formSubmitData.append(`contact_${key}`, value);
        });

        try {
            const response = await axios.post(
                "http://businessboosters.club/public/api/createEnquiry",
                formSubmitData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                alert("Form submitted successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
            } else {
                setError("Failed to submit the form. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const recentWorkImages = productImages
        ? Object.keys(productImages)
            .filter(key => key.includes("product_image") && productImages[key])
            .map(key => `http://businessboosters.club/public/images/product_images/${productImages[key]}`)
        : [];

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % recentWorkImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? recentWorkImages.length - 1 : prevIndex - 1
        );
    };

    const openImageModal = (image) => {
        setSelectedImage(image);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        const currentIndex = recentWorkImages.indexOf(selectedImage);
        if (direction === 'next') {
            setSelectedImage(recentWorkImages[(currentIndex + 1) % recentWorkImages.length]);
        } else {
            setSelectedImage(recentWorkImages[(currentIndex - 1 + recentWorkImages.length) % recentWorkImages.length]);
        }
    };

    if (loading) return (
        <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-br from-indigo-50 to-pink-100 z-50">
            <div className="text-center">
                <div className="animate-spin inline-block w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-4 text-indigo-800 font-medium">Loading profile...</p>
            </div>
        </div>
    );

    // Improved color palette
    const colors = {
        primary: 'indigo-600',
        primaryLight: 'indigo-500',
        primaryDark: 'indigo-800',
        secondary: 'teal-500',
        accent: 'amber-500',
        bg: {
            light: 'from-indigo-50 to-teal-50',
            medium: 'from-indigo-100 to-teal-100',
            dark: 'from-indigo-900 to-teal-900'
        },
        text: {
            light: 'text-gray-100',
            dark: 'text-gray-800',
            muted: 'text-gray-600'
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
            {/* Sticky Navigation */}
            <nav className="sticky top-0 z-40 bg-white border-b shadow-sm py-4 px-6 flex justify-between items-center backdrop-blur-sm bg-white/90">
    <div className="text-xl font-semibold text-[#A51B64]">
        {profileData?.name}
    </div>

    {/* Hamburger Menu Icon for Mobile */}
    <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
        </svg>
    </button>

    {/* Navigation Links */}
    <div
    className={`md:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 transition-all duration-300 ease-in-out`}
>
    <a
        href="#about"
        onClick={() => setIsMenuOpen(false)}
        className="block md:inline text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300 py-3 px-4 rounded-lg md:rounded-none md:bg-transparent md:hover:bg-transparent md:hover:text-indigo-600"
    >
        About
    </a>
    <a
        href="#services"
        onClick={() => setIsMenuOpen(false)}
        className="block md:inline text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300 py-3 px-4 rounded-lg md:rounded-none md:bg-transparent md:hover:bg-transparent md:hover:text-indigo-600"
    >
        Services
    </a>
    <a
        href="#portfolio"
        onClick={() => setIsMenuOpen(false)}
        className="block md:inline text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300 py-3 px-4 rounded-lg md:rounded-none md:bg-transparent md:hover:bg-transparent md:hover:text-indigo-600"
    >
        Portfolio
    </a>
    <a
        href="#contact"
        onClick={() => setIsMenuOpen(false)}
        className="block md:inline text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300 py-3 px-4 rounded-lg md:rounded-none md:bg-transparent md:hover:bg-transparent md:hover:text-indigo-600"
    >
        Contact
    </a>
</div>
</nav>

            {/* Hero Section - Enhanced with better styling */}
            <section className="relative bg-gradient-to-br from-indigo-50 to-pink-50 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-indigo-300 animate-pulse"></div>
                    <div className="absolute bottom-10 right-20 w-32 h-32 rounded-lg border-4 border-teal-300 rotate-12"></div>
                    <div className="absolute top-1/3 left-1/3 w-16 h-16 rounded-full border-4 border-amber-300"></div>
                </div>

                <div className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 pr-0 md:pr-12 text-center md:text-left mt-10 md:mt-0">
                        <h1 className="text-4xl md:text-6xl font-bold text-[#A51B64] mb-6">
                            {profileData?.name}
                        </h1>
                        <p className="text-lg md:text-2xl text-indigo-600 mb-8">
                            {profileData?.occupation || "Professional"}
                        </p>

                        {/* Services Highlight */}
                        <div className="mb-10">
                            <h3 className="text-xl font-semibold text-teal-600 mb-6">Our Core Services</h3>
                            <div className="space-y-4">
                                {(productImages?.product?.split(",") || ["Product and service description not available."]).map((service, index) => (
                                    <div key={index} className="flex items-center justify-center md:justify-start">
                                        <CheckBadgeIcon className="h-6 w-6 text-amber-500 mr-3" />
                                        <span className="text-gray-700">{service.trim()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                            <a
                                href={`tel:${profileData?.mobile}`}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center shadow-md transform hover:translate-y-1"
                            >
                                <PhoneIcon className="h-5 w-5 mr-2" />
                                Call Now
                            </a>
                            <a
                                href={`https://wa.me/${profileData?.mobile}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center shadow-md transform hover:translate-y-1"
                            >
                                <FaWhatsapp className="h-5 w-5 mr-2" />
                                WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Profile Image with Enhanced Styling */}
                    <div className="w-full md:w-1/2 relative flex justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-teal-200 rounded-full blur-3xl opacity-30 transform -translate-y-1/4"></div>
                        <div className="relative z-10 flex justify-center">
                            <img
                                src={profileData?.image
                                    ? `http://businessboosters.club/public/images/user_images/${profileData.image}`
                                    : "http://businessboosters.club/public/images/user_images/no_images.png"}
                                alt={profileData?.name || "Profile Image"}
                                className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Wave Design */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-24 fill-current text-white" viewBox="0 0 1440 74" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,37 C240,67 480,82 720,72 C960,62 1200,28 1440,7L1440 74 L0 74 Z" />
                    </svg>
                </div>
            </section>

            {/* About Section - Smoother transition */}
            <section id="about" className="relative py-20 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        {/* Decorative Element */}
                        <div className="md:w-1/3 relative flex justify-center mb-10 md:mb-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-teal-100 rounded-full blur-3xl opacity-40"></div>
                            <div className="relative w-72 h-72 rounded-full flex items-center justify-center border-8 border-indigo-100">
                                <div className="w-56 h-56 rounded-full bg-gradient-to-br from-indigo-200 to-teal-200 flex items-center justify-center">
                                    <BriefcaseIcon className="w-24 h-24 text-indigo-600" />
                                </div>
                            </div>
                        </div>

                        {/* Text Section */}
                        <div className="md:w-2/3 text-center md:text-left">
                            <h2 className="text-4xl font-extrabold text-[#A51B64] mb-6 relative">
                                About Us
                                <span className="absolute -bottom-2 left-0 md:left-0 w-20 h-1 bg-teal-500"></span>
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                {productImages?.product_about_us || "We are dedicated to providing the best services to our customers. Our team is committed to excellence and innovation."}
                            </p>

                            {/* Additional content if needed */}
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-bold text-indigo-700 mb-3">Our Mission</h3>
                                    <p className="text-gray-700">To deliver exceptional service and value to our clients through innovation and dedication.</p>
                                </div>
                                <div className="bg-teal-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-bold text-teal-700 mb-3">Our Vision</h3>
                                    <p className="text-gray-700">To be the leading provider in our industry, known for excellence and customer satisfaction.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Wave Design */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-24 fill-current text-indigo-50" viewBox="0 0 1440 74" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,37 C240,67 480,82 720,72 C960,62 1200,28 1440,7L1440 74 L0 74 Z" />
                    </svg>
                </div>
            </section>

            {/* Services Section - With improved color scheme */}
            <section id="services" className="relative px-6 py-20 bg-gradient-to-br from-indigo-50 to-pink-50">
                <div className="container mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-[#A51B64] mb-2">Our Services</h2>
                        <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            We offer a comprehensive range of high-quality services to meet your needs.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(productImages?.product?.split(",") || ["Service description not available."]).map((service, index) => (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
                            >
                                {/* Service Icon - Alternating colors */}
                                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${index % 3 === 0 ? 'bg-indigo-100 text-indigo-600' :
                                        index % 3 === 1 ? 'bg-teal-100 text-teal-600' :
                                            'bg-amber-100 text-amber-600'
                                    }`}>
                                    <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                                        <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                                        <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                                    </svg>
                                </div>

                                {/* Service Name */}
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.trim()}</h3>

                                {/* Optional description */}
                                <p className="text-gray-600">Quality service tailored to meet your specific requirements and exceed expectations.</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Wave Design */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-24 fill-current text-white" viewBox="0 0 1440 74" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,37 C240,67 480,82 720,72 C960,62 1200,28 1440,7L1440 74 L0 74 Z" />
                    </svg>
                </div>
            </section>

            {/* Portfolio Section - Improved image slider */}
            <section id="portfolio" className="relative px-6 py-20 bg-white">
                <div className="container mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-[#A51B64] mb-2">Recent Work</h2>
                        <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Check out our latest projects showcasing our expertise and dedication to quality.
                        </p>
                    </div>

                    {/* Improved Image Slider */}
                    {recentWorkImages.length > 0 && (
                        <div className="relative w-full max-w-6xl mx-auto">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 text-white p-3 bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full transition-transform duration-300 hover:scale-110"
                            >
                                <ChevronLeftIcon className="h-8 w-8" />
                            </button>

                            {/* Images Container */}
                            <div className="relative overflow-hidden rounded-xl">
                                <div className="flex transition-all duration-500 ease-in-out p-2">
                                    {visibleImages.map((image, index) => (
                                        <div key={index} className="w-full px-2 flex-shrink-0">
                                            <div
                                                className="relative overflow-hidden rounded-xl shadow-xl cursor-pointer group"
                                                onClick={() => openImageModal(image)}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Recent Work ${index + 1}`}
                                                    className="w-full h-80 md:h-[25rem] lg:h-[35rem] object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                    <div className="p-6 text-white">
                                                        <h3 className="text-xl font-bold">Photo {index + 1}</h3>
                                                        <p className="text-sm opacity-80">Click to view full image</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={handleNextImage}
                                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 text-white p-3 bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full transition-transform duration-300 hover:scale-110"
                            >
                                <ChevronRightIcon className="h-8 w-8" />
                            </button>

                            {/* Portfolio Pagination Dots */}
                            <div className="flex justify-center space-x-2 mt-6">
                                {recentWorkImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Wave Design */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-24 fill-current text-indigo-50" viewBox="0 0 1440 74" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,37 C240,67 480,82 720,72 C960,62 1200,28 1440,7L1440 74 L0 74 Z" />
                    </svg>
                </div>
            </section>

            {/* Contact Section - Enhanced with gradient background */}
            <section id="contact" className="relative px-6 py-20 bg-gradient-to-br from-indigo-50 to-pink-50">
                {/* <div className="container mx-auto"> */}
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-[#A51B64] mb-2">Get In Touch</h2>
                    <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        We'd love to hear from you. Reach out to us with any questions or inquiries.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2">
                        {/* Contact Information */}

                        <div className="bg-gradient-to-br from-pink-600 to-pink-800 p-10 text-white">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <p className="mb-8 opacity-80">Fill up the form and our team will get back to you within 24 hours.</p>

                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <MapPinIcon className="h-6 w-6 mr-4 text-teal-300" />
                                    <span>{profileData?.address || "Not available"}</span>
                                </div>
                                <div className="flex items-center">
                                    <EnvelopeIcon className="h-6 w-6 mr-4 text-teal-300" />
                                    <span>{profileData?.email || "Not available"}</span>
                                </div>
                                <div className="flex items-center">
                                    <PhoneIcon className="h-6 w-6 mr-4 text-teal-300" />
                                    <span>{profileData?.mobile || "Not available"}</span>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className="mt-12 flex space-x-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border-4 border-teal-300/20 opacity-30"></div>
                            <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-teal-300/20 opacity-30"></div>
                        </div>

                        {/* Contact Form */}
                        <div className="p-10">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h3>

                            {error && (
                                <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-pink-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300 shadow-md flex items-center justify-center"
                                >
                                    {loading ? (
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                    ) : null}
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Full Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                        <div className="relative max-w-4xl w-full">
                            <button
                                onClick={closeImageModal}
                                className="absolute -top-12 right-0 text-white p-2 hover:text-gray-300 transition-colors"
                            >
                                <XMarkIcon className="h-8 w-8" />
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => navigateImage('prev')}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                                >
                                    <ChevronLeftIcon className="h-6 w-6" />
                                </button>

                                <img
                                    src={selectedImage}
                                    alt="Portfolio item"
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                />

                                <button
                                    onClick={() => navigateImage('next')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                                >
                                    <ChevronRightIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-pink-900 to-pink-800 text-white py-12 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4">{profileData?.name}</h3>
                            <p className="text-white mb-6">
                                {productImages?.product_about_us ?
                                    (productImages.product_about_us.length > 100 ?
                                        productImages.product_about_us.substring(0, 100) + '...' :
                                        productImages.product_about_us) :
                                    "Quality service is our priority. We're committed to excellence in everything we do."}
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-white hover:text-pink-200 transition-colors">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-white hover:text-pink-200 transition-colors">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-white hover:text-pink-200 transition-colors">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#about" className="text-white hover:text-pink-200 transition-colors">About Us</a>
                                </li>
                                <li>
                                    <a href="#services" className="text-white hover:text-pink-200 transition-colors">Services</a>
                                </li>
                                <li>
                                    <a href="#portfolio" className="text-white hover:text-pink-200 transition-colors">Portfolio</a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-white hover:text-pink-200 transition-colors">Contact</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <MapPinIcon className="h-6 w-6 text-teal-400 mr-3 flex-shrink-0" />
                                    <span className="text-white">{profileData?.address || "Location not available"}</span>
                                </li>
                                <li className="flex items-center">
                                    <EnvelopeIcon className="h-6 w-6 text-teal-400 mr-3 flex-shrink-0" />
                                    <a href={`mailto:${profileData?.email}`} className="text-white hover:text-white transition-colors">
                                        {profileData?.email || "Email not available"}
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <PhoneIcon className="h-6 w-6 text-teal-400 mr-3 flex-shrink-0" />
                                    <a href={`tel:${profileData?.mobile}`} className="text-white hover:text-white transition-colors">
                                        {profileData?.mobile || "Phone not available"}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white mt-12 pt-8 text-center text-white">
                        <p>&copy; {new Date().getFullYear()} {profileData?.name}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BusinessProfile;