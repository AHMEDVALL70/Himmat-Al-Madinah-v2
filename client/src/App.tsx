import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AdminComparables from "./pages/AdminComparables";

function Router() {
  const githubPagesBase =
    typeof window !== "undefined" && window.location.pathname.startsWith("/Himmat-Al-Madinah-v2")
      ? "/Himmat-Al-Madinah-v2"
      : "";

  const isGithubPagesRoot =
    githubPagesBase !== "" && /^\/Himmat-Al-Madinah-v2\/?$/.test(window.location.pathname);

  if (isGithubPagesRoot) {
    return <Home />;
  }

  return (
    <WouterRouter base={githubPagesBase}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin/comparables" component={AdminComparables} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster theme="dark" /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
