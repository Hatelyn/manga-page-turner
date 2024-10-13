import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { navItems } from "./nav-items";
import UserNav from "./components/UserNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#f5e6d3]">
          <header className="bg-[#8c6d4f] border-b border-[#6b5744]">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-[#f5e6d3] hover:text-[#e8d5b5] transition-colors">Manga Reader</Link>
              <UserNav />
            </div>
          </header>
          <main className="flex-grow">
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;