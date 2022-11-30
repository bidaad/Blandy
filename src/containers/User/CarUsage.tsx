import React, { useState, useEffect } from 'react'
import { APIImage, APIUrl } from '../../helper/config';
import { responseModel } from '../../model/general/responseModel';
import * as UserInfo from '../../store/UserInfo';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Image from '../../components/Image';
import { VwCar } from '../../model/viewModel/VwCar';
import { MessageTypes } from '../../model/general';

type CarusageProps =
  UserInfo.UserInfoState &
  typeof UserInfo.actionCreators &
  { match: any, location: any, history: any }
  ;

const Carusage = (props: CarusageProps) => {
  const [carList, setCarList] = useState<VwCar[]>([])
  const [Usage, setUsage] = useState('')
  const [ErrorUsage, setErrorUsage] = useState('')

  var strLocation: string = props.location.pathname;
  var n: number = strLocation.search(/car/);
  const carId = strLocation.substring(n + 4, n + 4 + 36)
  const curDate = new Date().toLocaleDateString('fa-IR');

  useEffect(() => {

    const getUserCars = (id: string) => {
      fetch(APIUrl + '/Asset/GetUserCars?PersonId=' + props.personId, {
        method: 'GET',
        headers: {
                'ut':'1',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.token,
        }
      })
        .then(response => response.json() as Promise<responseModel>)
        .then(responseModel => {
          if (responseModel.messageCode === 0) {
            let data = responseModel.data as VwCar[];
            setCarList(data.filter(m => m.id === id));
          }
        })
        .catch(
          error => {
            console.log(error);
          }
        );
    }

    getUserCars(carId);

  }, []);

  const checkUsage = () => {
    if (!ValidateUsage(Usage)) {
      setErrorUsage('border-red');
      return;
    }
    else
      setErrorUsage('');
  }

  const handleUsage = (event: any) => {
    setUsage(event.target.value)
  }

  
  const saveUsage = () => {
    props.UserLoad(true);
    fetch(APIUrl + '/AssetUsage/SaveUsage?Id=' + carId + '&Usage=' + Usage, {
      method: 'GET',
      headers: {
                'ut':'1',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.token,
      }
    })
      .then(response => response.json() as Promise<responseModel>)
      .then(responseModel => {
        if (responseModel.messageCode === 0) {
          const { history } = props;
          history.push('/user/maintenance/' + carId);
          props.UserLoad(false);
        }
        else
        {
          props.addMessage([{ msg: responseModel.message, msgType: MessageTypes.Error }]);
          props.UserLoad(false);
        }
      })
      .catch(
        error => {
          console.log(error);
          props.UserLoad(false);
        }
      );
  }

  const ValidateUsage = (text: string) => {
    if (/^\d+$/.test(text)) {
      return true
    }
    return false
  }

const carBack=(e:any)=>
{
  const { history } = props;
  history.push('/user/cars');
}

  return (
    <div className="UserUsage outer-center">
      <div className="inner-center">
        <div className="rtl carusage-card m-5">

          <div className="text-center caption-header">سرویس های دوره ای خودرو من</div>
          <div className="w-100 text-center">

            {carList.map((c: VwCar) => (
              <div className="Car-Col" >
                <div className="Car-Col-Card">
                  <div className="Car_Row">
                    <p>{c.sign} {c.year}</p>
                  </div>
                  <div className="text-center car-container">
                    <Image fallbackSrc={APIImage + 'car.png'} alt={''} src={APIImage + '/' + c.imageProduct} />
                  </div>
                  <div className="line-100">

                  </div>
                  <div className="x-small">
                    <img src={require('../../img/alert.png')} alt="" />
                  وارد نمودن کیلومتر فعلی خودرو برای فعالسازی سرویس های دوره ای خودرو الزامی است
                  </div>

                  <div className=" form-group mt-3">
                    <div className={"plfield "}>
                      <input type="text" placeholder=" " autoComplete="off" title="لطفا فیلد کیلومتر فعلی خودرو  را وارد کنید" required onChange={(e) => handleUsage(e)} onBlur={() => checkUsage()} className={"form-control ltr-control txt-mobile " + (ErrorUsage === '' ? 'pl-input' : 'pl-input-error')} id="username" />
                      <span className="grow">کیلومتر فعلی خودرو </span>
                      <i className="icon-tachometer fa fa-tachometer"></i>
                    </div>
                  </div>

                  <div className=" form-group mt-3">
                    <div className={"plfield "}>
                      <input type="text" placeholder=" " autoComplete="off" title="تاریخ امروز" value={curDate} className={"form-control ltr-control txt-mobile pl-input"} id="currentdate" />
                      <span className="grow">تاریخ امروز</span>
                      <i className="icon-cellphone fa fa-calendar"></i>
                    </div>
                  </div>

                </div>
                <div className="row mt-2 mb-2">
                  <div className="col">
                    <button className="btn-orange-car btn btn-info " data-id={c.id} onClick={() => saveUsage()}  >تایید و ادامه</button>
                  </div>
                  <div className="col">
                    <button className="btn-orange-light-car btn btn-info " onClick={carBack} data-id={c.id}  >بازگشت</button>
                  </div>

                </div>



              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(Carusage as any);
