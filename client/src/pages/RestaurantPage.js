import PDFViewer from '../components/PDFViewer'
import Banner from '../components/banner.jpg'
import Review1 from '../components/review1.jpg'
import Review2 from '../components/review2.jpg'
import SideMenu from "../components/SideMenu"
import {AiFillEnvironment, AiFillPhone, AiOutlineFieldTime} from 'react-icons/ai';

const RestaurantPage = () => {
  return (
    <div className="bg-[#365b6d] h-full text-white">

        <div>
            <img src={Banner} alt="/" className='w-full '/>
            <SideMenu />
        </div>

        <div className='flex'>
            <h1 className='text-7xl py-4 mx-4 font-bold'>Cafe Carbonara</h1>
            <p className='my-auto text-3xl'>( 4.5 / 5 )</p>
        </div>

        <div className='grid grid-cols-3 grid-rows-2 h-96'>
            <div className='m-2 col-span-1 row-span-2 border rounded'>
                <div className='flex py-1'>
                    <AiFillEnvironment size={40} className='mx-4'/> 
                    <h1 className='my-auto text-lg'>277 ORCHARD ROAD, Robinsons Mall #B1-03</h1>      
                </div>
                <div className='flex py-1'>
                    <AiFillPhone size={40} className='mx-4'/> 
                    <h1 className='my-auto text-lg'>+65 67370482</h1>      
                </div>
                <div className='flex py-1'>
                    <AiOutlineFieldTime size={40} className='mx-4'/>
                    <div>
                        <h1 className='my-auto text-lg'>Mon - Thu 11.15 AM - 09.45PM</h1>
                        <h1 className='my-auto text-lg'>Fri - Sun 11.15 AM - 09.30PM</h1>            
                    </div>  
                </div>
                <div className='text-center my-2'>
                    <h1 className='text-decoration-line: underline mx-auto'>About Us</h1>
                    <p> Thoughtfully detailed interiors, lush surroundings, friendly relaxed service and generous portions have made this homegrown Singapore brand an internationally recognized local favourite. Cafe Carbonara is the place for legendary brunches and lazy afternoon teas, romantic dates and friendly celebrations in beautiful surroundings</p>
                </div>
            </div>

            <div className='col-span-2 row-span-2 rounded'>
                <PDFViewer />
            </div>
        </div>

        <div className='flex'>
            <h3 className='text-4xl my-8 mx-auto font-bold text-decoration-line: underline'>Reviews</h3>
        </div>

        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>

            <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-white text-black'>
                <img src={Review1} alt="/" className='w-40 mx-auto mt-[-3rem] bg-white rounded-lg text-black'/>
                <h2 className='text-2xl font-bold text-center py-8'>Little Jep</h2>
                <p className='text-center text-4xl font-bold'>Best Ham n Cheese Toasties I've eaten!!</p>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8  mt-8'>The crispy seafood basket was too spicy for me...</p>
                    <p className='py-2 border-b mx-8 '>My dad's pesto pasta was so good!</p>
                    <p className='py-2 border-b mx-8 '>I love the hot chocolate :D</p>
                </div>
            </div>   

            <div className='w-full shadow-xl bg-white text-black flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                <img src={Review2} alt="/" className='w-40 mx-auto mt-[-3rem] bg-transparent rounded-lg'/>
                <h2 className='text-2xl font-bold text-center py-8'>Jefferson</h2>
                <p className='text-center text-4xl font-bold'>The carbonara here is great!</p>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8  mt-8'>Would definitely reccomend the crab mee goreng as well</p>
                    <p className='py-2 border-b mx-8 '>The honey lemon soothers are worth a try too!</p>
                    <p className='py-2 mx-8 '>However, one of the staff was really impatient and we did not have the best service...</p>
                </div>
            </div> 
        </div>    

    </div>
  )
}

export default RestaurantPage