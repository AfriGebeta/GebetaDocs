import { defineDocs } from "@farming-labs/docs";
import { fumadocsRenderer } from "@farming-labs/next/fumadocs-renderer";
import { pixelBorder } from "@farming-labs/theme/pixel-border";
import * as RadixIcons from "@radix-ui/react-icons";
import {
  BookOpen,
  Boxes,
  Code,
  Compass,
  Grid3x3,
  Layers,
  Map,
  MapPin,
  Navigation,
  Radio,
  Route,
  ShieldCheck,
  Truck,
  Waypoints,
} from "lucide-react";

// Browsers can't send a body with GET (Map Matching needs one); app/api/playground-proxy turns this back into a GET.
function sendGetBodyAsPost(init: RequestInit): RequestInit {
  if (init.method !== "GET" || !init.body) return init;
  const headers = new Headers(init.headers);
  headers.set("X-HTTP-Method-Override", "GET");
  return { ...init, method: "POST", headers };
}

export default defineDocs({
  entry: "docs",
  docsPath: "",
  theme: pixelBorder(),
  nav: {
    title: "Documentation",
    url: "/",
  },
  github: {
    url: "https://github.com/AfriGebeta/GebetaDocs",
    branch: "dev",
  },
  themeToggle: {
    enabled: true,
    mode: "light-dark",
  },
  ai: {
    enabled: true,
    mode: "floating",
    model: "qwen/qwen3.8-27b",
    baseUrl: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_AI_TOKEN,
    suggestedQuestions: [
      "How do I get started with Gebeta Maps?",
      "How do I geocode an address?",
      "What is the VRP API?",
    ],
  },
  breadcrumb: { enabled: true },
  review: false,
  sidebar: { flat: false },
  ordering: "numeric",
  lastUpdated: { enabled: true, position: "below-title" },
  pageActions: {
    alignment: "right",
    copyMarkdown: { enabled: true },
    openDocs: {
      enabled: true,
      target: "markdown",
      providers: ["chatgpt", "claude", "cursor"],
    },
  },
  apiReference: {
    enabled: true,
    path: "api-playground",
    specUrl: "./public/gebeta-api.openapi.json",
    renderer: fumadocsRenderer({
      proxyUrl: "/api/playground-proxy",
      playground: { fetchOptions: { proxyForwardCookie: false, onRequestInit: sendGetBodyAsPost } },
    }),
  },
  components: { ...RadixIcons },
  icons: {
    book: <BookOpen size={16} />,
    boxes: <Boxes size={16} />,
    code: <Code size={16} />,
    compass: <Compass size={16} />,
    grid: <Grid3x3 size={16} />,
    layers: <Layers size={16} />,
    map: <Map size={16} />,
    pin: <MapPin size={16} />,
    navigation: <Navigation size={16} />,
    radio: <Radio size={16} />,
    route: <Route size={16} />,
    check: <ShieldCheck size={16} />,
    truck: <Truck size={16} />,
    waypoints: <Waypoints size={16} />,
  },
  metadata: {
    titleTemplate: "%s | Gebeta Maps Docs",
    description:
      "Maps, geocoding, routing and optimization APIs for Africa, with SDKs for web and mobile.",
  },
});
