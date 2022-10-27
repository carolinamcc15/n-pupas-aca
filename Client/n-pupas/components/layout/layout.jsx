import Footer from './footer';
import Navbar from './navbar/navbar';

const Layout = ({ children }) => {
  return (
    <div className='relative pb-24 min-h-screen'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
