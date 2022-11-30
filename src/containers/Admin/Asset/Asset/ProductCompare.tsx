import { VwUser } from "../../../../model/viewModel/VwUser";
import { RouteComponentProps } from "react-router";
import { stateBase } from "../../../../model/general/stateBase";
import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../store";
import * as UserInfo from "../../../../store/UserInfo";
import { APIUrl, APIImage } from "../../../../helper/config";
import { responseModel } from "../../../../model/general/responseModel";
import { VwProduct } from "../../../../model/viewModel/VwProduct";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import ProductAutoComplete, { ProductSuggest } from "../../../../components/ProductComplete";
import { ProductSearchMode } from "../../../../model/general";
import Image from "../../../../components/Image";
import { VwProductAttribute } from "../../../../model/viewModel/VwProductAttribute";

export interface IHash {
    [details: string]: string;
}

type ProductCompareProps = UserInfo.UserInfoState &
    stateBase<VwUser> &
    typeof UserInfo.actionCreators &
    RouteComponentProps<{}> & { match: any; location: any; history: any };

interface ProCardProps {
    id: string;
    header: string;
    image: string;
}
const ProCard = (props: ProCardProps) => {
    return (

        <li className="Product_Card">
            <div className="row">

                <div className="col-lg-12 col-4">
                    {props.image ? (
                        <div className="product-image-conatiner">

                            <Image
                                fallbackSrc={APIImage + "/default.png"}
                                alt={""}
                                src={APIImage + props.image}
                            />

                        </div>
                    ) : null}
                </div>
                <div className="col-lg-12 col-8">
                    {props.header !== "" ? (
                        <div className="au-discounttitle">

                            <span className="prd-card-sp">{props.header}</span>

                        </div>
                    ) : null}

                </div>
            </div>
        </li>

    )
}


const ProductCompare = (props: ProductCompareProps) => {
    const [productInfo, setProductInfo] = useState({ id: "", name: "", mainImage: "" });
    const [productInfo2, setProductInfo2] = useState({ id: "", name: "", mainImage: "" });
    const [productInfo3, setProductInfo3] = useState({ id: "", name: "", mainImage: "" });

    const [showModal, setShowModal] = useState(false)
    const [productAttributes, setProductAttributes] = useState<VwProductAttribute[]>([]);
    const [productAttributes2, setProductAttributes2] = useState<VwProductAttribute[]>([]);
    const [productAttributes3, setProductAttributes3] = useState<VwProductAttribute[]>([]);
    const [productNumber, setProductNumber] = useState(2)

    var strLocation: string = props.location.pathname;
    var n: number = strLocation.search(/compare/);
    const productId = strLocation.substring(n + 8, n + 8 + 36);
    const getProductAttributes = (num: number, productId: string) => {
        fetch(
            APIUrl +
            "/ProductAttribute/GetProductAttributes/?strProductId=" +
            productId,
            {
                method: "Get",
                headers: {
                    'ut': '1',
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token,
                    lang: props.lang.abr,
                },
            }
        )
            .then((response) => response.json() as Promise<responseModel>)
            .then((responseModel) => {
                if (responseModel.messageCode === 0) {
                    if (num === 1)
                        setProductAttributes(responseModel.data);
                    else if (num === 2)
                        setProductAttributes2(responseModel.data);
                    else if (num === 3)
                        setProductAttributes3(responseModel.data);

                }
            })
            .catch((error) => {
                //setProductAttributes([]);
                console.log(error);
            });
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        getProductInfo(1, productId);
        getProductAttributes(1, productId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProductInfo = (num: number, assetId: string) => {
        fetch(
            APIUrl + "/Product/GetDetail?Id=" + assetId,
            {
                method: "GET",
            }
        )
            .then((response) => response.json() as Promise<responseModel>)
            .then((responseModel) => {
                const productInfo = responseModel.data as VwProduct;
                if (num === 1)
                    setProductInfo({
                        id: productInfo.id,
                        name: productInfo.sign,
                        mainImage: productInfo.mainImage
                    });
                else if (num === 2)
                    setProductInfo2({
                        id: productInfo.id,
                        name: productInfo.sign,
                        mainImage: productInfo.mainImage
                    });
                else if (num === 3)
                    setProductInfo3({
                        id: productInfo.id,
                        name: productInfo.sign,
                        mainImage: productInfo.mainImage
                    });

            })
            .catch((error) => {
                props.UserLoad(false);
                console.log(error);
            });


    };


    const selectProduct = (selectedItem: ProductSuggest | undefined) => {
        if (selectedItem === undefined) return;
        getProductInfo(productNumber, selectedItem.id)
        getProductAttributes(productNumber, selectedItem.id)
    };

    return (
        <Fragment>
            <Modal size="xl" show={showModal} onHide={() => setShowModal(false)} className={"Rtl"}>
                <Modal.Header >
                    <Modal.Title>

                    </Modal.Title>
                    <FontAwesomeIcon icon={faWindowClose} color="gray" size="lg" onClick={() => setShowModal(false)} />
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <ProductAutoComplete
                            {...{
                                mode: ProductSearchMode.FormControl,
                                SelectProduct: selectProduct,
                            }}
                        />
                    </div>
                </Modal.Body>

            </Modal>
            <div className="product-page-container outer-center">
                <div className="inner-center">
                    <div className="comparer">
                        <div className=" ">
                            <div className="row ">
                                <div className="col-4 col-lg-4">
                                    <ProCard
                                        {...{
                                            id: productInfo.id,
                                            header: productInfo.name,
                                            image: productInfo.mainImage,
                                        }}
                                    />
                                </div>
                                <div className="col-4 col-lg-4" onClick={() => { setProductNumber(3); setShowModal(true) }}>
                                    <div className=" addtocompare">
                                        {productInfo3.id !== "" ?
                                            <ProCard
                                                {...{
                                                    id: productInfo3.id,
                                                    header: productInfo3.name,
                                                    image: productInfo3.mainImage,
                                                }}
                                            />
                                            :
                                            <div className="Product_Card addtocompare">
                                                <img
                                                    src={require("../../../../img/Plus.png")}
                                                    alt='plus'
                                                />
                                                <button className="btn-addtocompare">افزودن کالا برای مقایسه</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="col-4 col-lg-4" onClick={() => { setProductNumber(2); setShowModal(true) }}>
                                <div className=" addtocompare">
                                    {productInfo2.id !== "" ?
                                        <ProCard
                                            {...{
                                                id: productInfo2.id,
                                                header: productInfo2.name,
                                                image: productInfo2.mainImage,
                                            }}
                                        />
                                        :
                                        <div className="Product_Card addtocompare">
                                            <img
                                                src={require("../../../../img/Plus.png")}
                                                alt='plus'
                                            />
                                            <button className="btn-addtocompare">افزودن کالا برای مقایسه</button>
                                        </div>
                                    }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="pro-attributes-compare ">
                            <div className="compare-vali-list">
                                <table className="table table-hover table-striped table-bordered ">
                                    <thead>
                                        <tr>
                                            <td>
                                                مشخصه
                                            </td>
                                            <td>{productInfo.name}</td>
                                            <td>{productInfo2.name}</td>
                                            <td>{productInfo3.name}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productAttributes.map(item =>
                                            <tr>
                                                <td>
                                                    {item.sign}
                                                </td>
                                                <td>
                                                    {item.value}
                                                </td>
                                                {productAttributes2.filter(item2 => item2.attributeCode === item.attributeCode).length === 1 ?
                                                    productAttributes2.filter(item2 => item2.attributeCode === item.attributeCode).map(attr =>
                                                        <td> {attr.value} </td>
                                                    ) : <td></td>}
                                                {productAttributes3.filter(item3 => item3.attributeCode === item.attributeCode).length === 1 ?
                                                    productAttributes3.filter(item3 => item3.attributeCode === item.attributeCode).map(attr =>
                                                        <td> {attr.value} </td>
                                                    ) : <td></td>}
                                            </tr>

                                        )}
                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};
export default connect(
    (state: ApplicationState) => state.userinfo,
    UserInfo.actionCreators
)(ProductCompare as any);
