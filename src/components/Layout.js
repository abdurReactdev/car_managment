import NavbarComponent from "./Navbar";

function Layout({ children }) {
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  );
}

export default Layout;
