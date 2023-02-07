import React, { useEffect, useState } from "react";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction"; 

const ProfileProvost = (props) => {

  const [user, setUser] = useState([]);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [level, setLevel] = useState(null);
  const [major, setMajor] = useState(null);
  const [tel, setTel] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error,setError] = useState(null);
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
      async function getUser() {
        
        const response = await Axios.post(`/users/profiledetail`, {
          email: session.user.email,
        });
        setUser(response.data);
        setName(response.data[0].name)
        setLastname(response.data[0].lastname)
        setLevel(response.data[0].level)
        setMajor(response.data[0].department)
        setTel(response.data[0].tel)
        //console.log('profileNisit is ',response.data )
      }
      getUser();
    }
  }, [loading, props, session]);

  const userUpdate = async (e) => {
    e.preventDefault()
    setSuccess(null);
    setError(null);
    await Axios.put("/users/edit-profile-teacher", {
      email: session.user.email,
      name: name,
      lastname: lastname,
      level: level,
      department: major,
      tel: tel,
    }).then((res) => {
      //console.log("edit success")
      setSuccess(res.data);
    }).catch(() => {
      //console.log("edit error")
      setError("เเก้ไขข้อมูลไม่สำเร็จ !!");
    });
  };

  // if( props.user == null && props.user.length > 0){
  //   setName(props.user[0].name);
  //   console.log("Check case")
  // }
  //console.log('in ID is ',session)
  return (
    <div className="container">
      <h1>ข้อมูลอาจารย์ {user && user.length != 0 ? user[0].email : "loading..."} </h1>
      {success && (
          <div className="alert alert-success" role="alert">
            {" "}
            {success}{" "}
          </div>
        )}
        {error && (
            <div className="alert alert-danger" role="alert">
              {" "}
              {error}
              {" "}
            </div>
      )}
      <div className="information">
        <form>
          <div className="row mb-4" style={{marginTop:"40px"}}>
            <div className="col col-md-5">
              <div className="form-outline">
              <label className="form-label" htmlFor="form6Example1">
                  ชื่อจริง
                </label>
                <input
                  type="text"
                  id="form6Example1"
                  className="form-control"
                  defaultValue={name}
                  // defaultValue = {props.user[0].name}
                  onChange={(e) => {
                    //console.log('setName ',e.target.value)
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col col-md-5">
              <div className="form-outline">
              <label className="form-label" htmlFor="form6Example2">
                  นามสกุล
                </label>
                <input
                  type="text"
                  id="form6Example2"
                  className="form-control"
                  defaultValue={lastname}
                  // defaultValue={props.user[0].lastname}
                  onChange={(e) => {
                    //console.log('setLastname ',e.target.value)
                    setLastname(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col col-md-2">
            <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example4">
              เบอร์โทร
            </label>
            <input
              type="text"
              id="form6Example4"
              className="form-control"
              defaultValue={tel}
              onChange={(e) => {
                setTel(e.target.value);
              }}
            />
            
          </div>
          </div>
          </div>
          <div className="row mb-4" style={{marginTop:"50px"}}>
          <div className="col col-md-6">    
          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example4">
              อาจารย์รับผิดชอบระดับการศึกษา
            </label>
            <select
              className="form-select"
              name="yearSelect"
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            >
              <option value={level} disabled selected hidden>
                {level}
              </option>

              <option value="ปริญญาตรี">
                ปริญญาตรี
              </option>

              <option value="ปริญญาตโท">
                ปริญญาตโท
              </option>

            </select>
            
          </div>
          </div>
          <div className="col col-md-6">
          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example3">
              ภาควิชา
            </label>
            <select
              className="form-select"
              name="yearSelect"
              onChange={(e) => {
                setMajor(e.target.value);
              }}
            >
              <option value={major} disabled selected hidden>
                {major}
              </option>

              <option value="วิศวกรรมอุตสาหการและระบบ">
                วิศวกรรมอุตสาหการและระบบ(ป.ตรี)
              </option>

              <option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์">
                วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.ตรี)
              </option>

              <option value="วิศวกรรมโยธา">วิศวกรรมโยธา(ป.ตรี)</option>

              <option value="วิศวกรรมเครื่องกลและการออกแบบ">
                วิศวกรรมเครื่องกลและการออกแบบ(ป.ตรี)
              </option>

              <option value="วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์">
                วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์(ป.ตรี)
              </option>

              <option value="วิศวกรรมเครื่องกลและระบบการผลิต">
                วิศวกรรมเครื่องกลและระบบการผลิต(ป.ตรี)
              </option>
              <option value="วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ">
                วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(ป.ตรี)
              </option>
            </select>
            
          </div>
          </div>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            style={{marginTop:"80px",width:"160px"}}
            onClick={userUpdate}
          >
            บันทึก
          </button>
        </form>
        
      </div>
    </div>
  );
};



const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileProvost);