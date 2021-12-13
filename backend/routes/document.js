var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/getCSV/:major', (req, res) => {
  //console.log('body = ', req.body);
  const { major } = req.params;
  //console.log('body = ', req.params);
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
      //console.log('send = ', { year, term, major });
      db.query(
        `SELECT c.courseId,c.title,c.teacher,c.sec_D,c.day_D,c.start_D,c.end_D,c.sec_P,c.day_P,c.start_P,c.end_P,c.number_D,t.number1,t.number2,t.status FROM courses as c LEFT JOIN teacherapplyta as t ON c.id = t.courseId WHERE c.year = ? and c.term = ? and c.major = ? and t.status = 4`,
        [year, term, major],
        function (error, results, fields) {
          if (error) throw error;
          fetchData = results;
          let reData = [];

          //console.log('results = ', results);
          ////console.log('fetchData = ', fetchData);
          let sum = 0;
          fetchData.map((data) => {
            if (data.sec_D !== '' && data.sec_P !== '') {
              // 800/830
              const length_p = data.sec_P?.split('_').length;
              const sec_Ps = [];
              for (let i = 0; i < length_p; i++) {
                sec_Ps.push({
                  sec_P: data.sec_P?.split('_')[i],
                  day_P: data.day_P?.split('_')[i],
                  start_P: data.start_P?.split('_')[i],
                  end_P: data.end_P?.split('_')[i],
                });
              }
              // ////console.log('secPs  = ', sec_Ps);
              if (data.number2 !== 0) {
                reData.push({
                  รหัสวิชา: data.courseId,
                  ชื่อวิชา: data.title,
                  หมู่เรียน: data.sec_D + '/' + data.sec_P?.replace('_', '/'),
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
                  หมู่เรียน: data.sec_D + '/' + data.sec_P?.replace('_', '/'),
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
              const length_p = data.sec_P?.split('_').length;
              const sec_Ps = [];
              for (let i = 0; i < length_p; i++) {
                sec_Ps.push({
                  sec_P: data.sec_P?.split('_')[i],
                  day_P: data.day_P?.split('_')[i],
                  start_P: data.start_P?.split('_')[i],
                  end_P: data.end_P?.split('_')[i],
                });
              }
              if (data.number2 !== 0) {
                reData.push({
                  รหัสวิชา: data.courseId,
                  ชื่อวิชา: data.title,
                  หมู่เรียน: data.sec_P?.replace('_', '/'),
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
                  หมู่เรียน: data.sec_P?.replace('_', '/'),
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
          // ////console.log('res = ');
          res.json(reData);
        }
      );
    }
  );
});
// ---------------------------------------------------- two
router.get('/getCSVApprove1/:major', (req, res) => {
  const { major } = req.params;
  const year = 2564;
  const term = 'ต้น';

  db.query(
    `SELECT c.courseId,c.title,c.teacher,c.sec_D,c.day_D,c.start_D,c.end_D,c.sec_P,c.day_P,c.start_P,c.end_P,c.number_D,u.idStudent,u.name,u.lastname,u.level,u.nameBank,u.idBank,u.Branch,u.tel FROM users as u INNER JOIN studentapplyta as s ON s.userID = u.id INNER JOIN courses as c ON s.courseId = c.id WHERE s.status = 2 AND c.year = ? and c.term = ?and c.major = ?`,
    [year, term, major],
    function (error, results, fields) {
      //console.log('results1 = ', results);
      res.json({ data: results });
    }
  );

  //console.log('test major = ', major);
  // res.json({data:'eueu'})
});
router.get('/getCSVApprove/:major', (req, res) => {
  const { major } = req.params;
  //console.log('call form ', major);
  const year = 2564;
  // const major = 'วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์';
  const term = 'ต้น';
  let fetchData;
  db.query(
    `SELECT c.id,c.courseId,c.title,c.teacher,c.sec_D,c.day_D,c.start_D,c.end_D,c.sec_P,c.day_P,c.start_P,c.end_P,c.number_D,u.idStudent,u.name,u.lastname,u.level,u.nameBank,u.idBank,u.Branch,u.tel FROM users as u INNER JOIN studentapplyta as s ON s.userID = u.id INNER JOIN courses as c ON s.courseId = c.id WHERE s.status = 2 AND c.year = ? and c.term = ?and c.major = ?`,
    [year, term, major],
    function (error, results, fields) {
      if (results.length) {
        let st1 = [],
          st2 = [];
        // st1 = ปตรี st2 = ปโท
        let reData = [];
        let data;
        let cId = results[0].id;

        results.map((result) => {
          if (result.id !== cId) {
            reData.push({
              st1,
              st2,
              ...data,
            });
            st1 = [];
            st2 = [];
            detail = {};
            cId = result.courseId;

            data = {
              courseId: result.courseId,
              title: result.title,
              teacher: result.teacher,
              sec_D: result.sec_D,
              day_D: result.day_D,
              start_D: result.start_D,
              end_D: result.end_D,

              sec_P: result.sec_P,
              day_P: result.day_P,
              start_P: result.start_P,
              end_P: result.end_P,

              number_D: result.number_D,
            };
            if (result.level === 'ปริญญาตรี') {
              st1.push({
                idStudent: result.idStudent,
                name: result.name,
                lastname: result.lastname,
                nameBank: result.nameBank,
                idBank: result.idBank,
                Branch: result.Branch,
                tel: result.tel,
              });
            }
            if (result.level === 'ปริญญาโท') {
              st2.push({
                idStudent: result.idStudent,
                name: result.name,
                lastname: result.lastname,
                nameBank: result.nameBank,
                idBank: result.idBank,
                Branch: result.Branch,
                tel: result.tel,
              });
            }
          }
          if (result.id === cId) {
            //same
            data = {
              courseId: result.courseId,
              title: result.title,
              teacher: result.teacher,
              sec_D: result.sec_D,
              day_D: result.day_D,
              start_D: result.start_D,
              end_D: result.end_D,

              sec_P: result.sec_P,
              day_P: result.day_P,
              start_P: result.start_P,
              end_P: result.end_P,

              number_D: result.number_D,
            };
            if (result.level === 'ปริญญาตรี') {
              st1.push({
                idStudent: result.idStudent,
                name: result.name,
                lastname: result.lastname,
                nameBank: result.nameBank,
                idBank: result.idBank,
                Branch: result.Branch,
                tel: result.tel,
              });
            }
            if (result.level === 'ปริญญาโท') {
              st2.push({
                idStudent: result.idStudent,
                name: result.name,
                lastname: result.lastname,
                nameBank: result.nameBank,
                idBank: result.idBank,
                Branch: result.Branch,
                tel: result.tel,
              });
            }
          }
        });

        if (st1.length || st2.length) {
          reData.push({
            ...data,
            st1,
            st2,
          });
        }

        let leftObj;
        let leftObj2;
        let sum = 0;
        let pushData = [];
        //console.log('after Redata = ', reData);
        reData.map((data) => {
          leftObj = [];
          //console.log('DATAMAP  = ', data);
          if (data.st1.length > 0) {
            const hr = 2;
            const price = 30;
            if (data.sec_D !== '' && data.sec_P !== '') {
              // -------------------------------------- CASE 1 ---------------------------
              ////console.log('case 1');
              ////console.log('data = ', data);
              //console.log('data.sec_P = ', data.sec_P);
              const sec_Ps = [];
              const length_p = data.sec_P?.split('_').length;

              for (let i = 0; i < length_p; i++) {
                sec_Ps.push({
                  sec_P: data.sec_P?.split('_')[i],
                  day_P: data.day_P?.split('_')[i],
                  start_P: data.start_P?.split('_')[i],
                  end_P: data.end_P?.split('_')[i],
                });
              }

              leftObj.push({
                รหัสวิชา: data.courseId,
                ชื่อวิชา: data.title,
                หมู่เรียน: data.sec_D + '/' + data.sec_P?.replace('_', '/'),
                'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                'วัน ปฎิบัติงาน': data.day_D,
                'เวลา ปฎิบัติงาน': data.start_D + '-' + data.end_D,
                'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                'จำนวนนิสิตช่วยงาน(คน)': data.st1.length,
                'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': hr,
                'อัตราจ้างต่อชั่วโมง(บาท)': price,
                'รวม15ครั้งเป็นเงิน(บาท)': 15 * price * 5 * data.st1.length,
              });

              sec_Ps.map((item) => {
                leftObj.push({
                  'วัน ปฎิบัติงาน': item.day_P,
                  'เวลา ปฎิบัติงาน': item.start_P + '-' + item.end_P,
                });
              });

              let n = 0;
              data.st1.map((d1, idx) => {
                // specific case
                if (data.courseId === '03602362') {
                  sum += 15 * price * 4;
                } else {
                  sum += 15 * price * 5;
                }
                n++;

                if (leftObj[idx] != undefined) {
                  ////console.log('ps1');
                  pushData.push({
                    ...leftObj[idx],
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    },
                  });
                } else {
                  pushData.push(
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    }
                  );
                }
              });
              leftObj = leftObj.slice(n);
              if (leftObj.length) {
                leftObj.map((i) => {
                  pushData.push(i);
                });
              }
              // if (pushData.length < leftObj.length) {
              //   // have only 1 student but have to have 2 lines
              //   for (let i = pushData.length; i < leftObj.length; i++) {
              //     pushData.push(leftObj[i]);
              //   }
              // }
              // //console.log('push : ', pushData);
            } else if (data.sec_D !== '' && data.sec_P === '') {
              // CASE 2 D & !P
              leftObj = {
                รหัสวิชา: data.courseId,
                ชื่อวิชา: data.title,
                หมู่เรียน: data.sec_D,
                'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                'วัน ปฎิบัติงาน': data.day_D,
                'เวลา ปฎิบัติงาน': data.start_D + '-' + data.end_D,
                'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                'จำนวนนิสิตช่วยงาน(คน)': data.st1.length,
                'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': hr,
                'อัตราจ้างต่อชั่วโมง(บาท)': price,
                'รวม15ครั้งเป็นเงิน(บาท)': 15 * price * 2 * data.st1.length,
              };
              data.st1.map((d1, idx) => {
                sum += 15 * price * 2 * data.st1.length;
                if (idx === 0) {
                  pushData.push({
                    ...leftObj,
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    },
                  });
                } else {
                  pushData.push(
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    }
                  );
                }
              });
            } else if (data.sec_D === '' && data.sec_P !== '') {
              // CASE 3 !D & P
              const sec_Ps = [];
              const length_p = data.sec_P?.split('_').length;

              for (let i = 0; i < length_p; i++) {
                sec_Ps.push({
                  sec_P: data.sec_P?.split('_')[i],
                  day_P: data.day_P?.split('_')[i],
                  start_P: data.start_P?.split('_')[i],
                  end_P: data.end_P?.split('_')[i],
                });
              }

              leftObj.push({
                รหัสวิชา: data.courseId,
                ชื่อวิชา: data.title,
                หมู่เรียน: data.sec_D,
                'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                'วัน ปฎิบัติงาน': data.day_P,
                'เวลา ปฎิบัติงาน': data.start_P + '-' + data.end_P,
                'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                'จำนวนนิสิตช่วยงาน(คน)': data.st1.length,
                'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': hr,
                'อัตราจ้างต่อชั่วโมง(บาท)': price,
                'รวม15ครั้งเป็นเงิน(บาท)': 15 * price * 3 * data.st1.length,
              });
              sec_Ps.map((item, idx) => {
                if (idx !== 0) {
                  leftObj.push({
                    'วัน ปฎิบัติงาน': item.day_P,
                    'เวลา ปฎิบัติงาน': item.start_P + '-' + item.end_P,
                  });
                }
              });
              data.st1.map((d1, idx) => {
                // specific case
                if (data.courseId === '03602312') {
                  sum += 15 * price * 2;
                } else {
                  sum += 15 * price * 3;
                }

                if (leftObj[idx] !== undefined) {
                  pushData.push({
                    ...leftObj[idx],
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    },
                  });
                } else {
                  pushData.push(
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    }
                  );
                }
                for (let i = pushData.length; i < leftObj.length; i++) {
                  pushData.push(leftObj[i]);
                }
              });
            }
          }
          if (data.st2.length > 0) {
            // have ป โท
            const hr = 3;
            const price = 40;
            if (data.sec_D !== '' && data.sec_P !== '') {
              // --------------------------------------- CASE 1 ---------------------------------
              ////console.log('data = ', data);

              const sec_Ps = [];
              const length_p = data.sec_P?.split('_').length;

              for (let i = 0; i < length_p; i++) {
                sec_Ps.push({
                  sec_P: data.sec_P?.split('_')[i],
                  day_P: data.day_P?.split('_')[i],
                  start_P: data.start_P?.split('_')[i],
                  end_P: data.end_P?.split('_')[i],
                });
              }
              //console.log('sec_Ps = ', sec_Ps);

              leftObj.push({
                รหัสวิชา: data.courseId,
                ชื่อวิชา: data.title,
                หมู่เรียน: data.sec_D + '/' + data.sec_P?.replace('_', '/'),
                'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                'วัน ปฎิบัติงาน': data.day_D,
                'เวลา ปฎิบัติงาน': data.start_D + '-' + data.end_D,
                'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                'จำนวนนิสิตช่วยงาน(คน)': data.st2.length,
                'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': hr,
                'อัตราจ้างต่อชั่วโมง(บาท)': price,
                'รวม15ครั้งเป็นเงิน(บาท)': 15 * price * 5 * data.st2.length,
              });
              // ////console.log('leftObj = ', leftObj);
              sec_Ps.map((item) => {
                leftObj.push({
                  'วัน ปฎิบัติงาน': item.day_P,
                  'เวลา ปฎิบัติงาน': item.start_P + '-' + item.end_P,
                });
              });
              let n = 0;
              data.st2.map((d1, idx) => {
                sum += 15 * price * 5;
                n++;
                if (leftObj[idx] != undefined) {
                  ////console.log('ps1');
                  pushData.push({
                    ...leftObj[idx],
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    },
                  });
                } else {
                  pushData.push(
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    }
                  );
                }
              });
              leftObj = leftObj.slice(n);
              if (leftObj.length) {
                leftObj.map((i) => pushData.push(i));
              }
              if (pushData.length < leftObj.length) {
                // have only 1 student but have to have 2 lines
                for (let i = pushData.length; i < leftObj.length; i++) {
                  pushData.push(leftObj[i]);
                }
              }
            } else if (data.sec_D !== '' && data.sec_P === '') {
              //  ---------------------------------- CASE 2 ---------------------------------------
              leftObj = {
                รหัสวิชา: data.courseId,
                ชื่อวิชา: data.title,
                หมู่เรียน: data.sec_D,
                'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                'วัน ปฎิบัติงาน': data.day_D,
                'เวลา ปฎิบัติงาน': data.start_D + '-' + data.end_D,
                'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                'จำนวนนิสิตช่วยงาน(คน)': data.st2.length,
                'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': hr,
                'อัตราจ้างต่อชั่วโมง(บาท)': price,
                'รวม15ครั้งเป็นเงิน(บาท)': 15 * price * 5 * data.st2.length,
              };
              data.st2.map((d1, idx) => {
                sum += 15 * price * 2;
                if (idx === 0) {
                  pushData.push({
                    ...leftObj,
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    },
                  });
                } else {
                  pushData.push(
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    }
                  );
                }
              });
            } else if (data.sec_D === '' && data.sec_P !== '') {
              // -------------------------------- CASE 3 --------------------------------
              const sec_Ps = [];
              const length_p = data.sec_P?.split('_').length;

              for (let i = 0; i < length_p; i++) {
                sec_Ps.push({
                  sec_P: data.sec_P?.split('_')[i],
                  day_P: data.day_P?.split('_')[i],
                  start_P: data.start_P?.split('_')[i],
                  end_P: data.end_P?.split('_')[i],
                });
              }

              leftObj.push({
                รหัสวิชา: data.courseId,
                ชื่อวิชา: data.title,
                หมู่เรียน: data.sec_D,
                'ชื่อ-สกุล อาจารย์ผู้สอน': data.teacher,
                'วัน ปฎิบัติงาน': data.day_P,
                'เวลา ปฎิบัติงาน': data.start_P + '-' + data.end_P,
                'จำนวนนิสิตลงทะเบียน(คน)': data.number_D,
                'จำนวนนิสิตช่วยงาน(คน)': data.st2.length,
                'จำนวนชั่วโมงการทำงาน(ชั่วโมง/คน/สัปดาห์)': hr,
                'อัตราจ้างต่อชั่วโมง(บาท)': price,
                'รวม15ครั้งเป็นเงิน(บาท)': 15 * price * 5 * data.st2.length,
              });
              sec_Ps.map((item, idx) => {
                if (idx !== 0) {
                  leftObj.push({
                    'วัน ปฎิบัติงาน': item.day_P,
                    'เวลา ปฎิบัติงาน': item.start_P + '-' + item.end_P,
                  });
                }
              });
              data.st1.map((d1, idx) => {
                sum += 15 * price * 3;
                if (leftObj[idx] !== undefined) {
                  pushData.push({
                    ...leftObj[idx],
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    },
                  });
                } else {
                  pushData.push(
                    ...{
                      รหัสนิสิต: d1.idStudent,
                      'ชื่อ-สกุลนิสิต': d1.name + ' ' + d1.lastname,
                      ธนาคาร: d1.nameBank,
                      เลขบัญชี: d1.idBank,
                      สาขา: d1.Branch,
                      เบอร์โทรศัพท์: d1.tel,
                    }
                  );
                }
                for (let i = pushData.length; i < leftObj.length; i++) {
                  pushData.push(leftObj[i]);
                }
              });
            }
          }
        });
        console.log('before push :', pushData);
        pushData.push({
          'อัตราจ้างต่อชั่วโมง(บาท)': 'รวมเป็นเงิน',
          'รวม15ครั้งเป็นเงิน(บาท)': sum,
        });
        // //console.log('pushData = ', pushData);
        res.json(pushData);
      } else {
        res.json([]);
      }
    }
  );
});

module.exports = router;
