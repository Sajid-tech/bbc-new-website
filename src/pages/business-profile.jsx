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
    }, [id]);

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
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
            <div className="text-center">
                <div className="animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen  bg-gray-50 text-gray-900">
            {/* Compact Navigation */}
            <nav className="bg-white border-b py-4 px-6 flex justify-between items-center">
                <div className="text-xl font-semibold text-blue-800">
                    {profileData?.name}
                </div>
                <div className="flex space-x-3">
                    <a href="#about" className="text-gray-600 hover:text-blue-600 text-sm">About</a>
                    <a href="#services" className="text-gray-600 hover:text-blue-600 text-sm">Services</a>
                    <a href="#contact" className="text-gray-600 hover:text-blue-600 text-sm">Contact</a>
                </div>
            </nav>

            {/* Compact Hero Section */}
        
            <div className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
    {/* Floating SVGs for Decoration */}
    <svg className="absolute top-10 left-10 w-16 h-16 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="blue" strokeWidth="5" fill="none" />
    </svg>
    <svg className="absolute bottom-10 right-10  w-24 h-24 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="60" stroke="green" strokeWidth="5" fill="none" />
    </svg>
    <svg className="absolute top-1/2 left-1/4 w-12 h-12 opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" stroke="red" strokeWidth="5" fill="none" />
    </svg>

    <div className="container mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center justify-between">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 pr-0 md:pr-12 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                {profileData?.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
                {profileData?.occupation || "Professional"}
            </p>

            {/* Services Highlight */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Our Core Services</h3>
                <div className="space-y-3">
                    {(productImages?.product?.split(",") || ["Product and service description not available."]).map((service, index) => (
                        <div key={index} className="flex items-center justify-center md:justify-start">
                            <CheckBadgeIcon className="h-6 w-6 text-blue-500 mr-3" />
                            <span className="text-gray-700">{service.trim()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <a
                    href={`tel:${profileData?.mobile}`}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center shadow-md"
                >
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    Call Now
                </a>
                <a
                    href={`https://wa.me/${profileData?.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center shadow-md"
                >
                    <FaWhatsapp className="h-5 w-5 mr-2" />
                    WhatsApp
                </a>
            </div>
        </div>

        {/* SVG Illustration & Profile Image */}
        <div className="w-full md:w-1/2 relative flex justify-center">
            
            {/* Abstract Background SVG */}
            <svg className="absolute top-0 left-0 w-60  h-60 opacity-10 hidden md:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#3B82F6", stopOpacity:0.1}} />
                        <stop offset="100%" style={{stopColor:"#60A5FA", stopOpacity:0.3}} />
                    </linearGradient>
                </defs>
                <path 
                    d="M250,50 Q400,150 350,250 Q300,350 250,450 Q100,350 150,250 Q200,150 250,50Z" 
                    fill="url(#gradient)" 
                />
            </svg>

            {/* Profile Image */}
            <div className="relative z-10 flex justify-center">
                <img
                    src={profileData?.image
                        ? `http://businessboosters.club/public/images/user_images/${profileData.image}`
                        : "http://businessboosters.club/public/images/user_images/no_images.png"}
                    alt={profileData?.name || "Profile Image"}
                    className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white"
                />
            </div>
        </div>
    </div>

    {/* Decorative SVG Waves */}
    <svg className="absolute bottom-0 left-0 w-screen h-24 opacity-30"
     xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 1440 320">
    <path fill="#3B82F6" fillOpacity="0.1" 
          d="M0,160L80,176C160,192,320,224,480,208C640,192,800,128,960,122.7C1120,117,1280,171,1360,197.3L1440,224L1440,320L0,320Z">
    </path>
</svg>


    
</div>



          


            {/* About Section */}
            
            <section id="about" className="relative px-6 py-16 bg-gradient-to-br from-blue-50 to-white">
    {/* Background SVG */}
    <svg className="absolute top-0 left-0 w-full h-32 opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#3B82F6" fillOpacity="0.1" d="M0,160L80,176C160,192,320,224,480,208C640,192,800,128,960,122.7C1120,117,1280,171,1360,197.3L1440,224L1440,320L0,320Z"></path>
    </svg>

    {/* Content */}
    <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="md:w-2/3 text-center md:text-left" data-aos="fade-right">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-6">About Us</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
                {productImages?.product_about_us || "We are dedicated to providing the best services to our customers. Our team is committed to excellence and innovation."}
            </p>

            {/* Key Highlights */}
    
        </div>

        {/* Decorative SVG (Instead of Image) */}
        <div className="md:w-1/3 relative flex justify-center" data-aos="fade-left">
            <svg className="w-64 h-64 text-blue-400 opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <path d="M250,50 Q400,150 350,250 Q300,350 250,450 Q100,350 150,250 Q200,150 250,50Z" fill="currentColor" />
            </svg>
        </div>
    </div>
</section>

            {/* Services Section */}
            {/* <section id="services" className="container mx-auto px-6 py-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Services</h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  
                    {(productImages?.product?.split(",") || ["Product and service description not available."]).map((service, index) => (
    <div key={index} className="flex items-center">
        <CheckBadgeIcon className="h-6 w-6 text-blue-500 mr-3" />
        <span className="text-gray-700">{service.trim()}</span> 
    </div>
))}

                </p>
            </section> */}
            <section id="services" className="relative  px-6 py-16 bg-gradient-to-br from-blue-50 to-white">
    {/* Background SVG */}
    <svg className="absolute top-0 left-0 w-full h-32 opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#3B82F6" fillOpacity="0.1" d="M0,160L80,176C160,192,320,224,480,208C640,192,800,128,960,122.7C1120,117,1280,171,1360,197.3L1440,224L1440,320L0,320Z"></path>
    </svg>

    {/* Heading */}
    <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-900">Our Services</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            We offer a range of high-quality services to meet your needs.
        </p>
    </div>

    {/* Services List */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(productImages?.product?.split(",") || ["Service description not available."]).map((service, index) => (
            <div 
                key={index} 
                className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                data-aos="fade-up"
            >
                {/* SVG Icon */}
                <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zM11 11h2v5h-2zm0-4h2v2h-2z"/>
                    </svg>
                </div>

                {/* Service Name */}
                <span className="text-gray-800 font-medium text-lg">{service.trim()}</span>
            </div>
        ))}
    </div>

    {/* Bottom Background SVG */}
    <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#3B82F6" fillOpacity="0.1" d="M0,160L80,176C160,192,320,224,480,208C640,192,800,128,960,122.7C1120,117,1280,171,1360,197.3L1440,224L1440,320L0,320Z"></path>
    </svg>
</section>

            {/* Portfolio Section with  */}
            

      
<section className=" mx-auto px-6 py-16 bg-gradient-to-br from-blue-50 to-white">
    {/* Top Background SVG */}
    <svg className="absolute top-0 left-0 w-full h-32 opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#3B82F6" fillOpacity="0.1" d="M0,160L80,176C160,192,320,224,480,208C640,192,800,128,960,122.7C1120,117,1280,171,1360,197.3L1440,224L1440,320L0,320Z"></path>
    </svg>

    {/* Heading */}
    <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-900">Recent Work</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            Check out some of our latest projects showcasing our expertise.
        </p>
    </div>

    {/* Image Slider Container */}
    <div className="relative w-full flex justify-center items-center">
        {recentWorkImages.length > 0 && (
            <>
                {/* Previous Button */}
                <button
                    onClick={handlePrevImage}
                    className="absolute left-2 md:left-4 text-gray-800 hover:text-gray-500 p-3 bg-white shadow-md rounded-full transition-transform transform hover:scale-110"
                >
                    <ChevronLeftIcon className="h-8 w-8" />
                </button>

                {/* Image Grid */}
                <div className="w-full flex justify-center space-x-4">
                    {recentWorkImages
                        .slice(currentImageIndex, currentImageIndex + (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))
                        .map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Recent Work ${index + 1}`}
                                className="w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-60 object-cover rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                                onClick={() => openImageModal(image)}
                            />
                        ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNextImage}
                    className="absolute right-2 md:right-4 text-gray-800 hover:text-gray-500 p-3 bg-white shadow-md rounded-full transition-transform transform hover:scale-110"
                >
                    <ChevronRightIcon className="h-8 w-8" />
                </button>
            </>
        )}
    </div>

    {/* Bottom Background SVG */}
    <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#3B82F6" fillOpacity="0.1" d="M0,160L80,176C160,192,320,224,480,208C640,192,800,128,960,122.7C1120,117,1280,171,1360,197.3L1440,224L1440,320L0,320Z"></path>
    </svg>
</section>

            {/* Contact Section */}
            <section id="contact" className=" bg-gradient-to-br from-blue-50 to-white px-6 py-8">
                <div className="grid md:grid-cols-2 p-2 md:p-5 lg:p-10 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Information</h2>
                        <div className="space-y-3">
                            <div className="flex items-center text-sm">
                                <MapPinIcon className="h-5 w-5 mr-3 text-blue-500" />
                                <span>{profileData?.address || "Not available"}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <EnvelopeIcon className="h-5 w-5 mr-3 text-blue-500" />
                                <span>{profileData?.email || "Not available"}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <PhoneIcon className="h-5 w-5 mr-3 text-blue-500" />
                                <span>{profileData?.mobile || "Not available"}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Your Email"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Your Phone Number"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Your Message"
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-4">
                <div className="container mx-auto px-6 text-center text-sm">
                    <p>&copy; 2025 {profileData?.name}. All Rights Reserved.</p>
                </div>
            </footer>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
                    <button
                        onClick={closeImageModal}
                        className="absolute top-4 right-4 text-white hover:text-gray-300"
                    >
                        <XMarkIcon className="h-8 w-8" />
                    </button>

                    <div className="relative flex items-center max-w-6xl mx-auto">
                        <button
                            onClick={() => navigateImage('prev')}
                            className="text-white hover:text-gray-300 p-2"
                        >
                            <ChevronLeftIcon className="h-8 w-8" />
                        </button>

                        <img
                            src={selectedImage}
                            alt="Full Size"
                            className="max-w-full max-h-[80vh] object-contain"
                        />

                        <button
                            onClick={() => navigateImage('next')}
                            className="text-white hover:text-gray-300 p-2"
                        >
                            <ChevronRightIcon className="h-8 w-8" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusinessProfile;