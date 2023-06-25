import SearchBar from "../components/SearchBar";
import SideMenu from "../components/SideMenu";

export default function HomePage() {
  return (
    <div className="bg-[#365b6d] h-screen">
      <SideMenu />
      <div className="p-20">
        <h1 className="text-center mx-auto pt-20 text-5xl font-bold py-8 text-white">GotWhat</h1>
        <SearchBar />
      </div>
    </div>
  );
}
