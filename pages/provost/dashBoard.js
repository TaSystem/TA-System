import MyResponsivePie from "../../components/MyResponsivePie";
import MyResponsiveBar from "../../components/MyResponsiveBar";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import { useSession } from "next-auth/client";

const data = [
  {
    id:'industrial',
    label: "industrial",
    value: 113,
    name: "2546(ภาคต้น)"
  },
  {
    id:'Computer',
    label: "Computer",
    value: 213,
    name: "2546(ภาคต้น)"
  },
  {
    id: 'Civil',
    label: "Civil",
    value: 504,
    name: "2546(ภาคต้น)"
  },
  {
    id: 'Robotic',
    label: "Robotic",
    value: 531,
    name:"2546(ภาคต้น)"
  },
  {
    id: 'Electric',
    label: "Electric",
    value: 206,
    name:"2546(ภาคต้น)"
  },
  {
    id: 'Mechanical',
    label: "Mechanical",
    value: 120,
    name:"2546(ภาคต้น)"
  },
  {
    id: 'Mechanical and Production',
    label: "Mechanical and Production",
    value: 270,
    name:"2546(ภาคต้น)"
  },
  {
    id:'industrial',
    label: "industrial",
    value: 249,
    name: "2546(ภาคฤดูร้อน)"
  },
  {
    id:'Computer',
    label: "Computer",
    value: 143,
    name: "2546(ภาคฤดูร้อน)"
  },
  {
    id: 'Civil',
    label: "Civil",
    value: 504,
    name: "2546(ภาคฤดูร้อน)"
  },
  {
    id: 'Robotic',
    label: "Robotic",
    value: 241,
    name:"2546(ภาคฤดูร้อน)"
  },
  {
    id: 'Electric',
    label: "Electric",
    value: 276,
    name:"2546(ภาคฤดูร้อน)"
  },
  {
    id: 'Mechanical',
    label: "Mechanical",
    value: 327,
    name:"2546(ภาคฤดูร้อน)"
  },
  {
    id: 'Mechanical and Production',
    label: "Mechanical and Production",
    value: 170,
    name:"2546(ภาคฤดูร้อน)"
  },
];

const datas = [
  {
    "id": "php",
    "label": "php",
    "value": 587,
    "color": "hsl(89, 70%, 50%)"
  },
  {
    "id": "rust",
    "label": "rust",
    "value": 472,
    "color": "hsl(192, 70%, 50%)"
  },
  {
    "id": "make",
    "label": "make",
    "value": 221,
    "color": "hsl(122, 70%, 50%)"
  },
  {
    "id": "stylus",
    "label": "stylus",
    "value": 387,
    "color": "hsl(144, 70%, 50%)"
  },
  {
    "id": "hack",
    "label": "hack",
    "value": 539,
    "color": "hsl(187, 70%, 50%)"
  }
]

const dataBar = [
  {
    ปีเทอมการศึกษา: "2546(ภาคต้น)",
    ค่าใช้จ่าย: 100,
    จำนวนคน:5
  },
  {
    ปีเทอมการศึกษา: "2546(ภาคฤดูร้อน)",
    ค่าใช้จ่าย: 86,
  },
  {
    ปีเทอมการศึกษา: "2546(ภาคปลาย)",
    ค่าใช้จ่าย: 92,
  },
  {
    ปีเทอมการศึกษา: "2547(ภาคต้น)",
    ค่าใช้จ่าย: 122,
  },
  {
    ปีเทอมการศึกษา: "2547(ภาคฤดูร้อน)",
    ค่าใช้จ่าย: 53,
  },
  {
    ปีเทอมการศึกษา: "2547(ภาคปลาย)",
    ค่าใช้จ่าย: 76,
  },
];

function dashboard(props) {
  const [session, loading] = useSession();
  const [onData, setOndata] = useState([]);
  const [label, setLabel] = useState();
  const [selectData, setSelectData] = useState([]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
      setOndata(data);
    }
  }, [loading]);

  const haddleChangeA = () => {
    setOndata(datas);
    console.log("set now");
  };

  const haddleChangeB = () => {
    setOndata(data);
    console.log("set now");
  };

  function Filter(datas) {
    return datas.filter((data) => {
      if (label == null) {
        return data;
      } else if (label == data.label) {
        return data;
      }
    });
  }

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <div
        style={{
          padding: "20px",
          marginLeft: "0px",
          width: "890px",
          height: "480px",
        }}
      >
        {/* <select
          name="major"
          className="form-control"
          onChange={(e) => {
            setLabel(e.target.value);
          }}
        >
          <option value={null} disabled selected hidden>
            เลือกลาเบล
          </option>

          <option value="haskell">haskell</option>

          <option value="lisp">lisp</option>

          <option value="scala">scala</option>

          <option value="erlang">erlang</option>

          <option value="rust">rust</option>
        </select> */}
{/* 
        <MyResponsivePie data={Filter(onData)}/>
      <button onClick={()=> haddleChangeA()}>
        change data to A
      </button>
      <button onClick={()=> haddleChangeB()}>
        change data to B
      </button> */}

      <MyResponsivePie data={selectData}/>
      {console.log('count')}
      </div>
      <div style={{ marginLeft: "0px", width: "830px", height: "490px" }}>
        <MyResponsiveBar
          data={dataBar}
          selectBar={(e) => {
            setLabel(e.indexValue);
            setSelectData(data.filter((data) => {
              if (e.indexValue == null) {
                return data;
              } else if (e.indexValue == data.name) {
                return (data);
              }
            }));
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
