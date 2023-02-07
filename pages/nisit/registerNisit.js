import React from "react";
import Image from "next/image";
import pwit from "../../img/pwit.png";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { AtmSharp } from "@material-ui/icons";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setRegisterNisit ,getDetailNisit } from "../../redux/actions/nisitAction";

function RegisterNisit(props) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  // const [path, setPath] = useState(0)
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [idStudent, setIdStudent] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [tel, setTel] = useState("");
  const router = useRouter()

  useEffect(() => {
    // console.log("in useEffect level", level);
    // console.log("in useEffect major", department);

  }, [level,department]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading, props, session]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      id: props.nisit.userID,
      name: name,
      lastname: lastname,
      idStudent: idStudent,
      level: level,
      department: department,
      tel: tel,
    };
    // console.log("handleSubmit ", user);
    props.setRegisterNisit(user)
  };

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    // console.log("in that case");
    return (
      <div>
        <h2>You aren&apos;t signed in, please sign in first</h2>
      </div>
    );
  }
  // console.log('register Nisit ', props)

  return (
    <form>
      <div className="container" style={{padding:"0 4vw"}}>
          <h1>กรอกข้อมูลนิสิต</h1>
      <div className="row" style={{marginTop:"40px"}}>
      <div className="col col-md-1">
            <label htmlFor="sex">คำนำหน้า</label>
            <select className="form-control custom-select" id="sex">
              <option selected>เลือก</option>
              <option>นาย</option>
              <option>นาง</option>
              <option>นางสาว</option>
            </select>
        </div>
        <div className="col col-md-4">
            <label htmlFor="firstName">ชื่อ</label>
            <input type="text" className="form-control" id="firstName" />
        </div>
        <div className="col col-md-5">
            <label htmlFor="lastName">นามสกุล</label>
            <input type="text" className="form-control" id="lastName" />
        </div>
      </div>
      <div className="row" style={{marginTop:"50px"}}>
        <div className="col col-md-5">
            <label htmlFor="stuid">รหัสนิสิต</label>
            <input type="text" className="form-control" id="stuid" />
        </div>
        <div className="col col-md-5">
            <label htmlFor="tel">เบอร์โทรศัพท์</label>
            <input type="text" className="form-control" id="tel"/>
        </div>
      </div>
      <div className="row" style={{marginTop:"50px"}}>
        <div className="col col-md-5">
            <label htmlFor="degree">ระดับการศึกษา</label>
            <select className="form-control custom-select" id="degree">
              <option selected>เลือกระดับการศึกษา</option>
              <option>ปริญญาตรี</option>
              <option>ปริญญาโท</option>
            </select>
        </div>
        <div className="col col-md-5">
            <label htmlFor="major">ภาควิชา</label>
            <select className="form-control custom-select" id="major">
              <option selected>เลือกภาควิชา</option>
              <option>วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์</option>
              <option>วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ</option>
              <option>วิศวกรรมอุตสาหการและระบบ</option>
              <option>วิศวกรรมเครื่องกลและการออกแบบ</option>
              <option>วิศวกรรมเครื่องกลและระบบการผลิต</option>
              <option>วิศวกรรมโยธา</option>
              <option>วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์</option>
            </select>
        </div>
      </div>
      <div style={{marginTop:"80px"}}>
        <button className="btn btn-success" style={{width:"160px"}}>ยืนยัน</button>
      </div>
        {/* <figure>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </figure>
        <figure >
          <h3>นามสกุล</h3>
        </figure>
        <figure >
          <input
            type="text"
            id="surname"
            name="surname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </figure>
        <figure >
          <h3 >รหัสนิสิต</h3>
        </figure>
        <figure >
          <input
            type="text"
            id="stuID"
            name="stuID"
            onChange={(e) => setIdStudent(e.target.value)}
          />
        </figure>
        <figure >
          <h3>เบอร์โทรศัพท์</h3>
        </figure>
        <figure >
          <input
           
            type="text"
            id="tel"
            name="tel"
            onChange={(e) => setTel(e.target.value)}
          />
        </figure>

        <figure >
          <h3>ระดับการศึกษา</h3>
        </figure>

        {/* <figure className={`${styles.col8__item} ${styles.col8__item12}`}>
          <input
            className={styles.registerInput}
            type="text"
            id="knowledge"
            name="knowledge"
            onChange={(e) => setLevel(e.target.value)}
          />
        </figure> */}
        {/* {console.log(level)}
        <figure >
          <div> */}
            {/* <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="k0"
                value="1"
                name="knowledge"
                checked="checked"
                onChange={(e) => setLevel(e.target.value)}
              />
              <p className={styles.selectBox__inputText}>เลือกระดับการศึกษา</p>
            </div> */}
            {/* <div>
              <input
                type="radio"
                id="k1"
                value="ปริญญาตรี"
                name="knowledge"
                // checked="checked"
                onChange={(e) => setLevel(e.target.value)}
              />
              <p >ปริญญาตรี</p>
            </div>
            <div >
              <input
                type="radio"
                id="k2"
                value="ปริญญาโท"
                name="knowledge"
                // checked="checked"
                onChange={(e) => setLevel(e.target.value)}
              />
              <p >ปริญญาโท</p>
            </div>
            <img
              src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
              alt="Arrow Icon"
              aria-hidden="true"
            />
          </div>
          <ul>
            <li>
              <label
                for="k1"
                aria-hidden="aria-hidden"
              >
                ปริญญาตรี
              </label>
            </li>
            <li>
              <label
                for="k2"
                aria-hidden="aria-hidden"
              >
                ปริญญาโท
              </label>
            </li>
          </ul>
        </figure>

        <figure>
          <h3>ภาควิชา</h3>
        </figure> */}
        {/* <figure className={`${styles.col8__item} ${styles.col8__item14}`}>
          <input
            className={styles.registerInput}
            type="text"
            id="major"
            name="major"
            onChange={(e) => setDepartment(e.target.value)}
          />
        </figure> */}

        {/* <figure >
          <div> */}
            {/* <div class={styles.selectBox__value}>
              <input
                class={styles.selectBox__input}
                type="radio"
                id="m0"
                value="1"
                name="major"
                checked="checked"
              />
              <p class={styles.selectBox__inputText}>เลือกภาคการศึกษา</p>
            </div> */}
            {/* <div >
              <input
               
                type="radio"
                id="m1"
                value="คอมพิวเตอร์"
                name="major"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <p >คอมพิวเตอร์</p>
            </div>
            <div >
              <input
                type="radio"
                id="m2"
                value="อุต"
                name="major"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <p >อุต</p>
            </div>
            <img
              
              src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
              alt="Arrow Icon"
              aria-hidden="true"
            />
          </div>
          <ul >
            <li>
              <label
                
                for="m1"
                aria-hidden="aria-hidden"
              >
                คอมพิวเตอร์
              </label>
            </li>
            <li>
              <label
                
                for="m2"
                aria-hidden="aria-hidden"
              >
                อุต
              </label>
            </li>
          </ul>
        </figure>

        <figure >
          <button
            
            type="submit"
            id="submit"
            onClick={()=>{if (window.confirm('บันทึกข้อมูล'))handleSubmit}}
          >
            ต่อไป
          </button>
        </figure> */}
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps  = {
  setRegisterNisit: setRegisterNisit,
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps )(RegisterNisit);
