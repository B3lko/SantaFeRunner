import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.SantaFeRunner.app',
  appName: 'SantaFeRunner',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
