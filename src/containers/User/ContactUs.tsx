import React, { useState } from 'react'
import changeEnc from '../../helper/changeEnc';
import GoogleMapReact from 'google-map-react';
import Marker from '../../components/Marker';
import { APIUrl } from '../../helper/config';
import { responseModel } from '../../model/general/responseModel';

const Contactus = () => {
  const [fullName, setFullName] = useState('')
  const [subject, setsubject] = useState('')
  const [message, setMessage] = useState('')
  const [, setIsLoading] = useState(false)
  const [systemMessage, setSystemMessage] = useState('')


  const [center, setCenter] = useState({ lat: 35.763680, lng: 51.304620 });
  const [zoom, ] = useState(17);

  function handleMap(event: any) {
    setCenter({ lat: event.lat, lng: event.lng })
  }

  const handleFullName = (event: any) => {
    setFullName(event.target.value)
  }
  const handleSubject = (event: any) => {
    setsubject(event.target.value)
  }
  const handleMessage = (event: any) => {
    setMessage(event.target.value)
  }

  const SendMessage = () => {
    const data = {
      FullName: fullName,
      Subject: subject,
      Message: message,
      Site: "Blandy"
    };
    fetch(APIUrl + '/User/SendMessage', {
      method: 'POST',
      headers: {
                'ut':'1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then(response => response.json() as Promise<responseModel>).then(responseModel => {
      setIsLoading(false);
      setSystemMessage(responseModel.message)

    }).catch(
      error => {
        console.log(error);
        setIsLoading(false);
      }
    );
  }


  return (
    <div className="outer-center">
      <div className="inner-center contactus-container">

        <div className="row">
          <div className="col-7">
            <div className="contactus-form-container rtl text-right">
              <div>
                تماس با ما
            </div>
              <div className="line">

              </div>
              <div className=" form-group mt-4">
                <div className={"plfield "}>
                  <input type="text" placeholder=" " autoComplete="off" title="لطفا فیلد نام و نام خانوادگی را وارد کنید"
                    required onChange={(e) => handleFullName(e)} className="pl-input form-control ltr-control txt-fullname" id="username" />
                  <span className="grow">نام و نام خانوادگی</span>
                </div>
              </div>

              <div className=" form-group mt-4">
                <div className={"plfield "}>
                  <input type="text" placeholder=" " autoComplete="off" title="لطفا موضوع پیام را وارد کنید"
                    required onChange={(e) => handleSubject(e)} className="pl-input form-control ltr-control txt-fullname" id="username" />
                  <span className="grow">موضوع پیام</span>
                </div>
              </div>

              <div className=" form-group mt-4">
                <textarea onChange={(e) => handleMessage(e)} className="contactus-message" placeholder={'متن پیام خود را اینجا وارد کنید.'}>

                </textarea>
              </div>

              <div>
                <button onClick={() => SendMessage()} className="btn btn-orange float-left">ارسال پیام</button>
              </div>
              <div className="clearfix"></div>
              {systemMessage !== '' ?
                <div className="mt-2 alert alert-primary">
                  {systemMessage}
                </div> : null}

            </div>
          </div>
          <div className="col-5">
            <div className="contact-black">
              <div className="text-center">
                <div><li className="fa fa-envelope contactus-email-icon" ></li></div>
                <div>info@blandy.ir</div>

                <div><li className="fa fa-phone contactus-phone-icon" ></li></div>
                <div className="ltr mt-1">{changeEnc('021 - 44477311 - 44440033 - 44440035')}</div>


                <div><li className="fa fa-map-marker contactus-marker-icon" ></li></div>
                <div className="mt-1 contact-address text-justify rtl">{changeEnc('جنت آباد مرکزی، نرسیده به آبشناسان، نبش کوچه یازدهم، برج مهیار، شماره 31، طبقه دوم، واحد 4')}
                  <div className="float-left contact-address-postalcode">{changeEnc('کدپستی :  1475765737')}</div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      <div style={{ height: '433px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBonYRB29tDmnvc6pYk1SnS6CTbGWovE9M' }}
          defaultCenter={center}
          defaultZoom={zoom}
          onClick={handleMap}
        >

          <Marker
            lat={center.lat}
            lng={center.lng}
            name="مکان"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default Contactus;
