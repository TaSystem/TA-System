import React, { useEffect,useState } from "react";
import Axios from "../../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
const requestTAs = () => {
  
  const [number1,setNumber1] = useState(0);
  const [number2,setNumber2] = useState(0);
  const [note,setNote] = useState(null);
  const [success,setSuccess] = useState(null);
  const [error,setError] = useState(null);

  const [course,setCourse] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  const [session, loading] = useSession();

  useEffect(() => {
  
    async function getCourse(){
        const response = await Axios.get(`/courses/request/${id}`);
        setCourse(response.data);
        
    }
    getCourse(); 
    
  },[router]);

  const applyTA = async () =>{
    let total = parseInt(number1 ) + parseInt(number2);
    console.log("total: ",total);
    console.log("numberTA: ",course[0].numberTA);
    setSuccess(null);
    setError(null);
    if(total <= course[0].numberTA){
      await Axios.post("/apply/teacher-apply", {
      email:session.user.email ,
      
      courseID: id,
      number1:number1,
      number2:number2,
      status: 1,
      noteapply:note
    }).then((res) => {
      if(res.data.check){
        setSuccess(res.data.message);
      }
      else{
        setError(res.data.message);
      }
    });
    }
    else{
      setError("ขอได้ไม่เกิน "+course[0].numberTA+" คน");
    }
  }

  const sec = (D,P)=>{
    if (P && D) {
      const sec = D + "," + P;
      return sec;
    } else if (P) return P;
    else if (D) return D;
  }


  return (
    <div className="container">
      <div className="information">
        <h3>ชื่อวิชา:{course != null && course.length != 0 ? course[0].title : "loading..."}  </h3>
        <div className="row align-items-center">
          <div class="col">
            <h4>รหัสวิชา: {course != null && course.length != 0 ? course[0].courseID : "loading..."} </h4>
          </div>
          <div class="col">
            <h4>หมู่เรียน: {course != null && course.length != 0 ? sec(course[0].sec_D,course[0].sec_P) : "loading..."} </h4>
          </div>
        </div>
        <div className="row align-items-center">
          <div class="col">
            <h4>สาขาวิชา: {course != null && course.length != 0 ? course[0].major : "loading..."} </h4>
          </div>
          <div class="col">
            <h4>จำนวนที่ขอได้ : {course != null && course.length != 0 ? course[0].numberTA : "loading..."} คน</h4>
          </div>
        </div>
        {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}
              {" "}
            </div>
      )}
      {error && (
            <div className="alert alert-danger" role="alert">
              {" "}
              {error}
              {" "}
            </div>
      )}
        <div className="row align-items-center">
          <div class="col">
            <input className="form-control" type="text"  placeholder="จำนวนนิสิตปริญญาตรี"  onChange={(e) => {setNumber1(e.target.value);}} />
          </div>
          <div class="col">
            <input className="form-control" type="text"  placeholder="จำนวนนิสิตปริญญาโท" onChange={(e) => {setNumber2(e.target.value);}} />
          </div>
          <div class="col">
            <input className="form-control" type="text" placeholder="โน้ต" onChange={(e) => {setNote(e.target.value);}}/>
          </div>
        </div>
        {course != null && course.length != 0 ? <button  type="button" className="btn btn-success" onClick={applyTA}> ส่งคำร้อง </button>: "loading..."}
        
      </div>
          
        
                
    </div>
  );
}
export default requestTAs;