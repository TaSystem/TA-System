import React, { useState, useEffect } from "react";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import SelectMajor from "../../components/SelectMajor";

function Courses(props) {
  const today = new Date();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [major,setMajor] = useState(null);
  // const [level,setLevel] =  useState(null);
  const [year,setYear] = useState(today.getFullYear()+543);
  const [term,setTerm] =useState(null);
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading, props, session]);

  const download = async () =>{
    Axios({
      url: '/download', //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'Header.csv'); //or any other extension
       document.body.appendChild(link);
       link.click();
    }); 
  }

  const submitHandler = async (e) => {
    e.preventDefault(); //prevent the form from submitting
    let formData = new FormData();
    //
    setError(null);
    if(!major){
      setError("กรุณาเลือกสาขาวิชา");
    }
    else if(!year){
      setError("กรุณาเลือกปีการศึกษา");
    }
    // else if(typeof year != "number"){
    //   setError("กรุณากรอกปีการศึกษาเป็นตัวเลข");
    // }
    else if(year.toString().length !== 4){
      setError("กรอกปีการศึกษาได้ 4 ตัว");
    }
    else if(!term){
      setError("กรุณาเลือกภาคเรียนการศึกษา");
    }
    else if(!selectedFiles[0]){
      setError("กรุณาอัพโหลดไฟล์");
    }
    else{
      formData.append("major", major);
      formData.append("year", year);
      formData.append("term", term);
      formData.append("filename", selectedFiles[0]);
      await Axios.post("/courses/single-upload", formData, {
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    })
      .then(() => {
        return router.push("/provost");
      })
      .catch((error) => {
        // console.log(error);
        const { code } = error?.response?.data;
        switch (code) {
          case "FILE_MISSING":
            setError("Please select a file before uploading!");
            break;
          default:
            setError("Sorry! Something went wrong. Please try again later");
            break;
        }
      });
    }
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

  return (
    <div className="container">
      <h1>เพิ่มรายวิชาที่เปิดสอน</h1>

      <hr />
      
      <button className="btn btn-secondary" onClick={download} >ดาวน์โหลดฟอร์ม</button>
      <h2>อัพโหลดเอกสาร</h2>
      <div className="information">
        <form encType="multipart/form-data" onSubmit={submitHandler}>
          <div className="input-group mb-3">
          <SelectMajor onChange={(e) => {
            setMajor(e.target.value);
          }}/>
            <input
              type="text"
              defaultValue={today.getFullYear()+543}
              className="form-control"
              name="year"
              placeholder="ปีการศึกษา"
              style={{ width: "10" }}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
            <select
              name="term"
              onChange={(e) => {
                setTerm(e.target.value);
              }}
            >
              <option value={null} disabled selected hidden>
                ภาคเรียน
              </option>
              
              <option value="ต้น">ต้น</option>
              <option value="ปลาย">ปลาย</option>
            </select>
            <input
              type="file"
              className="form-control"
              name="filename"
              accept=".csv"
              onChange={(e) => {
                setSelectedFiles(e.target.files);
              }}
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-success">
              เพิ่มรายวิชา
            </button>
          </div>
          {error && (
            <div className="mb-3">
              {" "}
              <alert className="alert alert-danger ">{error}</alert>{" "}
            </div>
          )}
          {!error && progress && (
            <div
              className="progress-bar progress-bar-striped bg-info"
              role="progressbar"
              style={{ width: { progress } }}
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progress}
            </div>
          )}
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Courses);