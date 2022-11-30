import React, { useEffect, useState } from "react";
import { APIUrl } from "../../helper/config";
import { responseModel } from "../../model/general/responseModel";
import Select from "react-select";
import { selectData } from "../../model/general/selectData";
import { useHistory } from "react-router";
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';


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

const SellerBar = (props: { activeItem: number }) => {
  return (
    <div className="seller-bar-conatiner">
      <div>
        <div className="seller-blue-line"></div>
        <div className="bar-item">
          <div
            className={
              props.activeItem === 1 ? "blue-circle-filled" : "blue-circle"
            }
          ></div>
          <div>اطلاعات فروشنده</div>
        </div>
      </div>
      <div>
        <div className="seller-blue-line"></div>
        <div className="bar-item">
          <div
            className={
              props.activeItem === 2 ? "blue-circle-filled" : "blue-circle"
            }
          ></div>
          <div>مشاهده و تایید قرارداد</div>
        </div>
      </div>
      <div>
        <div className="seller-blue-line"></div>
        <div className="bar-item">
          <div
            className={
              props.activeItem === 3 ? "blue-circle-filled" : "blue-circle"
            }
          ></div>
          <div>بارگذاری مدارک</div>
        </div>
      </div>
      <div>
        <div className="bar-item">
          <div className={
              props.activeItem === 4 ? "blue-circle-filled" : "blue-circle"
            }></div>
          <div>اتمام ثبت نام</div>
        </div>
      </div>
    </div>
  );
};

enum UserTypes {
  Person = 0,
  Department = 1,
}
enum GenderTypes {
  Male = 1,
  Female = 0,
}
enum AgreeTypes {
  Agree = 0,
  Disagree = 1,
}

var InputRef1: React.RefObject<HTMLInputElement>;
var InputRef2: React.RefObject<HTMLInputElement>;
var InputRef3: React.RefObject<HTMLInputElement>;

type SellerRegProps =
    UserInfo.UserInfoState &
    { match: any, location: any, history: any } &
    typeof UserInfo.actionCreators;


const SellerReg = (props: SellerRegProps) => {
  const history = useHistory();

  var strLocation: string = props.location.pathname;
  var n: number = strLocation.search(/user/);
  const userId = strLocation.substring(n + 5, n + 5 + 36);

  const [step, setStep] = useState(1);
  const [birthDateDay, setBirthDateDay] = useState("");
  const [birthDateMonth, setBirthDateMonth] = useState("");
  const [birthDateYear, setBirthDateYear] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");

  const [provinces, setProvinces] = useState<selectData[]>([]);
  const [cities, setCities] = useState<selectData[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [depSign, setDepSign] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [shenasnamehNo, setShenasnamehNo] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [phone, setPhone] = useState("");
  const [cell, setCell] = useState("");
  const [isDisbaled, setIsDisbaled] = useState(true);
  const [isDisbaledContract, setIsDisbaledContract] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const [userType, setUserType] = useState<UserTypes | undefined>(undefined);
  const [agreeType, setAgreeType] = useState<AgreeTypes | undefined>(undefined);
  const [gender, setGender] = useState<GenderTypes | undefined>(undefined);
  const [VATPay, setVATPay] = useState(false);

  const [data1, setData1] = useState({
    data: "",
    name: "",
    suffix: "",
    size: 0,
  });
  const [data2, setData2] = useState({
    data: "",
    name: "",
    suffix: "",
    size: 0,
  });
  const [data3, setData3] = useState({
    data: "",
    name: "",
    suffix: "",
    size: 0,
  });

  const handleDay = (event: any) => {
    setBirthDateDay(event.value);
  };
  const handleMonth = (event: any) => {
    setBirthDateMonth(event.value);
  };
  const handleYear = (event: any) => {
    setBirthDateYear(event.value);
  };
  const handleProvince = (event: any) => {
    setProvinceId(event.value);
    getCities(event.value);
  };

  const handleCity = (event: any) => {
    setCityId(event.value);
  };

  const getProvinces = () => {
    fetch(
      APIUrl +
        "/Zone/GetByTypeId?HCZoneTypeId=A236145F-AFC3-4F22-B77F-E3E12685A7C0&Lang=fa",
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
          setProvinces(responseModel.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCities = (parentId: string) => {
    fetch(APIUrl + "/Zone/GetByParentId?parentId=" + parentId + "&Lang=fa", {
      method: "GET",
      headers: {
                'ut':'1',
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json() as Promise<responseModel>)
      .then((responseModel) => {
        console.log(responseModel.data);

        console.log("messageCode=" + responseModel.messageCode);
        if (responseModel.messageCode === 0) {
          setCities(responseModel.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handleUploadFile1 = async (event: any) => {
    if (event.target.files.length === 1) {
      if (event.target.files[0].name) {
        const size = event.target.files[0].size;
        const names = event.target.files[0].name.split(".");
        const name = names[0];
        const suffix = names[1];
        console.log("name=" + name);
        console.log("suffix=" + suffix);

        toBase64(event.target.files[0]).then(async (data) => {
          setData1({ data: data + "", name: name, size: size, suffix: suffix });
        });
      }
    }
  };

  const handleUploadFile2 = (event: any) => {
    if (event.target.files.length === 1) {
      if (event.target.files[0].name) {
        const size = event.target.files[0].size;
        const names = event.target.files[0].name.split(".");
        const name = names[0];
        const suffix = names[1];
        console.log("name=" + name);
        console.log("suffix=" + suffix);

        toBase64(event.target.files[0]).then((data) => {
          setData2({ data: data + "", name: name, size: size, suffix: suffix });
        });
      }
    }
  };

  const handleUploadFile3 = (event: any) => {
    if (event.target.files.length === 1) {
      if (event.target.files[0].name) {
        const size = event.target.files[0].size;
        const names = event.target.files[0].name.split(".");
        const name = names[0];
        const suffix = names[1];
        console.log("name=" + name);
        console.log("suffix=" + suffix);

        toBase64(event.target.files[0]).then((data) => {
          setData3({ data: data + "", name: name, size: size, suffix: suffix });
        });
      }
    }
  };

  const handleStartUpload1 = () => {
    if (InputRef1.current !== null) InputRef1.current.click();
  };
  const handleStartUpload2 = () => {
    if (InputRef2.current !== null) InputRef2.current.click();
  };
  const handleStartUpload3 = () => {
    if (InputRef3.current !== null) InputRef3.current.click();
  };

  useEffect(() => {
    InputRef1 = React.createRef();
    InputRef2 = React.createRef();
    InputRef3 = React.createRef();

    getProvinces();
  }, []);

  useEffect(() => {
    if (
      firstName === "" ||
      lastName === "" ||
      depSign === "" ||
      birthDateDay === "" ||
      birthDateMonth === "" ||
      birthDateYear === "" ||
      nationalCode === "" ||
      shenasnamehNo === "" ||
      accountNo === "" ||
      provinceId === "" ||
      cityId === "" ||
      address === "" ||
      postalCode === "" ||
      cell === "" ||
      phone === "" ||
      gender === undefined ||
      userType === undefined
    )
      setIsDisbaled(true);
    else setIsDisbaled(false);
  }, [
    firstName,
    lastName,
    depSign,
    birthDateDay,
    birthDateMonth,
    birthDateYear,
    nationalCode,
    shenasnamehNo,
    accountNo,
    provinceId,
    cityId,
    address,
    postalCode,
    cell,
    phone,
    gender,
    userType,
  ]);

  useEffect(() => {
    if (agreeType === AgreeTypes.Disagree || agreeType === undefined)
      setIsDisbaledContract(true);
    else setIsDisbaledContract(false);
  }, [agreeType]);

  const submitMain = () => {
    setStep(2);
  };

  const submitContract = () => {
    if (agreeType === AgreeTypes.Agree) setStep(3);
  };

  const submitDocs = () => {

    var strbirthDateMonth = birthDateMonth;
    var strbirthDateDay = birthDateDay;
    if (birthDateMonth.length === 1)
        strbirthDateMonth = '0' + birthDateMonth;
    if (birthDateDay.length === 1)
        strbirthDateDay = '0' + birthDateDay;

const birthDate = birthDateYear + strbirthDateMonth + strbirthDateDay;
const data = {
        firstName: firstName,
        lastName: lastName,
        depSign: depSign,
        birthDate: birthDate,
        nationalCode: nationalCode,
        shenasnamehNo: shenasnamehNo,
        accountNo: accountNo,
        cityId: cityId,
        postalCode: postalCode,
        phone: phone,
        vatPay: VATPay,
        Files: [data1, data2, data3],
        gender: gender,
        userType: userType,
        address: address,
        cellPhone: cell,
      }
      fetch(APIUrl + '/User/SaveSellerInfo', {
        method: 'Post',
        headers: {
                'ut':'1',
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + props.token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          if (responseModel.messageCode === 0) {
            setStep(4);
          }
          setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
  
          console.log(error);
        });
    
    
  };
  

  const gotoSellerPanel = () => {
    history.push("/seller/assetlist");
  };

  const view1 = (
    <>
      <div className="text-right rtl bold-header">
        توجه: پر کردن همه موارد الزامی است
      </div>
      <div className="row">
        <div className="col">
          <span>نوع فروشنده:</span>
          <input
            type="radio"
            onClick={() => setUserType(UserTypes.Person)}
            value="حقیقی"
            name="userType"
          />{" "}
          حقیقی
          <input
            type="radio"
            onClick={() => setUserType(UserTypes.Department)}
            value="حقوقی"
            name="userType"
          />{" "}
          حقوقی
        </div>
        <div className="col">
          <span> جنسیت:</span>
          <input
            type="radio"
            onClick={() => setGender(GenderTypes.Male)}
            value="مرد"
            name="gender"
          />{" "}
          مرد
          <input
            type="radio"
            onClick={() => setGender(GenderTypes.Female)}
            value="زن"
            name="gender"
          />{" "}
          زن
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>نام:</label>
            <input
              type="text"
              className="form-control text-control"
              id="firstName"
              aria-describedby="firstNameHelp"
              placeholder="نام"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>نام خانوادگی:</label>
            <input
              type="text"
              className="form-control text-control"
              id="lastName"
              aria-describedby="lastHelp"
              placeholder="نام خانوادگی"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label>نام تجاری:</label>
            <input
              type="text"
              className="form-control text-control"
              id="firstName"
              aria-describedby="depSignHelp"
              placeholder="نام تجاری"
              onChange={(e) => setDepSign(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="date-container">
            <label>تاریخ تولد:</label>
            <div className="form-inline">
              <Select
                className="ddDays"
                required
                onChange={handleDay}
                placeholder={"روز"}
                value={days.filter((option) => option.value === birthDateDay)}
                options={days}
              />
              <Select
                className="ddMonths"
                required
                onChange={handleMonth}
                placeholder={"ماه تولد"}
                value={months.filter(
                  (option) => option.value === birthDateMonth
                )}
                options={months}
              />
              <Select
                className="ddYears"
                required
                onChange={handleYear}
                placeholder={"سال تولد"}
                value={years.filter((option) => option.value === birthDateYear)}
                options={years}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="col">
            <div className="form-group">
              <label>کد ملی:</label>
              <input
                type="text"
                className="form-control text-control"
                id="firstName"
                aria-describedby="firstNameHelp"
                placeholder=""
                onChange={(e) => setNationalCode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="col">
            <div className="form-group">
              <label>شماره شناسنامه:</label>
              <input
                type="text"
                className="form-control text-control"
                id="firstName"
                aria-describedby="firstNameHelp"
                placeholder=""
                onChange={(e) => setShenasnamehNo(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="form-group rtl">
          <label>شماره شبا:</label>
          <input
            type="text"
            className="form-control text-control ltr sheba"
            id="firstName"
            aria-describedby="firstNameHelp"
            placeholder="IR"
            onChange={(e) => setAccountNo(e.target.value)}
          />
        </div>
      </div>

      <div className="text-right rtl bold-header">اطلاعات تماس</div>
      <div className="row">
        <div className="col-lg-3">
          <div className="date-container">
            <label>استان :</label>
            <div className="form-inline">
              <Select
                className="ddZone"
                required
                onChange={handleProvince}
                placeholder={"استان"}
                value={provinces.filter(
                  (option) => option.value === provinceId
                )}
                options={provinces}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <label>شهر:</label>
          <div className="form-inline">
            <Select
              className="ddZone"
              required
              onChange={handleCity}
              placeholder={"شهر"}
              value={cities.filter((option) => option.value === cityId)}
              options={cities}
            />
          </div>
        </div>
      </div>

      <div className="form-group rtl">
        <label>آدرس:</label>
        <textarea
          className="form-control text-control ltr w-100 rtl"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="row">
        <div className="col-lg-3">
          <div className="form-group">
            <label>کد پستی:</label>
            <input
              type="text"
              className="form-control text-control ltr txt-postal-code"
              id="firstName"
              aria-describedby="firstNameHelp"
              placeholder=""
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="form-group">
            <label>موقعیت مکانی :</label>
            <input
              type="text"
              className="form-control text-control txt-loc"
              id="firstName"
              aria-describedby="firstNameHelp"
              placeholder=""
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <div className="form-group">
            <label>تلفن ثابت:</label>
            <input
              type="text"
              className="form-control text-control ltr txt-tel"
              id="firstName"
              aria-describedby="firstNameHelp"
              placeholder=""
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="form-group">
            <label>تلفن همراه:</label>
            <input
              type="text"
              className="form-control text-control ltr txt-cell"
              id="firstName"
              aria-describedby="firstNameHelp"
              placeholder=""
              onChange={(e) => setCell(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => submitMain()}
          disabled={isDisbaled}
          className="btn btn-seller-blue"
        >
          ادامه
        </button>
      </div>
    </>
  );

  const view2 = (
    <>
      <div>
        توجه: لطفا برای پذیرش قرارداد آن را تا انتها مشاهده و مطالعه فرمایید.
      </div>
      <div className="contract-container">
        مقدمه
        \/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\//
        /\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
        ماده 1. طرفین قرارداد
        \/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/
        /
        /\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\
        /\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ :طرف
        دوم : آقا/خانم : شماره شناسنامه : کد ملی : به نشانی : کدپستی : شماره
        تماس
      </div>
      <div className="rtl">
        <div className="w-100 text-right mb-2 mt-3">
          <label>
            <input
              type="radio"
              onClick={() => setAgreeType(AgreeTypes.Agree)}
              name="agree"
            />{" "}
            قوانین همکاری را مطالعه کرده و موافقم.
          </label>
        </div>

        <div className="w-100 text-right mb-2 mt-1">
          <label>
            <input
              type="radio"
              onClick={() => setAgreeType(AgreeTypes.Disagree)}
              name="agree"
            />
            با شرایط قرارداد موافق نیستم و مایل به خاتمه ثبت نام هستم.
          </label>
        </div>
      </div>
      <button
        onClick={() => submitContract()}
        disabled={isDisbaledContract}
        className="btn btn-seller-blue"
      >
        ادامه
      </button>
    </>
  );

  const view3 = (
    <div className="rtl text-right">
      <input
        ref={InputRef1}
        className="uploader"
        onChange={handleUploadFile1}
        type="file"
      />
      <input
        ref={InputRef2}
        className="uploader"
        onChange={handleUploadFile2}
        type="file"
      />
      <input
        ref={InputRef3}
        className="uploader"
        onChange={handleUploadFile3}
        type="file"
      />
      <div className="mt-3">تصویر کارت ملی خود را بارگذاری کنید.</div>
      <div>
        تصاویر باید صاف و کاملاً واضح باشد- <br />
        تصویر رو و پشت کارت ملی باید به طور جداگانه بارگذاری شود- <br />
        تصویر کارت ملی همه صاحبان حق امضا در قالب یک عکس در کنار هم قرار گرفته و
        بارگذاری شود- <br />
      </div>
      <div>
        ابعاد برگه مدارک را با حداکثر حجم ۷۰۰ کیلو بایت و فرمت JPG بارگذاری
        کنید-.
      </div>
      <div>
        {data1.data === "" ? (
          <button
            className="btn btn-upload-docs mt-2"
            onClick={handleStartUpload1}
          >
            بارگذاری تصویر روی کارت ملی
          </button>
        ) : (
          <label>
            <img className="seller-uploaded-img" src={data1.data} />
            <span onClick={handleStartUpload1}>بارگزاری مجدد</span>
          </label>
        )}
      </div>
      <div>
        {data2.data === "" ? (
          <button
            className="btn btn-upload-docs mt-1"
            onClick={handleStartUpload2}
          >
            بارگذاری تصویر پشت کارت ملی
          </button>
        ) : (
          <label>
            <img className="seller-uploaded-img" src={data2.data} />
            <span onClick={handleStartUpload2}>بارگزاری مجدد</span>
          </label>
        )}
      </div>
      <div className="rtl mt-3 mb-3">
        آیا مشمول مالیات بر ارزش افزوده هستید؟ &nbsp;&nbsp;&nbsp;
        <label>
          <input type="radio" onClick={() => setVATPay(true)} name="vas" />{" "}
          بلی&nbsp;&nbsp;
        </label>
        <label>
          <input type="radio" onClick={() => setVATPay(false)} name="vas" /> خیر
        </label>
      </div>

      {VATPay ? (
        <div>
          <div>تصویر گواهی ارزش افزوده خود را بارگذاری کنید.</div>
          {data3.data === "" ? (
            <button
              className="btn btn-upload-docs mt-2"
              onClick={handleStartUpload3}
            >
              بارگذاری تصویر ارزش افزوده
            </button>
          ) : (
            <label>
              <img className="seller-uploaded-img" src={data3.data} />
              <span onClick={handleStartUpload3}>بارگزاری مجدد</span>
            </label>
          )}
        </div>
      ) : null}
      <div className="text-left">
        <button
          onClick={() => submitDocs()}
          disabled={isDisbaledContract}
          className="btn btn-seller-blue"
        >
          ادامه
        </button>
      </div>
    </div>
  );

  const view4 = (
    <div className="">
      <div className="outer-center seller-final rtl">
        <div className="inner-center mb-2">تبریک !
        </div>
        <div className="inner-center mb-2">
             اکنون شما یکی از فروشندگان اتوچار هستید.</div>
        <div className="inner-center mt-2">
          <button
            onClick={() => gotoSellerPanel()}
            className="btn btn-seller-blue-small"
          >
            ورود به پنل فروشندگان
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="outer-center">
      <div className="mt-30 w-100 text-center ">
        <div className=" logo inner-center"></div>
        <div className="text-center caption-header">مرکز فروشندگان اتوچار</div>
      </div>
      <div className="inner-center">
        <div className="seller-reg-container">
          <SellerBar activeItem={step} />
          {step === 1 ? view1 : null}
          {step === 2 ? view2 : null}
          {step === 3 ? view3 : null}
          {step === 4 ? view4 : null}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(SellerReg as any);
