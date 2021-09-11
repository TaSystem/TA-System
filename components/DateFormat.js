import React from 'react'

export default function DateFormat(props) { //รูปแบบตัวอย่าง วันศุกร์ที่ 5 พฤศจิกายน 2564

    const day = (d) =>{
        if(d == 0)  {
          return "อาทิตย์";
        }
        else if(d == 1)  {
          return "จันทร์";
        }
        else if(d == 2){
          return "อังคาร";
        }
        else if(d==3){
          return "พุธ";
        }
        else if(d==4){
          return "พฤหัส";
        }
        else if(d==5){
          return "ศุกร์";
        }
        else if(d==6){
          return "เสาร์";
        }
        
        
    }
    
      const mount = (m) =>{
          if(m == 0)  {
            return "มกราคม";
          }
          else if(m == 1){
            return "กุมภาพันธ์";
          }
          else if(m == 2){
            return "มีนาคม";
          }
          else if(m == 3){
            return "เมษายน";
          }
          else if(m == 4){
            return "พฤษภาคม";
          }
          else if(m == 5){
            return "มิถุนายน";
          }
          else if(m == 6){
            return "กรกฎาคม";
          }
          else if(m == 7){
            return "สิงหาคม";
          }
          else if(m == 8){
            return "กันยายน";
          }
          else if(m == 9){
            return "ตุลาคม";
          }
          else if(m == 10){
            return "พฤศจิกายน";
          }
          else if(m == 11){
            return "ธันวาคม";
          }
      }

    return(
        <div>
            วัน{day(new Date(props.date).getDay())}ที่ {new Date(props.date).getDate()} {mount(new Date(props.date).getMonth())} พ.ศ.{new Date(props.date).getFullYear()+543}
        </div>
    )
}