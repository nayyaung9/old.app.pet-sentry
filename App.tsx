import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./src/navigation";

// Loaders
import useLocation from "~/hooks/useLocation";
import useCachedResources from "~/hooks/useCachedResources";

export default function App() {
  const { location } = useLocation();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
