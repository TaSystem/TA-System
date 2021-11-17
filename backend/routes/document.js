var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/getCSV/:major', (req, res) => {
  console.log('body = ',req.body)
  const { major } = req.params;
  let cate;
  if (major !== 'วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ') {
    cate = '0';
  } else {
    cate = '1';
  }
  let fetchData;
  db.query(
    `SELECT * FROM datestudy as d WHERE d.STATUS = 1 AND d.category = ?`,
    [cate],
    function (e, r, f) {
      let { year, term } = r[0];
      console.log('send = ',{ year, term ,major})
      db.query(
        `SELECT c.courseId,c.title,c.teacher,c.sec_D,c.day_D,c.start_D,c.end_D,c.sec_P,c.day_P,c.start_P,c.end_P,c.number_D,t.number1,t.number2,t.status FROM courses as c LEFT JOIN teacherapplyta as t ON c.id = t.courseID WHERE c.year = ? and c.term = ? and c.major = ? and t.status = 4`,
        [year, term, major],
        function (error, results, fields) {
          if (error) throw error;
          fetchData = results;
          let reData = [];
          
          console.log('results = ',results)
          //console.log('fetchData = ', fetchData);
          let sum = 0;
          fetchData.map((data) => {
            if (data.sec_D !== '' && data.sec_P !== '') {
              // 800/830
              const length_p = data.sec_P.split('_').length;
              const sec_Ps = [];
              for (let i = 0; i < length_p; i++) {
                sec_Ps.push({
                  sec_P: data.sec_P.split('_')[i],
                  day_P: data.day_P.split('_')[i],
                  start_P: data.start_P.split('_')[i],
                  end_P: data.end_P.split('_')[i],
                });
              }
              // //console.log('secPs  = ', sec_Ps);
              if (data.number2 !== 0) {
                reData.push({
                  รหัสวิชา: data.courseId,
                  ชื่อวิชา: data.title,
                  หมู่เรียน: data.sec_D + '/' + data.sec_P.replace('_', '/'),
                  'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                  'วัน ปฎิบัติงาน': data.day_D,
                  'เวลา ปฎิบัติงาน': data.start_D + '-' + data.end_D,
                  'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                  'จำนวนนิสิตช่วยงาน(คน)': data.number2,
                  'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': 5,
                  'อัตราจ้างต่อชั่วโมง(บาท)': 40,
                  'รวม15ครั้งเป็นเงิน(บาท)': 15 * 40 * 5 * data.number1,
                });
                sec_Ps.map((item) => {
                  reData.push({
                    รหัสวิชา: '',
                    ชื่อวิชา: '',
                    หมู่เรียน: '',
                    'ชื่อ-สกุล อาจารย์ผู้สอน': '',
                    'วัน ปฎิบัติงาน': item.day_P,
                    'เวลา ปฎิบัติงาน': item.start_P + '-' + item.end_P,
                    'จำนวนนิสิตลงทะเบียน(คน)': '',
                    'จำนวนนิสิตช่วยงาน(คน)': '',
                    'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': '',
                    'อัตราจ้างต่อชั่วโมง(บาท)': '',
                    'รวม15ครั้งเป็นเงิน(บาท)': '',
                  });
                });

                sum += 15 * 40 * 5 * data.number1;
              }
              if (data.number1 !== 0) {
                reData.push({
                  รหัสวิชา: data.courseId,
                  ชื่อวิชา: data.title,
                  หมู่เรียน: data.sec_D + '/' + data.sec_P.replace('_', '/'),
                  'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                  'วัน ปฎิบัติงาน': data.day_D,
                  'เวลา ปฎิบัติงาน': data.start_D + '-' + data.end_D,
                  'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                  'จำนวนนิสิตช่วยงาน(คน)': data.number1,
                  'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': 5,
                  'อัตราจ้างต่อชั่วโมง(บาท)': 30,
                  'รวม15ครั้งเป็นเงิน(บาท)': 15 * 30 * 5 * data.number1,
                });
                sec_Ps.map((item) => {
                  reData.push({
                    รหัสวิชา: '',
                    ชื่อวิชา: '',
                    หมู่เรียน: '',
                    'ชื่อ-สกุล อาจารย์ผู้สอน': '',
                    'วัน ปฎิบัติงาน': item.day_P,
                    'เวลา ปฎิบัติงาน': item.start_P + '-' + item.end_P,
                    'จำนวนนิสิตลงทะเบียน(คน)': '',
                    'จำนวนนิสิตช่วยงาน(คน)': '',
                    'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': '',
                    'อัตราจ้างต่อชั่วโมง(บาท)': '',
                    'รวม15ครั้งเป็นเงิน(บาท)': '',
                  });
                });
                sum += 15 * 30 * 5 * data.number1;
              }
            } else if (data.sec_D !== '' && data.sec_P === '') {
              // 800
              if (data.number2 !== 0) {
                reData.push({
                  รหัสวิชา: data.courseId,
                  ชื่อวิชา: data.title,
                  หมู่เรียน: data.sec_D,
                  'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                  'วัน ปฎิบัติงาน': data.day_D,
                  'เวลา ปฎิบัติงาน': data.start_D + '-' + data.end_D,
                  'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                  'จำนวนนิสิตช่วยงาน(คน)': data.number2,
                  'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': 3,
                  'อัตราจ้างต่อชั่วโมง(บาท)': 40,
                  'รวม15ครั้งเป็นเงิน(บาท)': 15 * 40 * 5 * data.number2,
                });
                sum += 15 * 40 * 5 * data.number1;
              }
              if (data.number1 !== 0) {
                reData.push({
                  รหัสวิชา: data.courseId,
                  ชื่อวิชา: data.title,
                  หมู่เรียน: data.sec_D,
                  'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                  'วัน ปฎิบัติงาน': data.day_D,
                  'เวลา ปฎิบัติงาน': data.start_D + '-' + data.end_D,
                  'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                  'จำนวนนิสิตช่วยงาน(คน)': data.number1,
                  'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': 3,
                  'อัตราจ้างต่อชั่วโมง(บาท)': 30,
                  'รวม15ครั้งเป็นเงิน(บาท)': 15 * 30 * 5 * data.number1,
                });
                sum += 15 * 30 * 5 * data.number1;
              }
            } else if (data.sec_D === '' && data.sec_P !== '') {
              // 830
              const length_p = data.sec_P.split('_').length;
              const sec_Ps = [];
              for (let i = 0; i < length_p; i++) {
                sec_Ps.push({
                  sec_P: data.sec_P.split('_')[i],
                  day_P: data.day_P.split('_')[i],
                  start_P: data.start_P.split('_')[i],
                  end_P: data.end_P.split('_')[i],
                });
              }
              if (data.number2 !== 0) {
                reData.push({
                  รหัสวิชา: data.courseId,
                  ชื่อวิชา: data.title,
                  หมู่เรียน: data.sec_P.replace('_', '/'),
                  'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                  'วัน ปฎิบัติงาน': sec_Ps[0].day_P,
                  'เวลา ปฎิบัติงาน': sec_Ps[0].start_P + '-' + sec_Ps[0].end_P,
                  'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                  'จำนวนนิสิตช่วยงาน(คน)': data.number2,
                  'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': 2,
                  'อัตราจ้างต่อชั่วโมง(บาท)': 40,
                  'รวม15ครั้งเป็นเงิน(บาท)': 15 * 40 * 5 * data.number2,
                });

                sec_Ps.map((item, idx) => {
                  idx > 0
                    ? reData.push({
                        รหัสวิชา: '',
                        ชื่อวิชา: '',
                        หมู่เรียน: '',
                        'ชื่อ-สกุล อาจารย์ผู้สอน': '',
                        'วัน ปฎิบัติงาน': item.day_P,
                        'เวลา ปฎิบัติงาน': item.start_P + '-' + item.end_P,
                        'จำนวนนิสิตลงทะเบียน(คน)': '',
                        'จำนวนนิสิตช่วยงาน(คน)': '',
                        'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': '',
                        'อัตราจ้างต่อชั่วโมง(บาท)': '',
                        'รวม15ครั้งเป็นเงิน(บาท)': '',
                      })
                    : '';
                });

                sum += 15 * 40 * 5 * data.number2;
              }
              if (data.number1 !== 0) {
                reData.push({
                  รหัสวิชา: data.courseId,
                  ชื่อวิชา: data.title,
                  หมู่เรียน: data.sec_P.replace('_', '/'),
                  'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                  'วัน ปฎิบัติงาน': data.day_P,
                  'เวลา ปฎิบัติงาน': data.start_P + '-' + data.end_P,
                  'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                  'จำนวนนิสิตช่วยงาน(คน)': data.number1,
                  'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': 2,
                  'อัตราจ้างต่อชั่วโมง(บาท)': 30,
                  'รวม15ครั้งเป็นเงิน(บาท)': 15 * 30 * 5 * data.number1,
                });
                sec_Ps.map((item, idx) => {
                  idx > 0
                    ? reData.push({
                        รหัสวิชา: '',
                        ชื่อวิชา: '',
                        หมู่เรียน: '',
                        'ชื่อ-สกุล อาจารย์ผู้สอน': '',
                        'วัน ปฎิบัติงาน': item.day_P,
                        'เวลา ปฎิบัติงาน': item.start_P + '-' + item.end_P,
                        'จำนวนนิสิตลงทะเบียน(คน)': '',
                        'จำนวนนิสิตช่วยงาน(คน)': '',
                        'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': '',
                        'อัตราจ้างต่อชั่วโมง(บาท)': '',
                        'รวม15ครั้งเป็นเงิน(บาท)': '',
                      })
                    : '';
                });
                sum += 15 * 30 * 5 * data.number1;
              }
            }
          });
          reData.push({
            'อัตราจ้างต่อชั่วโมง(บาท)': 'รวมเป็นเงิน',
            'รวม15ครั้งเป็นเงิน(บาท)': sum,
          });
          // //console.log('res = ');
          res.json(reData);
        }
      );
    }
  );
});

module.exports = router;
