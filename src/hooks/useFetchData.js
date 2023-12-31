import {useContext, useEffect, useState} from 'react';
import { authContext } from '../context/authContext';
import {toast} from "react-toastify"

const useFetchData = url => {
    const {token} = useContext(authContext)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState(null);
    useEffect(()=>{
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch(url, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                const result = await res.json();
                console.log(result)
                if(!res.ok){
                    throw new Error(result.message)
                }
                setData(result.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message + '😔')
            }
        }
        fetchData();
    },[url])
  return {
    data, error, loading
  }
}

export default useFetchData