import React, { useEffect, useState } from "react";
import Axios from "../../../config/Axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const requestTAs = () => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);  
  const [name, setName] = useState(user != null && user.length != 0? user[0].name: "loading...");
  const [lastname, setLastname] = useState(user != null && user.length != 0? user[0].lastname: "loading...");
  const [level, setLevel] = useState(user != null && user.length != 0? user[0].level: "loading...");
  const [major, setMajor] = useState(user != null && user.length != 0? user[0].major: "loading...");
  const [tel, setTel] = useState(user != null && user.length != 0? user[0].tel: "loading...");
  const [roleID, setRoleID] = useState(user != null && user.length != 0? user[0].RID: "loading...");

  const router = useRouter();
  const { id } = router.query;
  const [session, loading] = useSession();

  useEffect(() => {
    async function getUser() {
      const response = await Axios.get(`/users/${id}`);
      setUser(response.data);
    }
    async function getRole() {
      const response = await Axios.get(`/users/get-role`);
      setRoles(response.data);
    }
    getRole();
    getUser();
  }, [router]);

  const userUpdate = async () =>{
    await Axios.put("/users/edit-profile-teacher", {
        userID:id,
        name: name,
        lastname:lastname,
        level:level,
        department: major,
        tel:tel,
        rolesID:roleID
      })
      
  }

  return (
    <div className="container">
      <h2>
        อีเมลล์ :
        {user != null && user.length != 0 ? user[0].email : "loading..."}
      </h2>
      <h3>
        ชื่ออีเมลล์:
        {user != null && user.length != 0 ? user[0].name_email : "loading..."}
      </h3>
      <div className="information">
        <form>
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <input
                  type="text"
                  id="form6Example1"
                  className="form-control"
                  defaultValue={
                    user != null && user.length != 0
                      ? user[0].name
                      : "loading..."
                  }
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label className="form-label" for="form6Example1">
                  ชื่อจริง
                </label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input
                  type="text"
                  id="form6Example2"
                  className="form-control"
                  defaultValue={
                    user != null && user.length != 0
                      ? user[0].lastname
                      : "loading..."
                  }
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
                <label className="form-label" for="form6Example2">
                  นามสกุล
                </label>
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <input
              type="text"
              id="form6Example4"
              className="form-control"
              defaultValue={
                user != null && user.length != 0 ? user[0].level : "loading..."
              }
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            />
            <label className="form-label" for="form6Example4">
              อาจารย์รับผิดชอบระดับการศึกษา   
            </label>
          </div>

          <div className="form-outline mb-4">
            <select
              class="form-select"
              name="yearSelect"
              onChange={(e) => {
                setMajor(e.target.value);
              }}
              
            >
              <option
                value={
                  user != null && user.length != 0
                    ? user[0].department
                    : "loading..."
                }
                disabled
                selected
                hidden
              >
                {user != null && user.length != 0
                  ? user[0].department
                  : "loading..."}
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

              <option value="โครงการพิเศษคณะฯ">โครงการพิเศษคณะฯ(ป.ตรี)</option>
            </select>
            <label className="form-label" for="form6Example3">
              ภาควิชา
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="number"
              id="form6Example4"
              className="form-control"
              defaultValue={
                user != null && user.length != 0 ? user[0].tel : "loading..."
              }
              onChange={(e) => {
                setTel(e.target.value);
              }}
            />
            <label className="form-label" for="form6Example4">
              เบอร์โทร
            </label>
          </div>

          <div className="form-outline mb-4">
            <select
              class="form-select"
              name="yearSelect"
              onChange={(e) => {
                setRoleID(e.target.value);
              }}
            >
              <option
                value={
                  user != null && user.length != 0
                    ? user[0].title
                    : "loading..."
                }
                disabled
                selected
                hidden
              >
                {user != null && user.length != 0
                  ? user[0].title
                  : "loading..."}
              </option>

              {roles.map((val, key) => {
                return <option value={val.title}>{val.title}</option>;
              })}
            </select>
            <label className="form-label" for="form6Example5">
              ตำแหน่ง
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4" onClick={()=>window.history.back()}>
            ย้อนกลับ
          </button>
          <button type="submit" className="btn btn-success btn-block mb-4" onClick={userUpdate}>
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
};
export default requestTAs;
