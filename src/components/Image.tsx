import React, { Component } from "react";


type ImageProps = { src: string; fallbackSrc: string; alt: string; className?:string; };

export default class Image extends Component<ImageProps,
  { src: string; errored: boolean }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      src: props.src,
      errored: false,
      
      
    };
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log("shouldComponentUpdate");

    if (this.props.src === nextProps.src) {
      return false;
    } else {
      return true;
    }
  }

  onError = () => {
    console.log("image error");
    if (!this.state.errored) {
      this.setState({
        src: this.props.fallbackSrc,
        errored: true,
      });
    }
  };
  HandlerChange = () => {
    console.log("image change");
  };
  render() {
//    const { src } = this.state;
    const { src: _1, fallbackSrc: _2, alt: _3, ...props } = this.props;
    console.log(this.state.src);
    return (
      <img src={this.state.src+"?i="+Math.random()} alt={this.props.alt} onError={this.onError} className={this.props.className}  />
    );
  }
}
