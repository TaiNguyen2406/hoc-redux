import React, { Component } from "react";

class Product extends Component {
  constructor(props) {
    super(props);
    this.onAddToCart = this.onAddToCart.bind(this);
  }

  onAddToCart() {
    alert(this.props.name + "-" + this.props.price);
  }

  render() {
    /* let results=this.props.products.map((product,index)=>{
            return  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="thumbnail">
                <img data-src="#" alt=""></img>
                <div className="caption">
                    <h3>{product.name}</h3>
 
                    <p>
                        {product.price}
                    </p>
                    <p>
                        <button className="btn btn-active">Mua hÃ ng</button>
                    </p>
                </div>
            </div>
        </div>
        }) */
    return (
      // <div>{results}</div>

      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="thumbnail">
          <img data-src="#" alt="" />
          <div className="caption">
            <h3>{this.props.name}</h3>

            <p>{this.props.price}</p>
            <p>
              <button className="btn btn-active" onClick={this.onAddToCart}>
                Mua hàng
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
