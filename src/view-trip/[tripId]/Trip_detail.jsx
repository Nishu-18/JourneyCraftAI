import { db } from '../../database/dbconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../components/InfoSection';
import Itinerary from '../components/Itinerary';

function Trip_detail() {
    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && get_tripdata();
    },[tripId]);

    const get_tripdata = async()=> {
        const docRef = doc(db, 'AiTrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            alert("No such data found! Please try again");
        }
    }

  return (
    <div className='py-8 px-40'>
        
        <InfoSection trip_data={trip}/>
        
        <Itinerary trip_data={trip}/>

    </div>
  )
}

export default Trip_detail