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
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <header className="bg-horror-500 border-b border-horror-300 relative overflow-hidden">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center relative z-10">
              <Link to="/" className="text-2xl font-bold text-horror-100 hover:text-horror-200 transition-colors">Manga Reader</Link>
              <UserNav />
            </div>
            <div className="blood-drip"></div>
            <div className="blood-drip"></div>
            <div className="blood-drip"></div>
            <div className="blood-drip"></div>
            <div className="blood-drip"></div>
          </header>
          <main className="flex-grow">
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
              <Route path="/manga/:id/read/:slug" element={<MangaReader />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;