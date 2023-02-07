import React from "react";
import Image from "next/image";
// import pwit from "../../Image/pwit.png";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { AtmSharp } from "@material-ui/icons";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setBankNisit ,getDetailNisit} from "../../redux/actions/nisitAction";

import pwit from "../../img/pwit.png";
import Redirect from '../../components/Redirect'

function AddBank(props) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  // const [id, setId] = useState();
  // const [name, setName] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [idStudent, setIdStudent] = useState("");
  // const [level, setLevel] = useState("");
  // const [department, setDepartment] = useState("");
  // const [tel, setTel] = useState("");

  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/secret");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
        // console.log("in useEffect");
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading, props, session]);

  //   useEffect(() => {
  //     console.log("in useEffect level", level);
  //     console.log("in useEffect major", department);

  //   }, [level,department]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      id: props.nisit.result[0].userID,
      name: name,
      lastname: lastname,
      idStudent: idStudent,
      level: level,
      department: department,
      tel: tel,
    };
    // console.log("handleSubmit ", user);
    props.setRegisterNisit(user);
  };

  if(session){
    var domain = String(session.user.email).substring(
    String(session.user.email).lastIndexOf("@") + 1
  );
    if(!domain.includes("ku.th")){
      return router.push('/provost')
    }
    
  }
  
  if (typeof window !== "undefined" && loading) return null;

  
  if (!session) {
    // console.log("in that case");
    return (
      <div>
        <h2>You aren&apos;t signed in, please sign in first</h2>
      </div>
    );
  }
  return (
    <form>
      <div className="container" style={{padding:"0 10vw"}}>
          <h1>กรอกข้อมูลธนาคาร</h1>
        <div className="row" style={{marginTop:"40px"}}>
            <label htmlFor="bankName">ธนาคาร</label>
            <select className="form-control custom-select" id="bankName">
              <option selected>เลือกธนาคาร</option>
              <option>ธนาคารกรุงเทพ</option>
              <option>ธนาคารกสิกรไทย</option>
              <option>ธนาคารทหารไทยธนชาต</option>
              <option>ธนาคารไทยพาณิชย์</option>
              <option>ธนาคารออมสิน</option>
            </select>
        </div>
        <div className="row" style={{marginTop:"60px"}}>
            <label htmlFor="bankNumber">เลขที่บัญชี</label>
            <input type="text" className="form-control" id="bankNumber" />
        </div>
        <div className="row" style={{marginTop:"60px"}}>
          <div className="col">
            <p >บัตรนิสิต(ยังไม่หมดอายุ)</p>
            <input id="stucard" type="file" className="file" />
          </div>
          <div className="col">
            <p>หน้าสมุดบัญชี</p>
            <input id="bankPic" type="file" className="file" />
          </div>
        </div>
      <div style={{marginTop:"80px"}}>
        <button className="btn btn-success" style={{width:"160px"}}>ยืนยัน</button>
      </div>
      </div>
    </form>

  
  );
}

// const mapStateToProps = (state) => ({
//   nisit: state.nisit,
// });

// const mapDispathToProps = {
//   setBankNisit: setBankNisit,
// };

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
  setBankNisit: setBankNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBank);
