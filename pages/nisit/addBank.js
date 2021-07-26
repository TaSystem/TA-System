import React from "react";
import Image from "next/image";
// import pwit from "../../Image/pwit.png";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { AtmSharp } from "@material-ui/icons";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setBankNisit } from "../../redux/actions/nisitAction";
import styles from "../../styles/addBank.module.css";
import pwit from "../../img/pwit.png";

function addBank(props) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  // const [id, setId] = useState();
  // const [name, setName] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [idStudent, setIdStudent] = useState("");
  // const [level, setLevel] = useState("");
  // const [department, setDepartment] = useState("");
  // const [tel, setTel] = useState("");

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

  //   useEffect(() => {
  //     console.log("in useEffect level", level);
  //     console.log("in useEffect major", department);

  //   }, [level,department]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      id: props.nisit.nisit.result[0].userID,
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
          className={styles.img}
          src={pwit}
          alt="pwit"
          style={{ maxWidth: "100%", maxHeight: "100" }}
        />
      </div>
      <div className={styles.col8} style={{ backgroundColor: "white" }}>
        <figure className={`${styles.col8__item} ${styles.col8__item1}`}>
          <h1 className={styles.h1}>กรอกข้อมูลธนาคาร</h1>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item2}`}>
          <h2 className={styles.h2}>กรอกข้อมูลนิสิต</h2>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item3}`}>
          <h3 className={styles.h3}>ธนาคาร</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item4}`}>
          <div className={styles.selectBox__current} tabindex="1">
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="b0"
                value="1"
                name="Ben"
                checked="checked"
              />
              <p className={styles.selectBox__inputText}>เลือกธนาคาร</p>
            </div>
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="b1"
                value="2"
                name="Ben"
              />
              <p className={styles.selectBox__inputText}>ธนาคารสีเขียว</p>
            </div>
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="b2"
                value="3"
                name="Ben"
              />
              <p className={styles.selectBox__inputText}>ธนาคารสีม่วง</p>
            </div>
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="b3"
                value="4"
                name="Ben"
              />
              <p className={styles.selectBox__inputText}>ธนาคารสีชมพู</p>
            </div>
            <div className={styles.selectBox__value}>
              <input
                className={styles.selectBox__input}
                type="radio"
                id="b4"
                value="5"
                name="Ben"
              />
              <p className={styles.selectBox__inputText}>ธนาคารสีฟ้า</p>
            </div>
            {/* <img className="styles.selectBox__icon" src="http://cdn.onlinewebfonts.com/svg/Image_295694.svg" alt="Arrow Icon" aria-hidden="true"/> */}
          </div>
          <ul className={styles.selectBox__list}>
            <li>
              <label
                className={styles.selectBox__option}
                for="b1"
                aria-hidden="aria-hidden"
              >
                ธนาคารสีเขียว
              </label>
            </li>
            <li>
              <label
                className={styles.selectBox__option}
                for="b2"
                aria-hidden="aria-hidden"
              >
                ธนาคารสีม่วง
              </label>
            </li>
            <li>
              <label
                className={styles.selectBox__option}
                for="b3"
                aria-hidden="aria-hidden"
              >
                ธนาคารสีชมพู
              </label>
            </li>
            <li>
              <label
                className={styles.selectBox__option}
                for="b4"
                aria-hidden="aria-hidden"
              >
                ธนาคารสีฟ้า
              </label>
            </li>
          </ul>
        </figure>

        <figure className={`${styles.col8__item} ${styles.col8__item5}`}>
          <h3 className={styles.h3}>เลขที่บัญชี</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item6}`}>
          <input
            className={styles.input}
            type="text"
            id="surname"
            name="surname"
          />
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item7}`}>
          <h3 className={styles.h3}>รูปบัตรนิสิตที่ยังไม่หมดอายุ</h3>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item8}`}>
          <h3 className={styles.h3}>รูปบัญชีธนาคาร</h3>
        </figure>

        <figure className={`${styles.col8__item} ${styles.col8__item14}`}>
          <button
            className={styles.button}
            style={{ backgroundColor: "#DBDBDB" }}
            type="submit"
            id="back"
          >
            ย้อนกลับ
          </button>
        </figure>
        <figure className={`${styles.col8__item} ${styles.col8__item15}`}>
          <button
            className={styles.button}
            style={{ backgroundColor: "#2ec068" }}
            type="submit"
            id="submit"
          >
            บันทึก
          </button>
        </figure>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  nisit: state.nisit,
});

const mapDispathToProps = {
  setBankNisit: setBankNisit,
};

export default connect(mapStateToProps, mapDispathToProps)(addBank);
