import React from "react";

export default function SelectMajor(props) {
  

    

  return (
    <>
      <select
        name="major"
        className="form-select"
        onChange={props.onChange}
      >
        <option defaultValue="All" disabled selected hidden>
          เลือกสาขาของวิชา
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
    </>
  );
}
