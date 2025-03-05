
import { Footer } from "@/widgets/layout";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Button, Typography, Card, Input, Textarea } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
  
  // Input Class Definitions
  const inputClass = "w-full px-3 py-2.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-500";
export function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("contact_name", name);
        formData.append("contact_email", email);
        formData.append("contact_mobile", phone);
        formData.append("contact_message", message);

        try {
            const response = await axios.post(
                "http://businessboosters.club/public/api/createContact",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                alert("Form submitted successfully!");
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
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
                    <Typography variant="h1" color="gray" className="text-center font-bold text-5xl mb-4">
                        Contact Us
                    </Typography>
                    <Typography variant="lead" color="gray" className="text-xl text-center font-light max-w-2xl">
                        We're here to help! Reach out to us for any inquiries or support.
                    </Typography>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information Cards (Left Side) */}
                <div className="space-y-8">
                    {/* Address Card */}
                    <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-blue-500 rounded-full">
                                <MapPinIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <Typography variant="h5" className="font-bold text-blue-900">
                                    Address
                                </Typography>
                                <Typography variant="paragraph" className="text-blue-800">
                                    #763, 16th Main, BSK 2nd Stage, Bengaluru 560 070
                                </Typography>
                            </div>
                        </div>
                    </Card>

                    {/* Email Card */}
                    <Card className="p-8 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-purple-500 rounded-full">
                                <EnvelopeIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <Typography variant="h5" className="font-bold text-purple-900">
                                    Mail Us
                                </Typography>
                                <Typography variant="paragraph" className="text-purple-800">
                                    businessboostersclub@gmail.com
                                </Typography>
                            </div>
                        </div>
                    </Card>

                    {/* Phone Card */}
                    <Card className="p-8 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-green-500 rounded-full">
                                <PhoneIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <Typography variant="h5" className="font-bold text-green-900">
                                    Phone Us
                                </Typography>
                                <Typography variant="paragraph" className="text-green-800">
                                    <p>BHUPENDRA KOTWAL - 93412 14936</p>
                                    <p>NARENDAR GEHLOT - 97411 41114</p>
                                    <p>UMESH TULSYAN - 93416 66007</p>
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Contact Form (Right Side) */}
                <Card className="p-8 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-2xl transition-shadow duration-300">
                    <Typography variant="h4" className="font-bold text-center mb-8 text-indigo-900">
                        Send Us a Message
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Name Field */}
                           
                            <div>
                                <FormLabel required>Full Name</FormLabel>
                                <input
                                  
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            {/* Email Field */}
                           
<div>
                                <FormLabel required>Email</FormLabel>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            {/* Phone Field */}
                           
 <div>
                                <FormLabel required>Phone Number</FormLabel>
                                <input
                                     type="tel"
                                     maxLength={10}
                                     value={phone}
                                     onChange={(e) => setPhone(e.target.value)}
                                     required
                                     className={inputClass}
                                     onKeyPress={(e) => {
                                         if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                                           e.preventDefault();
                                         }
                                       }}
                                />
                            </div>
                            {/* Message Field */}
                            
                             <div>
                                <FormLabel>Message</FormLabel>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    
                                    className={inputClass}
                                    rows="4"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-center">
                            <Button
                                type="submit"
                                color="indigo"
                                disabled={loading}
                                className="w-full sm:w-auto px-8 py-3 bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300"
                            >
                                {loading ? "Submitting..." : "Submit Now"}
                            </Button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <Typography variant="small" color="red" className="mt-4 text-center">
                                {error}
                            </Typography>
                        )}
                    </form>
                </Card>
            </div>

            {/* Footer */}
            <div className="bg-white mt-12">
                <Footer />
            </div>
        </>
    );
}

export default Contact;