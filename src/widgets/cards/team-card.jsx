import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Card, Avatar, Typography, IconButton } from "@material-tailwind/react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function TeamCard({ img, name, position, socials }) {
  return (
    <Card color="transparent" shadow={false} className="text-center mx-2 p-4">
      <Avatar
        src={img}
        alt={name}
        size="xxl"
        variant="rounded"
        className="h-[12rem] w-full  object-cover shadow-xl rounded-2xl"
      />
      <Typography variant="h5" color="blue-gray" className="mt-4 mb-1 font-semibold">
        {name}
      </Typography>
      {position && (
        <Typography className="text-gray-500 text-sm">{position}</Typography>
      )}
   
    </Card>
  );
}

TeamCard.defaultProps = {
  position: "",
  socials: null,
};

TeamCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  socials: PropTypes.node,
};

export function TeamSlider({ teamData }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 9,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-out",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 ,slidesToScroll:1} },
      { breakpoint: 768, settings: { slidesToShow: 3,slidesToScroll:1 } },
      { breakpoint: 640, settings: { slidesToShow: 2,slidesToScroll:1 } },
    ],
  };

  const handlePrev = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  return (
    <div className="relative">
      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {teamData.map(({ img, name, position }) => (
          <div key={name} className="px-2">
            <TeamCard
              img={img}
              name={name}
              position={position}
              
            />
          </div>
        ))}
      </Slider>

      {/* Navigation Buttons (Modern Floating Glassmorphism Style) */}
      <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
        <IconButton
          variant="filled"
          size="lg"
          onClick={handlePrev}
          className="rounded-full p-3 bg-white/30 backdrop-blur-md shadow-lg hover:bg-white/50 transition duration-300"
        >
          <ChevronLeftIcon strokeWidth={2} className="h-6 w-6 text-gray-800" />
        </IconButton>
      </div>

      <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
        <IconButton
          variant="filled"
          size="lg"
          onClick={handleNext}
          className="rounded-full p-3 bg-white/30 backdrop-blur-md shadow-lg hover:bg-white/50 transition duration-300"
        >
          <ChevronRightIcon strokeWidth={2} className="h-6 w-6 text-gray-800" />
        </IconButton>
      </div>
    </div>
  );
}

TeamSlider.propTypes = {
  teamData: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.string,
      socials: PropTypes.array,
    })
  ).isRequired,
};

export default TeamSlider;
