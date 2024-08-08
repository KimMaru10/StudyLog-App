import Image from "next/image";
import CardList from "./components/CardList";
import Header from "./components/layouts/Header";
export default function Home() {
  return (
    <main>
      <Header />
      <CardList />
    </main>
  );
}
