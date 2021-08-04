import React from "react";
import Image from "next/image";
import pwit from "../../img/pwit.png";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { AtmSharp } from "@material-ui/icons";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setRegisterNisit } from "../../redux/actions/nisitAction";
import styles from "../../styles/registerNisit.module.css";


function registerNisit(props) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  // const [path, setPath] = useState(0)
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [idStudent, setIdStudent] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [tel, setTel] = useState("");
  const router = useRouter()


  // const router = useRouter()
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("http://localhost:3000/api/secret");
  //     const json = await res.json();
  //     if (json.content) {
  //       setContent(json.content);
  //       console.log("in useEffect");
  //     }
  //   };
  //   fetchData();
  // }, [session]);

  
  // useEffect(() => {
    
  //   return () => {
      
  //   }
  // }, [loading])

  useEffect(() => {
    console.log("in useEffect level", level);
    console.log("in useEffect major", department);

  }, [level,department]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      id: props.nisit.userID,
      name: name,
      lastname: lastname,
      idStudent: idStudent,
      level: level,
      department: department,
      tel: tel,
    };
    console.log("handleSubmit ", user);
    props.setRegisterNisit(user)
  };

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    console.log("in that case");
    return (
      <div>
        <h2>You aren't signed in, please sign in first</h2>
      </div>
    );
  }
  console.log('register Nisit ', props)

  return (
    <div className={styles.gridView}>
      <div className={styles.col4} style={{ backgroundColor: "#7a0117" }}>
        <Image
          src={pwit}
          alt="pwit"
          style={{ maxWidth: "100%", maxHeight: "100" }}
        />
      </div>
      {/* {console.log('props in register ',props.nisit)} */}
      {/* <form noValidate onSubmit={handleSubmit}> */}
      <div className={styles.col8} style={{ backgroundColor: "white" }}>
        <figure className={`${styles.col8__item1} ${styles.col8__item1}`}>
          <h1 className={styles.registerH1}>กรอกข้อมูลนิสิต</h1>
        </figure>
        <figure className={`${styles.col8__item1} ${styles.col8__item2}`}>
          <h2 className={styles.registerH2}>กรอกข้อมูลนิสิต</h2>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item3}`}>
          <h3 className={styles.registerH3}>ชื่อ</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item4}`}>
          <input
            className={styles.registerInput}
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item5}`}>
          <h3 className={styles.registerH3}>นามสกุล</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item6}`}>
          <input
            className={styles.registerInput}
            type="text"
            id="surname"
            name="surname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item7}`}>
          <h3 className={styles.registerH3}>รหัสนิสิต</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item8}`}>
          <input
            className={styles.registerInput}
            type="text"
            id="stuID"
            name="stuID"
            onChange={(e) => setIdStudent(e.target.value)}
          />
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item9}`}>
          <h3 className={styles.registerH3}>เบอร์โทรศัพท์</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item10}`}>
          <input
            className={styles.registerInput}
            type="text"
            id="tel"
            name="tel"
            onChange={(e) => setTel(e.target.value)}
          />
        </figure>

        <figure className={`${styles.col8__item} ${styles.col8__item11}`}>
          <h3 className={styles.registerH3}>ระดับการศึกษา</h3>
        </figure>

        {/* <figure className={`${styles.col8__item} ${styles.col8__item12}`}>
          <input
            className={styles.registerInput}
            type="text"
            id="knowledge"
            name="knowledge"
            onChange={(e) => setLevel(e.target.value)}
          />
        </figure> */}
        {console.log(level)}
        <figure className={`${styles.col8__item} ${styles.col8__item12}`}>
          <div className={styles.selectBox__current} tabindex="1">
            {/* <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="k0"
                value="1"
                name="knowledge"
                checked="checked"
                onChange={(e) => setLevel(e.target.value)}
              />
              <p className={styles.selectBox__inputText}>เลือกระดับการศึกษา</p>
            </div> */}
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="k1"
                value="ปริญญาตรี"
                name="knowledge"
                // checked="checked"
                onChange={(e) => setLevel(e.target.value)}
              />
              <p className={styles.selectBox__inputText}>ปริญญาตรี</p>
            </div>
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="k2"
                value="ปริญญาโท"
                name="knowledge"
                // checked="checked"
                onChange={(e) => setLevel(e.target.value)}
              />
              <p className={styles.selectBox__inputText}>ปริญญาโท</p>
            </div>
            <img
              className={styles.selectBox__icon}
              src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
              alt="Arrow Icon"
              aria-hidden="true"
            />
          </div>
          <ul className={styles.selectBox__list}>
            <li>
              <label
                className={styles.selectBox__option}
                for="k1"
                aria-hidden="aria-hidden"
              >
                ปริญญาตรี
              </label>
            </li>
            <li>
              <label
                className={styles.selectBox__option}
                for="k2"
                aria-hidden="aria-hidden"
              >
                ปริญญาโท
              </label>
            </li>
          </ul>
        </figure>

        <figure className={`${styles.col8__item} ${styles.col8__item13}`}>
          <h3 className={styles.registerH3}>ภาควิชา</h3>
        </figure>
        {/* <figure className={`${styles.col8__item} ${styles.col8__item14}`}>
          <input
            className={styles.registerInput}
            type="text"
            id="major"
            name="major"
            onChange={(e) => setDepartment(e.target.value)}
          />
        </figure> */}

        <figure class={`${styles.col8__item} ${styles.col8__item14}`}>
          <div class={styles.selectBox__current} tabindex="1">
            {/* <div class={styles.selectBox__value}>
              <input
                class={styles.selectBox__input}
                type="radio"
                id="m0"
                value="1"
                name="major"
                checked="checked"
              />
              <p class={styles.selectBox__inputText}>เลือกภาคการศึกษา</p>
            </div> */}
            <div class={styles.selectBox__value}>
              <input
                class={styles.selectBox__input}
                type="radio"
                id="m1"
                value="คอมพิวเตอร์"
                name="major"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <p class={styles.selectBox__inputText}>คอมพิวเตอร์</p>
            </div>
            <div class={styles.selectBox__value}>
              <input
                class={styles.selectBox__input}
                type="radio"
                id="m2"
                value="อุต"
                name="major"
                onChange={(e) => setDepartment(e.target.value)}
              />
              <p class={styles.selectBox__inputText}>อุต</p>
            </div>
            <img
              class={styles.selectBox__icon}
              src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
              alt="Arrow Icon"
              aria-hidden="true"
            />
          </div>
          <ul class={styles.selectBox__list}>
            <li>
              <label
                class={styles.selectBox__option}
                for="m1"
                aria-hidden="aria-hidden"
              >
                คอมพิวเตอร์
              </label>
            </li>
            <li>
              <label
                class={styles.selectBox__option}
                for="m2"
                aria-hidden="aria-hidden"
              >
                อุต
              </label>
            </li>
          </ul>
        </figure>

        <figure className={`${styles.col8__item} ${styles.col8__item15}`}>
          <button
            className={styles.registerButton}
            type="submit"
            id="submit"
            onClick={()=>{if (window.confirm('ต้องการยืนยันวิชา: '+val.title))handleSubmit}}
          >
            ต่อไป
          </button>
        </figure>
      </div>
      {/* </form> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispathToProps = {
  setRegisterNisit: setRegisterNisit,
};

export default connect(mapStateToProps, mapDispathToProps)(registerNisit);
