import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";

function officerDate(props) {

  const [dates,setDate] = useState([]);
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    async function getDates() {
      const response = await Axios.get("/setdate");
      setDate(response.data);
    }
    getDates();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  const edit = (id) => {
    return router.push(`/provost/editProfile/${id}`);
  };


  
  return (
    <div className="container">
      
      <div className="table-responsive">
      <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">ปีการศึกษา</th>
              <th rowSpan="2">ภาคเรียน</th>
              <th rowSpan="2">วันที่เปิดเรียน</th>
              <th rowSpan="2">วันสุดท้ายของการเรียน</th>
              <th rowSpan="2">การกระทำ</th>
              
            </tr>
          </thead>
          <tbody>
            {dates.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{val.year}</td>
                    <td>{val.term}</td>
                    <td>{val.openDate} </td>
                    <td>{val.closeDate}</td>
                    <td>
                      <button type="button" className="btn btn-primary" onClick={()=>edit(val.UID)} >แก้ไข</button>
                      <button type="button" className="btn btn-danger">ลบ</button>
                    </td>
                    
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button type="button" className="btn btn-success">เพิ่มบุลลากร</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(officerDate);

