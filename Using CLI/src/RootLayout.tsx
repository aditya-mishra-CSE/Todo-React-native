
import { ThemeProvider } from './hooks/useTheme';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { NavigationContainer } from '@react-navigation/native';
import TabsLayout from './tabs/TabsLayout';
import { CONVEX_URL } from '@env';

const convex = new ConvexReactClient(CONVEX_URL, { unsavedChangesWarning: false });

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <NavigationContainer>
          <TabsLayout />
        </NavigationContainer>
      </ThemeProvider>
    </ConvexProvider>
  );
}
