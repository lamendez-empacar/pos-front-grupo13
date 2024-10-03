import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "bo.com.empacar.base",
  appName: "base-front",
  webDir: "dist",
  server: {
    cleartext: true,
    androidScheme: "https",
    allowNavigation: ["localhost", "https://jsonplaceholder.typicode.com"],
  },
};

export default config;
