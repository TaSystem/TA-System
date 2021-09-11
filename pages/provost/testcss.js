import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDetailNisit } from "../../redux/actions/nisitAction";
import { useSession } from "next-auth/client";

function testcss(props) {

    const [session, loading] = useSession();
    useEffect(() => {
      if (session) {
        props.getDetailNisit(session.user.email)
      }
  
    }, [loading]);

    
    return (
        <div style={{justifyContent:'center',display:'flex',flexDirection:'column'}}>
            <div style={{flex:'1',backgroundColor:'red'}}>
                a
            </div>
            <div style={{flex:'2',backgroundColor:'blue'}}>
                b
            </div>
            <div style={{flex:'3',backgroundColor:'black'}}>
                c
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    nisit: state.nisit.nisit,
  });
  
  const mapDispatchToProps = {
    getDetailNisit: getDetailNisit,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(testcss);
  