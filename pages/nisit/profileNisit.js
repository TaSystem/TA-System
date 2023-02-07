import React, { useEffect, useState, useRef } from 'react';
import Axios from '../../config/Axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { connect } from 'react-redux';
import SelectMajor from '../../components/SelectMajor';
import SelectNameBank from '../../components/SelectNameBank';
import { getDetailNisit } from '../../redux/actions/nisitAction';
import Image from 'next/image';
import Link from 'next/link';

const ProfileNisit = (props) => {
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
  const [fileBookBank, setFileBookBank] = useState(null);
  const [selectedFileCardStudent, setSelectedFileCardStudent] = useState([]);
  const [selectedFileBookBank, setSelectedFileBookBank] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
        setName(response.data[0].name);
        setLastname(response.data[0].lastname);
        setIdstudent(response.data[0].idStudent);
        setTel(response.data[0].tel);
        setLevel(response.data[0].level);
        setDepartment(response.data[0].department);
        setNameBank(response.data[0].nameBank);
        setIdBank(response.data[0].idBank);
        setBranch(response.data[0].Branch);
        setFileBookBank(response.data[0].fileBookBank);
        setFileCardStudent(response.data[0].fileCardStudent);
      }
      getUser();
    }
  }, [loading, props, session]);

  const clearFileCard = async () => {
    await Axios.put(`/clear-file`, {
      email: session.user.email,
      fileCardStudent: fileCardStudent,
    }).then((res) => {
      if (res) {
        setFileCardStudent(null);
      }
    });
  };

  const clearFileBank = async () => {
    await Axios.put(`/clear-file`, {
      email: session.user.email,
      fileBookBank: fileBookBank,
    }).then((res) => {
      if (res) {
        setFileBookBank(null);
      }
    });
  };

  const userUpdate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    setSuccess(null);
    setError(null);
    formData.append('email', session.user.email);
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('idStudent', idStudent);
    formData.append('tel', tel);
    formData.append('level', level);
    formData.append('department', department);
    formData.append('nameBank', nameBank);
    formData.append('idBank', idBank);
    formData.append('Branch', branch);
    formData.append(
      'fileCardStudent',
      selectedFileCardStudent[0] ? selectedFileCardStudent[0] : null
    );
    formData.append(
      'fileBookBank',
      selectedFileBookBank[0] ? selectedFileBookBank[0] : null
    );

    await Axios.put('/users/edit-profile', formData)
      .then((res) => {
        setSuccess(res.data.message);
        if (!fileBookBank && !fileCardStudent) {
          setFileBookBank(res.data.fileBookBank);
          setFileCardStudent(res.data.fileCardStudent);
        } else if (!fileCardStudent) {
          setFileCardStudent(res.data.fileCardStudent);
        } else if (!fileBookBank) {
          setFileBookBank(res.data.fileBookBank);
        }
      })
      .catch(() => {
        setError('เเก้ไขข้อมูลไม่สำเร็จ กรุณาเพิ่มไฟล์ !!');
      });
  };

  return (
    <form>
      <div className="container">
        <h2>
          {' '}
          ข้อมูลนิสิต {user && user.length != 0 ? user[0].email : 'loading...'}
        </h2>

        {success && (
          <div className="alert alert-success" role="alert">
            {' '}
            {success}{' '}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {' '}
            {error}{' '}
          </div>
        )}
        <div className="information">
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example1">
                  ชื่อจริง
                </label>
                <input
                  type="text"
                  id="form6Example1"
                  name="name"
                  className="form-control"
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
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example2">
                  นามสกุล
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="form6Example2"
                  className="form-control"
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
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example1">
                  รหัสนิสิต
                </label>
                <input
                  type="number"
                  name="idStudent"
                  id="form6Example1"
                  className="form-control"
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
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example4">
                  เบอร์โทร
                </label>
                <input
                  type="number"
                  name="tel"
                  id="form6Example4"
                  className="form-control"
                  defaultValue={
                    // user && user.length != 0 ? user[0].tel : "loading..."
                    tel
                  }
                  onChange={(e) => {
                    setTel(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label">ระดับการศึกษา</label>
                <select
                  className="form-select"
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
                    {user && user.length != 0 ? user[0].level : 'loading...'}
                  </option>

                  <option value="ปริญญาตรี">ปริญญาตรี</option>

                  <option value="ปริญญาโท">ปริญญาโท</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label">ภาควิชา</label>
                <select
                  className="form-select"
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
              </div>
            </div>
          </div>

          <h2>ข้อมูลบัญชีธนาคาร</h2>

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label">ชื่อธนาคาร</label>
                <SelectNameBank
                  nameBank={
                    // user && user.length != 0 ? user[0].nameBank : "loading..."
                    nameBank
                  }
                  onChange={(e) => {
                    setNameBank(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example7">
                  เลขที่บัญชี
                </label>
                <input
                  type="text"
                  name="idBank"
                  id="form6Example7"
                  className="form-control"
                  defaultValue={
                    // user && user.length != 0 ? user[0].idBank : "loading..."
                    idBank
                  }
                  onChange={(e) => {
                    setIdBank(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example8">
                  สาขาธนาคาร
                </label>
                <input
                  type="text"
                  name="branch"
                  id="form6Example8"
                  className="form-control"
                  defaultValue={
                    // user && user.length != 0 ? user[0].Branch : "loading..."
                    branch
                  }
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                {!fileCardStudent && (
                  <div>
                    <label className="form-label" htmlFor="form6Example9">
                      รูปบัตรนิสิตที่ยังไม่หมดอายุ(pdfเท่านั้น)
                    </label>
                    <input
                      type="file"
                      id="form6Example9"
                      className="form-control"
                      // defaultValue={path}
                      accept="application/pdf"
                      onChange={(e) => {
                        setSelectedFileCardStudent(e.target.files);
                      }}
                    />
                  </div>
                )}
                {fileCardStudent && (
                  <p>
                    {fileCardStudent}
                    <button
                      type="button"
                      className="btn btn-danger btn-block mb-4"
                      onClick={clearFileCard}
                    >
                      นำออก
                    </button>
                  </p>
                )}
                {/* <Image src={tempCard} alt="fileCardStudent" width={220} height={220} /> */}
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                {!fileBookBank && (
                  <div>
                    <label className="form-label" htmlFor="form6Example10">
                      รูปสมุดบัญชีธนาคาร(pdfเท่านั้น)
                    </label>
                    <input
                      type="file"
                      id="form6Example10"
                      className="form-control"
                      accept="application/pdf"
                      //   defaultValue={
                      //     user && user.length != 0 ? `../../img/timer.png` : "loading..."
                      //   }
                      // ref={inputRef}

                      onChange={(e) => {
                        setSelectedFileBookBank(e.target.files);
                      }}
                    />
                  </div>
                )}
                {fileBookBank && (
                  <p>
                    {fileBookBank}{' '}
                    <button
                      type="button"
                      className="btn btn-danger btn-block mb-4"
                      onClick={clearFileBank}
                    >
                      นำออก
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-success btn-block mb-4"
            onClick={userUpdate}
          >
            บันทึก
          </button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNisit);
