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
  { id: 1, title: 'Naruto', image: 'https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg' },
  { id: 2, title: 'One Piece', image: 'https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg' },
  { id: 3, title: 'Attack on Titan', image: 'https://flxt.tmsimg.com/assets/p10701949_b_v8_ah.jpg' },
  { id: 4, title: 'My Hero Academia', image: 'https://m.media-amazon.com/images/M/MV5BNmQzYmE2MGEtZjk4YS00YmVjLWEwZWMtODRkMjc4MTM5N2I3XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg' },
  { id: 5, title: 'Death Note', image: 'https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg' },
  { id: 6, title: 'Fullmetal Alchemist', image: 'https://m.media-amazon.com/images/M/MV5BZmEzN2YzOTItMDI5MS00MGU4LWI1NWQtOTg5ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg' },
  { id: 8, title: 'Bleach', image: 'https://m.media-amazon.com/images/M/MV5BZjE0YjVjODQtZGY2NS00MDcyLThhMDAtZGQwMTZiOWNmNjRiXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg' },
  { id: 9, title: 'Hunter x Hunter', image: 'https://m.media-amazon.com/images/M/MV5BZjNmZDhkN2QtNDYyZC00YzJmLTg0ODUtN2FjNjhhMzE3ZmUxXkEyXkFqcGdeQXVyNjc2NjA5MTU@._V1_FMjpg_UX1000_.jpg' },
  { id: 10, title: 'Demon Slayer', image: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg' },
  { id: 11, title: 'Lionchosis', image: '/cover.png' },
];