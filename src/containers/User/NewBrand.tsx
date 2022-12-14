import { useEffect, useState } from "react";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { Col, Container, Modal, Row } from "react-bootstrap";
import React from "react";
import { APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import { MessageTypes } from '../../model/general';

type NewBrandProps = UserInfo.UserInfoState & {
  match: any;
  location: any;
  history: any;
  showBrand: any;
  hideBrand: any;
} & typeof UserInfo.actionCreators;
interface brandModel {
  name: string;
  nameEn: string;
  des: string;
  image?: fileModel;
}
interface fileModel {
  data: string;
  name: string;
  suffix: string;
  size: number;
}
const NewBrand = (props: NewBrandProps) => {
  const [ShowDialog, setShowDialog] = useState(props.showBrand);
  const [Alert, setAlert] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [allowUpload, setAllowUpload] = useState(true);
  const [Brand, setBrand] = useState<brandModel>({
    name: "",
    nameEn: "",
    imageName: "",
    des: "",
  } as brandModel);
  const nameRef = React.useRef() as React.RefObject<HTMLInputElement>;
  const [valid, setValid] = useState(true);
  const HiBrand = () => {
    props.hideBrand();
    setShowDialog(false);
  };
  const HiAlert = () => {
    props.hideBrand();
    setAlert(false);
  };
  const CheckValid = (brd: brandModel) => {
    if (
      brd.name.length > 0 &&
      brd.nameEn.length > 0 &&
      brd.des.length > 0 &&
      (brd.image && brd.image.data.length > 0 )
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  };
  function HandlerName(e: any) {

    setBrand({
      name: e.currentTarget.value,
      nameEn: Brand.nameEn,
      des: Brand.des,
      image:Brand.image
    });
    CheckValid({
      name: e.currentTarget.value,
      nameEn: Brand.nameEn,
      des: Brand.des,
      image:Brand.image
    });
  }
  function HandlerNameEn(e: any) {
    setBrand({
      nameEn: e.currentTarget.value,
      name: Brand.name,
      des: Brand.des,
      image:Brand.image
    });
    CheckValid({
      nameEn: e.currentTarget.value,
      name: Brand.name,
      des: Brand.des,
      image:Brand.image
    });
  }
  function HandlerDes(e: any) {
    setBrand({
      nameEn: Brand.nameEn,
      name: Brand.name,
      des: e.currentTarget.value,
      image:Brand.image
    });
    CheckValid({
      nameEn: Brand.nameEn,
      name: Brand.name,
      des: e.currentTarget.value,
      image:Brand.image
    });
  }
  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  function handleUpload() {
    if (nameRef.current !== null) {
      nameRef.current.click();
    }
  }
  function handlerSubmit() {
    props.UserLoad(true)
    let data = {
      Name: Brand.nameEn,
      NameEn: Brand.name,
      Des: Brand.des,
      Files: [Brand.image],
    };
    fetch(APIUrl + "/Brand/SaveBrandSeller", {
      method: "Post",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
        lang: props.lang.abr,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          setShowDialog(false);
          setAlert(true);
          
        }
        else
        {
          props.addMessage([{ msg: responseModel.message.toString(), msgType: MessageTypes.Error }]);
        }
        setBrand({des:'',name:'',nameEn:'',image:undefined});
        setImageUrl('');
        props.UserLoad(false)
      })
      .catch((error) => {
        console.log(error);
        setImageUrl('');
        setBrand({des:'',name:'',nameEn:'',image:undefined});
        props.UserLoad(false)
      });
  }
  function handleChange(event: any) {
    setAllowUpload(true);
    if (event.target.files.length === 1) {
      if (event.target.files[0].name) {
        // this.setState({ counter: event.target.files[0].name.length })
        const size =
          event.target.files[0].size > 0 ? event.target.files[0].size : 1;

        if (size / 1024 > 50) {
          setBrand({
            image: undefined,
            des: Brand.des,
            name: Brand.name,
            nameEn: Brand.nameEn,
          });
          setAllowUpload(false);
          return;
        }
        const names = event.target.files[0].name.split(".");
        const name = names[0];
        const suffix = names[1];
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        toBase64(event.target.files[0]).then((data) => {
          setBrand({
            image: {
              data: data + "",
              name: name,
              size: size,
              suffix: suffix,
            } as fileModel,
            des: Brand.des,
            name: Brand.name,
            nameEn: Brand.nameEn,
          });
          CheckValid({
            image: {
              data: data + "",
              name: name,
              size: size,
              suffix: suffix,
            } as fileModel,
            des: Brand.des,
            name: Brand.name,
            nameEn: Brand.nameEn,
          });
        });
      }
    }
  }
  const AlertModal = (
    <Modal show={true} className="newBrand-Alert " onHide={() => HiAlert()}>
      <Modal.Body>
        <Container>
          <Row>
            <Col lg={12}>
              <p className="newBrand-Alert-p">
                ?????? ???? ?????????? ?? ?????????? ???????????????? ???????? ???????????????? ?????? ???????? ?????????????? ????
                ????????
              </p>
            </Col>
            <Col lg={4}></Col>
            <Col lg={4}>
              <button className="newBrand-Alert-btn" onClick={HiAlert}>?????????? ??????</button>
            </Col>
            <Col lg={4}></Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
  useEffect(() => {
    setShowDialog(props.showBrand);
  }, [props.showBrand]);
  return (
    <Container>
      {Alert ? AlertModal : null}
      <Modal
        size="lg"
        className="Rtl-Seller"
        show={ShowDialog}
        onHide={() => {
          HiBrand();
        }}
      >
        <Modal.Body>
          <Container>
            <Row className="newBrand-row">
              <Col lg={1}>
                <div className="red-close-seller" onClick={HiBrand}></div>
              </Col>
              <Col lg={11}></Col>
            </Row>
            <Row className="newBrand-row">
              <Col lg={4}></Col>
              <Col lg={4}>
                <p className="newBrand-title">?????????????? ?????????? ???????? ????????</p>
              </Col>
              <Col lg={4}></Col>
            </Row>
            <Row className="newBrand-row">
              <Col lg={12}>
                <p className="newBrand-p">
                  ???????????? ?????? ?????????? ???? ???????? ?????????????? ?????????? ???????? ???? ???????????? ???? ????
                  ???????? (?????? ??????????) ???????? ?????????? ?????? ?? ???? ???????? ????????????. ???????? ?????????? ??
                  ?????? ???????????????? ?????? ?????? ???? ?????????? ????????.
                </p>
              </Col>
            </Row>
            <Row className="newBrand-row">
              <Col className="newBrand-label" lg={6}>
                <p>: ?????? ?????????????? ????????</p>
              </Col>
              <Col className="newBrand-label" lg={6}>
                <p>: ?????? ?????????? ????????</p>
              </Col>
            </Row>
            <Row className="newBrand-row">
            <Col lg={6}>
                <input
                  type="text"
                  className="newBrand-input"
                  placeholder="?????? ?????????????? ???????? ???? ???????? ????????"
                  value={Brand.nameEn}
                  tabIndex={11}
                  onChange={HandlerNameEn}
                />
              </Col>
              <Col lg={6}>
                <input
                  type="text"
                  className="newBrand-input"
                  placeholder="?????? ?????????? ???????? ???? ???????? ????????"
                  value={Brand.name}
                  tabIndex={10}
                  onChange={HandlerName}
                />
              </Col>

            </Row>
            <Row className="newBrand-row">
              <Col lg={10}></Col>
              <Col lg={2}>
                <p className="newBrand-label">?????? ????????</p>
              </Col>
            </Row>
            <Row className="newBrand-row">
              <Col lg={12}>
                <textarea tabIndex={12}
                  value={Brand.des}
                  className="newBrand-textArea"
                  onChange={HandlerDes}
                  placeholder=".?????????????? ???????? ???????? ?????? ???? ???? ?????? ???????? ????????????????? ?????????????? ?? ?????????????? ???????? ????????"
                  rows={10}
                ></textarea>
              </Col>
            </Row>
            <Row>
              <Col lg={10}>
                <Col className="newBrand-label2" lg={12}>
                  ?????????? ???????? ???? ???? ?????????? ??????*?????? ?????????? ?? ???? ????????
                </Col>
                <Col className="newBrand-label2" lg={12}>
                  ???? ??????????????? ???????? ???????????????? ????????.
                </Col>
              </Col>
              <Col lg={2}>
                <div className="newBrand-upload-div">
                  <button className="newBrand-upload" tabIndex={13} onClick={handleUpload}>
                    {imageUrl ? <img alt='' src={imageUrl} /> : <span>??????????</span>}
                  </button>
                  <input
                    ref={nameRef}
                    className="uploader"
                    onChange={handleChange}
                    type="file"
                  />
                </div>
              </Col>
            </Row>
            <Row className="newBrand-row">
              <Col lg={7}>
                <button tabIndex={15} className="newBrand-submit btn">????????????</button>
                <button tabIndex={14}
                  className={
                    valid ? "newBrand-disable btn" : "newBrand-submit btn"
                  }
                  onClick={handlerSubmit}
                >
                  ?????????? ??????????????
                </button>
              </Col>
              <Col lg={5}>
                {valid ? (
                  <p className="newBrand-message">
                    .???? ???????? ?????????? ???????????? ???????????? ???? ????????
                  </p>
                ) : null}
                {!allowUpload ? (
                  <p className="newBrand-message">
                    ???????????? ???????? ?????????? ???? 50 ???????? ???????? ??????
                  </p>
                ) : null}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(NewBrand as any);
