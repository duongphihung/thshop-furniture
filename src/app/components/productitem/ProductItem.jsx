import { AiFillStar, AiOutlineCamera, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai"
import "./productitem.css"
import Link from "next/link";
import AddToCart from "../cart/addcart/AddToCart";
import { Rating } from "@mui/material";
import { formatCurrency } from "@/app/utils/index"

const ProductItem = ({ product, index }) => {

    let images = "";
    if (product.images != null) {
        images = JSON.parse(product.images);
        // console.log(images);
    }
    return (
        <div className="product-grid">
            <div className="showcase">
                <div className="showcase-banner">
                    <div className="product-img-wrapper">
                        <img src={product.imageUrl} alt={product.name} className="product-img default" />
                        <img src={product.images != null ? images[1] : product.imageUrl} alt={product.name + index} className="product-img hover" />
                    </div>

                    {product.status === "OnSale" ? <p className="showcase-badge showcase-badge-sale showcase-badge-black">sale</p> : ""}
                    {product.status === "New" ? <p className="showcase-badge showcase-badge-sale showcase-badge-pink">new</p> : ""}
                    <div className="showcase-actions">
                        <button className="btn-action">
                            <AiOutlineHeart className="product_btn-icon" />
                        </button>
                        <button className="btn-action">
                            <AiOutlineEye className="product_btn-icon" />
                        </button>
                        <AddToCart showQty={false} product={product} increasePerClick={true} redirect={false}></AddToCart>
                        <button className="btn-action">
                            <Link href="https://playcanv.as/p/tXiVwuwF/"><AiOutlineCamera className="product_btn-icon" /></Link>
                        </button>
                    </div>
                </div>
                <div className="showcase-content">
                    <Link href={`/product/${product.id}`} >
                        <h3 className="showcase-category">{product.name}</h3>
                    </Link>

                    <Link href={`/product/${product.id}`}>
                        <h3 className="showcase-title">{product.shortDescription}</h3>
                    </Link>

                    <div className="showcase-rating">
                        <Rating name="read-only" value={Number(product.rating)} readOnly precision={0.1} /><p style={{ fontSize: "18px", marginTop: "2px" }}>({product.comments.length})</p>
                    </div>

                    <div className="price-box">
                        <p className="price">{product.discount != 0 ? formatCurrency(product.discount * 1000) : formatCurrency(product.price * 1000)}</p>
                        {product.discount != 0 ? (<del>{formatCurrency(product.price * 1000)}</del>) : ""}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ProductItem