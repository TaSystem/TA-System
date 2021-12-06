import React, { useEffect,useState } from "react";
import Axios from "../../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../../redux/actions/nisitAction"; 


const requestTAs = (props) => {
  
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

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  const hourTA =(d,p)=>{
    if(d&&p) return 5
    else if(d && !p)  return 2
    else if(p && !d)  return 3
  }
  const showSec = (sec_P) => {
    let arraySec = sec_P?.split("_");
    return arraySec?.map((val, index) => {
      if (arraySec.length == index + 1) {
        return <>{val}</>;
      } else {
        return <>{val},</>;
      }
    });
  };

  const applyTA = async (hr) =>{
    let total = parseInt(number1?number1:0) + parseInt(number2?number2:0);
    console.log("total: ",total);
    // console.log("numberTA: ",course[0].numberTA);
    setSuccess(null);
    setError(null);
    if(total <= course[0].numberTA){
      await Axios.post("/apply/teacher-apply", {
      email:session.user.email ,
      courseID: id,
      number1:number1?number1:0,
      number2:number2?number2:0,
      hrperweek:hr,
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
            <h4>หมู่เรียน: {course != null && course.length != 0 ? course[0].sec_D : "loading..."}
            {course != null && course.length != 0 && course[0].sec_D && course[0].sec_P ?",":""}
            {course != null && course.length != 0 ? showSec(course[0].sec_P) : "loading..."}
             </h4>
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
            <input className="form-control" type="number"  placeholder="จำนวนนิสิตปริญญาตรี"  onChange={(e) => {setNumber1(e.target.value);}} />
          </div>
          <div class="col">
            <input className="form-control" type="number"  placeholder="จำนวนนิสิตปริญญาโท" onChange={(e) => {setNumber2(e.target.value);}} />
          </div>
          <div class="col">
            <input className="form-control" type="text" placeholder="โน้ต" onChange={(e) => {setNote(e.target.value);}}/>
          </div>
        </div>
        {course != null && course.length != 0 ? <button  type="button" className="btn btn-success" onClick={()=>applyTA(hourTA(course[0].sec_D,course[0].sec_P))}> ส่งคำร้อง </button>: "loading..."}
        
      </div>
          
        
                
    </div>
  );
}

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(requestTAs);