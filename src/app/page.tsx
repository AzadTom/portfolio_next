import NavigationWrapper from "@/components/NavigationDrawer/NavigationWrapper";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <NavigationWrapper />
      </div>
      <div
        className="absolute left-[16px] sm:left-[20px] md:left-[70px] right-[16px] sm:right-[20px] md:right-[70px] top-0 h-[650px] md:h-[600px] rounded-b-[50px]"
        style={{
          background:
            "radial-gradient(98.87% 98.87% at 51.11% 1.13%, rgba(0, 0, 0, 0) 0%, #000000 45.31%, #6A01D3 76.56%, #8F00FF 86.46%, #C883FF 100%)",
        }}
      />
    </main>
  );
}
