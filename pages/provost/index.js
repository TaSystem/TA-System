import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import { useRouter } from "next/router";
import Navbar from '../../components/Navbar'
import Table from '../../components/TablePagination'

function index(props) {
  const [courses, setCourses] = useState([]);
  const [session, loading] = useSession();
  const [search, setSearch] = useState(null);
  const [success, setSuccess] = useState(null);
  const [yearSearch, setYearSearch] = useState([]);
  const [load, setLoad] = useState(false);
  const [year, setYear] = useState(null);
  const [term, setTerm] = useState(null);
  const [major, setMajor] = useState(null);
  const router = useRouter();
  const columns = React.useMemo(
    () => [
      {
        Header: "รหัสวิชา",
        accessor: "courseID",
      },
      {
        Header: "พศ.ที่ปรับปรุงหลักสูตร",
        accessor: "courseYear",
      },
      {
        Header: "ชื่อวิชา",
        accessor: "title",
      },
      {
        Header: "หน่วยกิต",
        accessor: "credit",
      },
      {
        Header: "บรรยาย",
        columns: [
          {
            Header: "หน่วย",
            accessor: "unit_D",
          },
          {
            Header: "จำนวนชม.",
            accessor: "hr_D",
          },
          {
            Header: "หมู่",
            accessor: "sec_D",
          },
          {
            Header: "วัน",
            accessor: "day_D",
          },
          {
            Header: "เริ่ม",
            accessor: "start_D",
          },
          {
            Header: "-",
            accessor: "dat1",
          },
          {
            Header: "สิ้นสุด",
            accessor: "end_D",
          },
          {
            Header: "ห้อง",
            accessor: "room_D",
          },
          {
            Header: "สาขา",
            accessor: "major_D",
          },
          {
            Header: "จำนวน",
            accessor: "number_D",
          },
        ],
      },
      {
        Header: "ปฎิบัติ",
        columns: [
          {
            Header: "หน่วย",
            accessor: "unit_P",
          },
          {
            Header: "จำนวนชม.",
            accessor: "hr_P",
          },
          {
            Header: "หมู่",
            accessor: "sec_P",
          },
          {
            Header: "วัน",
            accessor: "day_P",
          },
          {
            Header: "เริ่ม",
            accessor: "start_P",
          },
          {
            Header: "-",
            accessor: "dat2",
          },
          {
            Header: "สิ้นสุด",
            accessor: "end_P",
          },
          {
            Header: "ห้อง",
            accessor: "room_P",
          },
          {
            Header: "สาขา",
            accessor: "major_P",
          },
          {
            Header: "จำนวน",
            accessor: "number_P",
          },
        ],
      },
      {
        Header: "บรรยาย",
        columns: [
          {
            Header: "ส่วนกลางจัดสอบ",
            accessor: "central_M",
          },
          {
            Header: "จัดสอบเองนอกตาราง",
            accessor: "decentral_M",
          },
        ],
      },
      {
        Header: "ปฎิบัติ",
        columns: [
          {
            Header: "ส่วนกลางจัดสอบ",
            accessor: "central_F",
          },
          {
            Header: "จัดสอบเองนอกตาราง",
            accessor: "decentral_F",
          },
        ],
      },
      {
        Header: "หมายเหตุ",
        accessor: "note",
      },
      {
        Header: "ปีการศึกษา",
        accessor: "year",
      },
      {
        Header: "ภาคเรียน",
        accessor: "term",
      },
      {
        Header: "สาขา",
        accessor: "major",
      },
    ],
    []
  );

  useEffect(() => {
    async function getCourses() {
      setLoad(true);
      const response = await Axios.get("/courses");
      setCourses(response.data);
      setLoad(false);
    }
    async function getYear() {
      const response = await Axios.get("/courses/year");
      setYearSearch(response.data);
    }
    getYear();
    getCourses();

    
  }, []);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  const deleteCourse = async (id) =>{
    await Axios.delete(`/courses/delete/${id}`).then((response) => {
      setCourses(response.data.data);
      setSuccess(response.data.message);
    });
  }
  const deleteCourseList = async () =>{
    await Axios.post("/courses/delete",{
      year:year,
      term:term,
      major:major
    }).then((response) => {
      setCourses(response.data.data);
      setSuccess(response.data.message);
    });
  }
  const addCourses = () => {
    return router.push(`/provost/coursesImport`);
  };

  function Filter(courses) {
    return courses.filter((course) => {
      if (year == null) {
        if (term == null) {
          if (major == null) {
            if (!search) {
              return course;
            } else if (
              course.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            } else if (
              course.courseID.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            } else if (
              course.teacher.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            }
          }
        }
      } else if (year == course.year) {
        if (term == null) {
          if (!search) {
            return course;
          } else if (
            course.title.toLowerCase().includes(search.toLowerCase())
          ) {
            return course;
          } else if (
            course.courseID.toLowerCase().includes(search.toLowerCase())
          ) {
            return course;
          } else if (
            course.teacher.toLowerCase().includes(search.toLowerCase())
          ) {
            return course;
          }
        } else if (term == course.term) {
          if (major == course.major) {
            if (!search) {
              return course;
            } else if (
              course.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            } else if (
              course.courseID.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            } else if (
              course.teacher.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            }
          } else if (major == null) {
            if (!search) {
              return course;
            } else if (
              course.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            } else if (
              course.courseID.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            } else if (
              course.teacher.toLowerCase().includes(search.toLowerCase())
            ) {
              return course;
            }
          }
        }
      }
    });
  }

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    //console.log("in that case");
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  }

  //console.log("props in provost ",props.nisit)

  return (
    <div className="container">
      {/* <Navbar roleID={props.nisit.roleID} /> */}
      <h1>เจ้าหน้าที่</h1>
      
      <div className="input-group mb-3" style={{maxWidth:"75vw",marginTop:"1vh"}}>
        <input
          type="text"
          className="form-control"
          placeholder="ชื่อวิชา/รหัสวิชา/อาจารย์"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          name="year"
          onChange = { (e) => {
            setYear(e.target.value);
          }}
        >
          <option value="All" disabled selected hidden>
            ปีการศึกษา
          </option>

          {yearSearch.map((val, key) => {
            return <option value={val.year}>{val.year}</option>;
          })}
        </select>

        <select
          name="term"
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        >
          <option value="All" disabled selected hidden>
            {year ? "ภาคเรียน" : "เลือกปีการศึกษาก่อน"}
          </option>
          
          {year&&<option value="ต้น">ต้น</option>}
          {year&&<option value="ปลาย">ปลาย</option>}
        </select>

        <select
          name="major"
          onChange={(e) => {
            setMajor(e.target.value);
          }}
        >
          <option value="All" disabled selected hidden>
            {term ? "สาขาของวิชา" : "เลือกภาคเรียนก่อน"}
          </option>

          {term&&<option value="วิศวกรรมอุตสาหการและระบบ">
            วิศวกรรมอุตสาหการและระบบ(ป.ตรี)
          </option>}

          {term&&<option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์">
            วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.ตรี)
          </option>}

          {term&&<option value="วิศวกรรมโยธา">วิศวกรรมโยธา(ป.ตรี)</option>}

          {term&&<option value="วิศวกรรมเครื่องกลและการออกแบบ">
            วิศวกรรมเครื่องกลและการออกแบบ(ป.ตรี)
          </option>}
          {term&&<option value="วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์">
            วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์(ป.ตรี)
          </option>}
          {term&&<option value="วิศวกรรมเครื่องกลและระบบการผลิต">
            วิศวกรรมเครื่องกลและระบบการผลิต(ป.ตรี)
        </option>}
        {term&&<option value="วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ">
            วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(ป.ตรี)
        </option>}
        </select>
      </div>
      จำนวนทั้งหมด: {courses != null && courses.length != 0 ? Filter(courses).length : 0} วิชา
      <div>
      <button type="submit" className="btn btn-success" onClick={()=>addCourses()} style={{margin:"2vh 0", marginRight:"50px"}}>
          เพิ่มรายวิชา
        </button>
        <button type="submit" className="btn btn-danger" onClick={()=>{if (window.confirm('ลบวิชาที่ ปีการศึกษา '+year+" ภาคเรียน "+term+" สาขา "+major))deleteCourseList()}}>
          ลบวิชารายวิชา
        </button>
      </div>
      {success && (
            <div className="alert alert-success" role="alert">
              {" "}
              {success}{" "}
            </div>
      )}

      <div className="table-responsive" style={{maxHeight:"65vh",maxWidth:"75vw",marginTop:"1vh"}}>
        <Table columns={columns} data={Filter(courses)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(index);
