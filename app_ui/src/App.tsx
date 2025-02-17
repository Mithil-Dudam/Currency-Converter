import { useState } from 'react'
import api from './api'
import './App.css'

function App() {
  const [convertFrom, setConvertFrom] = useState<string>("")
  const [convertTo, setConvertTo] = useState<string>("")
  const [amount,setAmount] = useState<number>(0)
  const [convertedAmount,setConvertedAmount]=useState<number>(0)
  const [convertedOutput,setConvertedOutput] = useState<string>("")
  const [error,setError] = useState<string|null>(null)

  const Convert = async () => {
    setError(null)
    try{
      const response = await api.post("/convert",{convert_from:convertFrom,convert_to:convertTo,amount:amount})
      if(response.status === 200){
        setConvertedAmount(response.data.amount)
        setConvertedOutput(convertTo  )
      }
    }catch(error:any){
      console.error(error)
      if(error.response){
        setError(error.response.data.detail)
      }else{
        setError("Error: Couldnt convert")
      }
    }
  }

  const Reset = () => {
    setConvertedAmount(0)
    setConvertedOutput("")
  }

  return (
    <div className='bg-green-200 min-w-screen min-h-screen'>
      <h1 className='text-center pt-10 text-6xl'><span className='border-3 bg-amber-200 px-5 rounded-lg pb-2'>Currency Converter</span></h1>
      <div className='mt-15 px-5'>
        <p className='bg-red-950 text-white pl-5 text-2xl'>Convert From :</p>
        <div className='flex justify-between'>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertFrom === "INR" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="INR" onClick={()=>setConvertFrom("INR")}>INR</button>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertFrom === "AED" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="AED" onClick={()=>setConvertFrom("AED")}>AED</button>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertFrom === "USD" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="USD" onClick={()=>setConvertFrom("USD")}>USD</button>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertFrom === "EUR" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="EUR" onClick={()=>setConvertFrom("EUR")}>EUR</button>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertFrom === "CAD" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="CAD" onClick={()=>setConvertFrom("CAD")}>CAD</button>
        </div>
      </div>
      <div className='mt-10 px-5'>
        <p className='bg-red-950 text-white pl-5 text-2xl'>Convert To :</p>
        <div className='flex justify-between'>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertTo === "INR" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="INR" onClick={()=>setConvertTo("INR")}>INR</button>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertTo === "AED" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="AED" onClick={()=>setConvertTo("AED")}>AED</button>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertTo === "USD" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="USD" onClick={()=>setConvertTo("USD")}>USD</button>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertTo === "EUR" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="EUR" onClick={()=>setConvertTo("EUR")}>EUR</button>
          <button className={`w-full border cursor-pointer py-1 font-semibold ${convertTo === "CAD" ?"bg-amber-200 border-3":"bg-teal-400" }`} value="CAD" onClick={()=>setConvertTo("CAD")}>CAD</button>
        </div>
      </div>
      {convertedAmount ? 
      (<div>
        <div className='mt-10 px-5'>
        <p className='text-center py-1 bg-red-950 text-white pl-5 text-2xl'>Converted Amount : {convertedAmount} {convertedOutput}</p>
        </div>
        <div className='mt-10 px-5 flex justify-center'>
          <button className='border-2 font-semibold p-1 cursor-pointer text-lg rounded bg-amber-200' onClick={Reset}>Go Back</button>
        </div>
      </div>):
      (<div>
        <div className='mt-10 px-5'>
          <p className='bg-red-950 text-white pl-5 text-2xl'>Enter Amount :</p>
          <div className='bg-teal-400 py-1 font-semibold px-1'>
            <input type='number' step="any" className='border-2 rounded px-1 w-full' onChange={(e)=>setAmount(Number(e.currentTarget.value))}/>
          </div>
        </div>
        <div className='mt-10 px-5 flex justify-center'>
          <button className='border-2 font-semibold p-1 cursor-pointer text-lg rounded bg-amber-200' onClick={Convert}>Convert</button>
        </div>
      </div>)}
    </div>
  )
}

export default App
