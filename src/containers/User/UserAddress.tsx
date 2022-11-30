import React, { Component, useState, useEffect } from "react";
import { ApplicationState } from "../../store";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { MessageTypes } from "../../model/general";
import { responseModel } from "../../model/general/responseModel";
import MsgBox from "../../components/MsgBox";
import { APIUrl } from "../../helper/config";
import GoogleMapReact from "google-map-react";
import Select from "react-select";
import { selectData } from "../../model/general/selectData";
import { VwContact } from "../../model/viewModel/VwContact";
import Marker from "../../components/Marker";

interface UserInfo {
  username: string;
  password: string;
}

//const initLatLng = { lat: 23.424076, lng: 53.847818000000004 };

const SimpleMap = (props: {
  lat: string | undefined;
  lng: string | undefined;
  setMarkerLocation: any;
}) => {
  const [center, setCenter] = useState({
    lat: 23.424076,
    lng: 53.847818000000004,
  });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setZoom(11);
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        // console.log("Change Latitude is :", position.coords.latitude);
        // console.log("Change Longitude is :", position.coords.longitude);
      });
    }
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.latitude,
        });
      },
      function (error) {
        if (props.lat && props.lng)
          setCenter({
            lat: parseFloat(props.lat as string),
            lng: parseFloat(props.lng as string),
          });
        else setCenter({ lat: 35.763494, lng: 51.304902 });
      }
    );
  }, []);
  function handleMap(event: any) {
    setCenter({ lat: event.lat, lng: event.lng });
    props.setMarkerLocation(center);
  }

  return (
    <div style={{ height: "433px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAszwUB1v5P0zZqDsQQmDFPOdhC2ii6tME" }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={handleMap}
      >
        <Marker lat={center.lat} lng={center.lng} name="آدرس من" color="blue" />
      </GoogleMapReact>
    </div>
  );
};

interface HeaderProps {
  selectContactId: (updatedAddresses: VwContact[], id: string) => {};
}

type UserAddressProps = UserInfo.UserInfoState &
  typeof UserInfo.actionCreators & {
    match: any;
    location: any;
    history: any;
  } & HeaderProps & { showSelectAddress: boolean } & RouteComponentProps<{}>;

class UserAddress extends Component<
  UserAddressProps,
  {
    id?: any;
    value: string;
    isLoading: boolean;
    provinceId: string;
    cityId: string;
    provinces: selectData[];
    cities: selectData[];
    contactId: string;
    plak: string;
    success: boolean;
    unit: string;
    postalCode: string;
    lat?: any;
    lng?: any;
    VIN: string | undefined;
    msgPostalCode: string | undefined;
    msgYear: string | undefined;
    msgVIN: string | undefined;
    msgCity: string | undefined;
    msgProvince: string | undefined;
    msgAddress: string | undefined;
    msgContact: string | undefined;
    view: number;
    counter: number;
    challengeCode: string;
    msgMap: string | undefined;
    address: VwContact[];
    contacts: selectData[];
    curentAddress?: VwContact;
    saveButton: boolean;

  }
  > {
  constructor(props: any) {
    super(props);

    this.props.UserLoad(true);
    this.state = {
      id: null,
      value: "",
      plak: "",
      unit: "",
      success: false,
      postalCode: "",
      lat: null,//initLatLng.lat.toString(),
      lng: null,//initLatLng.lng.toString(),
      VIN: undefined,
      msgPostalCode: undefined,
      msgYear: undefined,
      msgVIN: undefined,
      msgProvince: undefined,
      msgAddress: undefined,
      msgCity: undefined,
      msgContact: undefined,
      msgMap: undefined,
      isLoading: false,
      view: 0,
      counter: 10,
      challengeCode: "",
      provinceId: "",
      cityId: "",
      contactId: "",
      provinces: [],
      cities: [],
      contacts: [],
      address: [],
      saveButton: false,
    };
  }

  componentDidMount() {
    this.initLoadingData();
    // if (this.props.userId === null) {
    //   const { history } = this.props;
    //   history.push("/");
    //   return;
    // }
  }
  componentWillReceiveProps(prevProps: any, prevState: any) {
    // if(prevProps.token !== this.props.token)
    //     this.initLoadingData();
  }



  goBack = (e: any) => {
    this.OkAddress();
  };
  getCities = (parentId: string) => {
    fetch(
      APIUrl +
      "/Zone/GetByParentId?parentId=" +
      parentId +
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

        this.props.UserLoad(false);
        console.log("messageCode=" + responseModel.messageCode);
        if (responseModel.messageCode === 0) {
          this.setState({ cities: responseModel.data });
          if (
            this.state.curentAddress !== undefined &&
            this.state.curentAddress.zoneId !== undefined
          )
            this.setState({
              cityId: (this.state.curentAddress as VwContact).zoneId,
            });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  };

  handleProvince = async (event: any) => {
    await this.setState({ provinceId: event.value, contactId: "" });
    await this.validateAddress();
    await this.getCities(event.value);
  };
  handleContact = async (event: any) => {
    await this.setState({ contactId: event.value });
    await this.validateAddress();
  };

  handleCity = async (event: any) => {
    await this.setState({ cityId: event.value });
    await this.validateAddress();
  };

  handleModel = async (event: any) => {
    await this.setState({ plak: event.target.value });
    await this.validateAddress();
  };
  handleAddress = async (event: any) => {
    await this.setState({ value: event.target.value });
    await this.validateAddress();
  };

  handlePlak = async (event: any) => {
    await this.setState({ plak: event.target.value });
    await this.validateAddress();
  };
  handleUnit = async (event: any) => {
    await this.setState({ unit: event.target.value });
    await this.validateAddress();
  };
  handlePostalCode = async (event: any) => {
    await this.setState({ postalCode: event.target.value });
    await this.validateAddress();
  };

  handleVIN = async (event: any) => {
    this.setState({ VIN: event.target.value });
  };
  handleConfirmPassword = (event: any) => {
    this.setState({ unit: event.target.value });
  };

  handleChallengeCode = (event: any) => {
    this.setState({ challengeCode: event.target.value });

    if (event.target.value.length === 4)
      this.checkForgotPassCode(this.state.value, event.target.value);
  };

  handleSimpleMap = (event: any) => {
    console.log("lat=" + event.lat);

    this.setState({ lat: event.lat, lng: event.lng });
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
    const mobile = this.state.value;
    const password = this.state.plak;

    if (this.state.value !== "") {
      if (!this.ValidateMobile(this.state.value)) {
        this.setState({
          msgYear:
            "شماره تلفن همراه وارد شده صحیح نیست.لطفا شماره وارد شده را بررسی نمایید.",
        });
        return;
      } else this.setState({ msgYear: undefined });
    } else this.setState({ msgYear: undefined });

    if (this.state.plak === "") {
      this.setState({ msgVIN: "لطفا کلمه عبور را وارد کنید" });
      return;
    } else this.setState({ msgVIN: undefined });

    console.log("mobile=" + mobile);
    this.loginUser(mobile, password);
  };

  checkForgotPassCode = (mobile: string, challengeCode: string) => {
    if (challengeCode === "") {
      this.setState({ msgProvince: "لطفا کد تایید را وارد نمایید" });
      return;
    } else this.setState({ msgProvince: undefined });

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
          this.setState({ msgProvince: responseModel.message });
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
    const mobile = this.state.value;
    const challengeCode = this.state.challengeCode;
    this.checkForgotPassCode(mobile, challengeCode);
  };

  OkAddress = () => {
    this.props.UserLoad(true);
    fetch(APIUrl + "/Contact/GetAddress?PersonId=" + this.props.personId, {
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
          this.setState({ provinces: responseModel.data });
          let data = responseModel.data as VwContact[];

          if (data.length === 0) {
            this.setState({ view: 1 });
          } else {
            this.setState({ address: data });
            this.setState({ view: 1.1 });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  };
  saveAddress = () => {
    this.setState({
      msgPostalCode: undefined,
      msgAddress: undefined,
      msgVIN: undefined,
      msgProvince: undefined,
      msgCity: undefined,
      msgContact: undefined,
      msgMap: undefined,
    });
    let cf = true;

    if (this.state.provinceId === "") {
      this.setState({ msgProvince: "لطفا استان را وارد کنید" });
      cf = false;
    }
    if (this.state.contactId === "") {
      this.setState({ msgContact: "لطفا نوع آدرس را وارد کنید" });
      cf = false;
    }
    if (this.state.cityId === "") {
      this.setState({ msgCity: "لطفا شهر را وارد کنید" });
      cf = false;
    }
    if (this.state.postalCode) {
      if (this.state.postalCode.length !== 10) {
        this.setState({
          msgPostalCode: "کدپستی را ۱۰رقم و بدون فاصله وارد کنید",
        });
        cf = false;
      }
    }
    if (this.state.value === "") {
      this.setState({ msgAddress: "لطفا آدرس را وارد کنید" });
      cf = false;
    }
    // if (this.state.lat === initLatLng.lat.toString()) {
    //   this.setState({ msgMap: "لطفا طول و عرض جغرافیایی را وارد کنید" });
    //   cf = false;
    // }

    if (!cf) {
      return;
    }
    console.log("save lat=" + this.state.lat);

    let data = {
      zoneId: this.state.cityId,
      personId: this.props.personId,
      latitude: this.state.lat as string,
      longitude: this.state.lng as string,
      value: this.state.value,
      postCode: this.state.postalCode,
      buildingLicensePlate: this.state.plak,
      apartmentLicensePlate: this.state.unit,
      createUserID: this.props.userId,
      updateUserID: this.props.userId,
      hccontactTypeId: this.state.contactId,
      id: this.state.id,
    } as VwContact;

    // const data = {
    //     zoneId: this.state.cityId,
    //     plak: this.state.plak,
    //     unit: this.state.unit,
    //     postalCode: this.state.postalCode,
    //     lat:this.state.lat,
    //     lng:this.state.lng,
    // };
    this.props.UserLoad(true);
    fetch(APIUrl + "/Contact/SaveAddress", {
      method: "POST",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {

        if (responseModel.messageCode !== 0) {
          this.setState({ msgAddress: responseModel.message });
        }
        else {
          this.setState({ curentAddress: responseModel.data[0] });
          this.setState({ view: 2.1, counter: 60 });
        }
        this.props.UserLoad(false);
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
        this.props.UserLoad(false);
      });
  };

  clickLoginAfterChangePass = () => {
    this.loginUser(this.state.value, this.state.plak);
  };

  gotoSignUp = () => {
    const { history } = this.props;

    history.push({
      pathname: "/signup",
    });
  };

  addCar = (e: any) => {
    let id = e.currentTarget.dataset.id;
    if (id !== undefined) {
      fetch(APIUrl + "/Contact/EditAddress?Id=" + id, {
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
            this.setState({ curentAddress: responseModel.data });
            const res = responseModel.data as VwContact;
            if (this.state.curentAddress !== undefined)
              this.setState({
                id: res.id,
                contactId: res.hccontactTypeId,
                provinceId: res.parentId,
                value: res.value,
                unit: res.apartmentLicensePlate,
                plak: res.buildingLicensePlate,
                postalCode: res.postCode,
                lat: res.latitude,
                lng: res.longitude,
              });
            this.getCities((this.state.curentAddress as VwContact).parentId);
            this.setState({ view: 2.2 });
          }
        });
    }

    this.setState({ view: 2, cityId: "", provinceId: "" });
    fetch(
      APIUrl +
      "/Zone/GetByTypeId?HCZoneTypeId=A236145F-AFC3-4F22-B77F-E3E12685A7C0&Lang=" +
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
        console.log("messageCode=" + responseModel.messageCode);
        if (responseModel.messageCode === 0) {
          this.setState({ provinces: responseModel.data });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  };

  deladdress = (e: any) => {
    let id = e.currentTarget.dataset.id;
    fetch(APIUrl + "/Contact/DeleteAddress?Id=" + id, {
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
          fetch(
            APIUrl + "/Contact/GetAddress?PersonId=" + this.props.personId,
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
              if (responseModel.messageCode === 0) {
                this.setState({ provinces: responseModel.data });
                let data = responseModel.data as VwContact[];

                this.setState({ contactId: "", provinceId: "", cityId: "" });
                if (data.length === 0) {
                  this.setState({ view: 1 });
                } else {
                  this.setState({ address: data });
                  this.setState({ view: 1.1 });
                }
              }
            })
            .catch((error) => {
              console.log(error);
              this.props.UserLoad(false);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  };
  HandlerInActive = async (e: any) => {
    let cid = e.currentTarget.dataset.contactid;

    let active = e.currentTarget.checked === true ? true : false;
    fetch(
      APIUrl + "/Contact/ActiveAddress?ContactId=" + cid + "&Active=" + active,
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
        if (responseModel.data && responseModel.data.length > 0) {
          fetch(
            APIUrl + "/Contact/GetAddress?PersonId=" + this.props.personId,
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
            .then((responseModel2) => {
              if (responseModel2.data && responseModel2.data.length > 0) {
                this.setState({ address: responseModel2.data });
                this.setState({ view: 1.1 });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  validateAddress = () => {
    if (
      !this.state.provinceId ||
      !this.state.cityId ||
      !this.state.address ||
      !this.state.plak ||
      !this.state.unit ||
      !this.state.postalCode ||
      !this.state.contactId
    ) {
      this.setState({ saveButton: false });
    } else {
      this.setState({ saveButton: true });
    }
  };


  initLoadingData = () => {

    this.props.UserLoad(true);
    fetch(APIUrl + "/Contact/GetAddress?PersonId=" + this.props.personId, {
      method: "GET",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + this.props.token,
      },
    })
      .then(response => { this.props.checkStatus(response); return response })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        this.props.UserLoad(false);
        if (responseModel.messageCode === 0) {
          this.setState({ provinces: responseModel.data });
          let data = responseModel.data as VwContact[];
          if (data.length === 0) {
            this.setState({ view: 1 });
          } else {
            this.setState({ address: data });
            this.setState({ view: 1.1 });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
    fetch(
      APIUrl +
      "/Zone/GetByTypeId?HCZoneTypeId=A236145F-AFC3-4F22-B77F-E3E12685A7C0&Lang=" +
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
        console.log("messageCode=" + responseModel.messageCode);
        if (responseModel.messageCode === 0) {
          this.setState({ provinces: responseModel.data });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });

    fetch(
      APIUrl + "/Contact/GetContactTypeAddress?Lang=" + this.props.lang.abr,
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
        console.log("messageCode=" + responseModel.messageCode);
        if (responseModel.messageCode === 0) {
          this.setState({ contacts: responseModel.data });
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.UserLoad(false);
      });
  }
  render() {
    const View1 = (
      <div>
        <div className="w-75 inner-center">
          <div className="text-center mb-3">
            <img
              src={require("../../img/my-address-illustration.png")}
              srcSet="/static/media/my-address-illustration@2x.png 2x, /static/media/my-address-illustration@3x.png 3x"
              alt="user icon"
              className="my-address-illustration"
            />
          </div>
          {this.state.address.length === 0 ?
            <div className="p-4 rtl text-center">
              کاربر گرامی<br />
ما از شما آدرسی نداریم<br />
لطفا آدرس های منتخب خودتون رو وارد کنید<br />
تا سفارش ها به موقع به دستتون برسه
          </div> : null}
          <div className="text-center p-2">
            <button
              className="btn-orange btn btn-info w-25 "
              onClick={this.addCar}
            >
              اضافه کردن آدرس
            </button>
          </div>
        </div>
      </div>
    );
    const View1_1 = (
      <div className="Address-Row ">
        <div className="Address-Col">
          <div className="Address-Col-Card">
            <img
              src={require("../../img/my address illustration copy.png")}
              srcSet="/static/media/my address illustration copy@2x.png 2x, /static/media/my address illustration copy@3x.png 3x"
              alt="user icon"
              className="my-address-illustration"
            />
          </div>
          {this.state.address.length === 0 ?
            <div className="w-50 p-4 rtl text-center">
              کاربر گرامی<br />
ما از شما آدرسی نداریم<br />
لطفا آدرس های منتخب خودتون رو وارد کنید<br />
تا سفارش ها به موقع به دستتون برسه
          </div> : null}
          <button className="btn-orange btn btn-info " onClick={this.addCar}>
            {" "}
            اضافه کردن آدرس
          </button>
        </div>
        {this.state.address !== undefined
          ? this.state.address.map((item: any) => {
            return (
              <div className="Address-Col">
                <div className="Address-Col-Card">
                  <p className="Address-Title">
                    <img
                      src={require("../../img/Icon feather-map-pin.png")}
                      srcSet="/static/media/Icon feather-map-pin@2x.png, /static/media/Icon feather-map-pin@3x.png"
                      alt="user icon"
                      className="my-address-illustration"
                    />
                    {item.contactTypeSign}
                  </p>
                  <p>
                    <span>استان</span> <span>{item.continentName}</span>
                    <span>شهر </span> <span>{item.cityName}</span>
                  </p>

                  <p>
                    <span>نشانی پست </span> <span>{item.value}</span>
                  </p>
                  <p>
                    <span>پلاک </span>{" "}
                    <span>{item.buildingLicensePlate}</span>
                    <span className="mr-15">واحد </span>{" "}
                    <span>{item.apartmentLicensePlate}</span>
                  </p>
                  <p>
                    <span>کدپستی</span> <span>{item.postCode}</span>
                  </p>
                  <p>
                    <b>انتخاب این آدرس به عنوان آدرس اصلی</b>
                    <label className="Toggle_Switch">
                      <input
                        type="checkbox"
                        onChange={this.HandlerInActive}
                        checked={item.mainContact}
                        data-contactid={item.id}
                      />
                      <span className="Toggle_Slider round"></span>
                    </label>
                  </p>
                </div>
                <button
                  className="btn-orange btn btn-info "
                  onClick={this.addCar}
                  data-Id={item.id}
                >
                  {" "}
                    ویرایش کردن این آدرس
                  </button>
                <button
                  className="btn button-del "
                  onClick={this.deladdress}
                  data-Id={item.id}
                >
                  {" "}
                    حذف این آدرس
                  </button>
                {this.props.showSelectAddress ? (
                  <button
                    className="btn button-select "
                    onClick={() =>
                      this.props.selectContactId(this.state.address, item.id)
                    }
                    data-Id={item.id}
                  >
                    {" "}
                      انتخاب این آدرس
                  </button>
                ) : null}
              </div>
            );
          })
          : null}
      </div>
    );

    const View2 = (
      <div className="card-body">
        <div className="row address-cols">
          <div className="col-lg-6 col-12">
            <div className="flex-container useraddresscontainer">
              <div className=" min-form">
                <div className="caption editaddress">
                  <p>
                    <img
                      src={require("../../img/Icon feather-map-pin.png")}
                      srcSet="/static/media/Icon feather-map-pin@2x.png, /static/media/Icon feather-map-pin@3x.png"
                      alt="user icon"
                      className="my-address-illustration"
                    />
                    آدرس من
                  </p>
                </div>
                <div className="captionline captionlineaddress"></div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-lg-6 col-12 ddProvincesmgr34 p-2">
                      <Select
                        className="ddProvinces"
                        required
                        onChange={this.handleProvince}
                        placeholder={"استان"}
                        value={this.state.provinces.filter(
                          (option) => option.value === this.state.provinceId
                        )}
                        options={this.state.provinces}
                      />
                      <ShowMessage msg={this.state.msgProvince} />
                    </div>
                    <div className="col-lg-6 col-12 ddProvincesmgr34 p-2">
                      <Select
                        className="ddCities"
                        required
                        onChange={this.handleCity}
                        placeholder={"شهر"}
                        value={this.state.cities.filter(
                          (option) => option.value === this.state.cityId
                        )}
                        options={this.state.cities}
                      />
                      <ShowMessage msg={this.state.msgCity} />
                    </div>
                  </div>
                </div>
                <div className="form-group w-100">
                  <div className="plfield ">
                    <textarea
                      placeholder=" "
                      title="نشانی پستی"
                      required
                      onChange={(e) => this.handleAddress(e)}
                      className="pl-input form-control useraddresstext"
                    />
                    <span className="grow">نشانی پستی</span>
                  </div>
                </div>
                <ShowMessage msg={this.state.msgAddress} />

                <div className="form-group row">
                  <div className="col-lg-4 col-3 plfield plak">
                    <input
                      type="text"
                      placeholder=" "
                      title="پلاک"
                      required
                      onChange={(e) => this.handlePlak(e)}
                      className="pl-input form-control useraddresspelak"
                    />
                    <span className="grow">پلاک</span>
                  </div>
                  <div className="col-lg-4 col-3 plfield ">
                    <input
                      type="text"
                      placeholder=" "
                      title="واحد "
                      required
                      onChange={(e) => this.handleUnit(e)}
                      className="pl-input form-control useraddresspelak"
                    />
                    <span className="grow">واحد </span>
                  </div>
                  <div className="col-lg-4 col-6 plfield ">
                    <input
                      type="text"
                      placeholder=" "
                      maxLength={10}
                      title="کدپستی"
                      required
                      onChange={(e) => this.handlePostalCode(e)}
                      className="pl-input form-control useraddressapartmentno"
                    />
                    <span className="grow">کدپستی</span>
                    <ShowMessage msg={this.state.msgPostalCode} />
                  </div>
                </div>
                <div className="form-group flex-container">
                  <div className="w-100">
                    <Select
                      className="ddProvinces addresstitle"
                      required
                      onChange={this.handleContact}
                      placeholder={"نوع آدرس"}
                      value={this.state.contacts.filter(
                        (option) => option.value === this.state.contactId
                      )}
                      options={this.state.contacts}
                    />
                    <ShowMessage msg={this.state.msgContact} />
                  </div>
                  <ShowMessage msg={this.state.msgYear} />
                </div>
                <div className="clearfix"></div>
                <div className=" form-group">
                  {this.state.isLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                      <div>
                        {this.state.saveButton ? (
                          <button
                            onClick={this.saveAddress}
                            className="btn-orange-car addressgraybtn btn w-100 useraddressgray"
                          >
                            ثبت آدرس
                          </button>
                        ) : (
                            <button
                              onClick={this.saveAddress}
                              disabled={true}
                              className="btn-gray addressgraybtn btn w-100 useraddressgray"
                            >
                              ثبت آدرس
                            </button>
                          )}
                        <button
                          onClick={this.goBack}
                          className="btn-orange addressgraybtn btn w-100 Address-Btn useraddressgray"
                        >
                          بازگشت
                      </button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-12">
            <div className="caption">آدرس از روی نقشه</div>
            <div className="captionline captionlineaddress2"></div>
            <div className="map-container">
              <SimpleMap
                {...{
                  lat: undefined,
                  lng: undefined,
                  setMarkerLocation: this.handleSimpleMap,
                }}
              />
            </div>
            <div className="xsmall-text mt-2">
              <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
              شما می توانید با حرکت دادن نشانگر بر روی نقشه و مشخص نمودن آدرس
              خود. پیک را در آدرس یابی یاری نمایید.
            </div>
            <ShowMessage msg={this.state.msgMap} />
          </div>
        </div>
      </div>
    );

    const View2_1 =
      this.state.curentAddress !== undefined ? (
        <div className="car-panel card-body">
          <div className="flex-container address-cols">
            <div>
              <div className="flex-container">
                <div className=" min-form">
                  <div className="caption editaddress">
                    <p>
                      <img
                        src={require("../../img/Icon feather-map-pin.png")}
                        srcSet="/static/media/Icon feather-map-pin@2x.png, /static/media/Icon feather-map-pin@3x.png"
                        alt="user icon"
                        className="my-address-illustration"
                      />
                      {this.state.curentAddress.contactTypeSign}
                    </p>
                  </div>
                  <div className="captionline captionlineaddress"></div>
                  <div className="form-group">
                    <div className="Address">
                      <div className="Address_Row">
                        <p>
                          <span>استان</span>{" "}
                          <span>{this.state.curentAddress.continentName}</span>
                        </p>
                        <p>
                          <span>شهر </span>{" "}
                          <span>{this.state.curentAddress.cityName}</span>
                        </p>
                      </div>
                      <div className="Address_Row">
                        <p>
                          <span>نشانی پست </span>{" "}
                          <span>{this.state.curentAddress.value}</span>
                        </p>
                      </div>
                      <div className="Address_Row">
                        <p>
                          <span>پلاک </span>{" "}
                          <span>
                            {this.state.curentAddress.buildingLicensePlate}
                          </span>
                        </p>

                        <p>
                          <span>کدپستی</span>{" "}
                          <span>{this.state.curentAddress.postCode}</span>
                        </p>
                      </div>
                      <div className="Address_Row">
                        <p>
                          <span>واحد </span>{" "}
                          <span>
                            {this.state.curentAddress.apartmentLicensePlate}
                          </span>
                        </p>
                      </div>
                      <div className="Address-Rec">
                        <p>کاربر گرامی آدرس شما با موفقیت ثبت شد.</p>
                      </div>
                    </div>
                  </div>

                  <div className="clearfix"></div>
                  <div className=" form-group">
                    <div>
                      <button
                        onClick={this.OkAddress}
                        className="Address-Btn_Ok btn w-100"
                      >
                        متوجه شدم
                      </button>

                      <button
                        onClick={this.addCar}
                        className="Address-Btn_Update btn w-100"
                        data-Id={this.state.curentAddress.id}
                      >
                        ویرایش آدرس{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="caption">آدرس از روی نقشه</div>
              <div className="captionline captionlineaddress2"></div>
              <div className="map-container">
                <SimpleMap
                  {...{
                    lat: this.state.lat,
                    lng: this.state.lng,
                    setMarkerLocation: this.handleSimpleMap,
                  }}
                />
              </div>
              <div className="xsmall-text mt-2">
                <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
                شما می توانید با حرکت دادن نشانگر بر روی نقشه و مشخص نمودن آدرس
                خود. پیک را در آدرس یابی یاری نمایید.
              </div>
              <ShowMessage msg={this.state.msgMap} />
            </div>
          </div>
        </div>
      ) : null;
    const View2_2 =
      this.state.curentAddress !== undefined ? (
        <div className="car-panel card-body">
          <div className="row address-cols">
            <div className="col-lg-6 col-12">
              <div className="flex-container useraddresscontainer">
                <div className=" min-form">
                  <div className="caption editaddress">
                    <p>
                      <img
                        src={require("../../img/Icon feather-map-pin.png")}
                        srcSet="/static/media/Icon feather-map-pin@2x.png, /static/media/Icon feather-map-pin@3x.png"
                        alt="user icon"
                        className="my-address-illustration"
                      />
                      آدرس
                    </p>
                  </div>
                  <div className="captionline captionlineaddress"></div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-lg-6 col-12 ddProvincesmgr34 p-2">
                        <Select
                          className="ddProvinces"
                          required
                          onChange={this.handleProvince}
                          placeholder={"استان"}
                          value={this.state.provinces.filter(
                            (option) => option.value === this.state.provinceId
                          )}
                          options={this.state.provinces}
                        />
                        <ShowMessage msg={this.state.msgProvince} />
                      </div>
                      <div className="col-lg-6 col-12 ddProvincesmgr34 p-2">
                        <Select
                          className="ddCities"
                          required
                          onChange={this.handleCity}
                          placeholder={"شهر"}
                          value={this.state.cities.filter(
                            (option) => option.value === this.state.cityId
                          )}
                          options={this.state.cities}
                        />
                        <ShowMessage msg={this.state.msgCity} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group w-100">
                    <div className="plfield ">
                      <textarea
                        placeholder=" "
                        title="نشانی پستی"
                        required
                        onChange={(e) => this.handleAddress(e)}
                        value={this.state.value}
                        className="pl-input form-control useraddresstext"
                      />
                      <span className="grow">نشانی پستی</span>
                    </div>
                  </div>
                  <ShowMessage msg={this.state.msgAddress} />

                  <div className="form-group flex-container">
                    <div className="plfield ">
                      <input
                        type="number"
                        placeholder=" "
                        title="پلاک"
                        required
                        onChange={(e) => this.handlePlak(e)}
                        value={this.state.plak}
                        className="pl-input form-control useraddresspelak"
                      />
                      <span className="grow">پلاک</span>
                    </div>
                    <div className="plfield ">
                      <input
                        type="number"
                        placeholder=" "
                        title="واحد "
                        required
                        onChange={(e) => this.handleUnit(e)}
                        value={this.state.unit}
                        className="pl-input form-control useraddresspelak"
                      />
                      <span className="grow">واحد </span>
                    </div>
                    <div className="plfield ">
                      <input
                        type="number"
                        placeholder=" "
                        title="کدپستی"
                        required
                        onChange={(e) => this.handlePostalCode(e)}
                        value={this.state.postalCode}
                        className="pl-input form-control useraddressapartmentno"
                      />
                      <span className="grow">کدپستی</span>
                      <ShowMessage msg={this.state.msgPostalCode} />
                    </div>
                  </div>
                  <div className="form-group flex-container">
                    <div className="w-100">
                      <Select
                        className="ddProvinces addresstitle"
                        required
                        onChange={this.handleContact}
                        placeholder={"نوع آدرس"}
                        value={this.state.contacts.filter(
                          (option) => option.value === this.state.contactId
                        )}
                        options={this.state.contacts}
                      />

                      <ShowMessage msg={this.state.msgContact} />
                    </div>
                    <ShowMessage msg={this.state.msgYear} />
                  </div>
                  <div className="clearfix"></div>
                  <div className=" form-group">
                    {this.state.isLoading ? (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                        <div>
                          {this.state.saveButton ? (
                            <button
                              onClick={this.saveAddress}
                              className="btn-orange-car addressgraybtn btn w-100"
                            >
                              ثبت آدرس
                            </button>
                          ) : (
                              <button
                                onClick={this.saveAddress}
                                disabled={true}
                                className="btn-gray addressgraybtn btn w-100"
                              >
                                ثبت آدرس
                              </button>
                            )}
                          <button
                            onClick={this.goBack}
                            className="btn-orange addressgraybtn btn w-100 Address-Btn"
                          >
                            بازگشت
                        </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="caption">آدرس از روی نقشه</div>
              <div className="captionline captionlineaddress2"></div>
              <div className="map-container">
                <SimpleMap
                  {...{
                    lat: this.state.lat,
                    lng: this.state.lng,
                    setMarkerLocation: this.handleSimpleMap,
                  }}
                />
              </div>
              <div className="xsmall-text mt-2">
                <i className="ml-1 mr-1 fa fa-exclamation-circle"></i>
                شما می توانید با حرکت دادن نشانگر بر روی نقشه و مشخص نمودن آدرس
                خود. پیک را در آدرس یابی یاری نمایید.
              </div>
            </div>
          </div>
        </div>
      ) : null;

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
          <ShowMessage msg={this.state.msgProvince} />
        </div>

        <div className="clearfix"></div>
        <div className="mt-5 form-group">
          {this.state.isLoading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : this.state.counter > 0 ? (
            <button
              disabled
              className="btn-resend-challenge btn btn-info w-25 w-100"
            >
              ارسال مجدد کد تایید {this.state.counter} ثانیه
            </button>
          ) : (
                <button className="btn-resend-challenge btn btn-info w-25 w-100">
                  ارسال مجدد کد تایید {this.state.counter} ثانیه
                </button>
              )}
        </div>
        <div className="form-group">
          <button
            className="btn-orange btn btn-info w-25 w-100"
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
            className="btn-orange btn btn-info w-25 w-100"
            onClick={this.clickLoginAfterChangePass}
          >
            ورود{" "}
          </button>
        </div>
      </div>
    );

    if (this.state.isLoading)
      return (
        <div className="big-loading centered">
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    else
      return (
        <div className="UserAddress outer-center">
          <div className="inner-center w-100">
            <div className=" ">
              <MsgBox />
              <div className="text-right caption-header mr-2">
                {
                  <li
                    onClick={() =>
                      this.props.history.push({ pathname: "/user/panel" })
                    }
                    className="fa fa-arrow-right back-arrow"
                  ></li>
                }
              آدرسهای من{" "}
              </div>
              {this.state.view === 1 ? View1 : null}
              {this.state.view === 1.1 ? View1_1 : null}
              {this.state.view === 2 ? View2 : null}
              {this.state.view === 2.1 ? View2_1 : null}
              {this.state.view === 2.2 ? View2_2 : null}
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
)(UserAddress as any);

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
