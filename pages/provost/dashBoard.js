import MyResponsivePie from '../../components/MyResponsivePie';
import MyResponsiveBar from '../../components/MyResponsiveBar';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getDetailNisit } from '../../redux/actions/nisitAction';
import { useSession } from 'next-auth/client';
import SelectMajor from '../../components/SelectMajor';
import Axios from '../../config/Axios';

const data = [
  {
    id: 'industrial',
    label: 'industrial',
    value: 113,
    name: '2564(ภาคต้น)',
  },
  {
    id: 'Computer',
    label: 'Computer',
    value: 213,
    name: '2564(ภาคต้น)',
  },
  {
    id: 'Civil',
    label: 'Civil',
    value: 504,
    name: '2564(ภาคต้น)',
  },
  {
    id: 'Robotic',
    label: 'Robotic',
    value: 531,
    name: '2564(ภาคต้น)',
  },
  {
    id: 'Electric',
    label: 'Electric',
    value: 206,
    name: '2564(ภาคต้น)',
  },
  {
    id: 'Mechanical',
    label: 'Mechanical',
    value: 120,
    name: '2564(ภาคต้น)',
  },
  {
    id: 'Mechanical and Production',
    label: 'Mechanical and Production',
    value: 270,
    name: '2564(ภาคต้น)',
  },

  //
  {
    id: 'industrial',
    label: 'industrial',
    value: 513,
    name: '2564(ภาคฤดูร้อน)',
  },
  {
    id: 'Computer',
    label: 'Computer',
    value: 273,
    name: '2564(ภาคฤดูร้อน)',
  },
  {
    id: 'Civil',
    label: 'Civil',
    value: 614,
    name: '2564(ภาคฤดูร้อน)',
  },
  {
    id: 'Robotic',
    label: 'Robotic',
    value: 431,
    name: '2564(ภาคฤดูร้อน)',
  },
  {
    id: 'Electric',
    label: 'Electric',
    value: 306,
    name: '2564(ภาคฤดูร้อน)',
  },
  {
    id: 'Mechanical',
    label: 'Mechanical',
    value: 420,
    name: '2564(ภาคฤดูร้อน)',
  },
  {
    id: 'Mechanical and Production',
    label: 'Mechanical and Production',
    value: 470,
    name: '2564(ภาคฤดูร้อน)',
  },
  //
  {
    id: 'industrial',
    label: 'industrial',
    value: 313,
    name: '2564(ภาคปลาย)',
  },
  {
    id: 'Computer',
    label: 'Computer',
    value: 413,
    name: '2564(ภาคปลาย)',
  },
  {
    id: 'Civil',
    label: 'Civil',
    value: 304,
    name: '2564(ภาคปลาย)',
  },
  {
    id: 'Robotic',
    label: 'Robotic',
    value: 431,
    name: '2564(ภาคปลาย)',
  },
  {
    id: 'Electric',
    label: 'Electric',
    value: 606,
    name: '2564(ภาคปลาย)',
  },
  {
    id: 'Mechanical',
    label: 'Mechanical',
    value: 520,
    name: '2564(ภาคปลาย)',
  },
  {
    id: 'Mechanical and Production',
    label: 'Mechanical and Production',
    value: 470,
    name: '2564(ภาคปลาย)',
  },
  //
  {
    id: 'industrial',
    label: 'industrial',
    value: 413,
    name: '2565(ภาคต้น)',
  },
  {
    id: 'Computer',
    label: 'Computer',
    value: 613,
    name: '2565(ภาคต้น)',
  },
  {
    id: 'Civil',
    label: 'Civil',
    value: 704,
    name: '2565(ภาคต้น)',
  },
  {
    id: 'Robotic',
    label: 'Robotic',
    value: 231,
    name: '2565(ภาคต้น)',
  },
  {
    id: 'Electric',
    label: 'Electric',
    value: 406,
    name: '2565(ภาคต้น)',
  },
  {
    id: 'Mechanical',
    label: 'Mechanical',
    value: 820,
    name: '2565(ภาคต้น)',
  },
  {
    id: 'Mechanical and Production',
    label: 'Mechanical and Production',
    value: 370,
    name: '2565(ภาคต้น)',
  },
  //
  {
    id: 'industrial',
    label: 'industrial',
    value: 713,
    name: '2565(ภาคฤดูร้อน)',
  },
  {
    id: 'Computer',
    label: 'Computer',
    value: 213,
    name: '2565(ภาคฤดูร้อน)',
  },
  {
    id: 'Civil',
    label: 'Civil',
    value: 504,
    name: '2565(ภาคฤดูร้อน)',
  },
  {
    id: 'Robotic',
    label: 'Robotic',
    value: 531,
    name: '2565(ภาคฤดูร้อน)',
  },
  {
    id: 'Electric',
    label: 'Electric',
    value: 206,
    name: '2565(ภาคฤดูร้อน)',
  },
  {
    id: 'Mechanical',
    label: 'Mechanical',
    value: 420,
    name: '2565(ภาคฤดูร้อน)',
  },
  {
    id: 'Mechanical and Production',
    label: 'Mechanical and Production',
    value: 970,
    name: '2565(ภาคฤดูร้อน)',
  },
  //
  {
    id: 'industrial',
    label: 'industrial',
    value: 313,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Computer',
    label: 'Computer',
    value: 413,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Civil',
    label: 'Civil',
    value: 204,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Robotic',
    label: 'Robotic',
    value: 731,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Electric',
    label: 'Electric',
    value: 906,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Mechanical',
    label: 'Mechanical',
    value: 520,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Mechanical and Production',
    label: 'Mechanical and Production',
    value: 670,
    name: '2565(ภาคปลาย)',
  },
];

const datas = [
  {
    id: 'industrial',
    label: 'industrial',
    value: 313,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Computer',
    label: 'Computer',
    value: 413,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Civil',
    label: 'Civil',
    value: 204,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Robotic',
    label: 'Robotic',
    value: 731,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Electric',
    label: 'Electric',
    value: 906,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Mechanical',
    label: 'Mechanical',
    value: 520,
    name: '2565(ภาคปลาย)',
  },
  {
    id: 'Mechanical and Production',
    label: 'Mechanical and Production',
    value: 670,
    name: '2565(ภาคปลาย)',
  },
];

const dataBar = [
  {
    ปีเทอมการศึกษา: '2564(ภาคต้น)',
    ค่าใช้จ่าย: 7480,
    จำนวนคน: 5,
  },
  {
    ปีเทอมการศึกษา: '2564(ภาคฤดูร้อน)',
    ค่าใช้จ่าย: 7180,
    จำนวนคน: 6,
  },
  {
    ปีเทอมการศึกษา: '2564(ภาคปลาย)',
    ค่าใช้จ่าย: 9742,
    จำนวนคน: 9,
  },
  {
    ปีเทอมการศึกษา: '2565(ภาคต้น)',
    ค่าใช้จ่าย: 7880,
    จำนวนคน: 8,
  },
  {
    ปีเทอมการศึกษา: '2565(ภาคฤดูร้อน)',
    ค่าใช้จ่าย: 4490,
    จำนวนคน: 5,
  },
  {
    ปีเทอมการศึกษา: '2565(ภาคปลาย)',
    ค่าใช้จ่าย: 3488,
    จำนวนคน: 7,
  },
];

function dashboard(props) {
  const [session, loading] = useSession();
  const [dataChart, setDataChart] = useState([]);
  // const [onData, setOndata] = useState([]);
  const [selectBarData, setSelectBarData] = useState([]);
  const [dataBarChart, setDataBarChart] = useState([]);
  const [dataPieChart, setDataPieChart] = useState([]);
  const [label, setLabel] = useState('(เลือกที่กราฟเเท่ง)');
  const today = new Date();
  const [startAt, setStartAt] = useState(null);
  const [major, setMajor] = useState(null);
  const [year, setYear] = useState(null);
  const [term, setTerm] = useState(null);
  const [cost, setCost] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [yearSearch, setYearSearch] = useState([]);
  const [numberOfYear, setNumberOfYear] = useState(3);
  // true data
  const [dataChartTrue, setDataChartTrue] = useState([]);
  const [selectBarDataTrue, setSelectBarDataTrue] = useState([]);
  const [dataBarChartTrue, setDataBarChartTrue] = useState([]);
  const [dataPieChartTrue, setDataPieChartTrue] = useState([]);
  const [labelTrue, setLabelTrue] = useState('(เลือกที่กราฟเเท่ง)');
  const [yearSearchTrue, setYearSearchTrue] = useState([]);
  const [numberOfYearTrue, setNumberOfYearTrue] = useState(3);
  const [startAtTrue, setStartAtTrue] = useState(null);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email);
      // setOndata(data);
      // setSelectBarData(datas);
      // setLabel("2565(ภาคปลาย)");

      async function getData() {
        const responseYear = await Axios.get('/courses/year');
        const response = await Axios.get('/cost/dashboard');
        // const response = await Axios.get("/cost/dashboard-expenses");
        console.log('year ', responseYear.data[0].year);
        console.log('data ', response.data);
        setDataChart(response.data);

        let current = {
          สาขา: response.data[0].major,
          ปี: response.data[0].year,
          ภาค: response.data[0].term,
          ค่าใช้จ่าย: response.data[0].sum_cost,
        };
        let sum = 0;
        let check = false;
        let first = true;
        let resultArr = [];
        console.log('startAt ', responseYear.data[0].year, numberOfYear);
        response.data.map((dat, idx) => {
          if (
            dat.year === current.ปี &&
            dat.term === current.ภาค &&
            dat.year >= responseYear.data[0].year &&
            dat.year <=
              parseInt(responseYear.data[0].year) + parseInt(numberOfYear - 1)
          ) {
            sum += dat.sum_cost;
          } else if (
            idx + 1 < response.data.length &&
            dat.year + 1 == responseYear.data[0].year &&
            first == true
          ) {
            current = {
              สาขา: response.data[0].major,
              ปี: response.data[idx + 1].year,
              ภาค: response.data[idx + 1].term,
              ค่าใช้จ่าย: response.data[0].sum_cost,
            };
            first = false;
          } else if (
            dat.year >= responseYear.data[0].year &&
            parseInt(dat.year) <=
              parseInt(responseYear.data[0].year) + parseInt(numberOfYear - 1)
          ) {
            sum != 0
              ? resultArr.push({
                  ปีเทอมการศึกษา: `${current.ปี}(${current.ภาค})`,
                  ค่าใช้จ่าย: sum,
                })
              : console.log('');
            current = {
              สาขา: dat.major,
              ปี: dat.year,
              ภาค: dat.term,
              ค่าใช้จ่าย: dat.sum_cost,
            };
            sum = dat.sum_cost;
            // sumPeople = dat.count_TA
            check = true;
          }
        });
        if (check)
          resultArr.push({
            ปีเทอมการศึกษา: `${current.ปี}(${current.ภาค})`,
            ค่าใช้จ่าย: sum,
          }),
            setDataBarChart(resultArr);
        console.log('result Arr iss ', resultArr);

        //pie
        // current = {สาขา: response.data[0].major ,ปี: response.data[0].year, ภาค:response.data[0].term, จำนวนคน: response.data[0].count_TA ,ค่าใช้จ่าย:response.data[0].sum_cost}
        // sum = 0
        // response.data.map((dat,idx) =>
        // {
        //   if(dat.year === current.ปี && dat.term === current.ภาค &&  dat.major === current.สาขา){
        //     sum += dat.cost
        //   }else{
        //     setDataPieChart(oldArray => [...oldArray, {id: current.สาขา, label:current.สาขา, value:sum, name:`${current.ปี}(${current.ภาค})`}])
        //     current = {สาขา:dat.major , ปี:dat.year, ภาค:dat.term}
        //     sum = dat.cost
        //   }
        // })
        // setDataPieChart(oldArray => [...oldArray, {id: current.สาขา, label:current.สาขา, value:sum, name:`${current.ปี}(${current.ภาค})`}])
        setDataPieChart(
          response.data.map((dat, idx) => ({
            id: `${dat.major}(${dat.term} ${dat.year})`,
            label: dat.major,
            value: dat.sum_cost,
            name: `${dat.year}(${dat.term})`,
          }))
        );
      }
      getData();
      console.log('dataChart is ', dataChart);

      //get data True
      async function getDataTrue() {
        // const response = await Axios.get("/cost/dashboard");
        const response = await Axios.get('/cost/dashboard-expenses');
        const responseYear = await Axios.get('/courses/year');

        setDataChartTrue(response.data);
        let current = {
          สาขา: response.data[0].major,
          ปี: response.data[0].year,
          ภาค: response.data[0].term,
          ค่าใช้จ่าย: response.data[0].sum_cost,
        };
        let sum = 0;
        let check = false;
        let first = true;
        let resultArr = [];
        // let sumPeople = 0
        //console.log("current is :", current);
        response.data.map((dat, idx) => {
          if (
            dat.year === current.ปี &&
            dat.term === current.ภาค &&
            dat.year >= responseYear.data[0].year &&
            dat.year <=
              parseInt(responseYear.data[0].year) +
                parseInt(numberOfYearTrue - 1)
          ) {
            sum += dat.sum_cost;
          } else if (
            idx + 1 < response.data.length &&
            dat.year + 1 == responseYear.data[0].year &&
            first == true
          ) {
            current = {
              สาขา: response.data[0].major,
              ปี: response.data[idx + 1].year,
              ภาค: response.data[idx + 1].term,
              ค่าใช้จ่าย: response.data[0].sum_cost,
            };
            first = false;
          } else if (
            dat.year >= responseYear.data[0].year &&
            parseInt(dat.year) <=
              parseInt(responseYear.data[0].year) +
                parseInt(numberOfYearTrue - 1)
          ) {
            sum != 0
              ? resultArr.push({
                  ปีเทอมการศึกษา: `${current.ปี}(${current.ภาค})`,
                  ค่าใช้จ่าย: sum,
                })
              : console.log('');
            current = {
              สาขา: dat.major,
              ปี: dat.year,
              ภาค: dat.term,
              ค่าใช้จ่าย: dat.sum_cost,
            };
            sum = dat.sum_cost;
            // sumPeople = dat.count_TA
            check = true;
          }
        });
        if (check)
          resultArr.push({
            ปีเทอมการศึกษา: `${current.ปี}(${current.ภาค})`,
            ค่าใช้จ่าย: sum,
          }),
            setDataBarChartTrue(resultArr);

        //pie
        // current = {สาขา: response.data[0].major ,ปี: response.data[0].year, ภาค:response.data[0].term, จำนวนคน: response.data[0].count_TA ,ค่าใช้จ่าย:response.data[0].sum_cost}
        // sum = 0
        // response.data.map((dat,idx) =>
        // {
        //   if(dat.year === current.ปี && dat.term === current.ภาค &&  dat.major === current.สาขา){
        //     sum += dat.cost
        //   }else{
        //     setDataPieChart(oldArray => [...oldArray, {id: current.สาขา, label:current.สาขา, value:sum, name:`${current.ปี}(${current.ภาค})`}])
        //     current = {สาขา:dat.major , ปี:dat.year, ภาค:dat.term}
        //     sum = dat.cost
        //   }
        // })
        // setDataPieChart(oldArray => [...oldArray, {id: current.สาขา, label:current.สาขา, value:sum, name:`${current.ปี}(${current.ภาค})`}])
        setDataPieChartTrue(
          response.data.map((dat, idx) => ({
            id: `${dat.major}(${dat.term} ${dat.year})`,
            label: dat.major,
            value: dat.sum_cost,
            name: `${dat.year}(${dat.term})`,
          }))
        );
      }
      getDataTrue();
    }

    async function getYear() {
      const response = await Axios.get('/courses/year');
      setYearSearch(response.data);
      //console.log("Year is ", response.data);
    }
    getYear();
  }, [loading]);

  // const haddleChangeA = () => {
  //   setOndata(datas);
  //   console.log("set now");
  // };

  // const haddleChangeB = () => {
  //   setOndata(data);
  //   console.log("set now");
  // };

  const addExpenses = async () => {
    setSuccess(null);
    setError(null);
    await Axios.post('/cost/add-expenses/', {
      major: major,
      year: year,
      term: term,
      cost: cost,
    }).then((res) => {
      if (res.data.check == 0) {
        setError(res.data.message);
      } else {
        setSuccess(res.data.message);
      }
    });
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

  function FilterData(numberOfYear, startAt) {
    let currents = {
      สาขา: dataChart[0].major,
      ปี: dataChart[0].year,
      ภาค: dataChart[0].term,
      ค่าใช้จ่าย: dataChart[0].sum_cost,
    };
    let sum = 0;
    let check = false;
    let first = true;
    let resultArr = [];
    //console.log("currents is ", currents);
    //console.log("result 1 is :", resultArr);
    dataChart.map((dat, idx) => {
      // console.log("CHECK ",dat.year+1 == startAt, dat.year+1, startAt)
      if (
        dat.year === currents.ปี &&
        dat.term === currents.ภาค &&
        dat.year >= startAt &&
        dat.year <= parseInt(startAt) + parseInt(numberOfYear - 1)
      ) {
        sum += dat.sum_cost;
        // sumPeople += dat.count_TA
        // console.log("E!",parseInt(startAt)+parseInt(numberOfYear-1))
      } else if (
        idx + 1 < dataChart.length &&
        dat.year + 1 == startAt &&
        first == true
      ) {
        currents = {
          สาขา: dataChart[0].major,
          ปี: dataChart[idx + 1].year,
          ภาค: dataChart[idx + 1].term,
          ค่าใช้จ่าย: dataChart[0].sum_cost,
        };
        // console.log("dat.year+1 === startAt is ",dat.year+1, currents)
        first = false;
      } else if (
        dat.year >= startAt &&
        parseInt(dat.year) <= parseInt(startAt) + parseInt(numberOfYear - 1)
      ) {
        // resultArr.push({ปีเทอมการศึกษา:`${dataChart[14].year}(${dataChart[14].term})`,ค่าใช้จ่าย:sum, จำนวนคน :sumPeople})
        //   if(sum == 0) {
        //     currents = {สาขา: dataChart[0].major ,ปี: dataChart[idx].year, ภาค:dataChart[idx].term, จำนวนคน: dataChart[0].count_TA ,ค่าใช้จ่าย:dataChart[0].sum_cost}
        //     console.log("in @ ",idx, sum, currents)
        //   }AA
        // console.log("VV!")
        sum != 0
          ? resultArr.push({
              ปีเทอมการศึกษา: `${currents.ปี}(${currents.ภาค})`,
              ค่าใช้จ่าย: sum,
            })
          : console.log('');
        currents = {
          สาขา: dat.major,
          ปี: dat.year,
          ภาค: dat.term,
          ค่าใช้จ่าย: dat.sum_cost,
        };
        sum = dat.sum_cost;
        // sumPeople = dat.count_TA
        check = true;
      }

      // else{
      //   setDataBarChart(oldArray => [...oldArray, {ปีเทอมการศึกษา:`${current.ปี}(${current.ภาค})`,ค่าใช้จ่าย:sum, จำนวนคน :sumPeople}])
      //   break
      // }
    });
    if (check)
      resultArr.push({
        ปีเทอมการศึกษา: `${currents.ปี}(${currents.ภาค})`,
        ค่าใช้จ่าย: sum,
      }),
        //console.log("e%");
        // console.log(
        //   "result is :",
        //   resultArr,
        //   "and DataChart is ",
        //   dataChart,
        //   "number is ",
        //   numberOfYear,
        //   startAt
        // );
        setDataBarChart(resultArr);
  }

  function FilterDataTrue(numberOfYearTrue, startAt) {
    let currents = {
      สาขา: dataChart[0].major,
      ปี: dataChart[0].year,
      ภาค: dataChart[0].term,
      ค่าใช้จ่าย: dataChart[0].sum_cost,
    };
    let sum = 0;
    let check = false;
    let first = true;
    let resultArr = [];
    //console.log("currents is ", currents);
    //console.log("result 1 is :", resultArr);
    dataChartTrue.map((dat, idx) => {
      // console.log("CHECK ",dat.year+1 == startAt, dat.year+1, startAt)
      if (
        dat.year === currents.ปี &&
        dat.term === currents.ภาค &&
        dat.year >= startAt &&
        dat.year <= parseInt(startAt) + parseInt(numberOfYearTrue - 1)
      ) {
        sum += dat.sum_cost;
        // sumPeople += dat.count_TA
        // console.log("E!",parseInt(startAt)+parseInt(numberOfYearTrue-1))
      } else if (
        idx + 1 < dataChart.length &&
        dat.year + 1 == startAt &&
        first == true
      ) {
        currents = {
          สาขา: dataChart[0].major,
          ปี: dataChart[idx + 1].year,
          ภาค: dataChart[idx + 1].term,
          ค่าใช้จ่าย: dataChart[0].sum_cost,
        };
        // console.log("dat.year+1 === startAt is ",dat.year+1, currents)
        first = false;
      } else if (
        dat.year >= startAt &&
        parseInt(dat.year) <= parseInt(startAt) + parseInt(numberOfYearTrue - 1)
      ) {
        // resultArr.push({ปีเทอมการศึกษา:`${dataChart[14].year}(${dataChart[14].term})`,ค่าใช้จ่าย:sum, จำนวนคน :sumPeople})
        //   if(sum == 0) {
        //     currents = {สาขา: dataChart[0].major ,ปี: dataChart[idx].year, ภาค:dataChart[idx].term, จำนวนคน: dataChart[0].count_TA ,ค่าใช้จ่าย:dataChart[0].sum_cost}
        //     console.log("in @ ",idx, sum, currents)
        //   }AA
        // console.log("VV!")
        sum != 0
          ? resultArr.push({
              ปีเทอมการศึกษา: `${currents.ปี}(${currents.ภาค})`,
              ค่าใช้จ่าย: sum,
            })
          : console.log('sum is ', sum);
        currents = {
          สาขา: dat.major,
          ปี: dat.year,
          ภาค: dat.term,
          ค่าใช้จ่าย: dat.sum_cost,
        };
        sum = dat.sum_cost;
        // sumPeople = dat.count_TA
        check = true;
      }

      // else{
      //   setDataBarChart(oldArray => [...oldArray, {ปีเทอมการศึกษา:`${current.ปี}(${current.ภาค})`,ค่าใช้จ่าย:sum, จำนวนคน :sumPeople}])
      //   break
      // }
    });
    if (check)
      resultArr.push({
        ปีเทอมการศึกษา: `${currents.ปี}(${currents.ภาค})`,
        ค่าใช้จ่าย: sum,
      }),
        console.log('e%');
    // console.log(
    //   "result is :",
    //   resultArr,
    //   "and DataChart is ",
    //   dataChart,
    //   "number is ",
    //   numberOfYear,
    //   startAt
    // );
    setDataBarChartTrue(resultArr);
  }

  //console.log("DataChart isss ", dataChart);
  //console.log("DataBarChart is ", dataBarChart);
  //console.log("DataPieChart is ", dataPieChart);
  //console.log("numberOfYear is ", numberOfYear);
  //console.log("startAt is ", startAt);
  //console.log("------------------");
  //console.log("DataChartTrue isss ", dataChartTrue);
  //console.log("DataBarChartTrue is ", dataBarChartTrue);
  //console.log("DataPieChartTrue is ", dataPieChartTrue);
  //console.log("numberOfYearTrue is ", numberOfYearTrue);
  //console.log("startAtTrue is ", startAtTrue);

  return (
    <div>
      <h1>แดชบอร์ด</h1>
      <div style={{ display: 'flex;', flexDirection: 'column' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'white',
              // width: "100%",
              flex: '1',
              margin: '10px',
              padding: '20px',
              flexDirection: 'column',
            }}
          >
            <h4>ค่าใช้จ่ายในแต่ละเทอม</h4>

            <div style={{ display: 'flex', margin: '10px 0 20px 0' }}>
              <div>
                <p style={{ paddingRight: '5px', alignSelf: 'center' }}>
                  ต้องการดูกี่ปี{' '}
                </p>
                <select
                  name="numberOfYear"
                  onChange={(e) => {
                    setNumberOfYear(e.target.value);
                  }}
                  style={{ fontSize: '1rem' }}
                >
                  <option value="All" disabled selected hidden>
                    ปีการศึกษากี่ปี
                  </option>

                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div style={{ margin: '0 15px' }}>
                <p style={{ paddingRight: '5px', alignSelf: 'center' }}>
                  เลือกปีที่ต้องการเริ่มดู{' '}
                </p>
                <select
                  name="year"
                  onChange={(e) => {
                    setStartAt(e.target.value);
                  }}
                  style={{ fontSize: '1rem' }}
                >
                  <option value="All" disabled selected hidden>
                    ปีการศึกษาตั้งเเต่
                  </option>
                  {yearSearch != null
                    ? yearSearch.map((data, index) => {
                        return <option value={data.year}>{data.year}</option>;
                      })
                    : loading}
                </select>
              </div>
              <button
                className="btn btn-success"
                onClick={() => FilterData(numberOfYear, startAt)}
                style={{ padding: '0px 20px', margin: '39px 0 0 0' }}
              >
                ยืนยัน
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '550px',
                height: '450px',
                backgroundColor: 'white',
              }}
            >
              <MyResponsiveBar
                data={dataBarChart}
                selectBar={(e) => {
                  setLabel(e.indexValue);
                  setSelectBarData(
                    dataPieChart.filter((data) => {
                      // second data filter
                      if (e.indexValue == null) {
                        return data;
                      } else if (e.indexValue == data.name) {
                        return data;
                      }
                    })
                  );
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              backgroundColor: 'white',
              // width: "100%",
              flex: '2',
              margin: '10px 10px 10px 0px',
              padding: '20px',
              flexDirection: 'column',
            }}
          >
            <h4>
              ค่าใช้จ่ายของ {label} แยกสาขา<acronym title=""></acronym>
            </h4>

            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '450px',
                backgroundColor: 'white',
                alignItems: 'center',
                margin: '30px 0',
              }}
            >
              <MyResponsivePie data={selectBarData} />
            </div>
          </div>
        </div>

        {/* down-side TRUE*/}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'white',
              // width: "100%",
              flex: '1',
              margin: '0 10px 10px 10px',
              padding: '20px',
              flexDirection: 'column',
            }}
          >
            <h4>ค่าใช้จ่ายในแต่ละเทอม</h4>

            <div style={{ display: 'flex', margin: '10px 0 20px 0' }}>
              <div>
                <p style={{ paddingRight: '5px', alignSelf: 'center' }}>
                  ต้องการดูกี่ปี{' '}
                </p>
                <select
                  name="numberOfYear"
                  onChange={(e) => {
                    setNumberOfYearTrue(e.target.value);
                  }}
                  style={{ fontSize: '1rem' }}
                >
                  <option value="All" disabled selected hidden>
                    ปีการศึกษากี่ปี
                  </option>

                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div style={{ margin: '0 15px' }}>
                <p style={{ paddingRight: '5px', alignSelf: 'center' }}>
                  เลือกปีที่ต้องการเริ่มดู{' '}
                </p>
                <select
                  name="year"
                  onChange={(e) => {
                    setStartAtTrue(e.target.value);
                  }}
                  style={{ fontSize: '1rem' }}
                >
                  <option value="All" disabled selected hidden>
                    ปีการศึกษาตั้งเเต่
                  </option>
                  {yearSearch != null
                    ? yearSearch.map((data, index) => {
                        return <option value={data.year}>{data.year}</option>;
                      })
                    : loading}
                </select>
              </div>
              <button
                className="btn btn-success"
                onClick={() => FilterDataTrue(numberOfYearTrue, startAtTrue)}
                style={{ padding: '0px 20px', margin: '39px 0 0 0' }}
              >
                ยืนยัน
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '550px',
                height: '450px',
                backgroundColor: 'white',
              }}
            >
              <MyResponsiveBar
                data={dataBarChartTrue}
                selectBar={(e) => {
                  setLabelTrue(e.indexValue);
                  setSelectBarDataTrue(
                    dataPieChartTrue.filter((data) => {
                      // second data filter
                      if (e.indexValue == null) {
                        return data;
                      } else if (e.indexValue == data.name) {
                        return data;
                      }
                    })
                  );
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              backgroundColor: 'white',
              // width: "100%",
              flex: '3',
              margin: '0 0 10px 0',
              padding: '20px',
              flexDirection: 'column',
            }}
          >
            <h4>
              ค่าใช้จ่ายของ {labelTrue} แยกสาขาจริง<acronym title=""></acronym>
            </h4>

            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '450px',
                backgroundColor: 'white',
                margin: '30px 0',
                alignItems: 'center',
              }}
            >
              <MyResponsivePie data={selectBarDataTrue} />
            </div>

            <div>
              <div className="input-group mb-3">
                <SelectMajor
                  onChange={(e) => {
                    setMajor(e.target.value);
                  }}
                />
                <select
                  name="year"
                  onChange={(e) => {
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
                  <option value={null} disabled selected hidden>
                    ภาคเรียน
                  </option>

                  <option value="ต้น">ต้น</option>
                  <option value="ปลาย">ปลาย</option>
                </select>
                <input
                  type="number"
                  className="form-control"
                  name="cost"
                  placeholder="ค่าใช้จ่ายจริง"
                  style={{ width: '10' }}
                  onChange={(e) => {
                    setCost(e.target.value);
                  }}
                />
                <button className="btn btn-success" onClick={addExpenses}>
                  ยืนยัน
                </button>
              </div>
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
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-success">นำออกเป็น Excel</button>
    </div>

    // <div style={{ justifyContent: "center", display: "flex" }}>
    //   <div
    //     style = {{
    //       // padding: "20px",
    //       marginLeft: "0px",
    //       width: "590px",
    //       height: "480px",
    //     }}
    //   >
    //     <h1>ค่าใช้จ่ายเเละจำนวน SA</h1>

    //     <div style={{display: "flex", flexDirection: 'row'}}>
    //     <h6>ต้องการดูกี่ปี </h6>
    // <select
    // name="numberOfYear"
    // onChange = { (e) => {
    //   setNumberOfYear(e.target.value);
    // }}>
    //   <option value="All" disabled selected hidden>
    //     ปีการศึกษากี่ปี
    //   </option>

    //   <option value={1}>1</option>
    //   <option value={2}>2</option>
    //   <option value={3}>3</option>
    // </select>

    //   <h6>เลือกปีที่ต้องการเริ่มดู </h6>
    // <select
    //   name="year"
    //   onChange = { (e) => {
    //     setStartAt(e.target.value);
    //   }}
    // >
    //   <option value="All" disabled selected hidden>
    //     ปีการศึกษาตั้งเเต่
    //   </option>
    //   {
    //   yearSearch != null ? yearSearch.map((data, index) => {
    //       return <option value={data.year}>{data.year}</option>
    //     }) : loading
    //   }
    // </select>

    //     <button className="btn btn-success" onClick={() => FilterData(numberOfYear,startAt)}>ยืนยัน</button>
    //     </div>

    //     {/* <select
    //       name="major"
    //       className="form-control"
    //       onChange={(e) => {
    //         setLabel(e.target.value);
    //       }}
    //     >
    //       <option value={null} disabled selected hidden>
    //         เลือกลาเบล
    //       </option>

    //       <option value="haskell">haskell</option>

    //       <option value="lisp">lisp</option>

    //       <option value="scala">scala</option>

    //       <option value="erlang">erlang</option>

    //       <option value="rust">rust</option>
    //     </select> */}
    //     {/*
    //     <MyResponsivePie data={Filter(onData)}/>
    //   <button onClick={()=> haddleChangeA()}>
    //     change data to A
    //   </button>
    //   <button onClick={()=> haddleChangeB()}>
    //     change data to B
    //   </button> */}

    // <MyResponsiveBar
    //   data={dataBarChart}
    //   selectBar={(e) => {
    //     setLabel(e.indexValue);
    //     setSelectBarData(
    //       dataPieChart.filter((data) => { // second data filter
    //         if (e.indexValue == null) {
    //           return data;
    //         } else if (e.indexValue == data.name) {
    //           return data;
    //         }
    //       })
    //     );
    //   }}
    // />

    //     {console.log("count")}
    //   </div>
    //   {/* <div style={{ paddingLeft:'25px',marginLeft: "0px", width: "830px", height: "490px" }}> */}
    //   <div style={{ display:'flex', flex:1 ,flexDirection:"column"}}>
    //     <h1>ค่าใช้จ่ายของ {label} แยกสาขา</h1>
    //     <MyResponsivePie data={selectBarData} />
    //   </div>

    // {/* <div className="input-group mb-3" >
    //   <SelectMajor
    //     onChange={(e) => {
    //       setMajor(e.target.value);
    //     }}
    //   />
    //   <select
    //     name="year"
    //     onChange={(e) => {
    //       setYear(e.target.value);
    //     }}
    //   >
    //     <option value="All" disabled selected hidden>
    //       ปีการศึกษา
    //     </option>
    //     {yearSearch.map((val, key) => {
    //       return <option value={val.year}>{val.year}</option>;
    //     })}
    //   </select>
    //   <select
    //     name="term"
    //     onChange={(e) => {
    //       setTerm(e.target.value);
    //     }}
    //   >
    //     <option value={null} disabled selected hidden>
    //       ภาคเรียน
    //     </option>

    //     <option value="ต้น">ต้น</option>
    //     <option value="ปลาย">ปลาย</option>
    //   </select>
    //   <input
    //     type="number"
    //     className="form-control"
    //     name="cost"
    //     placeholder="ค่าใช้จ่ายจริง"
    //     style={{ width: "10" }}
    //     onChange={(e) => {
    //       setCost(e.target.value);
    //     }}
    //   />
    //   <button className="btn btn-success" onClick={addExpenses} >ยืนยัน</button>
    // </div> */}

    // {success && (
    //     <div className="alert alert-success" role="alert">
    //       {" "}
    //       {success}{" "}
    //     </div>
    //   )}
    //   {error && (
    //       <div className="alert alert-danger" role="alert">
    //         {" "}
    //         {error}
    //         {" "}
    //       </div>
    // )}
    // </div>
  );
}

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
