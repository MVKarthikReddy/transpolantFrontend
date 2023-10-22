import { useState } from 'react'
import axios from 'axios';
import './App.css'
import {FcSpeaker} from 'react-icons/fc'

export default function App() {


  const [keyword, setKeyword] = useState('');
  const [productInfo, setProductInfo] = useState(null);

  const handleSubmit = async () => {
    
  try{
  const response = await  axios.post(`http://localhost:5000/`,{
    keyword,
    
  })
    if(response.data.results[0]==null && response.data.results[1]==null)
    {
      alert("No such item availabe")
      return
    }
    else{
      if(response.data.results[0]==null){
        setProductInfo(response.data.results[1])
      }
      else{
        setProductInfo(response.data.results[0])
      }
    }
    
  }catch(error){
    console.log(error)
  }
}

const handleClick = () => {
  const text = `The price of ${productInfo.title} provided by ${productInfo.source} is ₹${productInfo.price.split('₹')[1]}`
  const value = new SpeechSynthesisUtterance(text)
  window.speechSynthesis.speak(value)
}

  return (
    <>
      <div className='container'>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword"
        />
        <button onClick={handleSubmit}>Submit</button>
        {productInfo && (
          <div className='productInfo'>
            <p>The price of {productInfo.title} provide by {productInfo.source} is ₹{productInfo.price.split('₹')[1]}</p>
            <img src={productInfo.thumbnail} alt="can't access image"/>
            <FcSpeaker className='t2s' onClick={() => {handleClick()}}
            />
          </div>
        )}
      </div>

    </>
  )
}

