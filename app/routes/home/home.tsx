import type { Route } from "./+types/home";
import home from "./home.module.css";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Home!" },
  ];
}

export default function Home() {
  return <div className={home.home}>Home</div>;
}
