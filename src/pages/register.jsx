import React, { useState } from "react";
import axios from "axios";
import { Footer } from "@/widgets/layout";
import { Button, Card, Input, Option, Select, Textarea } from "@material-tailwind/react";

export function Register() {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    mobile: "",
    whatsapp_number: "",
    image: null,
    dob: "",
    spouse_name: "",
    company_short: "",
    company: "",
    doa: "",
    business_category: "",
    experience: "",
    website: "",
    address: "",
    area: "",
    products: "",
    landline: "",
    product_tag: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleValidation = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Full name is required";

    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile is required";
    if (!formData.whatsapp_number) newErrors.whatsapp_number = "Mobile is required";
    if (!formData.image)
      newErrors.image = "Image is required";
    if (!formData.dob)
      newErrors.dob = "Date of Birth is required";

    if (!formData.business_category)
      newErrors.business_category = "Company name is required";

    if (!formData.address)
      newErrors.address = "addressis required";
    if (!formData.company)
      newErrors.company = "company required";
    if (!formData.area)
      newErrors.area = "area is  required";

    if (!formData.products)
      newErrors.products = "Products/Services details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log(value,"name")
    if (name === "mobile" || name === "whatsapp_number" || name === "landline") {
        if (!/^\d*$/.test(value)) return;
      }
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://businessboosters.club/public/api/createUser",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        navigate("/thankyou");
        setFormData({
            name: "",
            gender: "",
            email: "",
            mobile: "",
            whatsapp_number: "",
            image: null,
            dob: "",
            spouse_name: "",
            company_short: "",
            company: "",
            doa: "",
            business_category: "",
            experience: "",
            website: "",
            address: "",
            area: "",
            products: "",
            landline: "",
            product_tag: "",
          });
      } else {
        navigate("/failure");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      navigate("/failure");
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
      <Card className="p-8 bg-gradient-to-r mx-5 md:mx-10 px-8 py-10 border border-[#A41460]  hover:shadow-2xl transition-shadow duration-300">
          <h2 className="font-bold text-center mb-8 text-[#A41460] text-2xl">
            Complete Your Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              <Input
                variant="static"
                label={
                  <>
                    {" "}
                    <span className="text-[#A41460] "> Full Name *</span>
                  </>
                }
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                  errors.name ? "placeholder-red-500" : ""
                }`}
              />
              <div>
                <Select
                  variant="static"
                  required
                  label={
                    <>
                      <span className="text-[#A41460] "> Gender *</span>
                    </>
                  }
                  onChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                  className={`${errors.gender ? "border-red-500" : ""}`}
                >
                  <Option value="MALE">Male</Option>
                  <Option value="FEMALE">Female</Option>
                </Select>
              </div>

              <div>
                <Input
                  variant="static"
                  type="email"
                  label={
                    <>
                      <span className="text-[#A41460] "> Email *</span>
                    </>
                  }
                  placeholder="Enter your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.email ? "placeholder-red-500 border-red-500" : ""
                  }`}
                  // required
                />
              </div>
              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460] "> Mobile Number *</span>
                    </>
                  }
                  placeholder="Enter your  Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.mobile ? "placeholder-red-500 border-red-500" : ""
                  }`}
                  maxLength={10}
                  // required
                />
              </div>

              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460]"> WhatsApp Number*</span>
                    </>
                  }
                  placeholder="Enter your WhatsApp Number"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.whatsapp_number
                      ? "placeholder-red-500 border-red-500"
                      : ""
                  }`}
                  maxLength={10}
                  // required
                />
              </div>
              <div>
                <Input
                  variant="static"
                  type="date"
                  label={
                    <>
                      <span className="text-[#A41460]"> Date of Birth*</span>
                    </>
                  }
                  placeholder="Enter your Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.dob ? "placeholder-red-500 border-red-500" : ""
                  }`}
                  // required
                />
              </div>
              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460]">Spouse Name</span>
                    </>
                  }
                  placeholder="Enter your Spouse Name"
                  name="spouse_name"
                  value={formData.spouse_name}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.spouse_name
                      ? "placeholder-red-500 border-red-500"
                      : ""
                  }`}
                  // required
                />
              </div>
              <div>
                <Input
                  variant="static"
                  type="date"
                  label={
                    <>
                      <span className="text-[#A41460]"> Anniversary Date</span>
                    </>
                  }
                  placeholder="Enter your Anniversary Date"
                  name="doa"
                  value={formData.doa}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400`}
                  // required
                />
              </div>
            
            
              <div>
              <Input
  variant="static"
  type="file"
  label={
    <>
      <span className="text-[#A41460] ml-1"> Profile Image </span>
    </>
  }
  accept="image/*"
  placeholder="Enter your Area"
  name="image"
  onChange={handleInputChange} // Remove value, use only onChange
  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
    errors.image ? "placeholder-red-500 border-red-500" : ""
  }`}
/>

              </div>
            
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 md:gap-10">
              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460]">Company Name *</span>
                    </>
                  }
                  placeholder="Enter your Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.company ? "placeholder-red-500 border-red-500" : ""
                  }`}
                  // required
                />
              </div>
              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460] ml-1">
                        {" "}
                        Business Category *
                      </span>
                    </>
                  }
                  placeholder="Enter your Business Category"
                  name="business_category"
                  value={formData.business_category}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.business_category
                      ? "placeholder-red-500 border-red-500"
                      : ""
                  }`}
                  // required
                />
              </div>

              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460] ml-1"> Experience </span>
                    </>
                  }
                  placeholder="Enter your Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.experience
                      ? "placeholder-red-500 border-red-500"
                      : ""
                  }`}
                  // required
                />
              </div>
              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460] ml-1"> Website </span>
                    </>
                  }
                  placeholder="Enter your Website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.website ? "placeholder-red-500 border-red-500" : ""
                  }`}
                  // required
                />
              </div>

              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460] ml-1">
                        {" "}
                        Landline Number{" "}
                      </span>
                    </>
                  }
                  placeholder="Enter your Landline Number"
                  name="landline"
                  value={formData.landline}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.landline ? "placeholder-red-500 border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460] ml-1"> Address *</span>
                    </>
                  }
                  placeholder="Enter your Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.address ? "placeholder-red-500 border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460] ml-1"> Area *</span>
                    </>
                  }
                  placeholder="Enter your Area"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.area ? "placeholder-red-500 border-red-500" : ""
                  }`}
                />
              </div>
           
            </div>

            <div className="grid grid-cols-1  gap-6 md:gap-10">
              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460] ml-1">
                        Products/Services *
                      </span>
                    </>
                  }
                  placeholder="Type all Products or Services separated by comma"
                  name="products"
                  value={formData.products}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.products ? "placeholder-red-500 border-red-500" : ""
                  }`}
                  // required
                />
              </div>
              <div>
                <Input
                  variant="static"
                  label={
                    <>
                      <span className="text-[#A41460] ml-1">Product Tags</span>
                    </>
                  }
                  placeholder="Type all Products or Services related Tags Separated by comma (e.g., CCTV - Security System, Camera, Surveillance)"
                  name="product_tag"
                  value={formData.product_tag}
                  onChange={handleInputChange}
                  className={`bg-gray-100 text-gray-700 placeholder-gray-400 ${
                    errors.product_tag
                      ? "placeholder-red-500 border-red-500"
                      : ""
                  }`}
                  // required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-[#A41460] hover:bg-[#802053] transition-colors duration-300"
                >
                {loading ? "Submitting..." : "Register Now"}
              </Button>
            </div>
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
