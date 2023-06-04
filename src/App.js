import React from 'react'
import { useState ,useEffect } from 'react';



export default function App() {
    const [message,setmessage]=useState(null);

  const [value ,setvalue]=useState(null);


  const [previousChats,setpreviousChats]=useState([]);
  const [currenttittle,setcurrenttittle]=useState(null);

  const createNewChat=()=>
  {
    setmessage(null)
    setvalue("")
    setcurrenttittle(null)
  }

  const handleclick=(uniqueTitle)=>

  {
    setcurrenttittle(uniqueTitle);
    setmessage(null)
    setvalue("") 

  }
    const getMessages = async () => {


        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value 
            }),

            headers: {
                "Content-Type": "application/json"

            }
        }
        try {


            const response = await fetch('http://localhost:8000/completions', options)
            const data = await response.json();



            // console.log(data);


            setmessage(data.choices[0].message);


        }
        catch (error) {

            console.log(error);

        }
    }

    console.log(message)
useEffect(()=>
{
    console.log(currenttittle,value,message)
    if(!currenttittle && value && message )
    {
        setcurrenttittle(value)

    }

    if(currenttittle  && value && message)
    {
        setpreviousChats(prevChats =>(
            [...prevChats ,{
         title:currenttittle,
         role:"user",
         content : value
            },
            
            {
                title:currenttittle ,

                role: message.role,
             
                content : message.content
            }
        
        ]
        ))
    }

}, [message,currenttittle])


console.log(previousChats)




const currectChat=previousChats.filter(previousChats=>previousChats.title===currenttittle)

const uniqueTitle= Array.from(new Set(previousChats.map(previousChats=>previousChats.title  )))

console.log(uniqueTitle)

    return (



        <div className="app">

            <section className='side-bar'>

                <button  onClick={createNewChat}>+ New chat</button>

                <ul className='history'>
                   {uniqueTitle?.map((uniqueTitle,index)=><li key={index} onClick={()=>handleclick(uniqueTitle)}>{uniqueTitle}</li>)}

                </ul>
                <nav>
                    <p>Made by Abhishek</p>



                </nav>

            </section>

            <section className='main'>
                {  !currenttittle && <h1>Abhigpt</h1>}

                <ul className='feed'>
{currectChat?.map((chatMessage,index)=>  <li key={index} >
<p  className='role'> {chatMessage.role}</p>
<p> {chatMessage.content }</p>

</li>)}



                </ul>
                <div className='bottom-section'>

                    <div className='input-container'>


                        <input type="text"  value={value} onChange={(e)=>setvalue(e.target.value)} />



                        <div onClick={getMessages} id='submit'>➢</div>
                    </div>

                    <p className='info'>

                        Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 12 Version


                    </p>
                </div>
            </section>

        </div>
    )
}
