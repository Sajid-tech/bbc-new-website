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

    const genders = [
        { value: "MALE", label: "Male" },
        { value: "FEMALE", label: "Female" }
    ];

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

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
        });

        try {
            const response = await axios.post(
                "http://businessboosters.club/public/api/createUser",
                formDataToSubmit,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
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

    return (
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
                            </div>

                        </div>

                       

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
    );
}

export default Register;