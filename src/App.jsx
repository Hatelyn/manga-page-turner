import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { navItems } from "./nav-items";
import UserNav from "./components/UserNav";
import MangaReader from "./pages/MangaReader";
import { Skull } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-horror-900 text-horror-100">
          <header className="bg-horror-800 border-b border-horror-700">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-horror-100 hover:text-horror-300 transition-colors flex items-center">
                <Skull className="mr-2" />
                Horror Manga Reader
              </Link>
              <UserNav />
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
              <Route path="/manga/:id/read/:slug" element={<MangaReader />} />
            </Routes>
          </main>
          <footer className="bg-horror-800 text-horror-100 py-4">
            <div className="container mx-auto px-4 text-center">
              © 2023 Horror Manga Reader. All rights reserved.
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;