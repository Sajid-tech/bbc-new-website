import { Footer } from "@/widgets/layout";
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";

export function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get("https://businessboosters.club/public/api/getGallery");
                if (response.data && response.data.gallery) {
                    setGallery(response.data.gallery);
                }
            } catch (error) {
                console.error("Error fetching gallery:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    const openImage = (index) => {
        setCurrentIndex(index);
        setSelectedImage(gallery[index].large_image);
    };

    const nextImage = () => {
        const newIndex = (currentIndex + 1) % gallery.length;
        setCurrentIndex(newIndex);
        setSelectedImage(gallery[newIndex].large_image);
    };

    const prevImage = () => {
        const newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        setCurrentIndex(newIndex);
        setSelectedImage(gallery[newIndex].large_image);
    };

    return (
        <>
       
             <section className="relative block h-[40vh] bg-white">
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
                                <Typography variant="h1" color="gray" className="text-center font-bold text-5xl mb-4">
                                Gallery
                                </Typography>
                                <Typography variant="lead" color="gray" className="text-xl text-center font-light max-w-2xl">    A mentor is an individual with expertise who can help develop the career of a mentee. Meet our Mentors.
                                </Typography>
                            </div>
                        </section>

            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? (
                      <div className=" col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center py-12 bg-white rounded-lg shadow">
                      <div className="text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                        <p className="mt-2 text-gray-700">Loading gallery...</p>
                      </div>
                    </div>
                ) : (
                    gallery.map((item, index) => (
                        <img
                            key={index}
                            src={`https://businessboosters.club/public/images/gallery/${item.small_image}`}
                            alt={item.gallery_occasion}
                            className="w-full h-60 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => openImage(index)}
                        />
                    ))
                )}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setSelectedImage(null)}>×</button>
                    <button className="absolute left-4 text-white text-3xl" onClick={prevImage}>❮</button>
                    <img
                        src={`https://businessboosters.club/public/images/gallery/${selectedImage}`}
                        className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
                        alt="Selected"
                    />
                    <button className="absolute right-4 text-white text-3xl" onClick={nextImage}>❯</button>
                </div>
            )}

            <div className="bg-white mt-8">
                <Footer />
            </div>
        </>
    );
}

export default Gallery;