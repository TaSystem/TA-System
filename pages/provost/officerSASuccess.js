import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import SelectMajor from "../../components/SelectMajor";
import ModalCoursesSA from "../../components/ModalCoursesSA";
import ModalDetailNisit from "../../components/ModalDetailNisit";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";

function officerSASuccess(props) {
  const [users, setUsers] = useState([]);
  const [courses,setCourses] = useState([]);
  const [nameModal,setNameModal] = useState([]);
  const [nisitValue, setNisitValue] = useState([]);
  const [session, loading] = useSession();
  const [search, setSearch] = useState(null);
  const [major, setMajor] = useState("All");

  useEffect(() => {
    async function getUsers() {
      const response = await Axios.get(`/users/users-SA`);
      setUsers(response.data);
    }
    getUsers();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
    }
  }, [loading]);

  function Filter(users) {
    return users.filter((user) => {
      if (major == "All") {
        if (!search) {
          return user;
        } else if (user.name.toLowerCase().includes(search.toLowerCase())) {
          return user;
        } else if (
          user.lastname.toLowerCase().includes(search.toLowerCase())
        ) {
          return user;
        } else if (
          user.idStudent.toLowerCase().includes(search.toLowerCase())
        ) {
          return user;
        }
      } else if (user.department == major) {
        if (!search) {
          return user;
        } else if (user.name.toLowerCase().includes(search.toLowerCase())) {
          return user;
        } else if (
          user.lastname.toLowerCase().includes(search.toLowerCase())
        ) {
          return user;
        } else if (
          user.idStudent.toLowerCase().includes(search.toLowerCase())
        ) {
          return user;
        }
      }
    });
  }
  const showModalCourseSA = async (val) => {
    const response = await Axios.get(`/courses/courses-SA/${val.userID}`);
    setCourses(response.data);
    setNameModal(
      {
        name:val.name,
        lastname:val.lastname,
        workHour:val.sumHour
      });
  };

  const showModalNisit = (val) => {
    setNisitValue({
      CID: val.CID,
      email: val.email,
      name_email: val.name_email,
      name: val.name, 
      lastname: val.lastname,
      idStudent: val.idStudent,
      lvl: val.lvl,
      department: val.department,
      roleTitle: val.roleTitle,
      tel: val.tel,
      nameBank: val.nameBank,
      idBank: val.idBank,
    });
  };

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    console.log("in that case");
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>นิสิตSA(เจ้าหน้าที่)</h1>
      
      <div className="information">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="รหัสวิชา/ชื่อวิชา/อาจารย์"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SelectMajor
            onChange={(e) => {
              setMajor(e.target.value);
            }}
          />
        </div>
        จำนวนนิสิต:{users != null && users.length != 0 ? users.length : 0}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">ชื่อ-สกุล</th>
              <th rowSpan="2">รหัสนิสิต</th>
              <th rowSpan="2">ระดับ</th>
              <th rowSpan="2">สาขาวิชา</th>
              <th rowSpan="2">อีเมลล์</th>
              <th rowSpan="2">เบอร์โทรศัพท์</th>
              
              <th rowSpan="2">จำนวนวิชาที่รับผิดชอบ</th>
            </tr>
          </thead>
          <tbody>
            {Filter(users).map((val, key) => {
              return (
                <tr>
                  <td>{key + 1}</td>
                  <td>
                    {val.name} {val.lastname}
                  </td>
                  <td>
                    <Link href="#">
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#ModalDetailNisit"
                        onClick={() => showModalNisit(val)}
                      >
                        {val.idStudent}
                      </a>
                    </Link>
                    
                    
                  </td>
                  <td>{val.lvl}</td>

                  <td>{val.department}</td>
                  <td>{val.email}</td>
                  <td>{val.tel}</td>
                  <td>
                    <Link href="#">
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#ModalCoursesSA"
                        onClick={() => showModalCourseSA(val)}
                      >
                        {val.count_courses}
                      </a>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        <ModalCoursesSA courses={courses} user={nameModal} />
        <ModalDetailNisit val={nisitValue} />
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

export default connect(mapStateToProps, mapDispatchToProps)(officerSASuccess);
