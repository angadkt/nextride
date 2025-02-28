"use client";

import Image from 'next/image';
import Aprilia from '../../../public/icons/aprilia.png'
import Bmw from '../../../public/icons/bmw.png'
import Triumph from '../../../public/icons/triumph.png'
import Yamaha from '../../../public/icons/yamaha.png'
import Kawasaki from '../../../public/icons/kawasaki.png'
import Ktm from '../../../public/icons/ktm.png'
import Suzuki from '../../../public/icons/suzuki.png'
import Honda from '../../../public/icons/honda.png'
import Hero from '../../../public/icons/hero.png'
import Royal from '../../../public/icons/royalenfield.png'
import Harley from '../../../public/icons/harley-davidson.png'
import Tvs from '../../../public/icons/tvs.png'
import Bajaj from '../../../public/icons/bajaj.png'
import Mahindra from '../../../public/icons/mahindra.png'


export default function Companies() {
  
    interface MenuItem {
        name: string;
        link: any;
    }

  const brands : MenuItem[] = [
    { name: "Royal Enfield", link: Royal},
    { name: "Tvs", link: Tvs },
    { name: "Hero", link: Hero },
    { name: "Honda", link: Honda },
    { name: "Kawasaki", link: Kawasaki },
    { name: "Yamaha", link: Yamaha },
    { name: "Ktm", link: Ktm },
    { name: "Suzuki", link: Suzuki },
    { name: "Bajaj", link: Bajaj },
    { name: "Mahindra", link: Mahindra },
    { name: "Harley Davidson", link: Harley },
    { name: "Truimp", link: Triumph },
    { name: "Bmw", link: Bmw },
    { name: "Aprilia", link: Aprilia },
   
    
  ];
  return (
    <div className="bg-white w-full min-h-screen md:px-[112px] px-10 py-28 ">
      <div className="bg-white  w-full h-full flex flex-col gap-3">
        <div>
          <p className="text-3xl font-fontJosefin">Brands we do,</p>
        </div>
        <div className=" w-full h-full flex flex-wrap gap-[47px]   justify-center items-center">
        {
            brands.map((brand, index)=>(
                <div key={index} className="w-60 h-60  rounded-md   flex justify-center items-center shadow-lg border transition-transform duration-500 hover:scale-110 hover:shadow-xl hover:rotate-3   ">
                   <div className='flex flex-col justify-center items-center '>
                   <Image width={100} height={10} src={brand.link} alt='load' />
                   {/* <p>{brand.name}</p> */}
                   </div>
                </div>
            ))
        }
        </div>
      </div>
    </div>
  );
}
