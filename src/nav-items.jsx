import { HomeIcon, BookOpenIcon, UserIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import MangaDetail from "./pages/MangaDetail.jsx";
import MangaReader from "./pages/MangaReader.jsx";
import UserProfile from "./pages/UserProfile.jsx";

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
  {
    title: "Profile",
    to: "/profile",
    icon: <UserIcon className="h-4 w-4" />,
    page: <UserProfile />,
  },
];

export const mangaList = [
  { id: 1, title: 'Naruto', image: '/placeholder.svg' },
  { id: 2, title: 'One Piece', image: '/placeholder.svg' },
  { id: 3, title: 'Attack on Titan', image: '/placeholder.svg' },
  { id: 4, title: 'My Hero Academia', image: '/placeholder.svg' },
  { id: 5, title: 'Death Note', image: '/placeholder.svg' },
  { id: 6, title: 'Fullmetal Alchemist', image: '/placeholder.svg' },
  { id: 7, title: 'Dragon Ball', image: '/placeholder.svg' },
  { id: 8, title: 'Bleach', image: '/placeholder.svg' },
  { id: 9, title: 'Hunter x Hunter', image: '/placeholder.svg' },
  { id: 10, title: 'Demon Slayer', image: '/placeholder.svg' },
];