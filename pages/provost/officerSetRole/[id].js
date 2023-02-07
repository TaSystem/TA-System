import React, { useEffect, useState } from "react";
import Axios from "../../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { connect } from "react-redux";
import { getDetailNisit } from "../../../redux/actions/nisitAction"; 

const RequestTAs = (props) => {

  const [user, setUser] = useState([]);
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [level, setLevel] = useState(null);
  const [major, setMajor] = useState(null);
  const [tel, setTel] = useState(null);
  const [roleID, setRoleID] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error,setError] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  const [session, loading] = useSession();

  useEffect(() => {
    if(props.user && props.user.length != 0){
      setName(props.user[0].name)
      setLastname(props.user[0].lastname)
      setLevel(props.user[0].level)
      setMajor(props.user[0].department)
      setTel(props.user[0].tel)
      setRoleID(props.user[0].RID)
    }
    // console.log('id officerSetRole',props.user[0])
    // async function getUser() {
    //   const response = await Axios.get(`/users/${id}`);
    //   setUser(response.data);
    // }
    if (session) {
      props.getDetailNisit(session.user.email)
    }

    async function getRole() {
      const response = await Axios.get(`/users/get-role`);
      setRoles(response.data);
    }
    getRole();
    // getUser();
  }, [loading, props, session]);

  const userUpdate = async (e) => {
    e.preventDefault()

    etSuccess(null);
    setError(null);
    await Axios.put("/users/edit-profile-teacher", {
      userID: id,
      name: name,
      lastname: lastname,
      level: level,
      department: major,
      tel: tel,
      roleID: roleID,
    }).then((res) => {
      // console.log("edit success")
       setSuccess(res.data);
    }).catch(() => {
      // console.log("edit error")
      setError("เเก้ไขข้อมูลไม่สำเร็จ !!");
    });
  };

  // if( props.user == null && props.user.length > 0){
  //   setName(props.user[0].name);
  //   console.log("Check case")
  // }
  // console.log('in ID is ',session)
  return (
    <div className="container">
      <h2>
        {/* อีเมลล์ :{user && user.length != 0 ? user[0].email : "loading..."} */}
        อีเมลล์ : {props.user && props.user.length != 0 ? props.user[0].email : 'loading...'}
      </h2>
      <h3>
        ชื่ออีเมลล์: {props.user && props.user.length != 0 ? props.user[0].name_email : "loading..."}
        {/* {user && user.length != 0 ? user[0].name_email : "loading..."} */}
      </h3>
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
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
              <label className="form-label" htmlFor="form6Example1">
                  ชื่อจริง
                </label>
                <input
                  type="text"
                  id="form6Example1"
                  className="form-control"
                  defaultValue={props.user && props.user.length != 0 ? props.user[0].name:"loading..."}
                  // defaultValue = {props.user[0].name}
                  onChange={(e) => {
                    // console.log('setName ',e.target.value)
                    setName(e.target.value);
                  }}
                />            
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
              <label className="form-label" htmlFor="form6Example2">
                  นามสกุล
                </label>
                <input
                  type="text"
                  id="form6Example2"
                  className="form-control"
                  defaultValue={props.user && props.user.length != 0 ? props.user[0].lastname : "loading..."}
                  // defaultValue={props.user[0].lastname}
                  onChange={(e) => {
                    // console.log('setLastname ',e.target.value)
                    setLastname(e.target.value);
                  }}
                />
                
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example4">
              อาจารย์รับผิดชอบระดับการศึกษา
            </label>
            {/* <input
              type="text"
              id="form6Example4"
              className="form-control"
              defaultValue={props.user && props.user.length != 0 ? props.user[0].level  :"loading..."}
              // defaultValue={props.user[0].level}
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            /> */}
            <select
              className="form-select"
              name="yearSelect"
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            >
              <option value={props.user && props.user.length != 0 ? props.user[0].level: "loading..."} disabled selected hidden>
                {props.user && props.user.length != 0 ? props.user[0].level : "loading..."}
              </option>

              <option value="ปริญญาตรี">
                ปริญญาตรี
              </option>

              <option value="ปริญญาตโท">
                ปริญญาตโท
              </option>

            </select>
            
          </div>

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
              <option value={props.user && props.user.length != 0 ? props.user[0].department : "loading..."} disabled selected hidden>
                {props.user && props.user.length != 0 ? props.user[0].department : "loading..."}
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

          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example4">
              เบอร์โทร
            </label>
            <input
              type="text"
              id="form6Example4"
              className="form-control"
              defaultValue={props.user && props.user.length != 0 ? props.user[0].tel :"loading..."}
              onChange={(e) => {
                setTel(e.target.value);
              }}
            />
            
          </div>

          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form6Example5">
              ตำแหน่ง
            </label>
            <select
              className="form-select"
              name="yearSelect"
              onChange={(e) => {
                setRoleID(e.target.value);
              }}
            >
              <option
                value={props.user && props.user.length != 0 ? props.user[0].title : "loading..."}
                disabled
                selected
                hidden
              >
                {props.user && props.user.length != 0 ? props.user[0].title : 'loading...'}
              </option>

              {roles.map((val, key) => {
                return <option value={val.id} key={key}>{val.title}</option>;
              })}
            </select>
            
          </div>

          {/* <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            onClick={() => window.history.back()}
          >
            ย้อนกลับ
          </button> */}

          <Link href="/provost/officerSetRole" passHref>
            <button className="btn btn-primary btn-block mb-4">ย้อนกลับ</button>
          </Link>

          <button
            type="submit"
            className="btn btn-success btn-block mb-4"
            onClick={userUpdate}
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
};

requestTAs.getInitialProps = async ({query}) => {
  // console.log('query is ',query.id)
  const response = await Axios.get(`/users/${query.id}`);
  // await console.log('response is ',response.data)
  return {
      post: query.id,
      user: response.data
  }
}

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestTAs);