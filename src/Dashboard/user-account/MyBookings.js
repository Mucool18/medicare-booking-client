import React from 'react'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import Loading from '../../components/loader/Loading';
import Error from '../../components/Error/Error';
import DoctorCard from '../../components/Doctors/DoctorCard';

const MyBookings = () => {
  const  {data: appointments, loading, error} = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);
  return (
    <div>
      {loading && ! error && <Loading />}
      {error && !loading && <Error errMessage={error}/>}
      {!error && !loading && (<div className="grid grid-cols-1 gap-5">
          {appointments.map((doctor)=>(
            <DoctorCard key={doctor._id} doctor={doctor}/>
          ))}
      </div>)}
      {!error && !loading && appointments.length === 0 && <h2 className="mt-5 text-center text-primaryColor leading-7 text-[20px] font-semobold">You did not book any doctor </h2>}
    </div>
  )
}

export default MyBookings