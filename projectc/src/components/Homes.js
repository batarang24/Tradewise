import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import Coursecard from "./Coursecard"
import { db } from "../firebase"
import { useEffect, useState } from "react"
import { async } from "@firebase/util"

function Home()
{
   
    const [objs,sobj]=useState([])
    const docRef = collection(db, "courses")
    

    useEffect(()=>{
       const func= async()=>{
           const hello=await getDocs(docRef)
           hello.forEach((ele)=>{
            const object={
                'name':ele.get('name'),
                'author':ele.get('author')
            }
            sobj('')
            sobj(old=>[...old,object])
            console.log(objs)
           })
           
        }
        func()
    })
    
    return(
        <div>
            <div>
                
            </div>
            <div>
                <h1>Featured Courses</h1>
               <div style={{display:'flex',justifyContent:'space-around'}}>
                    {
                        objs.map((val)=><Coursecard name={val.name} />)
                    }
               </div>
            </div>
        </div>
    )
}
export default Home