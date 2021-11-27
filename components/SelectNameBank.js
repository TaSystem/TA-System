import React from "react";

export default function SelectNameBank(props) {
  

    

  return (
    <>
      <select
        name="nameBank"
        className="form-select"
        onChange={props.onChange}
      >
        <option defaultValue={props.nameBank} disabled selected hidden>
            {props.nameBank}
        </option>
        <option value="ธนาคารกรุงเทพ">
            ธนาคารกรุงเทพ
        </option>
        <option value="ธนาคารกสิกรไทย">
            ธนาคารกสิกรไทย
        </option>

        <option value="ธนาคารทหารไทยธนชาต">
            ธนาคารทหารไทยธนชาต
        </option>

        <option value="ธนาคารไทยพาณิชย์">
            ธนาคารไทยพาณิชย์
        </option>

        <option value="ธนาคารออมสิน">
            ธนาคารออมสิน
        </option>
      </select>
    </>
  );
}
