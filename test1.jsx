import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CheckIcon,
    BriefcaseIcon
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa6";
import { useParams } from 'react-router-dom';

const BusinessProfile = () => {
    const {id} = useParams()
    // State variables
    const [profileData, setProfileData] = useState(null);
    const [productImages, setProductImages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Contact form states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    // Image modal states
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Slider state
    const [sliderIndex, setSliderIndex] = useState(0);

    // Variants for Framer Motion animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.2
            }
        }
    };

    // Fetch profile data on component mount
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
    }, []);

    // Form handling
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

    // Image modal navigation
    const recentWorkImages = productImages
        ? Object.keys(productImages)
            .filter(key => key.includes("product_image") && productImages[key])
            .map(key => `http://businessboosters.club/public/images/product_images/${productImages[key]}`)
        : [];

    const openImageModal = (imageIndex) => {
        setSelectedImage(recentWorkImages[imageIndex]);
        setCurrentImageIndex(imageIndex);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        const newIndex =
            direction === 'next'
                ? (currentImageIndex + 1) % recentWorkImages.length
                : (currentImageIndex - 1 + recentWorkImages.length) % recentWorkImages.length;

        setSelectedImage(recentWorkImages[newIndex]);
        setCurrentImageIndex(newIndex);
    };

    // Slider navigation
    const nextSlide = () => {
        setSliderIndex((prevIndex) => (prevIndex + 1) % recentWorkImages.length);
    };

    const prevSlide = () => {
        setSliderIndex((prevIndex) => (prevIndex - 1 + recentWorkImages.length) % recentWorkImages.length);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 mx-auto bg-blue-200 rounded-full mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 text-gray-900"
        >
            {/* Modern Header */}
            <div className="container mx-auto px-4 py-2">
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {/* Left Column - Profile Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex flex-row items-center space-x-6">
                            <div className="relative group">
                                <motion.img
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    src={profileData?.image
                                        ? `http://businessboosters.club/public/images/user_images/${profileData.image}`
                                        : "http://businessboosters.club/public/images/user_images/no_images.png"}
                                    alt={profileData?.name || "Profile Image"}
                                    className="w-[9rem] h-[14rem] rounded-xl object-cover border-3 border-white shadow-md 
                  transition-all duration-300 group-hover:shadow-xl group-hover:brightness-90"
                                />
                            </div>
                            <div className="flex-grow space-y-4">
                                <div>
                                    <motion.h1
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl font-bold text-blue-800 mb-1 flex items-center"
                                    >
                                        {profileData?.name}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-teal-600 text-sm flex items-center"
                                    >
                                        <BriefcaseIcon className="h-4 w-4 mr-2 text-teal-400" />
                                        {profileData?.occupation}
                                    </motion.p>
                                </div>
                                <div className="flex space-x-4">
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={`tel:${profileData?.mobile}`}
                                        className="flex items-center justify-center px-4 py-2 
                    bg-blue-100 text-blue-700 rounded-lg 
                    hover:bg-blue-200 transition-colors 
                    shadow-md hover:shadow-lg"
                                    >
                                        <PhoneIcon className="h-4 w-4 mr-2" />
                                        <span  className='text-[13px]'>Call</span>
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={`https://wa.me/${profileData?.mobile}`}
                                        target='_blank'
                                        className="flex items-center justify-center px-3 py-1.5 
                    bg-green-100 text-green-700 rounded-lg 
                    hover:bg-green-200 transition-colors 
                    shadow-md hover:shadow-lg"
                                    >
                                     <FaWhatsapp
                                     className="h-4 w-4 mr-2 "
                                     />
                                        <span  className='text-[13px]'>WhatsApp</span>
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - About Us */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2"
                    >
                        <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-blue-800">About Us</h2>
                            <p className="text-gray-700 overflow-y-auto custom-scrollbar lg:h-[11.4rem] leading-relaxed">
                                {productImages?.product_about_us || "No description available."}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-2">
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {/* Left Column - Products & Services */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2"
                    >
                        {/* Products & Services Section */}
                        <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-md mb-4">
                            <h2 className="text-xl font-semibold mb-4 text-blue-800">Products & Services</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {productImages?.product || "Product and service description not available."}
                            </p>
                        </div>

                        {/* Contact Info Section */}
                        <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-md mb-4">
                            <h2 className="text-xl font-semibold mb-4 text-blue-800">Contact Info</h2>
                            <div className="space-y-2">
                                <p className="text-gray-700 leading-relaxed">
                                    <span className="font-semibold mr-2 text-teal-600">Address:</span>
                                    {profileData?.address || "Not available"}
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    <span className="font-semibold mr-2 text-teal-600">Email:</span>
                                    {profileData?.email || "Not available"}
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    <span className="font-semibold mr-2 text-teal-600">Phone:</span>
                                    {profileData?.mobile || "Not available"}
                                </p>
                            </div>
                        </div>

                        {/* Recent Work Section */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-8"
                        >
                            <h2 className="text-xl font-semibold mb-6 text-blue-800">Recent Work</h2>
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    {recentWorkImages.slice(sliderIndex, sliderIndex + 2).map((image, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="cursor-pointer"
                                            onClick={() => openImageModal(sliderIndex + index)}
                                        >
                                            <img
                                                src={image}
                                                alt={`Recent Work ${sliderIndex + index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                                {recentWorkImages.length > 2 && (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={prevSlide}
                                            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-opacity"
                                        >
                                            <ChevronLeftIcon className="h-6 w-6 text-blue-700" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={nextSlide}
                                            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-opacity"
                                        >
                                            <ChevronRightIcon className="h-6 w-6 text-blue-700" />
                                        </motion.button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-6 rounded-lg border border-blue-100 shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-6 text-blue-800">Send Enquiry</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {['name', 'email', 'phone', 'message'].map((field) => (
                                <motion.div
                                    key={field}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: field === 'name' ? 0.2 : field === 'email' ? 0.3 : field === 'phone' ? 0.4 : 0.5 }}
                                >
                                    <label className="block text-sm text-gray-700 mb-2 capitalize">
                                        {field} {field !== 'message' && <span className="text-red-500">*</span>}
                                    </label>
                                    {field === 'message' ? (
                                        <textarea
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    ) : (
                                        <input
                                            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            required={field !== 'message'}
                                            maxLength={field === 'phone' ? 10 : undefined}
                                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
                                            onKeyPress={field === 'phone'
                                                ? (e) => {
                                                    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                                                        e.preventDefault();
                                                    }
                                                }
                                                : undefined
                                            }
                                        />
                                    )}
                                </motion.div>
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors disabled:opacity-50"
                            >
                                {loading ? "Submitting..." : "Send Enquiry"}
                            </motion.button>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-center mt-4"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </motion.div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={modalVariants}
                        className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center p-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={closeImageModal}
                            className="absolute top-4 right-4 text-gray-700 hover:text-black"
                        >
                            <XMarkIcon className="h-8 w-8" />
                        </motion.button>

                        <div className="relative flex items-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => navigateImage('prev')}
                                className="text-gray-700 hover:text-black p-2"
                            >
                                <ChevronLeftIcon className="h-8 w-8" />
                            </motion.button>

                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                src={selectedImage}
                                alt="Full Size"
                                className="max-w-4xl max-h-[80vh] object-contain rounded-lg shadow-xl"
                            />

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => navigateImage('next')}
                                className="text-gray-700 hover:text-black p-2"
                            >
                                <ChevronRightIcon className="h-8 w-8" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default BusinessProfile;
