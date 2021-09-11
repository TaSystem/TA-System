import React from "react";
import Image from "next/image";
import pwit from "../../img/pwit.png";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { AtmSharp } from "@material-ui/icons";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setRegisterNisit ,getDetailNisit} from "../../redux/actions/nisitAction";
import styles from "../../styles/registerProvost.module.css";

function registerProvost(props) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [idStudent, setIdStudent] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [tel, setTel] = useState("");

  // const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/secret");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
        console.log("in useEffect");
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    console.log("in useEffect level", level);
    console.log("in useEffect major", department);
  }, [level, department]);

  useEffect(() => {
    if (session) {
      props.getDetailNisit(session.user.email)
    }

  }, [loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      id: props.nisit.result[0].userID,
      name: name,
      lastname: lastname,
      idStudent: idStudent,
      level: level,
      department: department,
      tel: tel,
    };
    console.log("handleSubmit ", user);
    props.setRegisterNisit(user);
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

  return (
    <div className={styles.gridView}>
      <div className={styles.col4} style={{ backgroundColor: "#7a0117" }}>
        <Image
          src={pwit}
          alt="pwit"
          style={{ maxWidth: "100%", maxHeight: "100" }}
        />
      </div>
      <div className={styles.col8} style={{ backgroundColor: "#fff" }}>
        <figure className={`${styles.col8__item} ${styles.col8__item1}`}>
          <h1 className={styles.h1}>กรอกข้อมูลอาจารย์</h1>
        </figure>
        <figure
          className={`${styles.col8__item} ${styles.col8__item2}`}
        ></figure>
        <figure
          className={`${styles.col8__item} ${styles.col8__item25}`}
        ></figure>
        <figure className={`${styles.col8__item} ${styles.col8__item3}`}>
          <h3 className={styles.h3}>ชื่อ</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item4}`}>
          <input type="text" id="name" name="name" className={styles.input} />
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item5}`}>
          <h3 className={styles.h3}>นามสกุล</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item6}`}>
          <input
            type="text"
            id="surname"
            name="surname"
            className={styles.input}
          />
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item7}`}>
          <h3 className={styles.h3}>เบอร์โทรศัพท์</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item8}`}>
          <input type="text" id="stuID" name="stuID" className={styles.input} />
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item9}`}>
          <h3 className={styles.h3}>ภาควิชา</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item10}`}>
          <input type="text" id="tel" name="tel" className={styles.input} />
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item11}`}>
          <h3 className={styles.h3}>อาจารย์รับผิดชอบระดับการศึกษา</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item12}`}>
          <div className={styles.selectBox__current} tabindex="1">
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="k0"
                value="1"
                name="knowledge"
                checked="checked"
              />
              <p className={styles.selectBox__inputText}>เลือกระดับการศึกษา</p>
            </div>
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectbox__input}
                type="radio"
                id="k1"
                value="2"
                name="knowledge"
              />
              <p className={styles.selectBox__inputText}>ปริญญาตรี</p>
            </div>
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="k2"
                value="3"
                name="knowledge"
              />
              <p className={styles.selectBox__inputText}>ปริญญาโท</p>
            </div>
            {/* <img
              className={styles.selectbox__icon}
              src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
              alt="Arrow Icon"
              aria-hidden="true"
            /> */}
          </div>
          <ul className={styles.selectBox__list} style={{ width: "35%" }}>
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
        <figure className={`${styles.col8__item} ${styles.col8__item15}`}>
          <button type="submit" id="submit" className={styles.button}>
            ต่อไป
          </button>
        </figure>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   nisit: state.nisit,
// });

// const mapDispathToProps = {
//   setRegisterNisit: setRegisterNisit,
// };

const mapStateToProps = (state) => ({
  nisit: state.nisit.nisit,
});

const mapDispatchToProps = {
  getDetailNisit: getDetailNisit,
  setRegisterNisit: setRegisterNisit,
};


export default connect(mapStateToProps, mapDispatchToProps)(registerProvost);
