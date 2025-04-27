
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.cf97fff61acb45089c97d7ac0e40e07e',
  appName: 'crumb-and-co-ionic',
  webDir: 'dist',
  server: {
    url: 'https://cf97fff6-1acb-4508-9c97-d7ac0e40e07e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#F5F5DC",
      showSpinner: true,
      spinnerColor: "#002366"
    }
  }
};

export default config;
