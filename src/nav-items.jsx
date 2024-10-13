import { HomeIcon, BookOpenIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import MangaDetail from "./pages/MangaDetail.jsx";
import MangaReader from "./pages/MangaReader.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Manga Detail",
    to: "/manga/:id",
    icon: <BookOpenIcon className="h-4 w-4" />,
    page: <MangaDetail />,
  },
  {
    title: "Manga Reader",
    to: "/manga/:id/read",
    icon: <BookOpenIcon className="h-4 w-4" />,
    page: <MangaReader />,
  },
];