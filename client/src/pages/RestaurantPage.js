import Banner from '../components/banner.jpg'
import {cilLocationPin} from 'react-icons/ci';

const RestaurantPage = () => {
  return (
    <div className="bg-[#365b6d] h-screen">
        <img src={Banner} alt="/" className='w-full '/>
        <div className='font-bold text-white text-7xl py-4 mx-4'>
            <h1>Cafe Carbonara</h1>
        </div>
        <div className='grid grid-cols-3'>
            <div className='col-span-2'>
                <cilLocationPin />
                <h1>location</h1>

            </div>

        </div>
    </div>
  )
}

export default RestaurantPage