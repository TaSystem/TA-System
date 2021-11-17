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
    name: "2564(ภาคต้น)"
  },
  {
    id:'Computer',
    label: "Computer",
    value: 213,
    name: "2564(ภาคต้น)"
  },
  {
    id: 'Civil',
    label: "Civil",
    value: 504,
    name: "2564(ภาคต้น)"
  },
  {
    id: 'Robotic',
    label: "Robotic",
    value: 531,
    name:"2564(ภาคต้น)"
  },
  {
    id: 'Electric',
    label: "Electric",
    value: 206,
    name:"2564(ภาคต้น)"
  },
  {
    id: 'Mechanical',
    label: "Mechanical",
    value: 120,
    name:"2564(ภาคต้น)"
  },
  {
    id: 'Mechanical and Production',
    label: "Mechanical and Production",
    value: 270,
    name:"2564(ภาคต้น)"
  },

//
  {
    id:'industrial',
    label: "industrial",
    value: 513,
    name: "2564(ภาคฤดูร้อน)"
  },
  {
    id:'Computer',
    label: "Computer",
    value: 273,
    name: "2564(ภาคฤดูร้อน)"
  },
  {
    id: 'Civil',
    label: "Civil",
    value: 614,
    name: "2564(ภาคฤดูร้อน)"
  },
  {
    id: 'Robotic',
    label: "Robotic",
    value: 431,
    name:"2564(ภาคฤดูร้อน)"
  },
  {
    id: 'Electric',
    label: "Electric",
    value: 306,
    name:"2564(ภาคฤดูร้อน)"
  },
  {
    id: 'Mechanical',
    label: "Mechanical",
    value: 420,
    name:"2564(ภาคฤดูร้อน)"
  },
  {
    id: 'Mechanical and Production',
    label: "Mechanical and Production",
    value: 470,
    name:"2564(ภาคฤดูร้อน)"
  },
  //
  {
    id:'industrial',
    label: "industrial",
    value: 313,
    name: "2564(ภาคปลาย)"
  },
  {
    id:'Computer',
    label: "Computer",
    value: 413,
    name: "2564(ภาคปลาย)"
  },
  {
    id: 'Civil',
    label: "Civil",
    value: 304,
    name: "2564(ภาคปลาย)"
  },
  {
    id: 'Robotic',
    label: "Robotic",
    value: 431,
    name:"2564(ภาคปลาย)"
  },
  {
    id: 'Electric',
    label: "Electric",
    value: 606,
    name:"2564(ภาคปลาย)"
  },
  {
    id: 'Mechanical',
    label: "Mechanical",
    value: 520,
    name:"2564(ภาคปลาย)"
  },
  {
    id: 'Mechanical and Production',
    label: "Mechanical and Production",
    value: 470,
    name:"2564(ภาคปลาย)"
  },
//
{
  id:'industrial',
  label: "industrial",
  value: 413,
  name: "2565(ภาคต้น)"
},
{
  id:'Computer',
  label: "Computer",
  value: 613,
  name: "2565(ภาคต้น)"
},
{
  id: 'Civil',
  label: "Civil",
  value: 704,
  name: "2565(ภาคต้น)"
},
{
  id: 'Robotic',
  label: "Robotic",
  value: 231,
  name:"2565(ภาคต้น)"
},
{
  id: 'Electric',
  label: "Electric",
  value: 406,
  name:"2565(ภาคต้น)"
},
{
  id: 'Mechanical',
  label: "Mechanical",
  value: 820,
  name:"2565(ภาคต้น)"
},
{
  id: 'Mechanical and Production',
  label: "Mechanical and Production",
  value: 370,
  name:"2565(ภาคต้น)"
},
//
{
  id:'industrial',
  label: "industrial",
  value: 713,
  name: "2565(ภาคฤดูร้อน)"
},
{
  id:'Computer',
  label: "Computer",
  value: 213,
  name: "2565(ภาคฤดูร้อน)"
},
{
  id: 'Civil',
  label: "Civil",
  value: 504,
  name: "2565(ภาคฤดูร้อน)"
},
{
  id: 'Robotic',
  label: "Robotic",
  value: 531,
  name:"2565(ภาคฤดูร้อน)"
},
{
  id: 'Electric',
  label: "Electric",
  value: 206,
  name:"2565(ภาคฤดูร้อน)"
},
{
  id: 'Mechanical',
  label: "Mechanical",
  value: 420,
  name:"2565(ภาคฤดูร้อน)"
},
{
  id: 'Mechanical and Production',
  label: "Mechanical and Production",
  value: 970,
  name:"2565(ภาคฤดูร้อน)"
},
//
{
  id:'industrial',
  label: "industrial",
  value: 313,
  name: "2565(ภาคปลาย)"
},
{
  id:'Computer',
  label: "Computer",
  value: 413,
  name: "2565(ภาคปลาย)"
},
{
  id: 'Civil',
  label: "Civil",
  value: 204,
  name: "2565(ภาคปลาย)"
},
{
  id: 'Robotic',
  label: "Robotic",
  value: 731,
  name:"2565(ภาคปลาย)"
},
{
  id: 'Electric',
  label: "Electric",
  value: 906,
  name:"2565(ภาคปลาย)"
},
{
  id: 'Mechanical',
  label: "Mechanical",
  value: 520,
  name:"2565(ภาคปลาย)"
},
{
  id: 'Mechanical and Production',
  label: "Mechanical and Production",
  value: 670,
  name:"2565(ภาคปลาย)"
},

  
];

const datas = [
  {
    id:'industrial',
    label: "industrial",
    value: 313,
    name: "2565(ภาคปลาย)"
  },
  {
    id:'Computer',
    label: "Computer",
    value: 413,
    name: "2565(ภาคปลาย)"
  },
  {
    id: 'Civil',
    label: "Civil",
    value: 204,
    name: "2565(ภาคปลาย)"
  },
  {
    id: 'Robotic',
    label: "Robotic",
    value: 731,
    name:"2565(ภาคปลาย)"
  },
  {
    id: 'Electric',
    label: "Electric",
    value: 906,
    name:"2565(ภาคปลาย)"
  },
  {
    id: 'Mechanical',
    label: "Mechanical",
    value: 520,
    name:"2565(ภาคปลาย)"
  },
  {
    id: 'Mechanical and Production',
    label: "Mechanical and Production",
    value: 670,
    name:"2565(ภาคปลาย)"
  },
]

const dataBar = [
  {
    ปีเทอมการศึกษา: "2564(ภาคต้น)",
    ค่าใช้จ่าย: 7480,
    จำนวนคน:5
  },
  {
    ปีเทอมการศึกษา: "2564(ภาคฤดูร้อน)",
    ค่าใช้จ่าย: 7180,
    จำนวนคน:6
  },
  {
    ปีเทอมการศึกษา: "2564(ภาคปลาย)",
    ค่าใช้จ่าย: 9742,
    จำนวนคน:9
  },
  {
    ปีเทอมการศึกษา: "2565(ภาคต้น)",
    ค่าใช้จ่าย: 7880,
    จำนวนคน:8
  },
  {
    ปีเทอมการศึกษา: "2565(ภาคฤดูร้อน)",
    ค่าใช้จ่าย: 4490,
    จำนวนคน:5
  },
  {
    ปีเทอมการศึกษา: "2565(ภาคปลาย)",
    ค่าใช้จ่าย: 3488,
    จำนวนคน:7
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
      setSelectData(datas)
      setLabel("2565(ภาคปลาย)")
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
        <h1>ค่าใช้จ่ายเเละจำนวน SA</h1>
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
      {console.log('count')}
      </div>
      <div style={{ marginLeft: "0px", width: "830px", height: "490px" }}>
      <h1>ค่าใช้จ่ายของ {label} แยกสาขา</h1>
        <MyResponsivePie data={selectData}/>
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
