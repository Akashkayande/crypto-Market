import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import { BorderWidth } from 'react-icons/bs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({currency}) => {
    const { coinId } = useParams();
    const [chart,setchart]=useState([])
    const [days,setDays]=useState(1)
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-TVRsmGu7aropgfXHLbvrYF52' }
      };
      useEffect(() => {
        const getCoin = async () => {
          try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`, options);
            const data = await res.json();
            console.log(data.prices);
            setchart(data.prices);
          } catch (error) {
            console.error(error);
          } 
        };
    
        getCoin();
      }, [coinId,currency,days]);


    const myData={
        labels:chart.map((value)=>{
            const date=new Date(value[0])
            const time=date.getHours()>12?`${date.getHours() -12}:${date.getMinutes()}PM`:`${date.getHours()}:${date.getMinutes()}AM`
            return days===1? time:date.toLocaleDateString()
        }),
        datasets:[
            {
                label:`price in past days${days} in ${currency}`,
                data:chart.map((value)=>value[1]),
                borderColor:'orange',
                // BorderWidth:'3'
            }
        ]
    }
  return (
    <>
        <Line data={myData} options={{
          elements:{
            point:{
              radius:1,
            }
          }
        }} style={{marginTop:"5rem",width:"auto", padding:"10px"}}/>

        <div className="btn" style={{marginTop:"30px"}}>
          <button onClick={()=>setDays(1)}>24 hours</button>
          <button onClick={()=>setDays(30)}>1 month</button>
          <button onClick={()=>setDays(365)}>1 year</button>
        </div>
    </>
  )
}

export default CoinChart



