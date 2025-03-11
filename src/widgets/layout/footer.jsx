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
    <footer className="relative px-4 pt-2 pb-6">
      <div className="container mx-auto ">
        

        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-between">
  <div className="w-full md:w-auto px-16 text-center   md:text-left">
    <Typography
      variant="small"
      className="font-normal text-blue-gray-500"
    >
      {copyright}
    </Typography>
  </div>
  <div className="w-full md:w-auto px-4 text-center md:text-right">
    <p className="font-semibold text-blue-gray-700">
      Visitor No: {localStorage.getItem("visitor_count")}
    </p>
  </div>
</div>
       
      </div>
     
    </footer>
  );
}

Footer.defaultProps = {
 
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