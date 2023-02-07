import React, { useEffect,useState } from "react";
import Axios from "../../../config/Axios";
import Dateformat from "../../../components/DateFormat";
import DatePicker from '../../../components/DatePickers';
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { getDetailNisit } from "../../../redux/actions/nisitAction"; 

const SetDateStop = (props) => {
  
  const [dates,setDate] = useState(null);
  const [titleDay, setTitleDay] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [dateSelect,setDateSelect] = useState([]);
  
  var dateStudyID = dateSelect != null && dateSelect.length != 0 ?dateSelect[0].id:"loading...";
  const router = useRouter();
  const {id} = router.query;
  const [session, loading] = useSession();



  useEffect(() => {

    async function getDate(){
        const response = await Axios.get(`/setdate/date-study/${id}`);
        const responseSelect = await Axios.get(`/setdate/date-select/${id}`);
        setDateSelect(responseSelect.data);
        setDate(response.data);
    }
    getDate(); 
    
  },[id, router]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }
  }, [loading, props, session]);

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

  const del = async (sid,stid) =>{
    await Axios.post(`/setdate/delete-datestop`,{
      SID:sid,
      STID:stid
    })
    .then((response) => {
      setErr(null);
      setSuccess(response.data.message);
      setDate(response.data.data);
    });
  }


  return (
    <div className="container">
      <h2>ตั้งค่าวันหยุด</h2>
      <h3>ปี:{dateSelect&& dateSelect.length != 0 ?dateSelect[0].year:"loading..."}  เทอม:{dateSelect&& dateSelect.length != 0 ?dateSelect[0].term:"loading..."} </h3>
      <h4>วันที่เปิดเรียน: {dateSelect&& dateSelect.length != 0 ?<Dateformat date={dateSelect[0].openDate}/>:"loading..."} วันที่ปิดเรียน: {dateSelect&& dateSelect.length != 0 ?<Dateformat date={dateSelect[0].closeDate}/>:"loading..."}</h4>
      {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}{" "}
            </div>
        )}
      <div className="table-responsive" style={{maxHeight:"65vh",marginTop:"1vh"}}>
      <table className="table table-hover table-borderless" cellSpacing="0" style={{textAlign:"center"}} >
          <thead style={{position:"sticky",top:0,background:"#7a0117",color:"#fff",fontWeight:"400"}}>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">หยุดเนื่องในวัน</th>
              <th rowSpan="2">ตั้งแต่</th>
              <th rowSpan="2">ถึง</th>
              <th rowSpan="2">การกระทำ</th>
              
            </tr>
          </thead>
          <tbody>
            {dates && dates.length != 0 && dates.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1} </td>
                    <td>{val.title}</td>
                    <td>   <Dateformat date={val.startDate}/> </td>
                    <td>   <Dateformat date={val.endDate}/> </td>
                    <td>
                      <button type="button" className="btn btn-danger" onClick={() => {
                        if (window.confirm("ยืนยันการลบวัน " + val.title))
                          del(val.SID,val.STID);
                      }}>ลบ</button>
                    </td>
                    
                  </tr>
                );
              })}
              {dates && !dates.length && <h2 style={{color:"red"}}>ยังไม่มีการเพิ่มวันหยุด</h2> }
          </tbody>
        </table>
        </div>
        <div className="information">
        <form
          className="row gy-2 gx-3 align-items-center"
          encType="multipart/form-data"
        >
          <div className="col-auto">
            <label htmlFor="closeDate" className="form-label">
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

          <div className="col-auto">
            <label htmlFor="startDate" className="form-label">
              ตั้งแต่
            </label>
            
            <DatePicker onChange={(date) => 
                setStartDate(date)
              } date={startDate}/>
            
          </div>
          <div className="col-auto">
            <label htmlFor="endDate" className="form-label">
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

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetDateStop);