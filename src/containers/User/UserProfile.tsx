import React, { Component, useEffect } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { MessageTypes } from "../../model/general";
import { responseModel } from "../../model/general/responseModel";
import { APIImage, APIUrl } from "../../helper/config";
import Select from "react-select";
import DateTime from "../../components/DateTime";
import DatePicker from "react-datepicker2";
import { useState } from "react";
import { profile } from "console";
import { VwContact } from "../../model/viewModel/VwContact";
import { useRef } from "react";
import { VwDocument } from "../../model/viewModel/VwDocument";
import { Col, Modal, ModalBody, ModalFooter, Row } from "react-bootstrap";

type UserProfileProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators & {
    match: any;
    location: any;
    history: any;
  } & RouteComponentProps<{}>;

interface IProfile {
  firstName?: string;
  LastName?: string;
  nationalCode?: string;
  email?: string;
  mobile?: string;
  birthDate?: string;
  gender?: string;
}
interface IPass {
  currentpass: string;
  newpass: string;
  confirmpass: string;
}
interface IValidateAddress {
  id: string;
  disable: boolean;
  index: number;
}
interface IProfilePicture {
  data?: any;
  name: string;
  suffix: string;
  type?: string;
  size: number;
  id?: string;
  entityid?: string;
  filepath: string;
  personId?: string;
}

const UserProfile2 = (props: UserProfileProps) => {
  const [Profile, setProfile] = useState<IProfile>({
    firstName: "",
    LastName: "",
    email: "",
    gender: "-1",
    birthDate: undefined,
    mobile: "",
    nationalCode: "",
  });
  const [modalDelete, SetModalDelete] = useState(false);
  const [ValidateProfile, SetValidateProfile] = useState(true);
  const [ValidatePass, SetValidatePass] = useState(true);
  const [ValidateAddress, SetValidateAddress] = useState<IValidateAddress[]>(
    []
  );
  const [PicProfile, setPicProfile] = useState<IProfilePicture>({
    name: "",
    size: 0,
    suffix: "",
    filepath: "",
    personId: props.personId,
  });
  const [Password, setPassword] = useState<IPass>({
    currentpass: "",
    newpass: "",
    confirmpass: "",
  });
  const [Adresses, setAdresses] = useState<VwContact[]>([]);
  const [TypeInput, SetTypeInput] = useState({
    cupass: "password",
    srcCurrentPass: require("../../img/Hide.png"),
    npass: "password",
    srcNewPass: require("../../img/Hide.png"),
  });
  const showNewPass = (e: any) => {
    if (TypeInput.npass === "text") {
      SetTypeInput({
        ...TypeInput,
        npass: "password",
        srcNewPass: require("../../img/Hide.png"),
      });
    } else {
      SetTypeInput({
        ...TypeInput,
        npass: "text",
        srcNewPass: require("../../img/Show.png"),
      });
    }
  };
  const showCurentPass = (e: any) => {
    if (TypeInput.cupass === "text") {
      SetTypeInput({
        ...TypeInput,
        cupass: "password",
        srcCurrentPass: require("../../img/Hide.png"),
      });
    } else {
      SetTypeInput({
        ...TypeInput,
        cupass: "text",
        srcCurrentPass: require("../../img/Show.png"),
      });
    }
  };
  const inputEl = useRef<HTMLInputElement>(null);
  useEffect(() => {
    props.UserLoad(true);
    fetch(APIUrl + "/User/ProfileInfo?Langabr=" + props.lang.abr, {
      method: "GET",
      headers: {
        ut: "1",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        props.checkStatus(response);
        props.UserLoad(false);
        return response;
      })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode !== 0) {
          props.UserLoad(false);
          // this.setState({ msgMobile: responseModel.message });
          return;
        } else {
          setProfile({
            birthDate: responseModel.data.birthDate,
            email: responseModel.data.email,
            gender: responseModel.data.genderCode,
            mobile: responseModel.data.mobile,
            firstName: responseModel.data.firstName,
            LastName: responseModel.data.lastName,
            nationalCode: responseModel.data.nationalCode,
          });
          props.UserLoad(false);
        }
      })
      .catch((error) => {
        props.UserLoad(false);
      });
    GetAddresses(props.personId);
    GetPictureProfile(props.personId);
  }, []);
  const GetPictureProfile = (personId: any) => {
    props.UserLoad(true);
    fetch(APIUrl + "/Document/GetPicProfile?PersonId=" + personId, {
      method: "GET",
      headers: {
        ut: "1",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        props.checkStatus(response);
        return response;
      })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        debugger;
        props.UserLoad(false);
        if (responseModel.messageCode === 0) {
          let res = responseModel.data as VwDocument;

          setPicProfile({
            filepath: res.filePath,
            name: res.name,
            size: res.size,
            suffix: res.extention,
            type: res.type,
            personId: res.parentId,
            id: res.id,
            entityid: res.id,
          });
        }
      })
      .catch((error) => {
        props.UserLoad(false);
      });
  };
  const GetAddresses = (personId: any) => {
    props.UserLoad(true);
    fetch(APIUrl + "/Contact/GetAddress?PersonId=" + personId, {
      method: "GET",
      headers: {
        ut: "1",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        props.checkStatus(response);
        return response;
      })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        props.UserLoad(false);
        if (responseModel.messageCode === 0) {
          if (responseModel.data.length > 0) {
            setAdresses(responseModel.data as VwContact[]);
            let adr = responseModel.data as VwContact[];
            let validateArd = ValidateAddress;
            adr.forEach((element: VwContact, index) => {
              if (!element.value || !element.postCode) {
                validateArd.push({
                  id: element.id,
                  index: index,
                  disable: true,
                });
              } else {
                validateArd.push({
                  id: element.id,
                  index: index,
                  disable: false,
                });
              }
            });
          } else {
            AddAdress(true);
          }
        }
      })
      .catch((error) => {
        props.UserLoad(false);
      });
  };
  const OnClickSaveAddress = (e: any) => {
    let adress = Adresses.find((c) => c.id === e.currentTarget.dataset.id);
    if (adress) {
      adress.personId = props.personId;
      SaveAddress(adress);
    }
  };
  interface address {
    id?: string;
    personId?: string;
    zoneId?: string;
    value: string;
    postCode: string;
    createUserID?: string;
    updateUserID?: string;
    latitude?: number;
    longitude?: number;
    buildingLicensePlate: string;
    apartmentLicensePlate: string;
    mainContact: boolean;
    adressTel: string;
  }
  const SaveAddress = (address: VwContact) => {
    props.UserLoad(true);
    let data: address = {
      id: address.id ? address.id : undefined,
      adressTel: address.adressTel,
      value: address.value,
      postCode: address.postCode,
      latitude: undefined,
      longitude: undefined,
      apartmentLicensePlate: address.apartmentLicensePlate,
      buildingLicensePlate: address.buildingLicensePlate,
      personId: address.personId,
      zoneId: undefined,
      mainContact: address.mainContact,
      createUserID: props.userId,
      updateUserID: props.userId,
    };
    fetch(APIUrl + "/Contact/SaveAddressBlandy", {
      method: "POST",
      headers: {
        ut: "1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode !== 0) {
          props.addMessage([]);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Error },
          ]);
        } else {
          setAdresses(responseModel.data as VwContact[]);
          let adr = responseModel.data as VwContact[];
          let validateArd = ValidateAddress;
          adr.forEach((element: VwContact, index) => {
            if (!element.value || !element.postCode) {
              validateArd.push({
                id: element.id,
                index: index,
                disable: true,
              });
            } else {
              validateArd.push({
                id: element.id,
                index: index,
                disable: false,
              });
            }
          });
          props.addMessage([]);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Success },
          ]);
        }
        props.UserLoad(false);
      })
      .catch((error) => {
        props.UserLoad(false);
      });
  };
  const SavePictureProfile = (pic: any) => {
    props.UserLoad(true);

    fetch(APIUrl + "/Document/SaveProfile", {
      method: "POST",
      headers: {
        ut: "1",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify(pic),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode !== 0) {
          props.addMessage([]);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Error },
          ]);
          props.UserLoad(false);
        } else {
          debugger;
          props.addMessage([]);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Success },
          ]);
          let res = responseModel.data[0] as VwDocument;

          setPicProfile({
            filepath: res.filePath,
            name: res.name,
            size: res.size,
            suffix: res.extention,
            type: res.type,
            personId: props.personId,
            id: res.id,
            entityid: res.id,
          });
        }
        props.UserLoad(false);
      })
      .catch((error) => {
        props.UserLoad(false);
      });
  };
  const onchangeFullname = (e: any) => {
    if (e.currentTarget.value) {
      let full = e.currentTarget.value.split(" ");
      let fn = "";
      if (full.length >= 2) {
        for (let index = 0; index < full.length - 1; index++) {
          fn = fn + full[index] + " ";
        }
      } else {
        for (let index = 0; index < full.length - 2; index++) {
          fn = fn + "" + full[index];
        }
      }

      let ln = full[full.length - 1];
      setProfile({ ...Profile, firstName: fn.trimRight(), LastName: ln });
      CheckValidateProfile({
        ...Profile,
        firstName: fn.trimRight(),
        LastName: ln,
      });
    }
  };
  const onchangeNationalCode = (e: any) => {
    if (e.currentTarget.value.length > 10) {
      return;
    }
    setProfile({ ...Profile, nationalCode: e.currentTarget.value });
    CheckValidateProfile({ ...Profile, nationalCode: e.currentTarget.value });
  };
  const onchangeEmail = (e: any) => {
    setProfile({ ...Profile, email: e.currentTarget.value });
    CheckValidateProfile({ ...Profile, email: e.currentTarget.value });
  };
  const onchangeMobile = (e: any) => {
    if (e.currentTarget.value.length > 11) {
      return;
    }
    setProfile({ ...Profile, mobile: e.currentTarget.value });
    CheckValidateProfile({ ...Profile, mobile: e.currentTarget.value });
  };
  const onchangeBirthDay = (e: any) => {
    setProfile({ ...Profile, birthDate: e.currentTarget.value });
    CheckValidateProfile({ ...Profile, birthDate: e.currentTarget.value });
  };
  const onchangeGender = (e: any) => {
    setProfile({ ...Profile, gender: e.target.value });
    CheckValidateProfile({ ...Profile, gender: e.currentTarget.value });
  };
  const ValidateEmail = (mail: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };
  const CheckValidateProfile = (Profile: IProfile) => {
    if (Profile.mobile && Profile.mobile.length != 11) {
      SetValidateProfile(true);
      return;
    }
    if (Profile.nationalCode && Profile.nationalCode.length != 10) {
      SetValidateProfile(true);
      return;
    }
    if (
      (Profile.firstName && !Profile.LastName) ||
      (!Profile.firstName && Profile.LastName)
    ) {
      SetValidateProfile(true);
      return;
    }
    if (Profile.email && ValidateEmail(Profile.email) === false) {
      SetValidateProfile(true);
      return;
    }
    SetValidateProfile(false);
    return;
  };
  const ProfileSubmit = () => {
    props.UserLoad(true);

    var objVariables: any = {};
    let dt = undefined;
    CheckValidateProfile(Profile);
    if (Profile.birthDate) {
      dt = new Date(decodeURIComponent(Profile.birthDate).split("+").join(" "));
      if (dt.toString().toUpperCase() !== "Invalid Date".toUpperCase()) {
        dt.setUTCHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
        dt.setUTCDate(dt.getDate() + 1);
        objVariables[
          Profile.birthDate[1].toLowerCase().replace("__date", "")
        ] = dt;
      }
    }

    const data = {
      langAbr: props.lang.abr,
      firstName: Profile.firstName,
      lastName: Profile.LastName,
      birthDate: dt,
      nationalCode: Profile.nationalCode,
      gender: Profile.gender,
      email: Profile.email,
    };
    fetch(APIUrl + "/User/UpdateUserProfileBlandy", {
      method: "POST",
      headers: {
        ut: "1",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        props.checkStatus(response);
        return response;
      })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        //console.log('messageCode=' + responseModel.messageCode);
        if (responseModel.messageCode !== 0) {
          props.addMessage([]);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Error },
          ]);

          return;
        } else {
          setProfile({
            birthDate: responseModel.data.birthDate,
            email: responseModel.data.email,
            gender: responseModel.data.genderCode,
            mobile: responseModel.data.mobile,
            firstName: responseModel.data.firstName,
            LastName: responseModel.data.lastName,
            nationalCode: responseModel.data.nationalCode,
          });
          props.addMessage([]);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Success },
          ]);
          props.UserLoad(false);
        }
      })
      .catch((error) => {
        props.UserLoad(false);
      });
  };
  const onChangeDateHandler = (e: any) => {
    setProfile({ ...Profile, birthDate: e });
    CheckValidateProfile({ ...Profile, birthDate: e });
  };
  const CheckValidatePass = (Pass: IPass) => {
    if (!Pass) {
      SetValidatePass(true);
      return;
    } else {
      if (Pass.confirmpass !== Pass.newpass) {
        SetValidatePass(true);
        return;
      }
      if (!Pass.confirmpass || !Pass.currentpass || !Pass.newpass) {
        SetValidatePass(true);
        return;
      }
      SetValidatePass(false);
    }
  };
  const CheckValidateAddress = (address: VwContact) => {
    let vad = ValidateAddress.filter((c) => c.id !== address.id);
    let ad = ValidateAddress.find((c) => c.id === address.id);
    if (ad) {
      ad.disable = true;
      if (!address) {
        SetValidateAddress([...vad, ad]);
        return;
      } else {
        if (!address.value || !address.postCode) {
          SetValidateAddress([...vad, ad]);
          return;
        } else if (address.postCode.length !== 10) {
          SetValidateAddress([...vad, ad]);
          return;
        }
        ad.disable = false;
        SetValidateAddress([...vad, ad]);
      }
    }
  };
  const SubmitPass = (e: any) => {
    const data = {
      lang: props.lang.abr,
      currentPassword: Password.currentpass,
      newpassword: Password.newpass,
    };
    props.UserLoad(true);
    fetch(APIUrl + "/User/LoggedChangePassword", {
      method: "POST",
      headers: {
        ut: "1",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        props.checkStatus(response);
        return response;
      })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        setPassword({ confirmpass: "", currentpass: "", newpass: "" });
        if (responseModel.messageCode !== 0) {
          props.addMessage([]);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Error },
          ]);
          props.UserLoad(false);
          return;
        } else {
          props.addMessage([]);
          props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Success },
          ]);
        }
        props.UserLoad(false);
      })
      .catch((error) => {
        props.UserLoad(false);
      });
  };
  const onchangeCurrentPass = (e: any) => {
    setPassword({ ...Password, currentpass: e.currentTarget.value });
    CheckValidatePass({ ...Password, currentpass: e.currentTarget.value });
  };
  const onchangeNewPass = (e: any) => {
    setPassword({ ...Password, newpass: e.currentTarget.value });
    CheckValidatePass({ ...Password, newpass: e.currentTarget.value });
  };
  const onchangeConfirmPass = (e: any) => {
    setPassword({ ...Password, confirmpass: e.currentTarget.value });
    CheckValidatePass({ ...Password, confirmpass: e.currentTarget.value });
  };
  const onchangeAddressValue = (e: any, id: any) => {
    let address = Adresses.filter((c) => c.id !== id);
    let ad = Adresses.findIndex((c) => c.id === id);
    Adresses[ad].value = e.currentTarget.value;
    setAdresses(Adresses);
    CheckValidateAddress(Adresses[ad]);
  };
  const onchangeAddresspPostCode = (e: any, id: any) => {
    let address = Adresses.filter((c) => c.id !== id);
    let ad = Adresses.findIndex((c) => c.id === id);
    Adresses[ad].postCode = e.currentTarget.value;
    setAdresses(Adresses);
    CheckValidateAddress(Adresses[ad]);
  };
  const onchangeAddresspTel = (e: any, id: any) => {
    let address = Adresses.filter((c) => c.id !== id);
    let ad = Adresses.findIndex((c) => c.id === id);
    Adresses[ad].adressTel = e.currentTarget.value;
    setAdresses(Adresses);
    CheckValidateAddress(Adresses[ad]);
  };
  const onClickAddAddress = (e: any) => {
    AddAdress(false);
  };
  const AddAdress = (mainContact: boolean) => {
    let exist = Adresses.find((c) => c.id === "");
    if (exist) {
      return;
    }
    let ad: VwContact = {
      id: "",
      adressTel: "",
      apartmentLicensePlate: "",
      buildingLicensePlate: "",
      cityName: "",
      contactTypeCode: "",
      contactTypeSign: "",
      continentName: "",
      createDate: new Date(),
      createUserID: "",
      creator: "",
      depId: "",
      departmentSign: "",
      description: "",
      hccontactTypeId: "",
      isActive: true,
      latitude: "",
      longitude: "",
      mainContact: mainContact,
      parentId: "",
      personName: "",
      postCode: "",
      updateDate: new Date(),
      updateUserID: "",
      updater: "",
      value: "",
      zoneId: "",
      personId: props.personId,
    };

    setAdresses([...Adresses, ad]);
    let vad: IValidateAddress = {
      id: "",
      disable: true,
      index: Adresses.length - 1,
    };
    SetValidateAddress([...ValidateAddress, vad]);
  };
  const OnMainContact = (id: any) => {
    let entity = Adresses.find((c) => c.id === id);
    if (entity) {
      entity.personId = props.personId;
      entity.mainContact = true;
      SaveAddress(entity);
    }
  };
  const OnProfileImageClick = (e: any) => {
    if (inputEl.current) {
      inputEl.current.click();
    }
  };
  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const OnProfileImageChange = (event: any) => {
    if (event.target.files.length === 1) {
      if (event.target.files[0].name) {
        const size = event.target.files[0].size;
        const names = event.target.files[0].name.split(".");
        const name = names[0];
        const mytype = event.target.files[0].type;
        const suffix = names[1];
        toBase64(event.target.files[0]).then((data) => {
          PicProfile.data = data;
          PicProfile.suffix = suffix;
          PicProfile.size = Number(size);
          PicProfile.type = mytype;
          PicProfile.name = name;
          PicProfile.personId = props.personId;
          setPicProfile(PicProfile);
          SavePictureProfile(PicProfile);
        });
      }
    } else {
      // let start = { ...this.state };
      // start.loading = false;
      // this.setState(start);
    }
  };
  const DeletePicture = (e: any) => {
    if (PicProfile) {
      fetch(APIUrl + "/Document/DeleteDocument", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + props.token,
          "Content-Type": "application/json",
          lang: "fa",
        },
        body: JSON.stringify({ Id: PicProfile.id }),
      })
        .then((response) => {
          props.checkStatus(response);
          return response;
        })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          if (responseModel.messageCode !== 0) {
            props.addMessage([]);
            props.addMessage([
              { msg: responseModel.message, msgType: MessageTypes.Error },
            ]);
            props.UserLoad(false);

            return;
          } else {
            props.addMessage([]);
            props.addMessage([
              { msg: responseModel.message, msgType: MessageTypes.Success },
            ]);
            setPicProfile({
              name: "",
              size: 0,
              suffix: "",
              filepath: "",
              personId: props.personId,
            });
          }
          SetModalDelete(false);
          props.UserLoad(false);
        })
        .catch((error) => {
          SetModalDelete(false);
          props.UserLoad(false);
        });
    }
  };
  const showMoadl = (e: any) => {
    SetModalDelete(true);
  };
  return (
    <div className="row">
      <Modal
        show={modalDelete}
        centered
        size="lg"
        onHide={() => SetModalDelete(false)}
      >
        <ModalBody>
          <div className="row text-center">
            <div className="col-12">
              <img
                className="ModalDeleteIcon"
                src={require("../../img/Delete.png")}
                alt="Delete Picture Profile"
              />
            </div>
            <div className="col-12">
              <span className="ModalDeleteSpan">
                کاربر عزیز، از حذف تصویر پروفایل خود مطمئن هستید؟
              </span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="ModalDeleteButton"
            onClick={(c) => SetModalDelete(false)}
          >
            خیر
          </button>
          <button className="ModalDeleteButton" onClick={DeletePicture}>
            بله
          </button>
        </ModalFooter>
      </Modal>

      <div className="col-12 text-right">
        <span className="blandy-profile-title">اطلاعات کاربری</span>
      </div>
      <div className="col-12  text-right">
        <div className="row">
          <div className="col-xl-2">
            {PicProfile &&
            PicProfile.personId === props.personId &&
            PicProfile.filepath ? (
              <div
                className="profile-add-adress-profile"
                onClick={OnProfileImageClick}
              >
                <img src={APIImage + PicProfile.filepath} alt="Profile" />
              </div>
            ) : (
              <div className="blandy-profile-up" onClick={OnProfileImageClick}>
                <img
                  src={require("../../img/Profile.png")}
                  alt="Profile"
                  className="profile-add-adress-icon"
                />
                <p className="profile-add-adress-sp">تصویر کاربر </p>
              </div>
            )}

            <input
              ref={inputEl}
              className="uploader"
              type="file"
              onChange={OnProfileImageChange}
            />
          </div>
          <div className="col-xl-1">
            <div className="row">
              <div className="col-6">
                {PicProfile &&
                PicProfile.personId === props.personId &&
                PicProfile.filepath ? (
                  <a
                    href={APIImage + PicProfile.filepath}
                    download
                    target="_blank"
                  >
                    <img
                      src={require("../../img/Download.png")}
                      alt="Download"
                      className="blandy-profile-download"
                    />
                  </a>
                ) : null}
              </div>
              <div className="col-6">
                {PicProfile &&
                PicProfile.personId === props.personId &&
                PicProfile.filepath ? (
                  <img
                    src={require("../../img/Delete.png")}
                    alt="Delete"
                    className="blandy-profile-download"
                    onClick={showMoadl}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-xl-5 mt-4 mb-4">
            <p className="blandy-profile-up-error">
              . کاربر عزیز، تصویر خود را با حجم حداکثر 2 مگابایت آپلود کنید
            </p>
          </div>
          <div className="col-xl-4 mt-4 mb-4">
            {/* <p className="blandy-profile-up-msg-update">
              برای ویرایش اطلاعات روی دکمه ویرایش ( ) کلیک کنید
            </p> */}
          </div>
        </div>
      </div>
      <div className="col-12  text-right">
        <div className="row">
          <div className="col-xl">
            <div className="form-group">
              <label className="lbl-profile">نام و نام خانوادگی</label>
              <input
                type="text"
                className="form-control input-profile"
                placeholder="نام و نام خانوادگی خود را بنویسید"
                value={
                  (Profile.firstName ? Profile.firstName : "") +
                  " " +
                  (Profile.LastName ? Profile.LastName : "")
                }
                onChange={onchangeFullname}
              ></input>
              {!Profile.firstName || !Profile.LastName ? (
                <small className="form-text text-muted error-profile">
                  نام و نام خانوادگی خود را وارد کنید
                </small>
              ) : null}
            </div>
          </div>
          <div className="col-xl">
            <div className="form-group">
              <label className="lbl-profile">کد ملی</label>
              <input
                type="number"
                className="form-control input-profile"
                placeholder="کدملی خود را، عدد ده رقمی وارد کنید"
                value={Profile.nationalCode}
                onChange={onchangeNationalCode}
              ></input>
              <small className="form-text text-muted error-profile">
                {/* We'll never share your email with anyone else. */}
              </small>
            </div>
          </div>
          <div className="col-xl">
            <div className="form-group">
              <label className="lbl-profile">ایمیل</label>
              <input
                type="email"
                className="form-control input-profile"
                placeholder="youremail@gmail.com"
                value={Profile.email}
                onChange={onchangeEmail}
              ></input>
              <small className="form-text text-muted error-profile">
                {/* We'll never share your email with anyone else. */}
              </small>
            </div>
          </div>
          <div className="col-xl-2"></div>
        </div>
        <div className="row">
          <div className="col-xl">
            <div className="form-group">
              <label className="lbl-profile">شماره تماس</label>
              <div>
                <img
                  src={require("../../img/Call.png")}
                  alt="call"
                  className="input-profile-mobile"
                />
                <input
                  type="number"
                  className="form-control input-profile"
                  placeholder="09120000000"
                  value={Profile.mobile}
                  disabled={true}
                  onChange={onchangeMobile}
                ></input>
              </div>

              <small className="form-text text-muted error-profile">
                کاربر عزیز، امکان تغییر شماره موبایل وجود ندارد
              </small>
            </div>
          </div>
          <div className="col-xl">
            <div className="form-group calender-profile">
              <label className="lbl-profile">تاریخ تولد</label>
              <DateTime
                {...{
                  name: "Test",
                  value: Profile.birthDate,
                  IsNotResource: true,
                  timePicker: false,
                  onChange: onChangeDateHandler,
                }}
              />
              {/* <input
                  type="email"
                  className="form-control input-profile"
                  
                  placeholder="کدملی خود را، عدد ده رقمی وارد کنید"
                ></input> */}
              <small className="form-text text-muted error-profile">
                {/* We'll never share your email with anyone else. */}
              </small>
            </div>
          </div>
          <div className="col-xl">
            <div className="form-group">
              <label className="lbl-profile">جنسیت</label>
              <div>
                <img
                  src={require("../../img/Male.png")}
                  alt="call"
                  className="input-profile-male"
                />

                <select
                  placeholder="جنسیت خود را انتخاب کنید"
                  className="form-control input-profile"
                  value={Profile.gender ? Profile.gender : "-1"}
                  onChange={onchangeGender}
                >
                  <option disabled selected value="-1">
                    جنسیت خود را انتخاب کنید
                  </option>
                  <option value="0">خانم</option>
                  <option value="1">آقا</option>
                </select>
              </div>

              <small className="form-text text-muted error-profile">
                {/* We'll never share your email with anyone else. */}
              </small>
            </div>
          </div>
          <div className="col-xl-2">
            <div className="row">
              {/* <div className="col-4">
                <img
                  src={require("../../img/Edit.png")}
                  alt="edit"
                  className="img-edit-profile"
                />
              </div> */}
              <div className="col-8">
                <button
                  onClick={ProfileSubmit}
                  className="btn btn-submit-profile"
                  disabled={ValidateProfile === true ? true : false}
                >
                  ثبت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12  text-right">
        <div className="row">
          <div className="col-xl">
            <div className="form-group">
              <label className="lbl-profile">رمز عبور فعلی</label>
              <div>
                <img
                  src={TypeInput.srcCurrentPass}
                  alt="call"
                  className="input-profile-show"
                  onClick={showCurentPass}
                />
                <input
                  type={TypeInput.cupass}
                  name="password2"
                  autoComplete="new-password"
                  className="form-control input-profile"
                  onChange={onchangeCurrentPass}
                  value={Password.currentpass}
                ></input>
              </div>
              <small className="form-text text-muted error-profile">
                {/* We'll never share your email with anyone else. */}
              </small>
            </div>
          </div>
          <div className="col-xl">
            <div className="form-group">
              <label className="lbl-profile">رمز عبور جدید</label>
              <div>
                <img
                  src={TypeInput.srcNewPass}
                  alt="call"
                  className="input-profile-show"
                  onClick={showNewPass}
                />
                <input
                  type={TypeInput.npass}
                  autoComplete="new-password2"
                  name="newpassword2"
                  className="form-control"
                  value={Password.newpass}
                  onChange={onchangeNewPass}
                ></input>
              </div>
              {Password.newpass !== Password.confirmpass ? (
                <small className="form-text text-muted error-profile">
                  رمز عبور جدید و تکرار رمز عبور جدید یکسان نیست
                </small>
              ) : null}
            </div>
          </div>
          <div className="col-xl">
            <div className="form-group">
              <label className="lbl-profile">تکرار رمز عبور جدید</label>
              <input
                type="password"
                name="confirmpassword2"
                autoComplete="new-password"
                className="form-control input-profile"
                value={Password.confirmpass}
                onChange={onchangeConfirmPass}
              ></input>
              {/* <small className="form-text text-muted error-profile">
             
              </small> */}
            </div>
          </div>
          <div className="col-xl-2">
            <div className="row">
              {/* <div className="col-4">
                <img
                  src={require("../../img/Edit.png")}
                  alt="edit"
                  className="img-edit-profile"
                />
              </div> */}
              <div className="col-8">
                <button
                  className="btn btn-submit-profile"
                  onClick={SubmitPass}
                  disabled={ValidatePass === true ? true : false}
                >
                  ثبت
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12  text-right">
          {Adresses.map((item: VwContact, index: any) => {
            return (
              <div className="row">
                <div className="col-xl-5">
                  <div className="form-group">
                    <input
                      type="radio"
                      className="form-check-input input-profile-radio"
                      name="optradio"
                      value="option1"
                      checked={item.mainContact === true ? true : false}
                      onClick={(c) => OnMainContact(item.id)}
                      disabled={
                        item &&
                        item.value &&
                        item.postCode &&
                        item.adressTel &&
                        item.postCode.length === 10
                          ? false
                          : true
                      }
                    />
                    {item.mainContact === true ? (
                      <label className="lbl-profile-radio">آدرس اصلی</label>
                    ) : (
                      <label className="lbl-profile-radio">آدرس</label>
                    )}

                    <input
                      type="textarea"
                      className="form-control input-profile-textarea"
                      value={item.value}
                      onChange={(e) => onchangeAddressValue(e, item.id)}
                      placeholder=":آدرس خود را فارسی وارد کنید، مانند
                  تهران- جنت آباد شمالی - خیابان ایرانشهر- کوچه مولوی- پلاک ۱۲"
                    ></input>
                    <small className="form-text text-muted error-profile">
                      {/* We'll never share your email with anyone else. */}
                    </small>
                  </div>
                </div>
                <div className="col-xl-7">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label className="lbl-profile">کد پستی</label>
                        <input
                          type="number"
                          className="form-control input-profile"
                          placeholder="کد پستی ده رقمی را وارد کنید"
                          value={item.postCode}
                          onChange={(e) => onchangeAddresspPostCode(e, item.id)}
                        ></input>
                        {item.postCode && item.postCode.length !== 10 ? (
                          <small className="form-text text-muted error-profile">
                            کد پستی ده رقمی را وارد کنید
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label className="lbl-profile">موقعیت جغرافیایی</label>
                        <input
                          type="email"
                          className="form-control input-profile"
                          placeholder="موقعیت را از روی نقشه انتخاب کنید"
                          value={item.latitude + " " + item.longitude}
                        ></input>
                        <small className="form-text text-muted error-profile">
                          {/* موقعیت را از روی نقشه انتخاب کنید */}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl">
                      <div className="form-group">
                        <label className="lbl-profile">شماره تماس ثابت</label>
                        <input
                          type="text"
                          className="form-control input-profile"
                          placeholder="مثال: ۰۲۱۴۴۰۰۰۰۰۰"
                          value={item.adressTel}
                          onChange={(e) => onchangeAddresspTel(e, item.id)}
                        ></input>
                        <small className="form-text text-muted error-profile">
                          {/* We'll never share your email with anyone else. */}
                        </small>
                      </div>
                    </div>
                    <div className="col-xl">
                      <div className="row">
                        {/* <div className="col-4">
                          <img
                            src={require("../../img/Edit.png")}
                            alt="edit"
                            className="img-edit-profile"
                          />
                        </div> */}
                        <div className="col-8">
                          <button
                            className="btn btn-submit-profile"
                            data-index={index}
                            data-id={item.id}
                            disabled={
                              ValidateAddress && ValidateAddress.length > 0
                                ? ValidateAddress[index].disable
                                : true
                            }
                            onClick={OnClickSaveAddress}
                          >
                            ثبت
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-12  text-right">
          <img
            src={require("../../img/Plus1.png")}
            alt="Plus Address"
            className="profile-add-adress-icon"
            onClick={onClickAddAddress}
          />
          <span className="profile-add-adress ">اضافه کردن آدرس جدید</span>
        </div>
      </div>
    </div>
  );
};
const days = [
  { value: "01", label: "1" },
  { value: "02", label: "2" },
  { value: "03", label: "3" },
  { value: "04", label: "4" },
  { value: "05", label: "5" },
  { value: "06", label: "6" },
  { value: "07", label: "7" },
  { value: "08", label: "8" },
  { value: "09", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
];

const months = [
  { value: "01", label: "فروردین" },
  { value: "02", label: "اردیبهشت" },
  { value: "03", label: "خرداد" },
  { value: "04", label: "تیر" },
  { value: "05", label: "مرداد" },
  { value: "06", label: "شهریور" },
  { value: "07", label: "مهر" },
  { value: "08", label: "آبان" },
  { value: "09", label: "آذر" },
  { value: "10", label: "دی" },
  { value: "11", label: "بهمن" },
  { value: "12", label: "اسفند" },
];

const years = [
  { value: "1300", label: "1300" },
  { value: "1301", label: "1301" },
  { value: "1302", label: "1302" },
  { value: "1303", label: "1303" },
  { value: "1304", label: "1304" },
  { value: "1305", label: "1305" },
  { value: "1306", label: "1306" },
  { value: "1307", label: "1307" },
  { value: "1308", label: "1308" },
  { value: "1309", label: "1309" },
  { value: "1310", label: "1310" },
  { value: "1311", label: "1311" },
  { value: "1312", label: "1312" },
  { value: "1313", label: "1313" },
  { value: "1314", label: "1314" },
  { value: "1315", label: "1315" },
  { value: "1316", label: "1316" },
  { value: "1317", label: "1317" },
  { value: "1318", label: "1318" },
  { value: "1319", label: "1319" },
  { value: "1320", label: "1320" },
  { value: "1321", label: "1321" },
  { value: "1322", label: "1322" },
  { value: "1323", label: "1323" },
  { value: "1324", label: "1324" },
  { value: "1325", label: "1325" },
  { value: "1326", label: "1326" },
  { value: "1327", label: "1327" },
  { value: "1328", label: "1328" },
  { value: "1329", label: "1329" },
  { value: "1330", label: "1330" },
  { value: "1331", label: "1331" },
  { value: "1332", label: "1332" },
  { value: "1333", label: "1333" },
  { value: "1334", label: "1334" },
  { value: "1335", label: "1335" },
  { value: "1336", label: "1336" },
  { value: "1337", label: "1337" },
  { value: "1338", label: "1338" },
  { value: "1339", label: "1339" },
  { value: "1340", label: "1340" },
  { value: "1341", label: "1341" },
  { value: "1342", label: "1342" },
  { value: "1343", label: "1343" },
  { value: "1344", label: "1344" },
  { value: "1345", label: "1345" },
  { value: "1346", label: "1346" },
  { value: "1347", label: "1347" },
  { value: "1348", label: "1348" },
  { value: "1349", label: "1349" },
  { value: "1350", label: "1350" },
  { value: "1351", label: "1351" },
  { value: "1352", label: "1352" },
  { value: "1353", label: "1353" },
  { value: "1354", label: "1354" },
  { value: "1355", label: "1355" },
  { value: "1356", label: "1356" },
  { value: "1357", label: "1357" },
  { value: "1358", label: "1358" },
  { value: "1359", label: "1359" },
  { value: "1360", label: "1360" },
  { value: "1361", label: "1361" },
  { value: "1362", label: "1362" },
  { value: "1363", label: "1363" },
  { value: "1364", label: "1364" },
  { value: "1365", label: "1365" },
  { value: "1366", label: "1366" },
  { value: "1367", label: "1367" },
  { value: "1368", label: "1368" },
  { value: "1369", label: "1369" },
  { value: "1370", label: "1370" },
  { value: "1371", label: "1371" },
  { value: "1372", label: "1372" },
  { value: "1373", label: "1373" },
  { value: "1374", label: "1374" },
  { value: "1375", label: "1375" },
  { value: "1376", label: "1376" },
  { value: "1377", label: "1377" },
  { value: "1378", label: "1378" },
  { value: "1379", label: "1379" },
  { value: "1380", label: "1380" },
  { value: "1381", label: "1381" },
  { value: "1382", label: "1382" },
  { value: "1383", label: "1383" },
  { value: "1384", label: "1384" },
  { value: "1385", label: "1385" },
  { value: "1386", label: "1386" },
  { value: "1387", label: "1387" },
  { value: "1388", label: "1388" },
  { value: "1389", label: "1389" },
  { value: "1390", label: "1390" },
];

const telPrefixes = [
  { value: "021", label: "021  تهران" },
  { value: "026", label: "026 البرز" },
  { value: "025", label: "025 قم" },
  { value: "086", label: "086  مرکزی" },
  { value: "024", label: "024 زنجان" },
  { value: "023", label: "023 سمنان" },
  { value: "081", label: "081  همدان" },
  { value: "028", label: "028 قزوین" },
  { value: "031", label: "031 اصفهان" },
  { value: "044", label: "044 آذربایجان غربی" },
  { value: "011", label: "011 مازندران" },
  { value: "074", label: "074 کهگیلویه و بویراحمد" },
  { value: "083", label: "083 کرمانشاه" },
  { value: "051", label: "051 خراسان رضوی" },
  { value: "045", label: "045 اردبیل" },
  { value: "017", label: "017 گلستان" },
  { value: "041", label: "041 آذربایجان شرقی" },
  { value: "054", label: "054 سیستان و بلوچستان" },
  { value: "087", label: "087 کردستان" },
  { value: "071", label: "071 فارس" },
  { value: "066", label: "066 لرستان" },
  { value: "034", label: "034 کرمان" },
  { value: "056", label: "056 خراسان جنوبی" },
  { value: "013", label: "013 گیلان" },
  { value: "077", label: "077 بوشهر" },
  { value: "076", label: "076 هرمزگان" },
  { value: "061", label: "061 خوزستان" },
  { value: "038", label: "038 چهار محال و بختیاری" },
  { value: "058", label: "058 خراسان شمالی" },
  { value: "035", label: "035 یزد" },
  { value: "084", label: "084 ایلام" },
];
// class UserProfile extends Component<
//   UserProfileProps,
//   {
//     firstName: string;
//     lastName: string;
//     nationalCode: string;
//     email: string;
//     isLoading: boolean;
//     success: boolean;
//     birthDateDay: string;
//     birthDateMonth: string;
//     birthDateYear: string;

//     msgFirstName: string | undefined;
//     msgLastName: string | undefined;
//     msgMobile: string | undefined;
//     msgNationalCode: string | undefined;
//     msgTel: string | undefined;
//     msgEmail: string | undefined;
//     msgBirthdate: string | undefined;

//     counter: number;
//     telephone: string;
//     telPrefix: string;
//   }
// > {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       firstName: this.props.firstName,
//       lastName: this.props.lastName,
//       email: "",
//       birthDateDay: "",
//       birthDateMonth: "",
//       birthDateYear: "",
//       nationalCode: "",
//       success: false,
//       msgFirstName: undefined,
//       msgLastName: undefined,
//       msgMobile: undefined,
//       msgNationalCode: undefined,
//       msgTel: undefined,
//       msgEmail: undefined,
//       msgBirthdate: undefined,
//       isLoading: false,
//       counter: 10,
//       telephone: "",
//       telPrefix: "",
//     };
//   }

//   handleDay = (event: any) => {
//     this.setState({ birthDateDay: event.value });
//   };
//   handleMonth = (event: any) => {
//     this.setState({ birthDateMonth: event.value });
//   };
//   handleYear = (event: any) => {
//     this.setState({ birthDateYear: event.value });
//   };
//   handleTelPrefix = (event: any) => {
//     this.setState({ telPrefix: event.value });
//   };
//   handleTel = (event: any) => {
//     console.log(event.target.value);

//     this.setState({ telephone: event.target.value });
//   };

//   componentDidMount() {
//     this.setState({ isLoading: true });
//     fetch(APIUrl + "/User/ProfileInfo?Langabr=" + this.props.lang.abr, {
//       method: "GET",
//       headers: {
//         ut: "1",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.props.token,
//       },
//     })
//       .then((response) => {
//         this.props.checkStatus(response);
//         return response;
//       })
//       .then((response) => response.json() as Promise<responseModel>)
//       .then((responseModel) => {
//         this.setState({ isLoading: false });

//         if (responseModel.messageCode !== 0) {
//           this.setState({ msgMobile: responseModel.message });
//           return;
//         } else {
//           const persianBirthDate = responseModel.data.persianBirthDate;
//           const tel = responseModel.data.tel;
//           const telPrefix = tel.substring(0, 3);
//           const telephone = tel.substring(3);
//           console.log("persianBirthDate=" + persianBirthDate);

//           if (persianBirthDate.length === 10) {
//             const year = persianBirthDate.substring(0, 4);
//             const month = persianBirthDate.substring(5, 7);
//             const day = persianBirthDate.substring(8);
//             this.setState({
//               birthDateDay: day,
//               birthDateMonth: month,
//               birthDateYear: year,
//             });
//           }

//           this.setState({
//             firstName: responseModel.data.firstName,
//             lastName: responseModel.data.lastName,
//             nationalCode: responseModel.data.nationalCode,
//             email: responseModel.data.email,
//             telPrefix: telPrefix,
//             telephone: telephone,
//           });
//         }
//       })
//       .catch((error) => {
//         console.log("error");

//         console.log(error);
//         this.setState({ isLoading: false });
//       });
//   }

//   handleFirstName = (event: any) => {
//     this.setState({ firstName: event.target.value });
//     if (event.target.value !== "") this.setState({ msgFirstName: undefined });
//     else this.setState({ msgFirstName: "لطفا نام را وارد کنید" });
//   };
//   handleLastName = (event: any) => {
//     this.setState({ lastName: event.target.value });
//     if (event.target.value !== "") this.setState({ msgLastName: undefined });
//     else this.setState({ msgLastName: "لطفا نام خانوادگی را وارد کنید" });
//   };

//   handleNationalCode = (event: any) => {
//     this.setState({ nationalCode: event.target.value });
//   };
//   handleEmail = (event: any) => {
//     this.setState({ email: event.target.value });
//   };

//   ValidateEmail = (mail: string) => {
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
//       return true;
//     }
//     return false;
//   };

//   VerifyNationalCode = (input: string) => {
//     if (
//       !/^\d{10}$/.test(input) ||
//       input === "0000000000" ||
//       input === "1111111111" ||
//       input === "2222222222" ||
//       input === "3333333333" ||
//       input === "4444444444" ||
//       input === "5555555555" ||
//       input === "6666666666" ||
//       input === "7777777777" ||
//       input === "8888888888" ||
//       input === "9999999999"
//     )
//       return false;
//     var check = parseInt(input[9]);
//     var sum = 0;
//     var i;
//     for (i = 0; i < 9; ++i) {
//       sum += parseInt(input[i]) * (10 - i);
//     }
//     sum %= 11;
//     return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
//   };

const VerifyNationalCode = (input: string) => {
  if (
    !/^\d{10}$/.test(input) ||
    input === "0000000000" ||
    input === "1111111111" ||
    input === "2222222222" ||
    input === "3333333333" ||
    input === "4444444444" ||
    input === "5555555555" ||
    input === "6666666666" ||
    input === "7777777777" ||
    input === "8888888888" ||
    input === "9999999999"
  )
    return false;
  var check = parseInt(input[9]);
  var sum = 0;
  var i;
  for (i = 0; i < 9; ++i) {
    sum += parseInt(input[i]) * (10 - i);
  }
  sum %= 11;
  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
};

//     history.push({
//       pathname: "/user",
//     });
//   };

//   PersianToGregorian = (jy: number, jm: number, jd: number) => {
//     var sal_a, gy, gm, gd, days, v;
//     if (jy > 979) {
//       gy = 1600;
//       jy -= 979;
//     } else {
//       gy = 621;
//     }
//     days =
//       365 * jy +
//       (jy / 33) * 8 +
//       ((jy % 33) + 3) / 4 +
//       78 +
//       jd +
//       (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
//     gy += 400 * (days / 146097);
//     days %= 146097;
//     if (days > 36524) {
//       gy += 100 * (--days / 36524);
//       days %= 36524;
//       if (days >= 365) days++;
//     }
//     gy += 4 * (days / 1461);
//     days %= 1461;
//     if (days > 365) {
//       gy += (days - 1) / 365;
//       days = (days - 1) % 365;
//     }
//     gd = days + 1;
//     sal_a = [
//       0,
//       31,
//       (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
//       31,
//       30,
//       31,
//       30,
//       31,
//       31,
//       30,
//       31,
//       30,
//       31,
//     ];
//     for (gm = 0; gm < 13; gm++) {
//       v = sal_a[gm];
//       if (gd <= v) break;
//       gd -= v;
//     }
//     return [gy, gm, gd];
//   };

//   saveInfo = () => {
//     this.setState({
//       msgNationalCode: undefined,
//       msgFirstName: undefined,
//       msgLastName: undefined,
//       msgMobile: undefined,
//       msgTel: undefined,
//       msgEmail: undefined,
//       msgBirthdate: undefined,
//     });

//     const firstName = this.state.firstName;
//     const lastName = this.state.lastName;
//     const nationalCode = this.state.nationalCode;
//     var birthDateDay = this.state.birthDateDay;
//     var birthDateMonth = this.state.birthDateMonth;
//     var birthDateYear = this.state.birthDateYear;
//     const email = this.state.email;
//     const telephone = this.state.telephone;
//     const telPrefix = this.state.telPrefix;

//     console.log("tel=" + telephone);

//     if (birthDateMonth.length === 1) birthDateMonth = "0" + birthDateMonth;
//     if (birthDateDay.length === 1) birthDateDay = "0" + birthDateDay;

//     const birthDate = birthDateYear + birthDateMonth + birthDateDay;
//     const fullTel = telPrefix + telephone;

//     if (this.state.firstName === "") {
//       this.setState({ msgFirstName: "لطفا نام را وارد کنید" });
//       return;
//     }

//     if (this.state.lastName == "") {
//       this.setState({ msgLastName: "لطفا نام خانوادگی را وارد کنید" });
//       return;
//     }

//     if (this.state.nationalCode !== "") {
//       if (!this.VerifyNationalCode(nationalCode)) {
//         this.setState({ msgNationalCode: "کد ملی معتبر نیست" });
//         return;
//       }
//     }

//     if (this.state.email !== "") {
//       if (!this.ValidateEmail(email)) {
//         this.setState({ msgEmail: " ایمیل وارد شده صحیح نمی باشد." });
//         return;
//       }
//     }
//     if (this.state.telephone !== "") {
//       if (telephone.length != 8) {
//         this.setState({
//           msgTel:
//             " شماره تلفن وارد شده صحیح نمی باشد. لطفا شماره وارد شده را بررسی نمایید.",
//         });
//         return;
//       }
//       if (telPrefix === "") {
//         this.setState({ msgTel: "لطفا پیش شماره را انتخاب کنید" });
//         return;
//       }
//     }

//     const data = {
//       langAbr: this.props.lang.abr,
//       firstName: firstName,
//       lastName: lastName,
//       birthDate: birthDate,
//       nationalCode: nationalCode,
//       tel: fullTel,
//       email: email,
//     };
//     this.setState({ isLoading: true });
//     fetch(APIUrl + "/User/UpdateUserProfile", {
//       method: "POST",
//       headers: {
//         ut: "1",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.props.token,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         this.props.checkStatus(response);
//         return response;
//       })
//       .then((response) => response.json() as Promise<responseModel>)
//       .then((responseModel) => {
//         this.setState({ isLoading: false });
//         //console.log('messageCode=' + responseModel.messageCode);
//         if (responseModel.messageCode !== 0) {
//           this.props.addMessage([]);
//           this.props.addMessage([
//             { msg: responseModel.message, msgType: MessageTypes.Error },
//           ]);

//           return;
//         } else {
//           this.props.SetUserFullName(firstName, lastName);
//           this.props.addMessage([]);
//           this.props.addMessage([
//             { msg: responseModel.message, msgType: MessageTypes.Success },
//           ]);
//         }
//       })
//       .catch((error) => {
//         console.log("error");

//         console.log(error);
//         this.setState({ isLoading: false });
//         //this.props.addMessage([{msg: error, msgType:MessageTypes.Error}]);
//       });
//   };

//   render() {
//     return (

//       <div className="UserProfile outer-center">
//         <div className="inner-center">
//           <div className="text-center caption-header">
//             {
//               <li
//                 onClick={() =>
//                   this.props.history.push({ pathname: "/user/panel" })
//                 }
//                 className="fa fa-arrow-right back-arrow"
//               ></li>
//             }
//             اطلاعات کاربری{" "}
//           </div>
//           <div className="shadow rtl profile-card ">
//             <div>
//               <div className="card-body">
//                 <div className="">
//                   <div className="form-group">
//                     <div className="plfield ">
//                       <input
//                         pattern="[A-Za-z]{3}"
//                         placeholder=" "
//                         defaultValue={this.state.firstName}
//                         type="text"
//                         title="لطفا فیلد نام را وارد کنید"
//                         required
//                         onChange={(e) => this.handleFirstName(e)}
//                         className="pl-input form-control"
//
//                       />
//                       <span className="grow">نام</span>
//                     </div>
//                     <ShowMessage msg={this.state.msgFirstName} />
//                   </div>

//                   <div className="mt-35 form-group">
//                     <div className="plfield ">
//                       <input
//                         type="text"
//                         placeholder=" "
//                         defaultValue={this.state.lastName}
//                         title="لطفا فیلد نام خانوادگی را وارد کنید"
//                         required
//                         onChange={(e) => this.handleLastName(e)}
//                         className="pl-input form-control"
//
//                       />
//                       <span className="grow">نام خانوادگی</span>
//                     </div>
//                     <ShowMessage msg={this.state.msgLastName} />
//                   </div>

//                   <div className="mt-35">
//                     <div className="date-container">
//                       <div className="form-inline">
//                         <Select
//                           className="ddDays"
//                           required
//                           onChange={this.handleDay}
//                           placeholder={"روز"}
//                           value={days.filter(
//                             (option) => option.value === this.state.birthDateDay
//                           )}
//                           options={days}
//                         />
//                         <Select
//                           className="ddMonths"
//                           required
//                           onChange={this.handleMonth}
//                           placeholder={"ماه تولد"}
//                           value={months.filter(
//                             (option) =>
//                               option.value === this.state.birthDateMonth
//                           )}
//                           options={months}
//                         />
//                         <Select
//                           className="ddYears"
//                           required
//                           onChange={this.handleYear}
//                           placeholder={"سال تولد"}
//                           value={years.filter(
//                             (option) =>
//                               option.value === this.state.birthDateYear
//                           )}
//                           options={years}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <ShowMessage msg={this.state.msgBirthdate} />

//                   <div className="mt-35 form-group">
//                     <div className="plfield ">
//                       <input
//                         pattern="[A-Za-z]{3}"
//                         placeholder=" "
//                         defaultValue={this.state.nationalCode}
//                         type="text"
//                         title="لطفا کد ملی را وارد کنید"
//                         required
//                         onChange={(e) => this.handleNationalCode(e)}
//                         className="ltr-control pl-input form-control"
//
//                       />
//                       <span className="grow">کد ملی</span>
//                     </div>
//                     <ShowMessage msg={this.state.msgNationalCode} />
//                   </div>

//                   <div className="mt-35 form-inline profile-tel-container">
//                     <div className="row">

//                       <div className="col-lg-7 col-6 text-right">
//                         <div className="plfield ">
//                           <input
//                             pattern="[A-Za-z]{3}"
//                             placeholder=" "
//                             defaultValue={this.state.telephone}
//                             type="text"
//                             title="لطفا تلفن را وارد کنید"
//                             required
//                             onChange={(e) => this.handleTel(e)}
//                             className="tel ltr-control pl-input form-control"
//
//                           />
//                           <span className="grow">تلفن</span>
//                         </div>
//                       </div>

//                       <div className="col-lg-5 col-6">
//                         <Select
//                           className="ddTelPrefix"
//                           required
//                           onChange={this.handleTelPrefix}
//                           placeholder={"کد استان"}
//                           value={telPrefixes.filter(
//                             (option) => option.value === this.state.telPrefix
//                           )}
//                           options={telPrefixes}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <ShowMessage msg={this.state.msgTel} />

//                   <div className="mt-35 form-group ">
//                     <div className="plfield ">
//                       <input
//                         pattern="[A-Za-z]{3}"
//                         placeholder=" "
//                         value={this.state.email}
//                         type="text"
//                         title="لطفا ایمیل را وارد کنید"
//                         required
//                         onChange={(e) => this.handleEmail(e)}
//                         className="ltr-control pl-input form-control"
//
//                       />
//                       <span className="grow">ایمیل</span>
//                     </div>
//                     <ShowMessage msg={this.state.msgEmail} />
//                   </div>

//                   <div className="mt-35 row">
//                     <div className="col-lg-6 col-12">
//                       {this.state.isLoading ? (
//                         <div className="spinner-border" role="status">
//                           <span className="sr-only">Loading...</span>
//                         </div>
//                       ) : (
//                         <button
//                           className="btn-orange btn w-25 w-100"
//                           onClick={this.saveInfo}
//                         >
//                           ثبت اطلاعات
//                         </button>
//                       )}
//                     </div>
//                     <div className="col-lg-6 col-12">
//                       <button
//                         className="btn-orange btn w-25 w-100"
//                         onClick={this.gotoUserPanel}
//                       >
//                         انصراف
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(UserProfile2 as any);

class ShowMessage extends Component<{ msg: string | undefined }> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    if (this.props.msg === undefined) return null;
    return (
      <div className="error">
        <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
        {this.props.msg}
      </div>
    );
  }
}
