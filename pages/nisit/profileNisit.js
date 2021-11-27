import React, { useEffect, useState, useRef } from "react";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import SelectMajor from "../../components/SelectMajor";
import SelectNameBank from "../../components/SelectNameBank";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import Link from "next/link";

const profileNisit = (props) => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [idStudent, setIdstudent] = useState(null);
  const [tel, setTel] = useState(null);
  const [level, setLevel] = useState(null);
  const [department, setDepartment] = useState(null);
  const [nameBank, setNameBank] = useState(null);
  const [idBank, setIdBank] = useState(null);
  const [branch, setBranch] = useState(null);
  const [fileCardStudent, setFileCardStudent] = useState(null);
  const path ="../../backend/uploads/img/";
  const [fileBookBank, setFileBookBank] = useState(null);
  const inputRef = useRef();
  

  const [load, setLoad] = useState(false);

  
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
      async function getUser() {
        setLoad(true);
        const response = await Axios.post(`/users/profiledetail`, {
          email: session.user.email,
        });
        setUser(response.data);
        setLoad(false);
        setName(response.data[0].name)
        setLastname(response.data[0].lastname)
        setIdstudent(response.data[0].idStudent)
        setTel(response.data[0].tel)
        setLevel(response.data[0].level)
        setDepartment(response.data[0].department)
        setNameBank(response.data[0].nameBank)
        setIdBank(response.data[0].idBank)
        setBranch(response.data[0].Branch)
        setFileCardStudent(path+response.data[0].fileCardStudent)
        setFileBookBank(response.data[0].fileBookBank)
        console.log("fileCardStudent: ",path+response.data[0].fileCardStudent)
        // console.log('profileNisit is ',response.data )
      }
      getUser();
    }
    
  }, [loading]);

  

//   const showFileCardStudent = ()=>{
//       if(load){

//       }else if(){

//       }
//       else{

//       }
//   }

  return (
    <form>
    <div class="container">
      <h1>
        {" "}
        ข้อมูลผู้ใช้ {user && user.length != 0 ? user[0].email : "loading..."}
      </h1>
      <h2>
        ข้อมูลนิสิต
        {/* {user && user.length != 0
          ? user[0].name_email
          : "loading..."}
        {user && user.length != 0 ? user[0].name_email : "loading..."} */}
      </h2>
      <div class="information">
        
          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <input
                  type="text"
                  id="form6Example1"
                  name="name"
                  class="form-control"
                  defaultValue={
                    // user.length != 0 ? user[0].name : "loading..."
                    name
                  }
                  // defaultValue = {user[0].name}
                  onChange={(e) => {
                    // console.log("setName ", e.target.value);
                    setName(e.target.value);
                  }}
                />
                <label class="form-label" for="form6Example1">
                  ชื่อจริง
                </label>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <input
                  type="text"
                  name="lastname"
                  id="form6Example2"
                  class="form-control"
                  defaultValue={
                    // user && user.length != 0 ? user[0].lastname : "loading..."
                    lastname
                  }
                  // defaultValue={user[0].lastname}
                  onChange={(e) => {
                    // console.log("setLastname ", e.target.value);
                    setLastname(e.target.value);
                  }}
                />
                <label class="form-label" for="form6Example2">
                  นามสกุล
                </label>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <input
                  type="text"
                  name="idStudent"
                  id="form6Example1"
                  class="form-control"
                  defaultValue={
                    // user && user.length != 0 ? user[0].idStudent : "loading..."
                    idStudent
                  }
                  // defaultValue = {user[0].name}
                  onChange={(e) => {
                    // console.log("setName ", e.target.value);
                    setIdstudent(e.target.value);
                  }}
                />
                <label class="form-label" for="form6Example1">
                  รหัสนิสิต
                </label>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <input
                  type="text"
                  name="tel"
                  id="form6Example4"
                  class="form-control"
                  defaultValue={
                    // user && user.length != 0 ? user[0].tel : "loading..."
                    tel
                  }
                  onChange={(e) => {
                    setTel(e.target.value);
                  }}
                />
                <label class="form-label" for="form6Example4">
                  เบอร์โทร
                </label>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <select
                  class="form-select"
                  name="level"
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                >
                  <option
                    value={
                      // user && user.length != 0 ? user[0].level : "loading..."
                      level
                    }
                    disabled
                    selected
                    hidden
                  >
                    {user && user.length != 0 ? user[0].level : "loading..."}
                  </option>

                  <option value="ปริญญาตรี">ปริญญาตรี</option>

                  <option value="ปริญญาโท">ปริญญาโท</option>
                </select>
                <label class="form-label" >
                  ระดับการศึกษา
                </label>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <select
                  class="form-select"
                  name="major"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                >
                  <option
                    value={
                      // user && user.length != 0
                      //   ? user[0].department
                      //   : "loading..."
                      department
                    }
                    disabled
                    selected
                    hidden
                  >
                    {/* {user && user.length != 0
                      ? user[0].department
                      : "loading..."} */}
                      {department}
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
                <label class="form-label" >
                  ภาควิชา
                </label>
              </div>
            </div>
          </div>

          <h2>ข้อมูลบัญชีธนาคาร</h2>

          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <SelectNameBank
                  nameBank={
                    // user && user.length != 0 ? user[0].nameBank : "loading..."
                    nameBank
                  }
                  onChange={(e) => {
                    setNameBank(e.target.value);
                  }}
                />
                <label class="form-label" >
                  ชื่อธนาคาร
                </label>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <input
                  type="text"
                  name="idBank"
                  id="form6Example7"
                  class="form-control"
                  defaultValue={
                    // user && user.length != 0 ? user[0].idBank : "loading..."
                    idBank
                  }
                  
                  onChange={(e) => {
                    setIdBank(e.target.value);
                  }}
                />
                <label class="form-label" for="form6Example7">
                  เลขที่บัญชี
                </label>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <input
                  type="text"
                  name="branch"
                  id="form6Example8"
                  class="form-control"
                  defaultValue={
                    // user && user.length != 0 ? user[0].Branch : "loading..."
                    branch
                  }
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                />
                <label class="form-label" for="form6Example8">
                  สาขาธนาคาร
                </label>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-outline">
                <input
                  type="file"
                  id="form6Example9"
                  class="form-control"
                  // defaultValue={
                  //   user && user.length != 0 ?`../../backend/uploads/img/${user[0]?.fileCardStudent}`: "loading..."
                  // }
                  defaultValue={fileCardStudent}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label class="form-label" for="form6Example9">
                  รูปบัตรนิสิตที่ยังไม่หมดอายุ
                </label>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <input
                  type="file"
                  id="form6Example10"
                  class="form-control"
                //   defaultValue={
                //     user && user.length != 0 ? `../../img/timer.png` : "loading..."
                //   }
                  // ref={inputRef}
                  
                  onChange={(e) => {
                    setTel(e.target.value);
                  }}
                />
                <label class="form-label" for="form6Example10">
                  รูปสมุดบัญชีธนาคาร
                </label>
              </div>
            </div>
          </div>

          

          <button type="button" class="btn btn-success btn-block mb-4" onClick={()=>console.log(fileCardStudent)}>
            บันทึก
          </button>
        
      </div>
    </div>
    </form>
  );
};


// profileNisit.getInitialProps = async ({query}) => {
//   console.log('query is ',query.id)
//   const response = await Axios.get(`/users/${query.id}`);
//   await console.log('response is ',response.data)
//   return {
//       post: query.id,
//       user: response.data
//   }
// }

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(profileNisit);
