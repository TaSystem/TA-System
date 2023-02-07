import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import { useSession } from "next-auth/client";
import ExportNisitSA from '../../components/form/ApplicationNisitSA'

function Testcss(props) {
  const data = {
    name: "ปิยวงศ์ มหัทธนสวัสดิ์",
    nisitId: "6130300557",
    major: "วิศวกรรมคอมพิวเตอร์และสารสนเทศ",
    year: "2564",
    tel: "0889325235",
    bank: "กรุงไทย",
    accountNumber: "2442472028"
  };
    const [session, loading] = useSession();
    useEffect(() => {
      if (session) {
        props.getDetailNisit(session.user.email)
      }
  
    }, [loading, props, session]);
    
    
    return (
        <div style={{display:'flex'}}>

          <ExportNisitSA {...data}/>


          
        </div>
    )
}

const mapStateToProps = (state) => ({
    nisit: state.nisit.nisit,
  });
  
  const mapDispatchToProps = {
    getDetailNisit: getDetailNisit,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Testcss);
  