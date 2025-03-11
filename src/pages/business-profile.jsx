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
    const [loadingSumbit, setLoadingSumbit] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        contact_to: localStorage.getItem('short'),
        contact_name: '',
        contact_email: '',
        contact_mobile: '',
        contact_subject: 'Enquiry',
        contact_message: ''
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
        setLoadingSumbit(true);
        setError("");
        setSuccessMessage("");
    
        const formSubmitData = new FormData();
        // Replace this section
        formSubmitData.append('contact_to', localStorage.getItem('short'));
        formSubmitData.append('contact_name', formData.contact_name);
        formSubmitData.append('contact_email', formData.contact_email);
        formSubmitData.append('contact_mobile', formData.contact_mobile);
        formSubmitData.append('contact_subject', 'Enquiry');
        formSubmitData.append('contact_message', formData.contact_message);
    
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
                setSuccessMessage("Enquiry Created successfully!");
                setFormData({
                    contact_to: localStorage.getItem('short'),
                    contact_name: '',
                    contact_email: '',
                    contact_mobile: '',
                    contact_subject: 'Enquiry',
                    contact_message: ''
                });
            } else {
                setError("Failed to submit the form. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("An error occurred. Please try again later.");
        } finally {
            setLoadingSumbit(false);
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
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % recentWorkImages.length);
        }, 5000);


        return () => clearInterval(interval);
    }, [recentWorkImages.length]);
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



    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
            {/* Sticky Navigation */}
            <nav className="sticky top-0 z-40 bg-white border-b shadow-sm py-4 lg:py-0 px-6 flex justify-between items-center backdrop-blur-sm bg-white/90">
                <div className="text-xl font-semibold text-[#A51B64]">
                    {profileData?.company}
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
            <div
                className='relative'
            >            {/* Hero Section - Enhanced with better styling */}
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
                        <div className="w-full md:w-1/2 lg:hidden  relative flex justify-center">
                            <div className="absolute  inset-0 bg-gradient-to-br from-indigo-200 to-teal-200 rounded-full blur-3xl opacity-30 transform -translate-y-1/4"></div>
                            <div className="relative z-10   flex justify-center ">
                                <img
                                    src={profileData?.image
                                        ? `http://businessboosters.club/public/images/user_images/${profileData.image}`
                                        : "http://businessboosters.club/public/images/user_images/no_images.png"}
                                    alt={profileData?.name || "Profile Image"}
                                    className=" w-64 h-80 md:w-80 md:h-[30rem] object-cover rounded-2xl shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-105"
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
                                        <p className="text-gray-700">
                                            {productImages?.product_mission || "To deliver exceptional service and value to our clients through innovation and dedication."}



                                        </p>
                                    </div>
                                    <div className="bg-teal-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-bold text-teal-700 mb-3">Our Vision</h3>
                                        <p className="text-gray-700">

                                            {productImages?.product_vision || "To be the leading provider in our industry, known for excellence and customer satisfaction."}

                                        </p>
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


                <div className=" absolute top-36 right-36 hidden lg:block ">
                    <div className="absolute  inset-0 bg-gradient-to-br from-indigo-200 to-teal-200 rounded-full blur-3xl opacity-30 transform -translate-y-1/4"></div>
                    <div className="relative z-10   flex justify-center ">
                        <img
                            src={profileData?.image
                                ? `http://businessboosters.club/public/images/user_images/${profileData.image}`
                                : "http://businessboosters.club/public/images/user_images/no_images.png"}
                            alt={profileData?.name || "Profile Image"}
                            className=" w-64 h-80 md:w-80 md:h-[30rem] object-cover rounded-2xl shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>
            </div>

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
                                className="group bg-white p-4 rounded-xl shadow-lg flex items-center gap-4 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
                            >
                                {/* Service Icon - Alternating colors */}
                                <div className={`w-16 h-16 rounded-lg flex items-center justify-center  transition-all duration-300 group-hover:scale-110 ${index % 3 === 0 ? 'bg-indigo-100 text-indigo-600' :
                                    index % 3 === 1 ? 'bg-teal-100 text-teal-600' :
                                        'bg-amber-100 text-amber-600'
                                    }`}>
                                    <img
                                        src={`/img/service1.png`}
                                        alt={`Service`}
                                        className="w-12 h-12 object-contain"
                                    />


                                </div>

                                {/* Service Name */}
                                <h3 className="text-xl font-bold text-gray-800 ">{service.trim()}</h3>

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
                    {/* {recentWorkImages.length > 0 && (
    <div className="relative w-screen ">
   
        <button
            onClick={handlePrevImage}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 text-white p-3 bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full transition-transform duration-300 hover:scale-110"
        >
            <ChevronLeftIcon className="h-8 w-8" />
        </button>

       
        <div className="relative overflow-hidden rounded-xl">
            <div className="flex transition-all duration-1000 ease-in-out p-2">
                {recentWorkImages.map((image, idx) => {
                    const relativeIndex = (currentImageIndex + idx) % recentWorkImages.length;
                    if (idx < 2) {
                        return (
                            <div key={relativeIndex} 
                                className={`flex-shrink-0 px-2 transition-all duration-500 ${idx === 0 ? 'w-4/5' : 'w-1/5'}`}
                            >
                                <div
                                    className="relative overflow-hidden rounded-xl shadow-xl cursor-pointer group h-full"
                                    onClick={() => openImageModal(recentWorkImages[relativeIndex])}
                                >
                                    <img
                                        src={recentWorkImages[relativeIndex]}
                                        alt={`Recent Work ${relativeIndex + 1}`}
                                        className="w-full h-80 md:h-[25rem] lg:h-[35rem] object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                        <div className="p-6 text-white">
                                            <h3 className="text-xl font-bold">Photo {relativeIndex + 1}</h3>
                                            <p className="text-sm opacity-80">Click to view full image</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>

        <button
            onClick={handleNextImage}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 text-white p-3 bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full transition-transform duration-300 hover:scale-110"
        >
            <ChevronRightIcon className="h-8 w-8" />
        </button>

        <div className="flex justify-center space-x-2 mt-6">
            {recentWorkImages.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    </div>
)} */}

                    {/* Auto-scrolling Image Slider */}
                    {recentWorkImages.length > 0 && (
                        <div className="relative w-screen mx-auto">
                            {/* Images Container */}
                            <div className="relative overflow-hidden rounded-xl">
                                <div className="flex transition-all duration-1000 ease-in-out p-2"
                                    style={{
                                        transform: `translateX(-${currentImageIndex * 80}%)`,
                                        transition: 'transform 0.5s ease-in-out'
                                    }}>
                                    {recentWorkImages.map((image, idx) => (
                                        <div key={idx}
                                            className="flex-shrink-0 px-2 w-4/5"
                                        >
                                            <div
                                                className="relative overflow-hidden rounded-xl shadow-xl cursor-pointer group h-full"
                                                onClick={() => openImageModal(image)}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Recent Work ${idx + 1}`}
                                                    className="w-full h-80 md:h-[25rem] lg:h-[35rem] object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                    <div className="p-6 text-white">
                                                        <h3 className="text-xl font-bold">Photo {idx + 1}</h3>
                                                        <p className="text-sm opacity-80">Click to view full image</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Portfolio Pagination Dots */}
                            <div className="flex justify-center space-x-2 mt-6">
                                {recentWorkImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
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
                                    <MapPinIcon className="h-10 w-10 mr-4 text-white" />
                                    <span>{profileData?.address || "Not available"}</span>
                                </div>
                                <div className="flex items-center">
                                    <EnvelopeIcon className="h-6 w-6 mr-4 text-white" />
                                    <span>{profileData?.email || "Not available"}</span>
                                </div>
                                <div className="flex items-center">
                                    <PhoneIcon className="h-6 w-6 mr-4 text-white" />
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
                            {successMessage && (
                                <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-lg">
                                    {successMessage}
                                </div>
                            )}

       
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="contact_name"
                                        name="contact_name"
                                        required
                                        value={formData.contact_name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="contact_email"
                                        name="contact_email"
                                        required
                                        value={formData.contact_email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact_mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="contact_mobile"
                                        name="contact_mobile"
                                        required
                                        value={formData.contact_mobile}
                                        onChange={handleInputChange}
                                        maxLength={10}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact_message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="contact_message"
                                        name="contact_message"
                                        rows="4"
                                        required
                                        value={formData.contact_message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loadingSumbit}
                                    className="w-full bg-pink-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300 shadow-md flex items-center justify-center"
                                >
                                    {loadingSumbit && (
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                    )}
                                    {loadingSumbit ? "Sending..." : "Send Message"}
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
            <footer className="bg-gradient-to-br from-pink-900 to-pink-800 text-white py-2 px-6">
                <div className="container mx-auto">


                    <div className="  pt-2 text-center text-white">
                        <p>&copy; {new Date().getFullYear()} {profileData?.name}. All rights reserved by AGSolutions</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BusinessProfile;