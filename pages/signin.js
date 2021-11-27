import React, { useEffect, useState } from "react";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import logo from "../img/unnamed.jpg";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Paper, Link, Box, Typography, Container } from "@material-ui/core";
import Image from "next/image";
import Axios from "../config/Axios";
import { connect } from "react-redux";

import store from "../redux/store";
import { setDetailNisit } from "../redux/actions/nisitAction";
import { useRouter } from "next/router";
import { TrainOutlined, TrendingUpTwoTone } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: "20%",
    marginBottom: 30,
    justifyContent: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 0px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    width: "100vW",
  },
});

// function Redirect({ to }) {
//   const router = useRouter();
//   console.log("in useEffect");
//   useEffect(() => {
//     router.push(to);
//   }, [to]);

//   return null;
// }

function SignIn({ providers, csrfToken, data, setDetailNisit }) {
  //{...} in each props
  //console.log(providers);
  const router = useRouter();

  //console.log("route in sign ", router.pathname);

  useEffect(() => {
    // Always do navigations after the first render
    if (data != null) {
      setDetailNisit(data.result[0]);
      //console.log("data in Signin useEffect= ", data.result[0]);
      // return <Redirect to="/" />;
      console.log('ssssa ',data.path)
      return router.push(data.path);
      
    } else {
      //console.log("data = ", data);
    }
  }, [data]);

  const classes = useStyles();
  return (
    <Container maxWidth="100vh" disableGutters style={{ paddingTop: "10vh" }}>
      <Box style={{ textAlign: "center" }}>
        <img
          src="https://www.eng.src.ku.ac.th/wp-content/uploads/2021/01/ENG_th-flat_transparent_1.png?x31307"
          style={{ width: "10%", height: "10%", margin: "10px auto" }}
          alt="Logo"
        />
      </Box>
      <Box style={{ textAlign: "center", width: "100%", margin: "10px auto" }}>
        <h3 style={{ color: "#77879C" }}>
          ระบบคำร้องรับสมัครนิสิตช่วยปฎิบิติงานออนไลน์(SA)
        </h3>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <h2 style={{ color: "#77879C", textAlign: "center" }}>
          <LockOutlinedIcon /> เข้าสู่ระบบด้วยอีเมล
        </h2>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <Box style={{ textAlign: "center" }}>สำหรับนิสิต / อาจารย์</Box>
              <br />
              <Box style={{ textAlign: "center" }}>
                [กรุณาใส่ Email@ku.th + ใช้พาสเวิร์ด Nontri acoount หรือ
                Email@eng.src.ku.ac.th]
              </Box>
            </Typography>
          </CardContent>
          {Object.values(providers).map((provider) => {
            //console.log(provider.name);
            return (
              <Box
                key={provider.name}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Button
                  style={{ border: "2px solid #2ec068", width: "100%" }}
                  variant="outline"
                  onClick={() => signIn(provider.id)}
                >
                  <img
                    style={{
                      width: "3vh",
                      marginRight: 4,
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACvUlEQVRoQ+2ZjW0UMRCFXyqADoAKAhVAB0AFgQoIFQAVkFQAVABUEFIB6SCkgiQVBH3SGq2CPT/2bo5DN9LqpDvv+L2Z8fjZt6ctt70tx68dgU1ncJeB/y0DzyU9lvRsIvZQ0tX08NUPSd8lnS1FfIkSAuwbSS8SoCD1TdIHSb8S7/01dIQAkf44i3Yvjs8jRHoJAPywF3HlPTLyespKym2WwH1Jn5LlkgH0MksiQwDwJ9MizYCKjv0i6VV0cBmXIfB1xch3gYdElMDR1GmiAaq1SrrV04qDbvBRAkxM6Xh2Iem9JLpKyyhDFj/PPUlD4KMEAF82phawLBA2OOodwkPmlVAk+rQ/K+pDAL2XPQLslsiDpSLv4Un/bhGgXi8Nj9Q8pbBRswigbWidLdto6RRQFgHq+qCB/loSGYpYrXVG3itjyHRT8FkEkL6tyTNd5yaDtjL21OqCvQSQwdEWOEqAs8OTVhAsAtbEbyWxO0dslABzNHFaBJC47JY12woC1hq4yxJaZQ0g1qJHyNES6ibgKVBvFy+lF1nsLaWKDzNY/8pG9tM4KJnrzYuilX4W+aPZlUmkI9XGIEfOjZeZo2sjw6cn5titkRQjZp30XL3lZSAip0dIcLDhhqNlx97th0cAx1Y7LROTKTJBWUXNu5pBb5WbvabPCAGvRotzwNO50EmtmkUAcr6gM3lSPLTXRAgAkAnfRUM73X2iYQoRgM/vTD1XoeibGqMygyWvPUCZ3wHP2gtdAEczAACiyHrYz6DpGJs6KGUIFCxrZYLI05VSFwQ9BCDitb9s4On3aKtQ2cyd9xLAB12Exd06dkZIEHU6F0+mBf/xPUKgOGHBcUnF54MIaklEnFLpBl7mWYLAHDOtssjs27d5NIDyz8zQvzJLlVAw2OsOWzoD66KteN8RuPOQ35pwl4FNZ+A3V5WAMeOcSTIAAAAASUVORK5CYII="
                  />
                  <Typography style={{margin:"0 0 0 10px",fontWeight:"600"}}>Sign in with {provider.name}</Typography>
                </Button>
              </Box>
            );
          })}
        </card>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Typography
          color="textSecondary"
          gutterBottom
          style={{ textAlign: "center", margin: "10px auto" }}
        >
          หากท่านไม่ทราบ email@ku.th หรือจำพาสเวิร์ดไม่ได้
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center">
        
          <Typography
            color="textSecondary"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            <Link color="textSecondary" href="https://accounts.ku.ac.th">
              https://accounts.ku.ac.th
             </Link>
            </Typography>
        
      </Box>
    </Container>
  );
}
// SignIn.getInitialProps = ({ reduxStore }) => {
//   reduxStore.dispatch(getDetailNisit())
//   return {};
// };

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  //console.log("getInitialProps session");
  const session = await getSession({ req });
  let data = null;
  if (session && res && session.accessToken) {
    //console.log("inGet session", session);
    let path = "";
    var domain = String(session.user.email).substring(
      String(session.user.email).lastIndexOf("@") + 1
    );
    //console.log("domain", domain);

    await Axios.post("/users/login", {
      email: session.user.email,
      name_email: session.user.name,
      imgURL: session.user.image,
      role: domain.includes("ku.th") ? 5 : 4,
    })
      .then((res) => {
        path = res.data.path;
        data = res.data;
        //console.log("post Complete");
      })
      .catch(() => {
        //console.log("error post");
      });

    return {
      // session: undefined,
      providers: await providers(context),
      csrfToken: await csrfToken(context),
      data: data,
    };
    // await res.writeHead(302, {
    //   Location: `${path}`,
    // });
    // res.end();
    // return {data : 'success'};
  }

  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
    data: data,
  };
};

const mapStateToProps = (state) => ({
  nisit: state.nisit,
});

const mapDispatchToProps = {
  setDetailNisit: setDetailNisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
