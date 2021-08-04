import React, { useState } from "react";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Courses() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [major, setMajor] = useState(null);
  const [level, setLevel] = useState(null);
  const [year, setYear] = useState(null);
  const [term, setTerm] = useState(null);
  const router = useRouter();
  const [session, loading] = useSession();
  const submitHandler = async (e) => {
    e.preventDefault(); //prevent the form from submitting
    let formData = new FormData();
    //
    console.log("check: ", level, selectedFiles[0]);

    formData.append("level", level);
    formData.append("major", major);
    formData.append("year", year);
    formData.append("term", term);
    formData.append("filename", selectedFiles[0]);
    //Clear the error message
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
        console.log(error);
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
  };
  function change(e) {
    console.log(major);
    var lv = major.substring(major.lastIndexOf("("));

    console.log(lv);
  }

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
      <h1>เพิ่มรายวิชาที่เปิดสอน</h1>

      <hr />
      <h2>อัพโหลดเอกสาร</h2>
      <div className="information">
        <form encType="multipart/form-data" onSubmit={submitHandler}>
          <div className="input-group mb-3">
            <select
              name="year"
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            >
              <option value={null} disabled selected hidden>
                ระดับ
              </option>
              <option value="ปริญญาตรี">ปริญญาตรี</option>
              <option value="ปริญญาโท">ปริญญาโท</option>
            </select>
            <select
              name="major"
              onChange={(e) => {
                setMajor(e.target.value);
              }}
            >
              <option value={null} disabled selected hidden>
                {level ? "เลือกสาขาของวิชา" : "เลือกระดับก่อน"}
              </option>
              {level == "ปริญญาตรี" && (
                <option value="วิศวกรรมอุตสาหการและระบบ(ป.ตรี)">
                  วิศวกรรมอุตสาหการและระบบ(ป.ตรี)
                </option>
              )}
              {level == "ปริญญาตรี" && (
                <option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.ตรี)">
                  วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.ตรี)
                </option>
              )}
              {level == "ปริญญาตรี" && (
                <option value="วิศวกรรมโยธา(ป.ตรี)">วิศวกรรมโยธา(ป.ตรี)</option>
              )}
              {level == "ปริญญาตรี" && (
                <option value="วิศวกรรมเครื่องกลและการออกแบบ(ป.ตรี)">
                  วิศวกรรมเครื่องกลและการออกแบบ(ป.ตรี)
                </option>
              )}
              {level == "ปริญญาตรี" && (
                <option value="วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์(ป.ตรี)">
                  วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์(ป.ตรี)
                </option>
              )}
              {level == "ปริญญาตรี" && (
                <option value="วิศวกรรมเครื่องกลและระบบการผลิต(ป.ตรี)">
                  วิศวกรรมเครื่องกลและระบบการผลิต(ป.ตรี)
                </option>
              )}
              {level == "ปริญญาตรี" && (
                <option value="วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(ป.ตรี)">
                  วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(ป.ตรี)
                </option>
              )}

              {level == "ปริญญาโท" && (
                <option value="วิศวกรรมความปลอดภัยและการจัดการสิ่งแวดล้อม(ป.โท)">
                  วิศวกรรมความปลอดภัยและการจัดการสิ่งแวดล้อม(ป.โท)
                </option>
              )}
              {level == "ปริญญาโท" && (
                <option value="การจัดการวิศวกรรมและเทคโนโลยี(ป.โท)">
                  การจัดการวิศวกรรมและเทคโนโลยี(ป.โท)
                </option>
              )}
              {level == "ปริญญาโท" && (
                <option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.โท)">
                  วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.โท)
                </option>
              )}
              {level == "ปริญญาโท" && (
                <option value="วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์(ป.โท)">
                  วิศวกรรมเครื่องกลและการออกแบบ(ป.โท)
                </option>
              )}
            </select>
            <input
              type="number"
              min={2564}
              max={9999}
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
              <option value="ฤดูร้อน">ฤดูร้อน</option>
              <option value="ต้น">ต้น</option>
              <option value="ปลาย">ปลาย</option>
            </select>
            <input
              type="file"
              className="form-control"
              name="filename"
              onChange={(e) => {
                setSelectedFiles(e.target.files);
              }}
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-success">
              import excel
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
