import React, { useState, useEffect } from "react";
import { APIUrl } from "../../helper/config";
import { VwFAQ } from "../../model/viewModel/VwFAQ";
import { responseModel } from "../../model/general/responseModel";
import * as UserInfo from "../../store/UserInfo";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";

type UserFAQProps = UserInfo.UserInfoState & {
  match: any;
  location: any;
  history: any;
} & typeof UserInfo.actionCreators;

type FAQItemProps = { keyword: string; question: string; answer: string };

const FAQItem = (props: FAQItemProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  function flatMap(array: string[], fn: any) {
    var result: string[] = [];
    for (var i = 0; i < array.length; i++) {
      var mapping = fn(array[i]);
      result = result.concat(mapping);
    }
    return result;
  }

  return (
    <div>
      <div className="bullet1"></div>
      <div onClick={() => setShowAnswer(!showAnswer)} className="toggle-answer">
        <i className="fa fa-chevron-down"></i>
      </div>
      {props.keyword === undefined || props.keyword === ""
        ? props.question
        : flatMap(props.question.split(" "), function (part: string) {
            if (part.replace("،", "") === props.keyword)
              return <span className="highlight"> {props.keyword} </span>;
            else return part + " ";
          })}
      {showAnswer ? <div className="answer">{props.answer}</div> : null}
    </div>
  );
};

const UserFAQ = (props: UserFAQProps) => {
  const [FAQ, setFAQ] = useState<VwFAQ[]>([]);
  const [Keyword, setKeyword] = useState("");

  

  function filterFAQ(event: any) {
    setKeyword(event.target.value);
  }

  useEffect(() => {
    function getFAQ() {
      fetch(APIUrl + "/FAQ/GetAll", {
        method: "GET",
        headers: {
                  'ut':'1',
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
          lang: props.lang.abr,
        },
      })
        .then((response) => response.json() as Promise<responseModel>)
        .then((responseModel) => {
          setFAQ(responseModel.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    getFAQ();
  }, []);
  const FAQLen: number = FAQ.length;
  const halfFAQCount = FAQLen / 2;
  return (
    <div>
      <div className="section-header">سوالات متداول</div>
      <div className="row ltr">
        <div className="col-lg-3 col-12 text-center">
          <div className="faq-search-container">
            <input
              type="text"
              placeholder="چه سوالی دارید؟"
              onKeyUp={(e) => filterFAQ(e)}
              className="faq-search-box"
            />
          </div>
          <img
            src={require("../../img/faq.png")}
            srcSet="/static/media/faq@2x.png 2x, /static/media/faq@3x.png 3x"
            alt="basket"
            className="basket-large-slogan d-none d-sm-block"
          />
        </div>
        <div className="col-lg-9 col-12 w-100">
          <div className=" w-100">
            {Keyword !== "" ? (
              <div>
                <table className="tblfaq">
                  {FAQ.filter(
                    (item) =>
                      item.question.indexOf(Keyword) > 0 ||
                      item.anaswer.indexOf(Keyword) > 0
                  ).map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <FAQItem
                            {...{
                              keyword: Keyword,
                              question: item.question,
                              answer: item.anaswer,
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            ) : (
              <div className="row w-100">
                <div className="col-lg-6 col-12">
                  <div>
                    <table className="tblfaq">
                      {FAQ.filter((item, i) => i <= halfFAQCount - 1).map(
                        (item, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <FAQItem
                                  {...{
                                    keyword: "",
                                    question: item.question,
                                    answer: item.anaswer,
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div>
                    <table className="tblfaq">
                      {FAQ.filter((item, i) => i >= halfFAQCount).map(
                        (item, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <FAQItem
                                  {...{
                                    keyword: "",
                                    question: item.question,
                                    answer: item.anaswer,
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.userinfo,
  UserInfo.actionCreators
)(UserFAQ as any);
