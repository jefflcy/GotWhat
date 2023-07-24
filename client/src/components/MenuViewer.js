const MenuViewer = ({ menu }) => {
  return (
    <div>
      <iframe
        src={menu}
        className="h-screen md:h-screen md:w-[800px]"
        title="Menu PDF Viewer"
      />
    </div>
  );
};

export default MenuViewer;
