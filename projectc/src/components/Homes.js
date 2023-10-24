import { Firestore, addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import Coursecard from "./Coursecard"
import { app, db, storage } from "../firebase"
import { useEffect, useState } from "react"
import readme from './readme.txt' 
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { ref, uploadBytesResumable } from "firebase/storage"



function Home()
{
    const [modal, setModal] = useState(false);
    const [objs,sobj]=useState([])
    const docRef = collection(db, "courses")
    const [cname,setcname]=useState('')
    const [cauthor,setcauthor]=useState('')
    const [cprice,setcprice]=useState('')

   const savefunc=async()=>{

       
       
        const hello=await addDoc(docRef,
            {
                'name':cname,
                'author':cauthor,
                'price':cprice
            }
        ).then(()=>{

        })
        setModal(false)
    }
    useEffect(()=>{
       
       const func= async()=>{
           const hello=await getDocs(docRef)
           sobj([])
           hello.forEach((ele)=>{
            const object={
                'name':ele.get('name'),
                'author':ele.get('author'),
                'price':ele.get('price'),
                'id':ele.id,
                'videos':[]
            }
            console.log(objs)
           
            sobj(old=>[...old,object])
            
           
           })
           
        }
        func()
    })
    
    return(
        <div>
            <div>
                
            </div>
            <div>
                <button onClick={()=>{
                    setModal(old=>!old)
                }} >Create a new course</button>
                <h1>Featured Courses</h1>
               <div style={{display:'flex',justifyContent:'space-around'}}>
                    {
                        objs.map((val)=><Coursecard name={val.name} id={val.id}/>)
                    }
               </div>
            </div>
            <PureModal
        header="Create a new course"
        footer={
            <div>
            <button >Cancel</button>
            <button onClick={(e)=>savefunc(e)}>Save</button>
            </div>
        }
        isOpen={modal}
        //closeButton="close"
        closeButtonPosition="bottom"
        onClose={() => {
            setModal(false);
            return true;
        }}
        >
        <input placeholder='Course name' onChange={(e)=>{setcname(e.target.value)}}/>
        <input placeholder='Author name' onChange={(e)=>{setcauthor(e.target.value)}}/>
        <input placeholder='Course price' onChange={(e)=>{setcprice(e.target.value)}}/>
        </PureModal>
        </div>
    )
}
export default Home