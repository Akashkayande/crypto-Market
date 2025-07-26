import React from 'react'
import { useState, useEffect } from 'react';
import Loader from './loader';
import Header from './Header';
import { Link } from 'react-router-dom';
import './res.css'

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([])
  const [currency,setCurrency]=useState('inr')
  const [search,setSearch]=useState("")

  let currency_symbol="₹"
  if(currency==="inr"){
    currency_symbol="₹"
  }
  if(currency==="eur"){
    currency_symbol="€"
  }
  if(currency==="usd"){
    currency_symbol="$"
  }
  
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-TVRsmGu7aropgfXHLbvrYF52' }
  };
  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setCoins(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [currency])

  return (
    <>
      {loading ? <Loader /> : <>
        <Header />
        <div className="search-bar">
          <input type="text" placeholder='search your coins'  value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div className="btns">
          <button onClick={()=>setCurrency("usd")}>USD</button>
          <button onClick={()=>setCurrency("inr")}>INR</button>
          <button onClick={()=>setCurrency("eur")}>EUR</button>
        </div>
        {
          coins.filter((data)=>{
            if(data==""){
              return data
            }else if(data.name.toLowerCase().includes(search.toLowerCase())){
              return data
            }
          }).map((iteam, i) => {
            return (
              <div key={i} className="ex-cards">
                <div className="image">
                  <img height={"80px"} src={iteam.image} alt="" />

                </div>
                <div className="name">
                  <Link to={`/coins/${iteam.id}`} style={{color:'white', textDecoration:"none"}}>{iteam.name}</Link>
                  
                </div>
                <div className="price">
                  {currency_symbol}{iteam.current_price.toFixed(0)}
                </div>
                <div className="rank" style={{color: iteam.price_change_percentage_24h > 0 ? 'white' : 'red'}}>
                  {iteam.price_change_percentage_24h>0 ?"+" +iteam.price_change_percentage_24h.toFixed(2):iteam.price_change_percentage_24h.toFixed(2)}
                </div>
              </div>
            )
          })
        }
      </>
      }
    </>
  )
}
            

export default Coins