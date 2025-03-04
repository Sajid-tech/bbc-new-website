import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard, TeamSlider } from "@/widgets/cards";
import { featuresData, contactData } from "@/data";
import { RealStoriesSection } from "@/widgets/cards/stories-card";
import { realStoriesData } from "@/data/stories-data";
import TeamSliderPartner from "@/widgets/cards/team-card-partner";
import { Link } from "react-router-dom";
import axios from "axios";

export function Home() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://businessboosters.club/public/api/getUser");
        if (response.data && response.data.profile) {
          // Map the API data to the teamData structure
          const mappedData = response.data.profile.map((user) => ({
            img: user.image ? `http://businessboosters.club/public/images/user_images/${user.image}` : "http://businessboosters.club/public/images/user_images/no_images.png", // Fallback image if no image is provided
            name: user.name || "Unknown",
            position: user.company_short || "Member",
           
          }));
          setTeamData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('https://businessboosters.club/static/media/bbc_banner.75f50e043a555b86430c.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Your Most Trusted Business Partner.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
              We provide expertise, connections and cultural awareness to help your organizations reach new markets and make successful deals.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
         
            {featuresData.map(({ color, title, icon, description,link }) => (
               <Link key={title} to={link} className="block">
              <FeatureCard
               
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
               </Link>
            ))}
          
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full   text-center shadow-lg">
              <img
                    alt="Card Image"
                    src="/img/slogo.png"
                    className="h-full w-full"
                  />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                About Us
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
              The new digital world is very different from the old traditional business world. Advantage of this world is only enjoyed by large multiple chains of stores and online giant sellers.
                <br />
                <br />
                The small and medium business persons are slowly and surely suffering and losing out. In such a scenario the need was to fight back with these giants collectively hence the thought of forming a decent and family type businesses group came to Mr. Bhupendra Kotwal, Mr. Umesh Tulsiyan and Mr. Narendra Gehlot who took the lead and started consulting and convincing business friends who not only joined the mission but supported the idea. Purpose of the group is simple.
              </Typography>
              <Link to='/aboutus'>
              <Button  className="w-full sm:w-auto px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300">read more</Button>
             </Link>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
               
                <CardBody>
                <img
                    alt="Card Image"
                    src="https://businessboosters.club/static/media/about_us.bca55603f348c7edd1ab.jpg"
                    className="h-full w-full"
                  />
                </CardBody>
              </Card>
              
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-5 ">
        <div className="container mx-auto">
          <PageTitle section="" heading="Our Trusted Patners">
          The Trusted Partner You Can Have Faith In, Together we can do amazing things.
          </PageTitle>
          <div className="mt-24">
      <TeamSlider teamData={teamData} />
      <TeamSliderPartner teamData={teamData} />
    </div>
        </div>
      </section>
   
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">


          <PageTitle section="" heading="Best Consulting For Every Business">
          This is group which believes in fair and honest business, to not only help customers but develop personal relationship. Thus growing in every field.

Our members not only enjoy business referrals but also have develop healthy family bonding with each other.

we believe in <span className="text-black font-bold">“SABKA SATH SABKA VISHWAS”</span>.
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>

 {/* New Follow Us Section */}
    <PageTitle section="" heading="Follow Us">
      This is group which believes in fair and honest business, to not only help customers but develop personal relationship. Thus growing in every field.

      Our members not only enjoy business referrals but also have develop healthy family bonding with each other.

      we believe in <span className="text-black font-bold">“SABKA SATH SABKA VISHWAS”</span>.
    </PageTitle>
    <div className="container mx-auto px-4 mb-8 mt-8">
  {/* First Row: Two Cards (50% width each) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* YouTube Card */}
    <div
      className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => window.open("https://www.youtube.com", "_blank")}
    >
      <div className="flex items-center gap-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
          alt="YouTube"
          className="w-10 h-10"
        />
        <Typography variant="h5" className="text-gray-800">
          YouTube
        </Typography>
      </div>
      <Typography className="mt-2 text-gray-600">
        Follow us on YouTube for the latest updates and tutorials.
      </Typography>
    </div>

    {/* Facebook Card */}
    <div
      className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => window.open("https://www.facebook.com", "_blank")}
    >
      <div className="flex items-center gap-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          alt="Facebook"
          className="w-10 h-10"
        />
        <Typography variant="h5" className="text-gray-800">
          Facebook
        </Typography>
      </div>
      <Typography className="mt-2 text-gray-600">
        Connect with us on Facebook for community updates.
      </Typography>
    </div>
  </div>

  {/* Second Row: One Card (Full Width) */}
  <div
    className="bg-white flex flex-col lg:flex-row item-center  gap-2  shadow-lg rounded-lg p-6 mt-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    onClick={() => window.open("https://play.google.com/store", "_blank")}
  >
    <div className="flex items-center gap-4 ">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        alt="Google Playstore"
        className="w-auto h-auto"
      />
     
    </div>
   <div className="">
   <Typography variant="h5" className="text-gray-800">
        Google Playstore
      </Typography>
    <Typography className="mt-2 text-gray-600">
      Download our app from the Google Playstore for the best experience.
    </Typography>
   </div>
  </div>
  
</div>

 






        </div>

      </section>
      <RealStoriesSection storiesData={realStoriesData} />
      <section className=" px-4 md:px-20  pt-10 pb-5  ">
        {/* New Section: Interested in Becoming a BBC Member */}

<div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg">
      {/* Left Side: Text */}
      <div className="text-center lg:text-left mb-6 lg:mb-0">
        <Typography variant="h3" className="font-bold text-gray-800">
          INTERESTED IN BECOMING THE BBC MEMBER?
        </Typography>
        <Typography variant="lead" className="mt-2 text-gray-600">
          Join us today and be part of a thriving business community.
        </Typography>
      </div>

      {/* Right Side: Button */}
      <Button
        variant="filled"
        color="green"
        size="lg"
        className="relative overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        onClick={() => {
          // Add your button click logic here
          console.log("Contact Us button clicked!");
        }}
      >
        <span className="relative z-10">Contact Us</span>
        {/* Hover Animation Effect */}
        <span className="absolute inset-0 bg-green-600 opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
      </Button>
    </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
