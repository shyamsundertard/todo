import Navbar from './Navbar'
import "../styles/Layout.css"

const Layout = ({ children }) => {
  return (
    <div className='lrafyfobudvt'>
      <div className='navbar-dshbd'>
      <Navbar />
      <div className='division'>
      </div>
      </div>
      <div className='mainPageContainer'>{children}</div>
      
    </div>
  )
}

export default Layout