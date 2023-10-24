import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase"           
import { FieldValue, doc, getDoc, setDoc, updateDoc,arrayUnion } from "firebase/firestore";
import { useParams } from "react-router";

function CourseView(props)
{
    
    let {id} = useParams();
    const [downs,sdown]=useState()
    const [files,sfile]=useState([])
    const [videos,setvideos]=useState([])
    const docref=doc(db,'courses',id)
   useEffect(()=>{
        const a=async()=>{
            const document1=await getDoc(docref)
            console.log(videos)
            setvideos(document1.get('videos')?document1.get('videos'):[])
        }
        a()
       
    }) 
    const savefunc=async()=>{
        console.log(files[0])
      
        
        const document1=await getDoc(docref)
        const cname=document1.get('name')
       

        for (let index = 0; index < files.length; index++) {
            const storageref=ref(storage,`courses/${cname}/${files[index]['name']}`)
            const uploadTask =await uploadBytesResumable(storageref,files[index])
            const down=await getDownloadURL(uploadTask.ref).then(val=>{
                const documents= updateDoc(docref,{ 
                    'videos':arrayUnion({
                        'name':files[index]['name'],
                        'url':val
                    })
                })
            })
           
        }
        sfile([])
    }
    return(
        <div>
             <div>
                    <input type="file" multiple onChange={(e)=>{
                       sfile(e.target.files)
                       //console.log(file)
                    }} />
                    <button onClick={savefunc}>
                        Upload!
                    </button>
                    <div>
                        {
                            videos.map((val)=><div>
                                <a href={val.url}>{val.name}</a>
                            </div>)
                        }
                    </div>
                </div>
        </div>
    )
}
export default CourseView