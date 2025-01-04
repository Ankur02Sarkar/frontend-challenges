import TrafficLights from "./components/TrafficLights";
import "./styles.css";

export default function App() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <TrafficLights classNme="" />
      <TrafficLights classNme="rotate" />
    </main>
  );
}
