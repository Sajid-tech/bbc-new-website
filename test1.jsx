import React, { useState } from "react";
import { Footer } from "@/widgets/layout";
import { 
    Button, 
    Typography, 
    Card, 
    Input, 
    Textarea,
    Select,
    Option
} from "@material-tailwind/react";
import axios from "axios";

export function Register() {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [mobilenumber, setMobilenumber] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [profileimage, setProfileimage] = useState(null);
    const [dateofbirth, setDateofbirth] = useState("");
    const [spouse, setSpouse] = useState("");
    const [company, setCompany] = useState("");
    const [anniversary, setAnniversary] = useState("");
    const [business, setBusiness] = useState("");
    const [experience, setExperience] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [area, setArea] = useState("");
    const [products, setProducts] = useState("");
    const [landline, setLandline] = useState("");
    const [producttag, setProducttag] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const genders = [
        { value: "MALE", label: "Male" },
        { value: "FEMALE", label: "Female" }
    ];

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileimage(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("mobile", mobilenumber);
        formData.append("whatsapp_number", whatsapp);
        formData.append("image", profileimage);
        formData.append("dob", dateofbirth);
        formData.append("spouse_name", spouse);
        formData.append("company", company);
        formData.append("doa", anniversary);
        formData.append("business_category", business);
        formData.append("experience", experience);
        formData.append("website", website);
        formData.append("address", address);
        formData.append("area", area);
        formData.append("products", products);
        formData.append("landline", landline);
        formData.append("product_tag", producttag);

        try {
            const response = await axios.post(
                "http://businessboosters.club/public/api/createUser",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                alert("Registration successful!");
                // Reset all fields
                setName("");
                setGender("");
                setEmail("");
                setMobilenumber("");
                setWhatsapp("");
                setProfileimage(null);
                setDateofbirth("");
                setSpouse("");
                setCompany("");
                setAnniversary("");
                setBusiness("");
                setExperience("");
                setWebsite("");
                setAddress("");
                setArea("");
                setProducts("");
                setLandline("");
                setProducttag("");
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
                        Business Registration
                    </Typography>
                    <Typography variant="lead" color="gray" className="text-xl text-center font-light max-w-2xl">
                        Join our network and expand your business opportunities!
                    </Typography>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <Card className="p-8 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-2xl transition-shadow duration-300">
                    <Typography variant="h4" className="font-bold text-center mb-8 text-indigo-900">
                        Complete Your Registration
                    </Typography>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="bg-white"
                            />
                            
                            <Select
                                label="Gender"
                                value={gender}
                                onChange={(val) => setGender(val)}
                                required
                            >
                                {genders.map((g) => (
                                    <Option key={g.value} value={g.value}>
                                        {g.label}
                                    </Option>
                                ))}
                            </Select>

                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white"
                            />
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input
                                label="Mobile Number"
                                type="tel"
                                value={mobilenumber}
                                onChange={(e) => setMobilenumber(e.target.value)}
                                maxLength={10}
                                required
                                className="bg-white"
                            />

                            <Input
                                label="WhatsApp Number"
                                type="tel"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                maxLength={10}
                                required
                                className="bg-white"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500 
                                    file:mr-4 file:py-2 file:px-4 
                                    file:rounded-full file:border-0 
                                    file:text-sm file:font-semibold 
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100"
                                />
                            </div>
                            <div className="col-span-2">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input
                                label="Date of Birth"
                                type="date"
                                value={dateofbirth}
                                onChange={(e) => setDateofbirth(e.target.value)}
                                required
                                className="bg-white"
                            />

                            <Input
                                label="Spouse Name"
                                value={spouse}
                                onChange={(e) => setSpouse(e.target.value)}
                                className="bg-white"
                            />

                            <Input
                                label="Anniversary Date"
                                type="date"
                                value={anniversary}
                                onChange={(e) => setAnniversary(e.target.value)}
                                className="bg-white"
                            />
                        </div>

                        {/* Business Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input
                                label="Company Name"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                                className="bg-white"
                            />

                            <Input
                                label="Business Category"
                                value={business}
                                onChange={(e) => setBusiness(e.target.value)}
                                required
                                className="bg-white"
                            />

                            <Input
                                label="Experience"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className="bg-white"
                            />
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input
                                label="Website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="bg-white"
                            />

                            <Input
                                label="Landline Number"
                                value={landline}
                                onChange={(e) => setLandline(e.target.value)}
                                className="bg-white"
                            />

                            <Input
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="bg-white"
                            />
                        </div>

                        {/* Final Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                required
                                className="bg-white"
                            />

                            <Textarea
                                label="Products/Services"
                                value={products}
                                onChange={(e) => setProducts(e.target.value)}
                                required
                                className="bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <Textarea
                                label="Product Tag"
                                value={producttag}
                                onChange={(e) => setProducttag(e.target.value)}
                                className="bg-white"
                                helperText="Type tags separated by comma"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-8">
                            <Button
                                type="submit"
                                color="indigo"
                                disabled={loading}
                                className="w-full sm:w-auto px-8 py-3 bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300"
                            >
                                {loading ? "Submitting..." : "Register Now"}
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

export default Register;