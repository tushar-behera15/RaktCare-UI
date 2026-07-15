import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />
      </main>
    </>
  );
}