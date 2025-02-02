import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../database/dbconfig';

function ChatInterface() {

    const [info, setInfo] = useState({});
    const [active, setActive] = useState(false);
    const [solo, setSolo] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getGroupInfo();
    }, [])

    const getGroupInfo = async () => {
        const docRef = doc(db, "ActiveTrips", user?.email);
        const docSnap = await getDoc(docRef);
        let groupId = "";

        if (docSnap.exists()) {
            if (docSnap.data()?.group == 'Your Active Itinerary is set as a private (solo) travel') {
                setSolo(true);
                return;
            }
            else {
                groupId = docSnap.data()?.group;
            }
        } else {
            setActive(true);
            return;
        }

        const groupRef = doc(db, 'GroupInfo', groupId);

        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
            setInfo(groupSnap.data());
        }
    }

    return (
        <div>
            {
                (active)
                    ? <>Please first make an itinerary active</>
                    :
                    (solo)
                        ? <>Your Active Itinerary is set as a private (solo) travel</>
                        : <div className='font-baloo height w-full grid grid-cols-5 grid-rows-5 gap-8 p-8'>

                            <div className='col-span-3 row-span-5 rounded-xl border-[2px] border-neutral-600 bg-white'>
                                
                            </div>


                            <div className='h-full col-span-2 rounded-xl border-[2px] border-neutral-600 bg-white'>

                            </div>




                            <div className='h-full col-span-2 rounded-xl border-[2px] border-neutral-600 bg-white'>

                            </div>



                            <div className='col-span-2 row-span-3 rounded-xl border-[2px] border-neutral-600 bg-white'>

                            </div>

                        </div>
            }
        </div>
    )
}

export default ChatInterface