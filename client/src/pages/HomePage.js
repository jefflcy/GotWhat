import SearchBar from "../components/SearchBar";
import SideMenu from "../components/SideMenu";

export default function HomePage() {
  return (
    <>
      <SideMenu />
      <div className="pt-10 px-5">
        <h1 className="text-center text-5xl font-bold py-8">GotWhat</h1>
        <SearchBar />
      </div>
    </>
  );
}
