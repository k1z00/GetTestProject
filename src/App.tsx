import AppPage from "./pages/App-page";
import { useAuthStore } from "./shared/store/auth.store";
import { useEffect } from "react";
import { ThemeProvider } from "./components/modules/theme/ui/theme-provider";

function App() {
  const { isLoading, error, checkAuth } = useAuthStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkAuth();
    }
  }, [checkAuth]);

  return (
    <>
      <ThemeProvider>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <AppPage />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      </ThemeProvider>
    </>
  );
}

export default App;
