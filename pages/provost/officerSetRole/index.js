import React, { useState, useEffect } from "react";
import Axios from "../../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../../redux/actions/nisitAction";

function officerSetRole(props) {
  const [userList, setUserList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [department, setDepartment] = useState(null);
  const [tel, setTel] = useState(null);
  const [roleID, setRoleID] = useState(null);
  const [search, setSearch] = useState(null);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    async function getUsers() {
      const response = await Axios.get("/users");
      setUserList(response.data);
    }
    async function getRole() {
      const response = await Axios.get(`/users/get-role`);
      setRoles(response.data);
    }
    getRole();
    getUsers();
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
    }
  }, [loading]);

  function Filter(userList) {
    return userList?.filter((user) => {
      if (!search) {
        return user;
      } else if (user.name?.toLowerCase().includes(search.toLowerCase())) {
        return user;
      } else if (user.lastname?.toLowerCase().includes(search.toLowerCase())) {
        return user;
      } else if (user.email?.toLowerCase().includes(search.toLowerCase())) {
        return user;
      } else if (
        user.department?.toLowerCase().includes(search.toLowerCase())
      ) {
        return user;
      }
    });
  }

  const edit = (id) => {
    return router.push(`/provost/officerSetRole/${id}`);
  };

  const del = async (email) => {
    setErr(null);
    setSuccess(null);
    await Axios.delete(`/users/delete/${email}`).then((response) => {
      setSuccess(response.data);
      setUserList(
        userList.filter((val) => {
          return val.email !== email;
        })
      );
    });
  };

  const setRole = async () => {
    // console.log(email);
    await Axios.post("/users/set-role", {
      email: email,
      name: name,
      lastname: lastname,
      department: department,
      tel: tel,
      roleID: roleID,
    }).then((res) => {
        setSuccess(res.data.message);
        setUserList(res.data.data);
      
    });
  };

  // console.log("in INdex is ", session);

  return (
    <div className="container">
      <h2>บุคลากร</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="ชื่อ-นามสกุล/อีเมลล์/ตำแหน่ง/สาขา"
        onChange={(e) => setSearch(e.target.value)}
      />
      จำนวนบุคลากร:{" "}
      {userList != null && userList.length != 0 ? Filter(userList).length : 0} คน
      {success && (
        <div className="alert alert-success" role="alert">
          {" "}
          {success}{" "}
        </div>
      )}
      {err && (
            <div className="alert alert-danger" role="alert">
              {" "}
              {err}
              {" "}
            </div>
      )}
      <div
        className="table-responsive"
        style={{ maxHeight: "70vh", maxWidth: "80vw", marginTop: "1vh" }}
      >
        <table
          className="table table-hover table-bordered"
          cellspacing="0"
          style={{ textAlign: "center" }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              background: "#7a0117",
              color: "#fff",
              fontWeight: "400",
            }}
          >
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">อีเมลล์</th>
              <th rowSpan="2">ชื่อ-สกุล</th>
              <th rowSpan="2">ภาควิชา</th>
              <th rowSpan="2">เบอร์โทรศัพท์</th>
              <th rowSpan="2">ตำแหน่ง</th>
              <th rowSpan="2">แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {Filter(userList).map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.email}</td>

                  <td class="text-nowrap">
                    {val.name} {val.lastname}
                  </td>
                  <td class="text-nowrap">{val.department}</td>
                  <td>{val.tel}</td>
                  <td>{val.title}</td>
                  <td class="text-nowrap">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => edit(val.UID)}
                      style={{ marginRight: "10px" }}
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        if (window.confirm("ยืนยันการลบบุคลากร"))
                          del(val.email);
                      }}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              );
            })}
            
          </tbody>
        </table>
      </div>
      <div class="row" style={{marginTop:"40px"}}>
        <div class="col" >
      <input
                  type="text"
                  className="form-control"
                  placeholder="อีเมลล์"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                </div>
                <div class="col">
      <div class="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ชื่อจริง"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="นามสกุล"
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                  />
                </div>
                </div>
                <div class="col">
      <select
                  class="form-select"
                  name="departmentSelect"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                >
                  <option value={null} disabled selected hidden>
                    เลือกสาขาวิชา
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
                <div class="col">
      <input
                  type="text"
                  className="form-control"
                  placeholder="เบอร์โทรศัพท์"
                  onChange={(e) => {
                    setTel(e.target.value);
                  }}
                />
                </div>
                <div class="col">
                  
      <select
                  class="form-select"
                  name="yearSelect"
                  onChange={(e) => {
                    setRoleID(e.target.value);
                  }}
                >
                  <option value={null} disabled selected hidden>
                    เลือกตำแหน่ง
                  </option>

                  {roles.map((val, key) => {
                    return <option value={val.id}>{val.title}</option>;
                  })}
                </select>
                </div>
                <div class="col">
      <button
                  type="button"
                  className="btn btn-success"
                  onClick={setRole}
                >
                  เพิ่ม
                </button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(officerSetRole);
