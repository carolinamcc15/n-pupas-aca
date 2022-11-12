import Navbar from './navbar/navbar';

const Layout = ({ children }) => {
  return (
    <div className='relative min-h-screen'>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
