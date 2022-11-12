import Navbar from './navbar/navbar';

const Layout = ({ children }) => {
  return (
    <div className='relative min-h-screen flex flex-col'>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
