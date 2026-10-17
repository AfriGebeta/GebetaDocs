import type { Metadata } from "next";
import { Playground } from "./playground";

export const metadata: Metadata = {
  title: "Map playground",
  description: "Send real requests to the Gebeta Maps API and see the results on a live map.",
};

export default function MapPlaygroundPage() {
  return <Playground />;
}
