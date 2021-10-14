import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const styles = {
    root: {
      padding: '100px',
      paddingTop: '50px',
      width: '9.25in',
      height: '7in',
      border: '1px solid black',
    },
    font: {
      fontSize: '10px',
      textAlign: 'center',
      fontFamily: 'Sarabun',
      lineHeight: '20px',
    },
    table: {
      border: '1px solid black',
      borderCollapse: 'collapse',
    },
  };
const header = [
    { label: 'รหัสวิชา', key: 'รหัสวิชา' },
    { label: 'ชื่อวิชา', key: 'ชื่อวิชา' },
    { label: 'หมู่เรียน', key: 'หมู่เรียน' },
    { label: 'ชื่อ-สกุล อาจารย์ผู้สอน', key: 'ชื่อ-สกุล อาจารย์ผู้สอน' },
    { label: 'วัน ปฎิบัติงาน', key: 'วัน ปฎิบัติงาน' },
    { label: 'เวลา ปฎิบัติงาน', key: 'เวลา ปฎิบัติงาน' },
    { label: 'จำนวนนิสิตลงทะเบียน(คน)', key: 'จำนวนนิสิตลงทะเบียน(คน)' },
    { label: 'จำนวนนิสิตช่วยงาน(คน)', key: 'จำนวนนิสิตช่วยงาน(คน)' },
    {
      label: 'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)',
      key: 'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)',
    },
    { label: 'อัตราจ้างต่อชั่วโมง(บาท)', key: 'อัตราจ้างต่อชั่วโมง(บาท)' },
    { label: 'รวม15ครั้งเป็นเงิน(บาท)', key: 'รวม15ครั้งเป็นเงิน(บาท)' },
  ];

  const renderBody = () => {
    return csv1.map((item) => {
      console.log('item = ', item);
      return (
        <tr>
          {header.map((h) => {
            let re = '';
            Object.keys(item).map((key) => {
              if (h.key === key) {
                re = (
                  <td style={styles.table}>
                    <p style={styles.font}>{item[key]}</p>
                  </td>
                );
              }
            });
            if (re) {
              return re;
            } else {
              return <td></td>;
            }
          })}
        </tr>
      );
    });
  };
  
  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div style={styles.root}>
          <p style={{ ...styles.font, fontWeight: 'Bold' }}>
            รายวิชาที่ขอนิสิตช่วยงาน ภาคปลาย ปีการศึกษา 2563
          </p>
          <p style={{ ...styles.font, fontWeight: 'Bold' }}>
            ภาควิชาวิศวกรรมคอมพิวเตอร์
          </p>
          <p style={{ ...styles.font, fontWeight: 'Bold' }}>
            คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
          </p>
          <table style={styles.table}>
            <thead style={{ height: '45px' }}>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>รหัสวิชา</p>
              </th>
              <th style={{ ...styles.table, width: '300px' }}>
                <p style={styles.font}>ชื่อวิชา</p>
              </th>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>หมู่เรียน</p>
              </th>
              <th style={{ ...styles.table, width: '200px' }}>
                <p style={styles.font}>ชื่อ-สกุล อาจารย์ผู้สอน</p>
              </th>
              <th style={{ width: '100px' }}>
                <p style={{ ...styles.font, textAlign: 'end' }}>วัน-เวลา</p>
              </th>
              <th style={{ width: '100px' }}>
                <p style={{ ...styles.font, textAlign: 'start' }}>ปฎิบัติงาน</p>
              </th>
              <th style={{ ...styles.table, width: '65px' }}>
                <p style={styles.font}>จำนวนนิสิตลงทะเบียน (คน)</p>
              </th>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>
                  จำนวนนิสิต
                  <br />
                  ช่วยงาน
                  <br />
                  (คน)
                </p>
              </th>
              <th style={{ ...styles.table, width: '130px' }}>
                <p style={styles.font}>
                  จำนวนชั่วโมง <br />
                  การทำงาน
                  <br /> (ชั่วโมง/คน/สัปดาห์)
                </p>
              </th>
              <th style={{ ...styles.table, width: '75px' }}>
                <p style={styles.font}>
                  อัตราจ้าง
                  <br />
                  ต่อชั่วโมง
                  <br /> (บาท)
                </p>
              </th>
              <th style={{ ...styles.table, width: '70px' }}>
                <p style={styles.font}>
                  รวม15ครั้ง
                  <br />
                  เป็นเงิน(บาท)
                </p>
              </th>
            </thead>
            <tbody style={styles.table}>{renderBody()}</tbody>
          </table>
        </div>

      );
    }
  }
  
  const approveCostPrint = () => {
    const componentRef = useRef();
    return (
      <div>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
        {/* <div style={{ display: 'none' }}> */}
        <ComponentToPrint ref={componentRef} />
        {/* </div> */}
      </div>
    );
  };
export default approveCostPrint;