import { useNavigate } from "react-router-dom";
function Coursecard(props)
{
    const navigate=useNavigate()
    return(
        <div onClick={
            ()=>{
                navigate(`/view-course/${props.id}`)
            }
        } style={{width:'200px',height:'200px',backgroundColor:'yellow'}}>
            {props.name}
        </div>
    )
}
export default Coursecard