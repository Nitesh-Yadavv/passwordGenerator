import { useEffect, useState ,useCallback , useRef} from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length ,setLength] = useState("8")
  const [number ,setNumber] = useState(false)
  const [charcter ,setCharcter] = useState(false)

  const passwordgen = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIGKLMNOPQRSTUUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number){
      str+="1234567890"
    }
    if(charcter){
      str+="~!@#$%^&*(){},.[]_-"
    }

    for(let i=1 ; i<=length ; i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,number,charcter,setPassword]
  )

const passwordRef = useRef(null)
const copyPassword = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password)
  alert("Password Copied")
}, [password])

useEffect(()=>{passwordgen()},[length,number,charcter])


  return (
    <>
    <div className="w-full h-screen bg-black flex justify-center items-center px-4">
      <div className="w-full max-w-xl h-40 bg-gray-600 rounded-lg p-4 text-white flex flex-col justify-between">
        <div className="flex items-center space-x-4">
          <input
          type="text"
          placeholder={password}
          readOnly
          ref={passwordRef}
          className="bg-gray-800 rounded-lg h-10 px-4 text-white flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button onClick={copyPassword} className="bg-blue-500 text-white px-4 h-10 rounded-lg">Copy</button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <label htmlFor="length">Length: {length}</label>
            <input
              type="range" 
              min={6} 
              max={30} 
              value={length}
              onChange={(e)=>setLength(e.target.value)}
              className="w-32" 
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-1">
              <input type="checkbox" checked={number} onChange={()=>setNumber(!number)} />
              <span>Number</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="checkbox" checked={charcter} onChange={()=>setCharcter(!charcter)}/>
              <span>Character</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default App
