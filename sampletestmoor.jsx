import React, { useState } from "react";
import { Input, Select, Option } from "@material-tailwind/react";

export function Interest() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobilenumber: "",
        gender: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
   
        <div className="max-w-lg mx-auto px-8 py-10 bg-white shadow-xl rounded-xl border border-gray-200 mt-20">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">✨ Register Here ✨</h2>
            <form className="space-y-6">
                <div>
                    <Input 
                        variant="static" 
                        label="Full Name" 
                        placeholder="Enter your full name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-100 text-gray-700 placeholder-gray-400"
                    />
                </div>
                <div>
    <Select 
        variant="static" 
        label="Select Gender"
        onChange={(value) => setFormData({ ...formData, gender: value })}
        // className="bg-gray-100 text-gray-700"
        

    >
        <Option value="MALE">Male</Option>
        <Option value="FEMALE">Female</Option>
        <Option value="OTHER">Other</Option>
    </Select>
</div>

                <div>
                    <Input 
                        variant="static" 
                        label="Email" 
                        placeholder="Enter your email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-100 text-gray-700 placeholder-gray-400"
                    />
                </div>
                <div>
                    <Input 
                        variant="static" 
                        label="Mobile Number" 
                        placeholder="Enter your mobile number" 
                        name="mobilenumber"
                        value={formData.mobilenumber}
                        onChange={handleInputChange}
                        maxLength={10}
                        className="bg-gray-100 text-gray-700 placeholder-gray-400"
                    />
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

<div className="max-w-lg mx-auto px-8 py-10 bg-white shadow-xl rounded-xl border border-gray-200 mt-20">
<h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">✨ Register Here ✨</h2>
<form className="space-y-6">
    <div>
        <Input 
            variant="outlined" 
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="text-gray-700"
        />
    </div>
    <div>
        <Select 
            variant="outlined" 
            label="Select Gender"
            onChange={(value) => setFormData({ ...formData, gender: value })}
        >
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
            <Option value="OTHER">Other</Option>
        </Select>
    </div>
    <div>
        <Input 
            variant="outlined" 
            label="Email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="text-gray-700"
        />
    </div>
    <div>
        <Input 
            variant="outlined" 
            label="Mobile Number"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleInputChange}
            maxLength={10}
            className="text-gray-700"
        />
    </div>
    <div className="flex justify-center mt-6">
        <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
        >
            Submit
        </button>
    </div>
</form>
</div>


<div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-lg w-full px-8 py-10 bg-gray-800 bg-opacity-70 shadow-2xl rounded-xl border border-gray-700 backdrop-blur-lg">
                <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide">🚀 Join Us</h2>
                <form className="space-y-6">
                    <div>
                        <Input 
                            variant="outlined" 
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="text-white font-medium border-gray-600 focus:border-blue-400 bg-transparent"
                        />
                    </div>
                    <div>
                        <Select 
                            variant="outlined" 
                            label="Select Gender"
                            onChange={(value) => setFormData({ ...formData, gender: value })}
                            className="text-white font-medium border-gray-600 focus:border-blue-400 bg-transparent"
                        >
                            <Option value="MALE">Male</Option>
                            <Option value="FEMALE">Female</Option>
                            <Option value="OTHER">Other</Option>
                        </Select>
                    </div>
                    <div>
                        <Input 
                            variant="outlined" 
                            label="Email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="text-white font-medium border-gray-600 focus:border-blue-400 bg-transparent"
                        />
                    </div>
                    <div>
                        <Input 
                            variant="outlined" 
                            label="Mobile Number"
                            name="mobilenumber"
                            value={formData.mobilenumber}
                            onChange={handleInputChange}
                            maxLength={10}
                            className="text-white font-medium border-gray-600 focus:border-blue-400 bg-transparent"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-blue-400 hover:scale-105 transition duration-300 font-bold tracking-wide"
                        >
                            🚀 Get Started
                        </button>
                    </div>
                </form>
            </div>
        </div>



        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-orange-100 to-yellow-200 px-4">
            <div className="max-w-lg w-full px-10 py-12 bg-white bg-opacity-90 shadow-2xl rounded-3xl border border-orange-300 backdrop-blur-md">
                <h2 className="text-4xl font-bold text-center text-orange-600 mb-8 tracking-wide">
                    🌟 Register Now!
                </h2>
                <form className="space-y-6">
                    <div>
                        <Input 
                            variant="outlined" 
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="text-gray-700 font-medium border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 placeholder-gray-400 rounded-lg transition duration-300"
                            labelProps={{
                                className: "peer-focus:text-orange-500 transition-all"
                            }}                        />
                    </div>
                    <div>
                        <Select 
                            variant="outlined" 
                            label="Select Gender"
                            onChange={(value) => setFormData({ ...formData, gender: value })}
                            className="text-gray-700 font-medium border-orange-300 focus:border-orange-500 bg-transparent placeholder-gray-400 focus:ring-2 focus:ring-orange-400 rounded-lg"
                        >
                            <Option value="MALE">Male</Option>
                            <Option value="FEMALE">Female</Option>
                            <Option value="OTHER">Other</Option>
                        </Select>
                    </div>
                    <div>
                        <Input 
                            variant="outlined" 
                            label="Email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="text-gray-700 font-medium border-orange-300 focus:border-orange-500 bg-transparent placeholder-gray-400 focus:ring-2 focus:ring-orange-400 rounded-lg"
                        />
                    </div>
                    <div>
                        <Input 
                            variant="outlined" 
                            label="Mobile Number"
                            name="mobilenumber"
                            value={formData.mobilenumber}
                            onChange={handleInputChange}
                            maxLength={10}
                            className="text-gray-700 font-medium border-orange-300 focus:border-orange-500 bg-transparent placeholder-gray-400 focus:ring-2 focus:ring-orange-400 rounded-lg"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full shadow-lg hover:shadow-orange-400/50 hover:scale-105 transition duration-300 font-semibold tracking-wide"
                        >
                            🚀 Join Now!
                        </button>
                    </div>
                </form>
            </div>
        </div>
</>
    );
}

export default Interest;
