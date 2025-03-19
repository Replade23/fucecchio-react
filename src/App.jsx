import './index.css'
import Carousel from './component/carousel'
import Footer from './component/Footer'
import Logo from './assets/FèL_Logo.png'

function App() {

  return (
    <div className="flex flex-col h-screen relative">
      {/* Contenitore del logo con bordo rosso per debug */}
      <div className="absolute top-0 left-0 bg-white p-4 z-50 rounded-br-4xl">
        <img src={Logo} alt="Logo del sito" className="h-23" />
      </div>
      <Carousel />
      <Footer />
    </div>
  )
}

export default App
