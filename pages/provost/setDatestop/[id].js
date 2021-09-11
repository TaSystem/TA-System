import React, { useEffect,useState } from "react";
import Axios from "../../../config/Axios";
import Dateformat from "../../../components/DateFormat";
import DatePicker from '../../../components/DatePickers';
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const setDatestop = () => {
  
  

  const [dates,setDate] = useState(null);
  const [titleDay, setTitleDay] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  var year = dates != null && dates.length != 0 ?dates[0].year:"loading...";
  var term = dates != null && dates.length != 0 ?dates[0].term:"loading...";
  var dateStudyID = dates != null && dates.length != 0 ?dates[0].SID:"loading...";
  const router = useRouter();
  const {id} = router.query;
  const [session, loading] = useSession();



  useEffect(() => {
  
    async function getDate(){
        const response = await Axios.get(`/setdate/${id}`);
        setDate(response.data);
        
    }
    getDate(); 
    
  },[router]);

  const setDateStop = async () => {
    if (!titleDay) {
      setErr("กรุณากรอกหัวข้อวันหยุด");
    } else if (!startDate) {
      setErr("กรุณาเลือกวันที่เริ่มหยุด");
    } else if (!endDate) {
      setErr("วันกรุณาเลือกสุดท้ายที่หยุด");
    } else {
      await Axios.post("/setdate/setDateStop", {
        title: titleDay,
        startDate: startDate,
        endDate: endDate,
        dateStudyID:dateStudyID
      }).then((response) => {
        setErr(null);
        setDate(response.data.data);
        setSuccess(response.data.message);
      });
    }
  };


  return (
    <div className="container">
      <h2>ตั้งค่าวันหยุด</h2>
      <h3>ปี:{year}  เทอม:{term} </h3>
      <div className="table-responsive">
      {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}{" "}
            </div>
          )}
      <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">หยุดเนื่องในวัน</th>
              <th rowSpan="2">ตั้งแต่</th>
              <th rowSpan="2">ถึง</th>
              <th rowSpan="2">การกระทำ</th>
              
            </tr>
          </thead>
          <tbody>
            {dates != null && dates.length != 0 ? dates.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1} </td>
                    <td>{val.title}</td>
                    <td>   <Dateformat date={val.startDate}/> </td>
                    <td>   <Dateformat date={val.endDate}/> </td>
                    <td>
                      <button type="button" className="btn btn-primary" >แก้ไข</button>
                      <button type="button" className="btn btn-danger">ลบ</button>
                    </td>
                    
                  </tr>
                );
              }):"loading..."}
          </tbody>
        </table>
        </div>
        <div class="information">
        <form
          class="row gy-2 gx-3 align-items-center"
          encType="multipart/form-data"
        >
          <div class="col-auto">
            <label for="closeDate" class="form-label">
              หัวข้อวันหยุด
            </label>
            <input
              type="text"
              className="form-control"
              name="year"
              placeholder="หยุดเนื่องในวัน"
              onChange={(e) => {
                setTitleDay(e.target.value);
              }}
            />
          </div>

          <div class="col-auto">
            <label for="startDate" class="form-label">
              ตั้งแต่
            </label>
            
            <DatePicker onChange={(date) => 
                setStartDate(date)
              } date={startDate}/>
            
          </div>
          <div class="col-auto">
            <label for="endDate" class="form-label">
              ถึง
            </label>
            <DatePicker onChange={(date) => 
                setEndDate(date)
              } date={endDate}/>
          </div>

          <div className="col-auto">
            <button
              type="button"
              className="btn btn-success"
              onClick={setDateStop}
            >
              บันทึก
            </button>
          </div>

          {err && (
            <div className="alert alert-danger" role="alert">
              {" "}
              {err}{" "}
            </div>
          )}

        </form>
      
        
      </div>
      
    </div>
  
  );
}
export default setDatestop;