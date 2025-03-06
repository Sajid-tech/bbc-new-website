import { Avatar, Typography, Button, Card, CardBody } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer, PageTitle } from "@/widgets/layout";
import { Link } from "react-router-dom";
import { TeamSlider } from "@/widgets/cards";
import { useEffect, useState } from "react";
import axios from "axios";

export function Profile() {
  const [teamData, setTeamData] = useState([]);
  const [error, setError] = useState(null);
     const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://businessboosters.club/public/api/getUser");
        if (response.data && response.data.profile) {
          const mappedData = response.data.profile.map((user) => ({
            img: user.image
              ? `http://businessboosters.club/public/images/user_images/${user.image}`
              : "http://businessboosters.club/public/images/user_images/no_images.png", 
            name: user.name || "Unknown",
            position: user.company_short || "Member",
          }));
          setTeamData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      }finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <>
      {/* About Us Section */}
      <section className="mt-32 flex flex-wrap items-center">
        <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full text-center shadow-lg">
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
            The small and medium business persons are slowly and surely suffering and loosing out. In such a scenario the need was to fight back with these giants collectively hence the thought of forming a decent and family type businesses group came to Mr.Bhupendra Kotwal ,Mr.Umesh Tulsiyan and Mr.Narendra Gehlot who took the lead and started consulting and convincing business friends who not only joined the mission but supported the idea.Purpose of the group is simple. Give and take referrals for business to boost business of each other. Give the best services and rates with priority to the referral business. This will make the group and its members popular and finally winning from the digital competition.
          </Typography>
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
      </section>

      {/* Labels Section */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Label 1: 100+ Unique Business */}
            <div className="bg-white border-l-4 border-blue-500 shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Typography variant="h2" className="text-4xl font-bold text-blue-500">
                100+
              </Typography>
              <Typography variant="h5" className="mt-2 text-xl font-semibold text-gray-800">
                Unique Business
              </Typography>
              <Typography className="mt-2 text-gray-600">
                We collaborate with a diverse range of businesses.
              </Typography>
            </div>

            {/* Label 2: 150+ Trusted Members */}
            <div className="bg-white border-l-4 border-green-500 shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Typography variant="h2" className="text-4xl font-bold text-green-500">
                150+
              </Typography>
              <Typography variant="h5" className="mt-2 text-xl font-semibold text-gray-800">
                Trusted Members
              </Typography>
              <Typography className="mt-2 text-gray-600">
                Our community is built on trust and collaboration.
              </Typography>
            </div>

            {/* Label 3: 5+ Successful Years */}
            <div className="bg-white border-l-4 border-orange-500 shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Typography variant="h2" className="text-4xl font-bold text-orange-500">
                5+
              </Typography>
              <Typography variant="h5" className="mt-2 text-xl font-semibold text-gray-800">
                Successful Years
              </Typography>
              <Typography className="mt-2 text-gray-600">
                Years of experience driving business success.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Our Director Section */}
      <section className="px-4 pt-20 pb-5">
        <PageTitle section="" heading="Our Director" />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img
                alt="Director Image"
                src="/director/1.png"
                className="h-24 w-24 mx-auto rounded-full border-4 border-white transition-all duration-300 hover:border-indigo-500"
              />
              <p className="mt-4 text-xl font-semibold text-gray-800">BHUPENDRA KOTWAL</p>
              <span className="text-gray-600">President</span>
            </div>

            {/* Card 2 */}
            <div className="bg-white border shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img
                alt="Director Image"
                src="/director/2.png"
                className="h-24 w-24 mx-auto rounded-full border-4 border-white transition-all duration-300 hover:border-indigo-500"
              />
              <p className="mt-4 text-xl font-semibold text-gray-800">NARENDAR GEHLOT</p>
              <span className="text-gray-600">Secretary</span>
            </div>

            {/* Card 3 */}
            <div className="bg-white border shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <img
                alt="Director Image"
                src="/director/3.png"
                className="h-24 w-24 mx-auto rounded-full border-4 border-white transition-all duration-300 hover:border-indigo-500"
              />
              <p className="mt-4 text-xl font-semibold text-gray-800">UMESH TULSYAN</p>
              <span className="text-gray-600">Treasurer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Members Section */}
      <section className="px-4 pt-20 pb-5 bg-gray-50">
        <div className="container mx-auto">
          <PageTitle section="" heading="Our Members">
            The Trusted Partner You Can Have Faith In, Together we can do amazing things.
          </PageTitle>
          <div className="mt-24">
            {error && <div className="text-red-500">{error}</div>}
            <TeamSlider teamData={teamData} loading={loading}  />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Profile;