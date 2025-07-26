import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from './loader';
import './CoinsDetails.css';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { IoPulseOutline } from 'react-icons/io5';
import CoinChart from './CoinChart';


const CoinsDetails = () => {
  const [coins, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('inr')
  let profit = coins.market_data?.price_change_percentage_24h > 0;


  const { coinId } = useParams();

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-TVRsmGu7aropgfXHLbvrYF52' }
  };
  useEffect(() => {
    const getCoin = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
        const data = await res.json();
        console.log(data);
        setCoin(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCoin();
  }, [coinId]);

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
  return (
    <>
      {loading ? <Loader /> : <>
        <div className="coin-detail" >
          <div className="coin-info" style={{marginTop:"0px",paddingTop:"0px"}}>
            <div className="btns">
              <button onClick={() => setCurrency("usd")}>USD</button>
              <button onClick={() => setCurrency("inr")}>INR</button>
              <button onClick={() => setCurrency("eur")}>EUR</button>
            </div>
            <div className="time">
              {coins.last_updated}
            </div>
            <div className="coin-image">
              <img height={"150px"} src={coins.image.large} alt="" />
            </div>
            <div className="coin-name">
              {coins.name}
            </div>
            <div style={{ color: profit ? "white" : "red" }} className="coin-price">
              {profit ? <BiSolidUpArrow color='white' /> : <BiSolidDownArrow color='red' />}
              {currency_symbol}{coins.market_data.current_price[currency]}

            </div>
            <div className="coin-profit">
              {coins.market_data.price_change_percentage_24h}%
            </div>
            <div className="market-rank">
              <IoPulseOutline color='orange' />
              #{coins.market_cap_rank}
            </div>
            <div className="coin-desc">
              <p>{coins.description.en.split('.')[1]}</p>
            </div>
          </div>
          <div style={{width:"90%", margin:"0 auto"}}>
            <CoinChart currency={currency}/>
          </div>
        </div>


      </>}

    </>
  )
}

export default CoinsDetails