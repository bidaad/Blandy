import React, { Component } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { MessageTypes } from "../../model/general";
import { responseModel } from "../../model/general/responseModel";
import MsgBox from "../../components/MsgBox";
import { APIUrl, APIImage } from "../../helper/config";

import { Modal } from "react-bootstrap";

import Select from "react-select";
import { selectData, selectPelak } from "../../model/general/selectData";
import { VwCar } from "../../model/viewModel/VwCar";
import Image from "../../components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import changeEnc from "../../helper/changeEnc";

interface UserInfo {
  username: string;
  password: string;
}

type UserCarProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators & {
    match: any;
    location: any;
    history: any;
  } & RouteComponentProps<{}>;
const imgnocar = require("../../img/Bitmap.png");
const imgsmallcar = require("../../img/Bitmap.png");
class UserCar extends Component<
  UserCarProps,
  {
    mobile: string;
    isLoading: boolean;
    brand: string;
    brands: selectData[];
    product: string;
    products: selectData[];
    color: string;
    colors: selectData[];
    pelakCharacter: string;
    pelakCharacters: [];
    pelak1: string;
    pelak2: string;
    pelak3: string;
    plekSign: string;
    model: string;
    success: boolean;
    year: string;
    passwordType: string;
    VIN: string | undefined;
    msgModel: string | undefined;
    msgYear: string | undefined;
    msgVIN: string | undefined;
    msgConfirmPassword: string | undefined;
    msgBrand: string | undefined;
    msgColor?: string;
    msgProduct?: string;
    msgForgotPassMobile: string | undefined;
    view: number;
    counter: number;
    challengeCode: string;
    msgPlak: string | undefined;
    cars: VwCar[];
    id?: string;
    brandSign: string;
    modal: number;
    toggleInActive: boolean;
    saveButton: boolean;
    ShowAlertModal: boolean;
    alertId: string;
    usage: number | undefined;
    errorUsage: string;
    pastDay: string;
    imageProduct: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.props.UserLoad(true);
    this.state = {
      mobile: "",
      model: "",
      year: "",
      success: false,
      passwordType: "password",

      VIN: undefined,
      msgModel: undefined,
      msgYear: undefined,
      msgVIN: undefined,
      msgBrand: undefined,
      msgForgotPassMobile: undefined,
      msgConfirmPassword: undefined,
      msgColor: undefined,
      msgProduct: undefined,
      msgPlak: undefined,
      isLoading: false,
      view: -1,
      counter: 10,
      challengeCode: "",
      brand: "",
      brands: [],
      product: "",
      products: [],
      color: "",
      colors: [],
      pelakCharacter: "",
      pelakCharacters: [],
      pelak1: "",
      pelak2: "",
      pelak3: "",
      cars: [],
      plekSign: "",
      brandSign: "",
      modal: 0,
      toggleInActive: false,
      saveButton: false,
      ShowAlertModal: false,
      alertId: "",
      usage: undefined,
      errorUsage: "",
      pastDay: "",
      imageProduct: "",
    };
  }

  async componentDidMount() {
    const getUsageAlerts = () => {
      fetch(APIUrl + "/Asset/GetUsageAlert?PersonId=" + this.props.personId, {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.token,
        },
      })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          if (responseModel.messageCode === 0) {
            this.setState({
              ShowAlertModal: true,
              alertId: responseModel.data[0].id,
              pastDay: responseModel.data[0].pastDay,
            });
          } else {
            this.setState({ view: 1 });
          }
          this.props.UserLoad(false);
        })
        .catch((error) => {
          console.log(error);
          this.props.UserLoad(false);
        });
    };

    fetch(APIUrl + "/Asset/GetUserCars?PersonId=" + this.props.personId, {
      method: "GET",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((response) => {
        this.props.checkStatus(response);
        return response;
      })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.data && responseModel.data.length > 0) {
          this.props.UserLoad(false);
          let data = responseModel.data as VwCar[];

          if (data.length === 0) {
            this.setState({ view: 1 });
          } else {
            this.setState({ cars: data });
            this.setState({ view: 1.2 });
          }
        } else {
          this.setState({ view: 1 });
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });

    fetch(
      APIUrl +
        "/Brand/GetBrandsForCar?pageSize=1000&Lang=" +
        this.props.lang.abr,
      {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        console.log(responseModel.data);

        console.log("messageCode=" + responseModel.messageCode);
        if (responseModel.messageCode === 0) {
          this.setState({ brands: responseModel.data });
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
    fetch(
      APIUrl +
        "/HCPelakCharacter/GetHCList?pageSize=1000&Lang=" +
        this.props.lang.abr,
      {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          this.setState({ pelakCharacters: responseModel.data });
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
    fetch(
      APIUrl + "/HCColor/GetHCList?pageSize=1000&Lang=" + this.props.lang.abr,
      {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        console.log(responseModel.data);

        console.log("messageCode=" + responseModel.messageCode);
        if (responseModel.messageCode === 0) {
          this.setState({ colors: responseModel.data });
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });

    getUsageAlerts();
  }

  handleBrand = async (event: any) => {
    await this.setState({ brand: event.value, product: "", products: [] });
    await this.getProducts(event.value);
    await this.validateCar();
  };
  handleColor = (event: any) => {
    this.setState({ color: event.value });
  };
  handleProduct = async (event: any) => {
    if (this.state.products) {
      let mo = this.state.products.find((v) => v.value === event.value);
      let mdl = "";
      if (mo) {
        if (mo.model) {
          mdl = mo.model;
        }
      }

      await this.setState({ product: event.value, model: mdl });
    }
    await this.validateCar();
  };
  handlePelak1 = async (event: any) => {
    if (event.currentTarget.value.length > event.currentTarget.maxLength) {
      event.currentTarget.value = event.currentTarget.value.slice(
        0,
        event.currentTarget.maxLength
      );
      await this.setState({ pelak1: event.currentTarget.value });
      await this.validateCar();
    } else {
      await this.setState({ pelak1: event.currentTarget.value });
      await this.validateCar();
    }
  };
  handlePelak2 = async (event: any) => {
    if (event.currentTarget.value.length > event.currentTarget.maxLength) {
      event.currentTarget.value = event.currentTarget.value.slice(
        0,
        event.currentTarget.maxLength
      );
      await this.setState({ pelak2: event.currentTarget.value });
      await this.validateCar();
    } else {
      await this.setState({ pelak2: event.currentTarget.value });
      await this.validateCar();
    }
  };
  handlePelak3 = async (event: any) => {
    if (event.currentTarget.value.length > event.currentTarget.maxLength) {
      event.currentTarget.value = event.currentTarget.value.slice(
        0,
        event.currentTarget.maxLength
      );
      await this.setState({ pelak3: event.currentTarget.value });
      await this.validateCar();
    } else {
      await this.setState({ pelak3: event.currentTarget.value });
      await this.validateCar();
    }
  };
  handleCharacters = async (event: any) => {
    let hcc = this.state.pelakCharacters[event.currentTarget.selectedIndex - 1];
    await this.setState({
      pelakCharacter: (this.state.pelakCharacters[
        event.currentTarget.selectedIndex
      ] as selectPelak).id,
      plekSign: (hcc as selectPelak).sign,
    });
    await this.validateCar();
  };
  handler_Ok = (e: any) => {
    fetch(APIUrl + "/Asset/GetUserCars?PersonId=" + this.props.personId, {
      method: "GET",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          let data = responseModel.data as VwCar[];

          if (data.length === 0) {
            this.setState({ view: 1 });
          } else {
            this.setState({ cars: data });
            this.setState({ view: 1.2 });
          }
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  };
  getProducts = async (brandId: string) => {
    fetch(
      APIUrl +
        "/Product/GetByBrandId?brandId=" +
        brandId +
        "&Lang=" +
        this.props.lang.abr,
      {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        console.log(responseModel.data);

        console.log("messageCode=" + responseModel.messageCode);
        if (responseModel.messageCode === 0) {
          this.setState({ products: responseModel.data });
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  };
  handleModel = (event: any) => {
    this.setState({ model: event.target.value });
    // await this.validateCar();
  };
  handleYear = async (event: any) => {
    await this.setState({ year: event.target.value });
    await this.validateCar();
  };

  handleVIN = async (event: any) => {
    await this.setState({ VIN: event.target.value });
    await this.validateCar();
  };

  handlePelak = async (event: any) => {
    await this.validateCar();
    // this.setState({ VIN: event.target.value });
  };
  handleConfirmPassword = (event: any) => {
    this.setState({ year: event.target.value });
  };

  handleChallengeCode = (event: any) => {
    this.setState({ challengeCode: event.target.value });

    if (event.target.value.length === 4)
      this.checkForgotPassCode(this.state.mobile, event.target.value);
  };

  

  ValidateMobile = (mobile: string) => {
    console.log("mobile=" + mobile);

    if (/^\d{9}$/.test(mobile)) {
      return true;
    }
    return false;
  };

  doCounter = (init: number) => {
    this.setState({ counter: init });
    setTimeout(() => {
      if (this.state.counter > 0) this.doCounter(this.state.counter - 1);
    }, 1000);
  };

  loginUser = (mobile: string, password: string) => {
    const data = {
      username: "09" + mobile,
      password: password,
      lang: this.props.lang.abr,
    };
    this.props.UserLoad(true);
    fetch(APIUrl + "/User/authenticate", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.props.UserLoad(false);
        console.log("messageCode=" + responseModel.messageCode);

        if (responseModel.messageCode !== 0) {
          console.log("errrrrr");
          this.props.addMessage([
            { msg: responseModel.message, msgType: MessageTypes.Error },
          ]);
          return;
        } else {
          //this.setState({ message: responseModel.message })
        }

        this.props.setUserInfo(
          responseModel.data.id,
          responseModel.data.firstName,
          responseModel.data.lastName,
          responseModel.data.username,
          responseModel.data.mobile,
          "",
          responseModel.data.token,
          responseModel.data.userPermissions,
          1,
          responseModel.menuResources,
          responseModel.data.personId
        );

        const { history } = this.props;
        console.log("pushing to user panel");

        history.push({
          pathname: "/user",
          userID: responseModel.data.id,
        });
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.props.UserLoad(false);
      });
  };

  submit = () => {
    const mobile = this.state.mobile;
    const password = this.state.model;

    if (this.state.mobile !== "") {
      if (!this.ValidateMobile(this.state.mobile)) {
        this.setState({
          msgYear:
            "شماره تلفن همراه وارد شده صحیح نیست.لطفا شماره وارد شده را بررسی نمایید.",
        });
        return;
      } else this.setState({ msgYear: undefined });
    } else this.setState({ msgYear: undefined });

    if (this.state.model === "") {
      this.setState({ msgVIN: "لطفا کلمه عبور را وارد کنید" });
      return;
    } else this.setState({ msgVIN: undefined });

    console.log("mobile=" + mobile);
    this.loginUser(mobile, password);
  };

  showPassword = () => {
    //console.log(this.passwordRef.current.value);
    if (this.state.passwordType === "password")
      this.setState({ passwordType: "text" });
    else this.setState({ passwordType: "password" });
  };

  checkChallenge = (challengeCode: string) => {
    const mobile = this.state.mobile;

    this.props.UserLoad(true);
    fetch(
      APIUrl +
        "/User/CheckChallenge/?mobile=" +
        mobile +
        "&challengeCode=" +
        challengeCode,
      {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.props.UserLoad(false);

        if (responseModel.messageCode !== 0) {
          this.setState({ msgYear: responseModel.message });
          return;
        } else {
          this.setState({ view: 3 });
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.props.UserLoad(false);
      });
  };

  resendChallenge = () => {};

  checkForgotPassCode = (mobile: string, challengeCode: string) => {
    if (challengeCode === "") {
      this.setState({ msgBrand: "لطفا کد تایید را وارد نمایید" });
      return;
    } else this.setState({ msgBrand: undefined });

    this.props.UserLoad(true);
    fetch(
      APIUrl +
        "/User/CheckForgotPassChallenge?mobile=" +
        mobile +
        "&challengeCode=" +
        challengeCode,
      {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.props.UserLoad(false);

        console.log(responseModel.message);

        if (responseModel.messageCode !== 0) {
          this.setState({ msgBrand: responseModel.message });
          return;
        } else {
          this.setState({ view: 4 });
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.props.UserLoad(false);
      });
  };

  verifyForgotPassCode = () => {
    const mobile = this.state.mobile;
    const challengeCode = this.state.challengeCode;
    this.checkForgotPassCode(mobile, challengeCode);
  };

  sendForgotPassMobile = () => {
    const mobile = this.state.mobile;
    if (this.state.mobile !== "") {
      if (!this.ValidateMobile(this.state.mobile)) {
        this.setState({
          msgForgotPassMobile:
            "شماره تلفن همراه وارد شده صحیح نیست.لطفا شماره وارد شده را بررسی نمایید.",
        });
        return;
      } else this.setState({ msgForgotPassMobile: undefined });
    } else this.setState({ msgForgotPassMobile: undefined });

    console.log("mobile111=" + mobile);

    const data = {
      mobile: mobile,
      email: "",
    };
    this.props.UserLoad(true);
    fetch(APIUrl + "/User/ResendChallengeCode", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.props.UserLoad(false);

        if (responseModel.messageCode !== 0) {
          this.setState({ msgForgotPassMobile: responseModel.message });
          return;
        } else {
          this.setState({ view: 3, counter: 60 });
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.props.UserLoad(false);
      });
  };
  validateCar = () => {
    if (
      !this.state.brand ||
      !this.state.product ||
      !this.state.year ||
      !this.state.VIN ||
      !this.state.pelak1 ||
      !this.state.pelak2 ||
      !this.state.pelak3 ||
      !this.state.pelakCharacter ||
      this.state.products.length < 1
    ) {
      this.setState({ saveButton: false });
    } else {
      this.setState({ saveButton: true });
    }
  };
  saveCar = () => {
    this.setState({
      msgModel: undefined,
      msgYear: undefined,
      msgVIN: undefined,
      msgBrand: undefined,
    });
    let cnf = true;
    if (!this.state.brand) {
      this.setState({ msgBrand: "لطفا برند را وارد کنید" });
      cnf = false;
    }
    if (!this.state.product) {
      this.setState({ msgProduct: "لطفا محصول را وارد کنید" });
      cnf = false;
    }
    if (!this.state.year) {
      this.setState({ msgYear: "لطفا سال را وارد کنید" });
      cnf = false;
    }
    if (!this.state.VIN) {
      this.setState({ msgVIN: "لطفا شماره VIN را وارد کنید" });
      cnf = false;
    }
    if (!this.state.year) {
      this.setState({ msgYear: "لطفا سال را وارد کنید" });
      cnf = false;
    }

    console.log("p1", this.state.pelak1);
    console.log("p2", this.state.pelak2);
    console.log("p3", this.state.pelak3);
    console.log("hc", this.state.pelakCharacter);
    if (
      this.state.pelak1 === "" ||
      this.state.pelak2 === "" ||
      this.state.pelak3 === "" ||
      this.state.pelakCharacter === ""
    ) {
      this.setState({ msgPlak: "لطفا پلاک را وارد کنید" });
      cnf = false;
    }

    console.log(this.state.pelakCharacter);
    if (cnf === false) {
      return;
    }

    // const brand = this.state.brand;
    // const model = this.state.model;
    // const year = this.state.year;
    // const VIN = this.state.VIN;

    const data: VwCar = {
      id: this.state.id,
      productId: this.state.product,
      year: this.state.year,
      serialNumberVin: this.state.VIN === undefined ? "" : this.state.VIN,
      pelak1: this.state.pelak1,
      pelak2: this.state.pelak2,
      pelak3: this.state.pelak3,
      hcpelakCharacterId: this.state.pelakCharacter,
      personId: this.props.personId,
      latestUsage: 0,
    };

    this.props.UserLoad(true);
    fetch(APIUrl + "/Asset/SaveCar", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.props.UserLoad(false);

        if (responseModel.message !== "Updated") {
          this.setState({
            view: 2.1,
            brandSign: responseModel.data[0].brandSign,
          });
          return;
        }
        fetch(APIUrl + "/Asset/GetUserCars?PersonId=" + this.props.personId, {
          method: "GET",
          headers: {
                'ut':'1',
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.props.token,
          },
        })
          .then((response) => response.json() as Promise<responseModel>)
          .then((responseModel) => {
            this.props.UserLoad(false);
            if (responseModel.messageCode === 0) {
              // Updated
              let data = responseModel.data as VwCar[];

              if (data.length === 0) {
                this.setState({ view: 1 });
              } else {
                this.setState({ cars: data });
                this.setState({ view: 1.2 });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.props.UserLoad(false);
          });
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.props.UserLoad(false);
      });
  };
  CancelCar = () => {
    if (this.state.cars.length === 0) {
      this.setState({ view: 1 });
    } else {
      this.setState({ view: 1.2 });
    }
  };
  clickLoginAfterChangePass = () => {
    this.loginUser(this.state.mobile, this.state.model);
  };

  gotoSignUp = () => {
    const { history } = this.props;

    history.push({
      pathname: "/signup",
    });
  };

  gotoCarServices = (id: string | undefined) => {
    const { history } = this.props;
    history.push({
      pathname: "/user/car/" + id,
    });
  };
  gotoCarServiceList = (id: string | undefined) => {
    const { history } = this.props;
    history.push({
      pathname: "/user/maintenance/" + id,
    });
  };

  setShowAlertModal = (val: boolean) => {
    this.setState({ ShowAlertModal: val });
  };

  addCar = (e: any) => {
    this.setState({
      id: undefined,
      brandSign: "",
      VIN: undefined,
      product: "",
      brand: "",
      year: "",
      pelak1: "",
      pelak2: "",
      pelak3: "",
      plekSign: "",
      pelakCharacter: "",
      model: "",
    });
    let id = e.currentTarget.dataset.id;
    if (id !== undefined) {
      fetch(APIUrl + "/Asset/EditCar?Id=" + id, {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          this.props.UserLoad(false);

          if (responseModel.messageCode === 0) {
            const res = responseModel.data as VwCar;
            if (res.brandId) {
              this.getProducts(res.brandId);
            }
            this.setState({
              id: res.id === undefined ? "" : res.id,
              brandSign: res.brandSign === undefined ? "" : res.brandSign,
              model: res.model === undefined ? "" : res.model,
              VIN: res.serialNumberVin,
              product: res.productId === undefined ? "" : res.productId,
              brand: res.brandId === undefined ? "" : res.brandId,
              year: res.year === undefined ? "" : res.year,
              pelak1: res.pelak1 === undefined ? "" : res.pelak1,
              pelak2: res.pelak2 === undefined ? "" : res.pelak2,
              pelak3: res.pelak3 === undefined ? "" : res.pelak3,
              plekSign: res.pelakSign === undefined ? "" : res.pelakSign,
              imageProduct:
                res.imageProduct === undefined ? "" : res.imageProduct,
              pelakCharacter:
                res.hcpelakCharacterId === undefined
                  ? ""
                  : res.hcpelakCharacterId,
            });

            this.setState({ view: 2 });
          }
        });
    }
    this.setState({ view: 2 });
  };

  checkUsage = () => {
    if (this.state.usage === undefined) {
      this.setState({ errorUsage: "border-red" });
      return;
    }
    if (!this.ValidateUsage((this.state.usage as number).toString())) {
      this.setState({ errorUsage: "border-red" });
      return;
    } else this.setState({ errorUsage: "" });
  };

  ValidateUsage = (text: string) => {
    if (/^\d+$/.test(text)) {
      return true;
    }
    return false;
  };

  saveUsage = (carId: string) => {
    var Url =
      APIUrl +
      "/AssetUsage/SaveUsage?Id=" +
      carId +
      "&Usage=" +
      this.state.usage;
    if (this.state.usage)
      Url =
        APIUrl +
        "/AssetUsage/SaveUsage?Id=" +
        carId +
        "&Usage=" +
        this.state.usage;
    fetch(Url, {
      method: "GET",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        if (responseModel.messageCode === 0) {
          this.setShowAlertModal(false);
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  };
  handleUsage = (event: any) => {
    this.setState({ usage: event.target.value });
  };

  HandlerMouserEnter = (e: any) => {
    $(e.currentTarget).children().first().fadeIn();
  };
  HandlerMouserLeave = (e: any) => {
    $(e.currentTarget).children().first().fadeOut();
  };
  HandlerInActive = (e: any) => {
    if (e.currentTarget.checked) {
      this.setState({ modal: 1, toggleInActive: true });
    }
  };
  HandlerActive = (e: any) => {
    this.setState({ modal: 0, toggleInActive: false });
  };
  HandlerDelete = (e: any) => {
    fetch(APIUrl + "/Asset/InActiveCar?Id=" + e.currentTarget.dataset.id, {
      method: "GET",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.props.UserLoad(false);

        if (responseModel.messageCode === 0) {
          fetch(APIUrl + "/Asset/GetUserCars?PersonId=" + this.props.personId, {
            method: "GET",
            headers: {
                'ut':'1',
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.props.token,
            },
          })
            .then((response) => response.json() as Promise<responseModel>)
            .then((responseModel) => {
              this.props.UserLoad(false);
              if (responseModel.messageCode === 0) {
                let data = responseModel.data as VwCar[];

                if (data.length === 0) {
                  this.setState({ view: 1, modal: 0, toggleInActive: false });
                } else {
                  this.setState({
                    cars: data,
                    modal: 0,
                    toggleInActive: false,
                  });
                  this.setState({ view: 1.2 });
                }
              }
            })
            .catch((error) => {
              console.log(error);
              this.props.UserLoad(false);
            });
        }
      });
  };

  handleChangeNotification = (assetId: string, e: any) => {
    this.changeNotification(assetId, e.currentTarget.checked);
  };

  changeNotification = (assetId: string, notification: boolean) => {
    //if (e.currentTarget.checked) {
    fetch(
      APIUrl +
        "/Asset/ChangeNotification?Id=" +
        assetId +
        "&Not=" +
        notification,
      {
        method: "GET",
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.token,
        },
      }
    )
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        //if (responseModel.messageCode === 0) {
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  };
  render() {
    const curDate = new Date().toLocaleDateString("fa-IR");

    let curentImage = APIImage + "/plak.png";
    const View1 = (
      <div>
        <div className="w-75 inner-center">
          <div className="text-center mb-3">
            <Image
              fallbackSrc={APIImage + "/default.png"}
              alt={""}
              src={imgnocar}
            />
            {/* <img src={imgnocar} alt="user icon" className="img-fluid" /> */}
          </div>
          <div className="text-center m-5">
            <div className="text-right large-message">
              کاربر عزیز <br />
              در حال حاضر ما اطلاعات مربوط به خودرو شما رو نداریم.
              <br />
              لطفا از طریق لینک زیر اطلاعات خودرو خودتون رو وارد کنید تا سرویس
              های مخصوص به خودروتون رو ببینید.
            </div>
          </div>

          <div className="text-center p-2">
            <button className="btn-orange btn btn-info  " onClick={this.addCar}>
              اضافه کردن خودرو
            </button>
          </div>
        </div>
      </div>
    );

    const View1_1 = (
      <div>
        <div className="Car_Row">
          <div className="Car-Col">
            <div className="Car-Col-Card">
              <img src={imgnocar} alt="user icon" className="img-fluid" />
            </div>
            <button className="btn-orange btn btn-info " onClick={this.addCar}>
              ثبت اطلاعات خودرو
            </button>
          </div>
        </div>
        {/* <div className="Car_Row">
                    <div className="Car-Col">
                        <div className="Car-Col-Card">
                            <img src={imgnocar} alt="user icon" className="img-fluid" />
                        </div>
                        <button className="btn-orange btn btn-info " onClick={this.addCar} >ثبت اطلاعات خودرو</button>
                    </div>
                    <div className="Car-Col">
                        <div className="Car-Col-Card">
                            <img src={imgnocar} alt="user icon" className="img-fluid" />
                        </div>
                        <button className="btn-orange btn btn-info " onClick={this.addCar} >ثبت اطلاعات خودرو</button>
                    </div>

                    <div className="Car-Col">
                        <div className="Car-Col-Card">
                            <img src={imgnocar} alt="user icon" className="img-fluid" />
                        </div>
                        <button className="btn-orange btn btn-info " onClick={this.addCar} >ثبت اطلاعات خودرو</button>
                    </div>
                </div> */}
      </div>
    );
    const View1_2 = (
      <div>
        <Modal
          size="xl"
          show={this.state.ShowAlertModal}
          onHide={() => this.setShowAlertModal(false)}
          className={"modal-jobcard"}
        >
          <Modal.Header>
            <Modal.Title></Modal.Title>
            <FontAwesomeIcon
              icon={faWindowClose}
              color="gray"
              size="lg"
              onClick={() => this.setShowAlertModal(false)}
            />
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-2">
              <img src={require("../../img/alert-medium.png")} alt="" />
            </div>

            <div className="x-small">
              کاربر گرامی، {this.state.pastDay} روز از ثبت آخرین کیلومتر خودرو
              شما گذشته است. لطفا برای استفاده از سرویس های دوره ای آخرین
              کیلومتر خودرو وسرویس های انجام شده را ثبت نمایید.
            </div>
            {this.state.cars
              .filter((c) => c.id === this.state.alertId)
              .map((c: VwCar) => (
                <div className="modal-save-usage Car-Col">
                  <div className="Car-Col-Card">
                    <div className="Car_Row">
                      <p>
                        {c.sign} {c.year}
                      </p>
                    </div>
                    <div className="text-center car-container">
                      <Image
                        fallbackSrc={APIImage + "car.png"}
                        alt={""}
                        src={APIImage + "/" + c.imageProduct}
                      />
                    </div>
                    <div className="line-100"></div>

                    <div className=" form-group mt-3">
                      <div className={"plfield "}>
                        <input
                          type="text"
                          placeholder=" "
                          autoComplete="off"
                          title="لطفا فیلد کیلومتر فعلی خودرو  را وارد کنید"
                          required
                          onChange={(e) => this.handleUsage(e)}
                          onBlur={() => this.checkUsage()}
                          className={
                            "form-control ltr-control txt-mobile " +
                            (this.state.errorUsage === ""
                              ? "pl-input"
                              : "pl-input-error")
                          }
                          id="username"
                        />
                        <span className="grow">کیلومتر فعلی خودرو </span>
                        <i className="icon-tachometer fa fa-tachometer"></i>
                      </div>
                    </div>

                    <div className=" form-group mt-3">
                      <div className={"plfield "}>
                        <input
                          type="text"
                          placeholder=" "
                          autoComplete="off"
                          title="تاریخ امروز"
                          value={curDate}
                          className={
                            "form-control ltr-control txt-mobile pl-input"
                          }
                          id="currentdate"
                        />
                        <span className="grow">تاریخ امروز</span>
                        <i className="icon-cellphone fa fa-calendar"></i>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 mb-2">
                    <div className="col">
                      <button
                        className="btn-orange-car btn btn-info "
                        data-id={c.id}
                        onClick={() => this.saveUsage(c.id as string)}
                      >
                        ذخیره
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="btn-orange-light-car btn btn-info "
                        onClick={() => {
                          this.changeNotification(c.id as string, false);
                          this.setState({ ShowAlertModal: false });
                        }}
                        data-id={c.id}
                      >
                        غیر فعال کردن هشدار
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="btn-orange-light-car btn btn-info "
                        onClick={() => this.setState({ ShowAlertModal: false })}
                      >
                        بعدا
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </Modal.Body>
        </Modal>
        <div className="Car_Row">
          {this.state.cars.map((c: VwCar) => (
            <div className="Car-Col">
              <div className="Car-Col-Card">
                <div className="Car_Row"></div>
                <div className="Car-Col-Card_Edit">
                  <div className="Car_Row3">
                    <p
                      data-toggle="tooltip"
                      title={c.sign ? c.sign : "" + c.year ? c.year : ""}
                    >
                      {c.sign} {c.year}
                    </p>

                    <div
                      className="Car-Title2"
                      onMouseEnter={this.HandlerMouserEnter}
                      onMouseLeave={this.HandlerMouserLeave}
                    >
                      <button
                        className="btn btn-light"
                        onClick={this.HandlerDelete}
                        data-id={c.id}
                      >
                        غیر فعال
                      </button>
                      <span>...</span>
                    </div>
                  </div>

                  <Image
                    fallbackSrc={APIImage + "car.png"}
                    alt={""}
                    src={APIImage + "/" + c.imageProduct}
                  />
                  <div className="CarEdit-Div">
                    <div className="CarEdit-Img">
                      <img
                        alt={""}
                        src={require("../img/../../img/plak.png")}
                      />

                      <span className="plkedit1">
                        {changeEnc(c.pelak1 ? c.pelak1.toString() : "")}
                      </span>
                      <span className="plkedit2">
                        {changeEnc(c.pelak2 ? c.pelak2.toString() : "")}
                      </span>
                      <span className="plkedit3">
                        {changeEnc(c.pelakSign ? c.pelakSign.toString() : "")}
                      </span>
                      <span className="plkedit4">
                        {changeEnc(c.pelak3 ? c.pelak3.toString() : "")}
                      </span>
                    </div>
                  </div>
                  <div className="Car_DeActive float-right">
                    یادآوری سرویس های دوره ای
                  </div>
                  <div className="float-left">
                    <label className="Toggle_Switch">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          this.handleChangeNotification(c.id as string, e)
                        }
                        defaultChecked={
                          c.notificationActive !== null
                            ? c.notificationActive
                            : false
                        }
                      />
                      <span className="Toggle_Slider round"></span>
                    </label>
                  </div>
                  <div className="Car_Row notification-container"></div>

                  {
                    c.mroplanActive ===true? (
                      <button
                        className="btn-orange-car btn btn-info "
                        data-id={c.id}
                        onClick={() => this.gotoCarServiceList(c.id)}
                      >
                        {" "}
                        سرویس های دوره ای خودرو من
                      </button>
                    ) : (
                      <button
                        className="btn-orange-car btn btn-info "
                        data-id={c.id}
                        onClick={() => this.gotoCarServices(c.id)}
                      >
                        فعال سازی سرویس های دوره ای خودرو من
                      </button>
                  ) }
                  <button
                    className="btn-orange-light-car btn btn-info "
                    data-id={c.id}
                    onClick={this.addCar}
                  >
                    ویرایش اطلاعات خودرو من
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="Car-Col">
            <div className="Car-Col-Card">
              <div className="Car-Col-Card_New2">
                <div className="Car_Row5"></div>
                <img src={imgnocar} alt="user icon" className="img-fluid" />
                <button
                  className="btn-orange-car btn btn-info "
                  onClick={this.addCar}
                >
                  ثبت اطلاعات خودرو
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="Car_Row">
        <div className="Car-Col">
            <div className="Car-Col-Card">
                <img src={imgnocar} alt="user icon" className="img-fluid" />
            </div>
            <button className="btn-orange btn btn-info " onClick={this.addCar} >ثبت اطلاعات خودرو</button>
        </div>
        <div className="Car-Col">
            <div className="Car-Col-Card">
                <img src={imgnocar} alt="user icon" className="img-fluid" />
            </div>
            <button className="btn-orange btn btn-info " onClick={this.addCar} >ثبت اطلاعات خودرو</button>
        </div>

        <div className="Car-Col">
            <div className="Car-Col-Card">
                <img src={imgnocar} alt="user icon" className="img-fluid" />
            </div>
            <button className="btn-orange btn btn-info " onClick={this.addCar} >ثبت اطلاعات خودرو</button>
        </div>
    </div> */}
      </div>
    );

    const View2 = (
      <div className="car-panel card-body">
        <div className="row myCarCadr">
          {this.state.modal === 1 ? (
            <div>
              {" "}
              <div className="overlayCar"></div>
              <div className="Car-Modal">
                <p>کاربر گرامی</p>
                <p>
                  کلیه اطلاعات ثبت شده در مورد خودرو شما در سیستم غیرفعال خواهد
                  شد!
                </p>
                <div className="Car-Modal-Row">
                  <button onClick={this.HandlerActive}>
                    فعال نگه داشتن خودرو
                  </button>
                  <button data-id={this.state.id} onClick={this.HandlerDelete}>
                    غیرفعال نمودن خودرو
                  </button>
                </div>
              </div>{" "}
            </div>
          ) : null}

          <div className="col-lg-7 col-12">
            <div className="text-center caption-header-user-car">
              {
                <li
                  onClick={() =>
                    this.props.history.push({ pathname: "/user/panel" })
                  }
                  className="fa fa-arrow-right back-arrow caption-header-user-icon"
                ></li>
              }
              خودروی من{" "}
            </div>
            <div className="captionline"></div>

            <div className="row Car_Row_Model">
              <div className="col-lg-6 mb26">
                <Select
                  className="ddBrands"
                  required
                  onChange={this.handleBrand}
                  placeholder={"برند تولید کننده"}
                  value={this.state.brands.filter(
                    (option) => option.value === this.state.brand
                  )}
                  options={this.state.brands}
                />
                <ShowMessage msg={this.state.msgBrand} />
              </div>

              <div className="col-lg-6 mb26">
                <Select
                  className="ddBrands"
                  required
                  onChange={this.handleProduct}
                  placeholder={"محصول"}
                  value={this.state.products.filter(
                    (option) => option.value === this.state.product
                  )}
                  options={this.state.products}
                />
                <ShowMessage msg={this.state.msgProduct} />
              </div>
            </div>
            {/* <div className="form-group mb26"> */}

            {/* </div> */}
            {/* <div className="form-group mb26"> */}

            {/* </div> */}
            <div className="form-group car-item mb26">
              {/* <div className="Car_Row_Model"> */}
              {/* <div className="Car_Col mb26">
                                    <div className="plfield">
                                        <input pattern="[A-Za-z]{3}" placeholder=" " type="text" title="لطفا مدل را وارد کنید" required onChange={(e) => this.handleModel(e)} value={this.state.model} className="pl-input" />
                                        <span className="grow">مدل</span>
                                    </div>
                                    <ShowMessage msg={this.state.msgModel} />
                                </div> */}
              {/* <div className="Car_Col mb26"> */}
              <div className="plfield plfield-mr">
                <input
                  type="number"
                  placeholder=" "
                  title="لطفا سال تولید را وارد کنید"
                  required
                  onChange={(e) => this.handleYear(e)}
                  value={this.state.year}
                  className="pl-input form-control"
                />
                <span className="grow">سال تولید</span>
              </div>
              <ShowMessage msg={this.state.msgYear} />
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="form-group car-item mb26">
              <div className="plfield  plfield-mr">
                <input
                  type="text"
                  placeholder=" "
                  title="لطفا شماره VIN را وارد کنید"
                  required
                  value={this.state.VIN}
                  onChange={(e) => this.handleVIN(e)}
                  className="pl-input form-control"
                />
                <span className="grow">شماره VIN</span>
              </div>
              <ShowMessage msg={this.state.msgVIN} />
            </div>
            <div className="form-group car-item">
              {curentImage !== undefined ? (
                <div className="CarPlk">
                  <div className="Car_Pelak  plfield-pelak-mr">
                    <input
                      type="number"
                      maxLength={2}
                      onChange={(e) => this.handlePelak3(e)}
                      defaultValue={this.state.pelak3}
                    />
                    <input
                      type="number"
                      maxLength={3}
                      onChange={(e) => this.handlePelak2(e)}
                      defaultValue={this.state.pelak2}
                    />
                    <select
                      onChange={(e) => this.handleCharacters(e)}
                      value={this.state.plekSign}
                    >
                      <option className="Car_Pelak_Option"></option>
                      {this.state.pelakCharacters !== undefined
                        ? this.state.pelakCharacters.map((e: any) => (
                            <option data-id={e.id} className="Car_Pelak_Option">
                              {e.sign}
                            </option>
                          ))
                        : null}
                    </select>
                    <input
                      type="number"
                      maxLength={2}
                      onChange={(e) => this.handlePelak1(e)}
                      defaultValue={this.state.pelak1}
                    />
                  </div>
                  <ShowMessage msg={this.state.msgPlak} />
                </div>
              ) : (
                <div></div>
              )}
              {/* <ShowMessage msg={this.state.msgVIN} /> */}
            </div>
            {this.state.id !== "" &&
            this.state.id !== undefined &&
            this.state.id.length > 0 ? (
              <div className="form-group car-item">
                <div className="Car_Row">
                  <p className="Car_DeActive">
                    غیرفعال نمودن این خودرو در سامانه اتوچار
                  </p>
                  <label className="Toggle_Switch">
                    <input
                      type="checkbox"
                      onChange={this.HandlerInActive}
                      checked={this.state.toggleInActive}
                    />
                    <span className="Toggle_Slider round"></span>
                  </label>
                </div>
              </div>
            ) : null}

            <div className="clearfix"></div>
            <div className="form-group car-item">
              {/* {this.state.isLoading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) :  */}
              {this.state.id !== "" &&
              this.state.id !== undefined &&
              this.state.id.length > 0 ? (
                <div className="text-center">
                  <button onClick={this.saveCar} className="btn-orange-car btn">
                    ذخیره تغییرات
                  </button>
                  <button
                    onClick={this.CancelCar}
                    className="btn-orange-car btn"
                  >
                    لغو تغییرات
                  </button>
                </div>
              ) : (
                <div>
                  {this.state.saveButton ? (
                    <button
                      onClick={this.saveCar}
                      className="btn-orange-car btn btn-car-ml"
                    >
                      ثبت اطلاعات خودرو
                    </button>
                  ) : (
                    <button
                      className="UserCarSubmit btn btn-car-ml"
                      disabled={true}
                      onClick={this.saveCar}
                    >
                      ثبت اطلاعات خودرو
                    </button>
                  )}
                  {/* <button onClick={this.saveCar} className="UserCarSubmit btn" >ثبت اطلاعات خودرو</button> */}
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-5 col-12">
            {/* <img
              src={imgsmallcar}
              alt="car"
              className="img-fluid vertical-middle"
            /> */}
            <div className="edit-usercard-container">
              <img
                alt={""}
                src={
                  this.state.imageProduct !== ""
                    ? APIImage + "/" + this.state.imageProduct
                    : imgnocar
                }
              />
            </div>
          </div>
        </div>
      </div>
    );

    const View2_1 = (
      <div className="car-panel card-body">
        <div className="row">
          <div className="col-lg-8">
            <div className="caption">خودرو من</div>
            <div className="captionline"></div>
            <div className="form-group">
              <div className="form-group car-item">
                <div className="plfield ">
                  <p className="pl-input form-control">
                    {this.state.brandSign}{" "}
                  </p>
                  <span className="grow">برند </span>
                </div>
              </div>
            </div>
            <div className="form-group  car-item">
              {/* <div className="Car_Row_Model"> */}
              {/* <div className="Car_Col">
                                    <div className="plfield">
                                        <input pattern="[A-Za-z]{3}" placeholder=" " disabled type="text" title="لطفا مدل را وارد کنید" required onChange={(e) => this.handleModel(e)} value={this.state.model} className="pl-input" />
                                        <span className="grow">مدل</span>
                                    </div>
                                    <ShowMessage msg={this.state.msgModel} />
                                </div>
                                <div className="Car_Col"> */}
              <div className="plfield ">
                <input
                  type="text"
                  placeholder=" "
                  disabled
                  title="لطفا سال تولید را وارد کنید"
                  required
                  onChange={(e) => this.handleYear(e)}
                  value={this.state.year}
                  className="pl-input form-control"
                />
                <span className="grow">سال تولید</span>
              </div>
              {/* <ShowMessage msg={this.state.msgYear} /> */}
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="form-group car-item">
              <div className="plfield ">
                <input
                  type="text"
                  placeholder=" "
                  disabled
                  title="لطفا شماره VIN را وارد کنید"
                  required
                  value={this.state.VIN}
                  onChange={(e) => this.handleVIN(e)}
                  className="pl-input form-control"
                />
                <span className="grow">شماره VIN</span>
              </div>
              {/* <ShowMessage msg={this.state.msgVIN} /> */}
            </div>
            <div className="form-group car-item">
              {curentImage !== undefined ? (
                <div>
                  <div className="Car_Pelak ">
                    <input type="number" value={this.state.pelak3} disabled />
                    <input type="number" value={this.state.pelak2} disabled />
                    <select disabled value={this.state.plekSign}>
                      <option className="Car_Pelak_Option"></option>
                      {this.state.pelakCharacters !== undefined
                        ? this.state.pelakCharacters.map((e: any) => (
                            <option data-id={e.id} className="Car_Pelak_Option">
                              {e.sign}
                            </option>
                          ))
                        : null}
                    </select>
                    <input type="number" disabled value={this.state.pelak1} />
                  </div>
                  {/* <ShowMessage msg={this.state.msgPlak} /> */}
                </div>
              ) : (
                <div></div>
              )}
              {/* <ShowMessage msg={this.state.msgVIN} /> */}
            </div>
            <div className="Car-Alert">
              <p>کاربر گرامی اطلاعات خودرو شما با موفقیت ثبت شد.</p>
              <button
                onClick={this.handler_Ok}
                className="Address-Btn_Ok btn w-100"
              >
                متوجه شدم
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <span className="helper"></span>

            <img
              src={imgsmallcar}
              alt="car"
              className="img-fluid vertical-middle"
            />
          </div>
        </div>
      </div>
    );
    const View3 = (
      <div className="card-body ">
        <div className="text-center msg-step3 outer-center">
          <div className="check-container inner-center">
            <i className="fa fa-check"></i>
          </div>
          <div>
            <span>کد تایید به شماره همراه شما ارسال شد</span>
          </div>
        </div>
        <div className="mt-5 form-group">
          <div className="plfield ">
            <input
              type="text"
              placeholder=" "
              maxLength={4}
              title="کد تایید دریافتی"
              required
              onChange={(e) => this.handleChallengeCode(e)}
              className="pl-input form-control ltr-control txt-challenge"
              id="staticEmail"
            />
            <span className="grow">کد تایید دریافتی</span>
            <i className="icon-challenge fa fa-envelope"></i>
            <div className="underline-container">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <ShowMessage msg={this.state.msgBrand} />
        </div>

        <div className="clearfix"></div>
        <div className="mt-5 form-group">
          {this.state.counter > 0 ? (
            <button
              disabled
              className="btn-resend-challenge btn btn-info w-25 w-100"
            >
              ارسال مجدد کد تایید {this.state.counter} ثانیه
            </button>
          ) : (
            <button
              className="btn-resend-challenge btn btn-info w-25 w-100"
              onClick={this.resendChallenge}
            >
              ارسال مجدد کد تایید {this.state.counter} ثانیه
            </button>
          )}
        </div>
        <div className="form-group">
          <button
            className="btn-orange btn btn-info  w-100"
            onClick={this.verifyForgotPassCode}
          >
            تایید کد
          </button>
        </div>
      </div>
    );

    const View4 = (
      <div className="card-body ">
        <div className="text-center msg-step4 outer-center">
          <div>
            <span>لطفا کلمه عبور جدید را وارد کنید</span>
          </div>
        </div>

        <div className="clearfix"></div>
      </div>
    );

    const View5 = (
      <div className="card-body ">
        <div className="text-center msg-step3 outer-center">
          <div className="check-container inner-center">
            <i className="fa fa-check"></i>
          </div>
          <div>
            <span>
              کاربر گرامی <br />
              کلمه عبور شما با موفقیت تغییر کرد
            </span>
          </div>
        </div>

        <div className="clearfix"></div>
        <div className="mt-5 form-group">
          <button
            className="btn-orange btn btn-info  w-100"
            onClick={this.clickLoginAfterChangePass}
          >
            ورود{" "}
          </button>
        </div>
      </div>
    );

    return (
      <div className="UserCar outer-center">
        <div className="inner-center w-100">
          <div className="">
          <div className="text-center caption-header">
            {
              <li
                onClick={() =>
                  this.props.history.push({ pathname: "/user/panel" })
                }
                className="fa fa-arrow-right back-arrow"
              ></li>
            }
            خودرو من {" "}
          </div>
            <MsgBox />

            {this.state.view === 1 ? View1 : null}
            {this.state.view === 1.1 ? View1_1 : null}
            {this.state.view === 1.2 ? View1_2 : null}
            {this.state.view === 2 ? View2 : null}
            {this.state.view === 2.1 ? View2_1 : null}
            {this.state.view === 3 ? View3 : null}
            {this.state.view === 4 ? View4 : null}
            {this.state.view === 5 ? View5 : null}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(UserCar as any);

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
