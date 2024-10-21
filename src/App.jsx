import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { navItems } from "./nav-items";
import UserNav from "./components/UserNav";
import MangaReader from "./pages/MangaReader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
          <header className="bg-card border-b border-border relative z-10">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors flex items-center">
                <img src="/skull.svg" alt="Skull" className="w-8 h-8 mr-2" />
                Manga Reader
              </Link>
              <UserNav />
            </div>
            <img src="/blood-drip.svg" alt="Blood Drip" className="absolute bottom-0 left-0 w-full h-8 object-cover" />
          </header>
          <main className="flex-grow relative">
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
              <Route path="/manga/:id/read/:slug" element={<MangaReader />} />
            </Routes>
            <img src="/shadow-hands.svg" alt="Shadow Hands" className="absolute bottom-0 left-0 w-full h-32 object-cover pointer-events-none" />
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;