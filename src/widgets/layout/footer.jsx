import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  useEffect(() => {
    // Fix: Use the same key name consistently
    if (!localStorage.getItem("visitor_count")) {
      axios
        .post("https://businessboosters.club/public/api/updateVisitorCount")
        .then((response) => {
          if (response.data?.code == 200) {
            localStorage.setItem("visitor_count", response.data.visitorCount)
          }
        })
        .catch((error) => console.error("Error fetching visitor count:", error));
    }
  }, []);

  return (
    <footer className="relative px-4 pt-8 pb-6">
      <div className="container mx-auto ">
        <div className="flex flex-wrap pt-6 text-center lg:text-left ">
          <div className="w-full lg:w-6/12">
            <Link to="/">
              <div className="flex items-center py-1 px-2">
                <img
                  src="https://businessboosters.club/static/media/logo.b092c9f492105e973cc3.png"
                  alt="Business Boosters Logo"
                  className="h-10 w-auto"
                />
              </div>
            </Link>
            <Typography className="font-normal text-blue-gray-500 px-4 lg:w-2/5">
              {description}
            </Typography>
            <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full shadow-none bg-transparent" >
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
          <div className=" text-start  mt-12  w-screen lg:w-6/12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name} className="w-48">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center  justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
      <div className="text-center py-4">
        <p className="font-semibold text-blue-gray-700">
          {/* Fix: Use the same key name here */}
          Visitor No: {localStorage.getItem("visitor_count")}
        </p>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "Business Boosters",
  description:
    "We are dedicated to providing the best services to our customers. Our team is committed to excellence and innovation.",
  socials: [
    {
      color: "gray",
      name: "twitter",
      path: "https://www.twitter.com/businessboosters",
    },
    {
      color: "gray",
      name: "youtube",
      path: "https://www.youtube.com/businessboosters",
    },
    {
      color: "gray",
      name: "instagram",
      path: "https://www.instagram.com/businessboosters",
    },
    {
      color: "black",
      name: "github",
      path: "https://github.com/businessboosters",
    },
  ],
  menus: [
    {
      name: "useful links",
      items: [
        { name: "About Us", path: "/aboutus" },
        { name: "Contact Us", path: "/contact" },
        { name: "Services", path: "/services" },
        { name: "Gallery", path: "/gallery" },
      ],
    },
    {
      name: "contact us",
      items: [
        {
          name: "911, 39th Cross, 28th Main Rd, Putlanpalya, Jayanagara 9th Block, Bengaluru, Karnataka 560069, India",
          path: "#",
          icon: <MapPinIcon className="h-4 w-4 inline-block mr-2" />,
        },
        {
          name: "gupta.govind1001@gmail.com",
          path: "mailto:gupta.govind1001@gmail.com",
          icon: <EnvelopeIcon className="h-4 w-4 inline-block mr-2" />,
        },
        {
          name: "8867171060",
          path: "tel:8867171060",
          icon: <PhoneIcon className="h-4 w-4 inline-block mr-2" />,
        },
      ],
    },
  ],
  copyright: (
    <>
      Copyright © {year} Business Boosters. All rights reserved.
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;