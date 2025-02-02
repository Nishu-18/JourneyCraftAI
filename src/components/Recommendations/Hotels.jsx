import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function Hotels() {

  const hotel = [
    {
      "name": "The Ritz-Carlton New York, Central Park",
      "description": "Luxury hotel with stunning Central Park views, offering exceptional service, fine dining, and elegant rooms.",
      "approx_rating": 4.8,
      "address": "50 Central Park South, New York, NY 10019"
    },
    {
      "name": "The Peninsula New York",
      "description": "Sophisticated hotel known for its impeccable service, spacious rooms, and a prime location near Fifth Avenue.",
      "approx_rating": 4.7,
      "address": "700 Fifth Avenue, New York, NY 10019"
    },
    {
      "name": "Four Seasons Hotel New York Downtown",
      "description": "Modern luxury hotel in Downtown Manhattan with breathtaking city views and a focus on contemporary design.",
      "approx_rating": 4.6,
      "address": "27 Barclay St, New York, NY 10007"
    },
    {
      "name": "The St. Regis New York",
      "description": "Historic luxury hotel in Midtown Manhattan, famed for its elegance, butler service, and iconic location.",
      "approx_rating": 4.6,
      "address": "2 East 55th Street, New York, NY 10022"
    },
    {
      "name": "The Pierre, A Taj Hotel",
      "description": "Grand hotel on Fifth Avenue offering luxurious accommodations, exceptional dining, and breathtaking Central Park views.",
      "approx_rating": 4.5,
      "address": "79th Street and 5th Avenue, New York, NY 10021"
    },
    {
      "name": "Mandarin Oriental, New York",
      "description": "Stylish hotel with panoramic city views, sophisticated restaurants, and a spa, located in Columbus Circle.",
      "approx_rating": 4.5,
      "address": "80 Columbus Circle, New York, NY 10023"
    }
  ]

  const active = (item)=>{
    localStorage.setItem('hotel', JSON.stringify(item));
  }

  return (
    <div className='font-baloo py-8 px-32'>
      <p className='text-center text-3xl font-bold mb-8'>Hotel Recommendations</p>

      <div className='grid grid-cols-2 gap-8 w-full'>
        {hotel.map((item, index) => {
          return <div key={index} className='font-baloo border-[2px] border-neutral-900 rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-black bg-white'>

            <img
              src={'/sample.jpg'}
              className='h-[140px] w-[140px] rounded-xl '
            />
            <div>
              <p className='font-bold text-lg'>{item?.name}</p>
              <p className='text-sm text-neutral-500 font-medium'>{item?.description}</p>
              <p className='text-sm text-neutral-500 font-medium'>⭐ {item?.approx_rating}/5</p>
              <p className='py-1 px-3 bg-neutral-200 rounded-full w-fit font-medium mt-2 text-xs border border-neutral-900'>📍 {item?.address}</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger className='py-1 px-2 border-[2px] border-green-700 rounded-lg h-fit font-medium hover:bg-green-700 hover:shadow-[0px_0px_9px_black] hover:text-white transition-all duration-200 bg-green-100 text-neutral-900 font-baloo'>
                Book
              </AlertDialogTrigger>
              <AlertDialogContent className='bg-green-50'>

                <AlertDialogHeader className='font-baloo'>
                  <AlertDialogTitle>Alert!</AlertDialogTitle>
                  <AlertDialogDescription className='text-neutral-900 text-[16px]'>
                  It is a prototype and we donot allow anyone to make booking or any kind of transactions. If you want to demonstrate the working on the prototype, you can just set this hotel as active for your trip.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className='font-baloo'>
                  <AlertDialogCancel className='border-[2px]'>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => active(item)}>Set Active</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>

        })}
      </div>
    </div>
  )
}

export default Hotels