import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import Loader from './loader';
import './Exchanges.css'
// import OurModel from './ourModel';

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([])

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-TVRsmGu7aropgfXHLbvrYF52' }
  };



  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/exchanges', options)

      .then(res => res.json())
      .then(res => setExchanges(res))
      .then(res => console.log(res))

      .catch(err => console.error(err));
      
      setLoading(false)
  }, [])
  return (
    <>
      {loading ? <Loader />
        : <>
          <Header />
          {/* <OurModel/> */}
          {
            exchanges.map((iteam,i)=>{
              return(
                <div key={i} className="ex-cards">
                  <div className="image">
                    <img height={"80px"} src={iteam.image} alt="" />

                  </div>
                  
                  <div className="name">
                    {iteam.name}
                  </div>
                  <div className="price">
                    {iteam.trade_volume_24h_btc.toFixed(0)}
                  </div>
                  <div className="rank">
                    {iteam.trust_score_rank}
                  </div>
                </div>
              )
            })
          }





        </>}

    </>
  )
}


export default Exchanges
