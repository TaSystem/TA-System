import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";

function officerSetRole(props) {
  const [userList, setUserList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [email,setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [department, setDepartment] = useState(null);
  const [tel, setTel] = useState(null);
  const [roleID, setRoleID] = useState(null);
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

  const edit = (id) => {
    return router.push(`/provost/editProfile/${id}`);
  };

  const setRole = async () => {
    console.log (email)
    await Axios.post("/users/set-role", {
      email: email,
      name: name,
      lastname: lastname,
      department: department,
      tel :tel,
      roleID:roleID
    })
  };

  return (
    <div className="container">
      <h2>บุคลากร</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan="2">ลำดับ</th>
              <th rowSpan="2">อีเมลล์</th>
              <th rowSpan="2">ชื่ออีเมลล์</th>
              <th rowSpan="2">ชื่อ-สกุล</th>
              <th rowSpan="2">ภาควิชา</th>
              <th rowSpan="2">เบอร์โทรศัพท์</th>
              <th rowSpan="2">ตำแหน่ง</th>
              <th rowSpan="2">แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.email}</td>
                  <td>{val.name_email}</td>
                  <td>
                    {val.name} {val.lastname}
                  </td>
                  <td>{val.department}</td>
                  <td>{val.tel}</td>
                  <td>{val.title}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => edit(val.UID)}
                    >
                      แก้ไข
                    </button>
                    <button type="button" className="btn btn-danger">
                      ลบ
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="อีเมลล์"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </td>
              <td></td>
              <td>
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
              </td>
              <td>
                <select class="form-select" name="departmentSelect" onChange={(e) => {
                    setDepartment(e.target.value);
                  }}>
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
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="เบอร์โทรศัพท์"
                  onChange={(e) => {
                    setTel(e.target.value);
                  }}
                />
              </td>
              <td>
                <select
                  class="form-select"
                  name="yearSelect"
                  onChange={(e) => {
                    setRoleID(e.target.value);
                  }}
                >
                  <option
                    value={null}
                    disabled
                    selected
                    hidden
                  >
                    เลือกตำแหน่ง
                  </option>

                  {roles.map((val, key) => {
                    return <option value={val.id}>{val.title}</option>;
                  })}
                </select>
              </td>
              <td>
                <button type="button" className="btn btn-success" onClick={setRole}>
                  เพิ่ม
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" className="btn btn-success">
          เพิ่มบุลลากร
        </button>
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
