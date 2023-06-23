import Featured from '../../components/featured/Featured'
import Trusted from '../../components/trusted/Trusted'
import './Home.scss'

const Home = () => {
  return (
    <div className='home'>
      <Featured/>
      <Trusted/>
    </div>
  )
}

export default Home