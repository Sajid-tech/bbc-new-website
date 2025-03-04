import { Home, Profile, SignIn, SignUp} from "@/pages";
import Services from "./pages/services";
import Gallery from "./pages/gallery";
import Contact from "./pages/contact";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "About Us",
    path: "/aboutus",
    element: <Profile />,
  },
  {
    name: "Services",
    path: "/services",
    element: <Services />,
  },
  {
    name: "Gallery",
    path: "/gallery",
    element: <Gallery />,
  },
  {
    name: "Contact Us",
    path: "/contact",
    element: <Contact />,
  },

  // {
  //   name: "Docs",
  //   href: "https://www.material-tailwind.com/docs/react/installation",
  //   target: "_blank",
  //   element: "",
  // },
];

export default routes;
