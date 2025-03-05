import React, { useState } from "react";
import axios from "axios";
import { Footer } from "@/widgets/layout";

// Custom Form Label Component
const FormLabel = ({ children, required }) => (
  <label className="block text-sm font-semibold text-black mb-1">
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

// Input Class Definitions
const inputClass = "w-full px-3 py-2.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-500";
const inputClassSelect = "w-full px-3 py-2.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-500";

export function Register() {
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        email: "",
        mobilenumber: "",
        whatsapp: "",
        profileimage: null,
        dateofbirth: "",
        spouse: "",
        company: "",
        anniversary: "",
        business: "",
        experience: "",
        website: "",
        address: "",
        area: "",
        products: "",
        landline: "",
        producttag: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Contact form states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

<<<<<<< HEAD
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
=======
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
>>>>>>> 36970582264c2050da022e03894c99c84e6145be
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

<<<<<<< HEAD
        const formDataToSubmit = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSubmit.append(
                key === 'profileimage' ? 'image' : 
                key === 'mobilenumber' ? 'mobile' : 
                key === 'whatsapp' ? 'whatsapp_number' : 
                key === 'dateofbirth' ? 'dob' : 
                key === 'spouse' ? 'spouse_name' : 
                key === 'anniversary' ? 'doa' : 
                key === 'business' ? 'business_category' : 
                key === 'producttag' ? 'product_tag' : 
                key,
                formData[key]
            );
=======
        const formSubmitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formSubmitData.append(`contact_${key}`, value);
>>>>>>> 36970582264c2050da022e03894c99c84e6145be
        });

        try {
            const response = await axios.post(
<<<<<<< HEAD
                "http://businessboosters.club/public/api/createUser",
                formDataToSubmit,
=======
                "http://businessboosters.club/public/api/createEnquiry",
                formSubmitData,
>>>>>>> 36970582264c2050da022e03894c99c84e6145be
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
<<<<<<< HEAD
                alert("Registration successful!");
                // Reset form
                setFormData({
                    name: "",
                    gender: "",
                    email: "",
                    mobilenumber: "",
                    whatsapp: "",
                    profileimage: null,
                    dateofbirth: "",
                    spouse: "",
                    company: "",
                    anniversary: "",
                    business: "",
                    experience: "",
                    website: "",
                    address: "",
                    area: "",
                    products: "",
                    landline: "",
                    producttag: ""
=======
                alert("Form submitted successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
>>>>>>> 36970582264c2050da022e03894c99c84e6145be
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
<<<<<<< HEAD
        <>
            {/* Hero Section */}
            <section className="relative block h-[40vh] bg-white">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
                    <h1 className="text-center font-bold text-5xl mb-4 text-gray-800">
                        Business Registration
                    </h1>
                    <p className="text-xl text-center font-light max-w-2xl text-gray-700">
                        Join our network and expand your business opportunities!
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="p-8 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-2xl transition-shadow duration-300 rounded-lg">
                    <h2 className="font-bold text-center mb-8 text-indigo-900 text-2xl">
                        Complete Your Registration
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <FormLabel required>Full Name</FormLabel>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            
                            <div>
                                <FormLabel required>Gender</FormLabel>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClassSelect}
                                >
                                    <option value="">Select Gender</option>
                                    {genders.map((g) => (
                                        <option key={g.value} value={g.value}>
                                            {g.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <FormLabel required>Email</FormLabel>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <FormLabel required>Mobile Number</FormLabel>
                                <input
                                    type="tel"
                                    name="mobilenumber"
                                    value={formData.mobilenumber}
                                    onChange={handleInputChange}
                                    maxLength={10}
                                    required
                                    className={inputClass}
                                    onKeyPress={(e) => {
                                        if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                                          e.preventDefault();
                                        }
                                      }}
                                />
=======
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
>>>>>>> 36970582264c2050da022e03894c99c84e6145be
                            </div>

                        </div>

<<<<<<< HEAD
                       

                        {/* Personal Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                                <FormLabel required>WhatsApp Number</FormLabel>
                                <input
                                    type="tel"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleInputChange}
                                    maxLength={10}
                                    required
                                    className={inputClass}
                                    onKeyPress={(e) => {
                                        if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                                          e.preventDefault();
                                        }
                                      }}
                                />
                            </div>
                            <div>
                                <FormLabel required>Date of Birth</FormLabel>
                                <input
                                    type="date"
                                    name="dateofbirth"
                                    value={formData.dateofbirth}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <FormLabel>Spouse Name</FormLabel>
                                <input
                                    type="text"
                                    name="spouse"
                                    value={formData.spouse}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <FormLabel>Anniversary Date</FormLabel>
                                <input
                                    type="date"
                                    name="anniversary"
                                    value={formData.anniversary}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Business Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <FormLabel required>Company Name</FormLabel>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <FormLabel required>Business Category</FormLabel>
                                <input
                                    type="text"
                                    name="business"
                                    value={formData.business}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <FormLabel>Experience</FormLabel>
                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <FormLabel>Website</FormLabel>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <FormLabel>Landline Number</FormLabel>
                                <input
                                    type="tel"
                                    name="landline"
                                    value={formData.landline}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                    onKeyPress={(e) => {
                                        if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                                          e.preventDefault();
                                        }
                                      }}
                                />
                            </div>

                            <div>
                                <FormLabel required>Address</FormLabel>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <FormLabel required>Area</FormLabel>
                                <input
                                    type="text"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <FormLabel>Profile Image</FormLabel>
                                <input
                                    type="file"
                                    name="profileimage"
                                    onChange={handleInputChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Products and Tags */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <FormLabel required>Products/Services</FormLabel>
                                <textarea
                                    name="products"
                                    value={formData.products}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Type all Products or Services separated by comma"
                                    className={inputClass}
                                    rows="4"
                                />
                            </div>
                            <div>
                                <FormLabel>Product Tags</FormLabel>
                                <textarea
                                    name="producttag"
                                    value={formData.producttag}
                                    onChange={handleInputChange}
                                    placeholder="Type all Products or Services related Tags Separated by comma (e.g., CCTV - Security System, Camera, Surveillance)"
                                    className={inputClass}
                                    rows="4"
                                />
                            </div>
                        </div>

                      

                        {/* Submit Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                            >
                                {loading ? "Submitting..." : "Register Now"}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="mt-4 text-center text-red-500 text-sm">
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white mt-12">
                <Footer />
            </div>
        </>
=======
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
>>>>>>> 36970582264c2050da022e03894c99c84e6145be
    );
};

export default BusinessProfile;
