
import MyResponsivePie from "../../components/MyResponsivePie";
import MyResponsiveBar from "../../components/MyResponsiveBar";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import { useSession } from "next-auth/client";

const data = [
    {
      id: "haskell",
      label: "haskell",
      value: 173,
      color: "hsl(13, 70%, 50%)",
    },
    {
      id: "lisp",
      label: "lisp",
      value: 504,
      color: "hsl(151, 70%, 50%)",
    },
    {
      id: "scala",
      label: "scala",
      value: 531,
      color: "hsl(321, 70%, 50%)",
    },
    {
      id: "erlang",
      label: "erlang",
      value: 206,
      color: "hsl(147, 70%, 50%)",
    },
    {
      id: "rust",
      label: "rust",
      value: 27,
      color: "hsl(155, 70%, 50%)",
    },
  ];

  const datas = [
    {
      id: "haskell",
      label: "haskell",
      value: 173,
      color: "hsl(13, 70%, 50%)",
    },
    {
      id: "lisp",
      label: "lisp",
      value: 504,
      color: "hsl(151, 70%, 50%)",
    },
    
  ];

  const dataBar = [
    {
      "country": "AD(680)",
      "hot dog": 100,
      "hot dogColor": "hsl(224, 70%, 50%)",
      "burger": 161,
      "burgerColor": "hsl(26, 70%, 50%)",
      "sandwich": 91,
      "sandwichColor": "hsl(174, 70%, 50%)",
      "kebab": 69,
      "kebabColor": "hsl(328, 70%, 50%)",
      "fries": 116,
      "friesColor": "hsl(27, 70%, 50%)",
      "donut": 143,
      "donutColor": "hsl(330, 70%, 50%)",
    },
    {
      "country": "AE",
      "hot dog": 86,
      "hot dogColor": "hsl(145, 70%, 50%)",
      "burger": 77,
      "burgerColor": "hsl(168, 70%, 50%)",
      "sandwich": 45,
      "sandwichColor": "hsl(358, 70%, 50%)",
      "kebab": 15,
      "kebabColor": "hsl(190, 70%, 50%)",
      "fries": 61,
      "friesColor": "hsl(6, 70%, 50%)",
      "donut": 43,
      "donutColor": "hsl(247, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 92,
      "hot dogColor": "hsl(215, 70%, 50%)",
      "burger": 159,
      "burgerColor": "hsl(303, 70%, 50%)",
      "sandwich": 130,
      "sandwichColor": "hsl(311, 70%, 50%)",
      "kebab": 189,
      "kebabColor": "hsl(101, 70%, 50%)",
      "fries": 197,
      "friesColor": "hsl(76, 70%, 50%)",
      "donut": 51,
      "donutColor": "hsl(324, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 122,
      "hot dogColor": "hsl(10, 70%, 50%)",
      "burger": 99,
      "burgerColor": "hsl(82, 70%, 50%)",
      "sandwich": 40,
      "sandwichColor": "hsl(182, 70%, 50%)",
      "kebab": 111,
      "kebabColor": "hsl(105, 70%, 50%)",
      "fries": 85,
      "friesColor": "hsl(321, 70%, 50%)",
      "donut": 134,
      "donutColor": "hsl(10, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 53,
      "hot dogColor": "hsl(173, 70%, 50%)",
      "burger": 88,
      "burgerColor": "hsl(299, 70%, 50%)",
      "sandwich": 31,
      "sandwichColor": "hsl(339, 70%, 50%)",
      "kebab": 5,
      "kebabColor": "hsl(51, 70%, 50%)",
      "fries": 132,
      "friesColor": "hsl(145, 70%, 50%)",
      "donut": 24,
      "donutColor": "hsl(355, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 76,
      "hot dogColor": "hsl(22, 70%, 50%)",
      "burger": 156,
      "burgerColor": "hsl(140, 70%, 50%)",
      "sandwich": 91,
      "sandwichColor": "hsl(145, 70%, 50%)",
      "kebab": 1,
      "kebabColor": "hsl(121, 70%, 50%)",
      "fries": 87,
      "friesColor": "hsl(75, 70%, 50%)",
      "donut": 58,
      "donutColor": "hsl(25, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 174,
      "hot dogColor": "hsl(299, 70%, 50%)",
      "burger": 169,
      "burgerColor": "hsl(194, 70%, 50%)",
      "sandwich": 45,
      "sandwichColor": "hsl(9, 70%, 50%)",
      "kebab": 136,
      "kebabColor": "hsl(93, 70%, 50%)",
      "fries": 80,
      "friesColor": "hsl(263, 70%, 50%)",
      "donut": 195,
      "donutColor": "hsl(131, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 122,
      "hot dogColor": "hsl(10, 70%, 50%)",
      "burger": 99,
      "burgerColor": "hsl(82, 70%, 50%)",
      "sandwich": 40,
      "sandwichColor": "hsl(182, 70%, 50%)",
      "kebab": 111,
      "kebabColor": "hsl(105, 70%, 50%)",
      "fries": 85,
      "friesColor": "hsl(321, 70%, 50%)",
      "donut": 134,
      "donutColor": "hsl(10, 70%, 50%)"
    },
  ]


function dashboard(props) {
  const [session, loading] = useSession();
  const [onData , setOndata] = useState([])
  const [label,setLabel] = useState(null);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
      setOndata(data)
    }
  }, [loading]);

   const haddleChangeA = () => {
    setOndata(datas)
    console.log('set now')
  }

  const haddleChangeB = () => {
    setOndata(data)
    console.log('set now')
  }

  function Filter(datas) {
    return datas.filter((data) => {
      if (label == null) {
          return data;
      }
      else if(label == data.label){
          return data;
      }
 
    });
  }

  return (
    <div style={{justifyContent:'center',display:'flex'}}>
      <div style={{padding:'20px', marginLeft:'0px', width:'740px' ,height:'490px'}}>
      <select
          name="major"
          className="form-control"
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          
        >
          <option value={null} disabled selected hidden>
            เลือกลาเบล
          </option>

          <option value="haskell">
          haskell
          </option>

          <option value="lisp">
            lisp
          </option>

          <option value="scala">scala</option>

          <option value="erlang">
          erlang
          </option>

          <option value="rust">
            rust
          </option>
        </select>
      
      <MyResponsivePie data={Filter(onData)}/>
      <button onClick={()=> haddleChangeA()}>
        change data to A
      </button>
      <button onClick={()=> haddleChangeB()}>
        change data to B
      </button>
      </div>
      <div style={{padding:'20px', marginLeft:'0px', width:'740px' ,height:'490px'}}>
          <MyResponsiveBar data={dataBar}/>
        
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

