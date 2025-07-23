import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  calculatePrice,
} from "../../features/productCart/productCart";
import ProductReview from "./ProductReview";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
 
function ProductDetails() {
  const [goldPrice, setGoldPrice] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    details: false,
    pricing: false,
  });
 
  useEffect(() => {
    fetchGoldPrice();
  }, []);
 
  const fetchGoldPrice = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/gold-price`
      );
      setGoldPrice(response.data.price || 0);
    } catch (error) {
      console.error("Error fetching gold price:", error);
      setGoldPrice("Error fetching price");
    }
  };
 
  const [product, setProduct] = useState(null);
  const [productImageIndex, setProductImageIndex] = useState(0);
 
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state) => state.productAddedToCart?.cartItems ?? []
  );
 
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/product/${id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);
 
  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);
 
  if (!product) return <div>Loading...</div>;
 
  const goldPurityFactors = {
    24: 1,
    22: 0.935,
    18: 0.77,
    14: 0.605,
  };
 
  // Assuming `selectedCarat` contains the selected carat value (14, 18, 22)
  const purityFactor = goldPurityFactors[product.goldPurity];
 
  // Calculate gold price based on selected carat
  const adjustedGoldPrice = goldPrice * purityFactor;
 
  const totalMakingCharge = product.makingCharge * product.goldWeight;
 
  // Calculate total price
  const totalPrice =
    adjustedGoldPrice * product.goldWeight +
    product.diamondPrice *product.diamondWeight +
    totalMakingCharge +
    product.colorStonePrice*product.colorStoneQuantity;
 
  // Apply discount
  const discountPercent = Number(product.discount);
  const discount = discountPercent / 100;
  const discountAmount = totalMakingCharge * discount;
  const discountPrice = Math.floor(totalPrice - discountAmount);
 
  console.log("Discounted Price =", discountPrice);
 
  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item._id === product._id);
 
    const updatedProduct = existingItem
      ? { ...existingItem, quantity: existingItem.quantity + 1 }
      : {
          ...product,
          productId: product._id,
          quantity: 1,
          photo: product.image,
          discountPrice: discountPrice,
        };
 
    dispatch(addToCart(updatedProduct));
    alert("Item added to cart!");
  };
 
  const handleCustomizeOrder = () => {
    const shopWhatsAppNumber = "918961072421";
 
    let message = `*Hi, I want to customize this product:*\n\n`;
    message += `🛍 *${product.title}*\n`;
 
    message += `✨ *Please contact me for customization options.*`;
 
    // WhatsApp API URL
    const whatsappUrl = `https://wa.me/${shopWhatsAppNumber}?text=${encodeURIComponent(
      message
    )}`;
    // Open WhatsApp chat with pre-filled message
    window.open(whatsappUrl, "_blank");
  };
 
  const thumbnails = product?.images || [];
 
  const handlePrevImage = () =>
    setProductImageIndex((prev) =>
      prev === 0 ? thumbnails.length - 1 : prev - 1
    );
  const handleNextImage = () =>
    setProductImageIndex((prev) => (prev + 1) % thumbnails.length);
 
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
 
  return (



    <div className="pt-16 sm:pt-[70px] px-3 sm:px-4 lg:px-6 xl:px-8">
      <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 xl:w-[45%]">
          <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square xl:h-[600px]">
            <button
              className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow-md z-10 hover:shadow-lg transition-shadow"
              onClick={handlePrevImage}
            >
              <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
 
            <img
              src={thumbnails[productImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
 
            <button
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow-md z-10 hover:shadow-lg transition-shadow"
              onClick={handleNextImage}
            >
              <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
 
          {/* Thumbnail Gallery */}
          <div className="flex space-x-1.5 sm:space-x-2 mt-3 sm:mt-4 justify-center overflow-x-auto pb-2">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index}`}
                className={`border-2 ${
                  productImageIndex === index
                    ? "border-blue-500"
                    : "border-gray-200"
                } rounded-md w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover cursor-pointer flex-shrink-0 hover:border-blue-300 transition-colors`}
                onClick={() => setProductImageIndex(index)}
              />
            ))}
          </div>
        </div>
 
        {/* Product Details Section */}
        <div className="w-full lg:w-1/2 xl:w-[50%] p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Title and Category */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              {product.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">
              Category: {product.category}
            </p>
          </div>
 
          {/* Pricing */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
            <span className="text-lg sm:text-xl lg:text-2xl text-black font-semibold">
              ₹{discountPrice}/-
            </span>
            {Number(product.discount) > 0 && (
              <>
                <span className="text-sm sm:text-base lg:text-lg text-green-600 font-medium">
                  {product.discount}% off
                </span>
                <span className="text-sm sm:text-base lg:text-lg text-gray-400 line-through">
                  ₹{Math.floor(totalPrice)}/-
                </span>
              </>
            )}
          </div>
 
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Ring Size Display (only for Rings) */}
            {product.category === "Rings" && (
              <div className="space-y-2 sm:space-y-3">
                <div className="text-sm sm:text-base lg:text-lg font-medium">
                  Ring Size
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product?.size?.map((size, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-full text-xs sm:text-sm lg:text-base bg-gray-50"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
 
            {/* Gold Purity Display */}
            <div className="space-y-2 sm:space-y-3">
              <div className="text-sm sm:text-base lg:text-lg font-medium">
                Gold Purity
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product?.goldPurity && (
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-full text-xs sm:text-sm lg:text-base bg-gray-50">
                    {product.goldPurity} kt
                  </span>
                )}
              </div>
            </div>
 
            {/* Diamond Clarity Display */}
            <div className="space-y-2 sm:space-y-3">
              <div className="text-sm sm:text-base lg:text-lg font-medium">
                Diamond Clarity
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product?.diamondClarity && (
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-full text-xs sm:text-sm lg:text-base bg-gray-50">
                    {product.diamondClarity}
                  </span>
                )}
              </div>
            </div>
 
            {/* Metal Color Display */}
            <div className="space-y-2 sm:space-y-3">
              <div className="text-sm sm:text-base lg:text-lg font-medium">
                Metal Color
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product?.colors?.map((color, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-full text-xs sm:text-sm lg:text-base bg-gray-50"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>
 
          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 sm:space-y-4 pt-4 sm:pt-6">
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 sm:py-3 border border-black rounded-full text-base sm:text-lg lg:text-xl font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleCustomizeOrder}
              className="w-full py-2.5 sm:py-3 bg-black text-white border border-black rounded-full text-base sm:text-lg lg:text-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Customize the Product
            </button>
Open WhatsApp
WhatsApp Messenger: More than 2 billion people
          in over 180 countries use WhatsApp to stay in touch with friends and
          family, anytime and anywhere. WhatsApp is free and offers sim...
 
 {/* Shipping Info */}
            <div className="text-sm sm:text-base lg:text-lg text-gray-700 mt-3 sm:mt-4 text-center sm:text-left">
              Ships by: Friday, February 28
            </div>
          </div>
        </div>
      </div>
 
      {/* Product Description, Details, Pricing - Shown Only If Data Exists */}
      <div className="mt-8 sm:mt-10 lg:mt-12 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Product Description */}
        {product.description && (
          <div className="border border-gray-200 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 sm:p-5 lg:p-6 text-left hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection("description")}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                PRODUCT DESCRIPTION
              </h2>
              {expandedSections.description ? (
                <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
            {expandedSections.description && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        )}
 
        {/* Product Details */}
        {(product.goldPurity ||
          product.goldWeight ||
          product.diamondClarity ||
          product.diamondWeight ||
          product.diamondColor ||
          product.diamondShape ||
          product.diamondPrice ||
          product.colorStoneColor ||
          product.colorStoneWeight ||
          product.colorStoneShape ||
          product.colorStoneQuantity ||
          product.category ||
          product.colors?.length > 0 ||
          (product.category === "Rings" && product.size?.length > 0)) && (
          <div className="border border-gray-200 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 sm:p-5 lg:p-6 text-left hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection("details")}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                PRODUCT DETAILS
              </h2>
              {expandedSections.details ? (
                <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
            {expandedSections.details && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-gray-700">
                  {product.goldPurity && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Material:</span>
                      <span>{product.goldPurity}K Gold</span>
                    </div>
                  )}
                  {product.goldWeight && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Gold Weight:</span>
                      <span>{product.goldWeight}g</span>
                    </div>
                  )}
                  {product.diamondClarity && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Diamond Clarity:</span>
                      <span>{product.diamondClarity}</span>
                    </div>
                  )}
                  {product.diamondWeight && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Diamond Weight:</span>
                      <span>{product.diamondWeight}</span>
                    </div>
                  )}
                  {product.diamondColor && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Diamond Color:</span>
                      <span>{product.diamondColor}</span>
                    </div>
                  )}
                  {product.diamondShape && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Diamond Shape:</span>
                      <span>{product.diamondShape}</span>
                    </div>
                  )}
                  {product.diamondPrice && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Diamond Price:</span>
                      <span>{product.diamondPrice}</span>
                    </div>
                  )}
                  {product.colorStoneColor && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Color Stone Color:</span>
                      <span>{product.colorStoneColor}</span>
                    </div>
                  )}
                  {product.colorStoneWeight > 0 && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Color Stone Weight:</span>
                      <span>{product.colorStoneWeight}</span>
                    </div>
                  )}
                  {product.colorStoneShape && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Color Stone Shape:</span>
                      <span>{product.colorStoneShape}</span>
                    </div>
                  )}
                  {product.colorStoneQuantity > 0 && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Color Stone Quantity:</span>
                      <span>{product.colorStoneQuantity}</span>
                    </div>
                  )}
                  {product.category && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Category:</span>
                      <span>{product.category}</span>
                    </div>
                  )}
                  {product.colors?.length > 0 && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Available Colors:</span>
                      <span>{product.colors.join(", ")}</span>
                    </div>
                  )}
                  {product.category === "Rings" && product.size?.length > 0 && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Available Sizes:</span>
                      <span>{product.size.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
 
        {/* Pricing Details */}
        {(adjustedGoldPrice ||
          product.goldWeight ||
          product.diamondPrice ||
          totalMakingCharge ||
          product.colorStonePrice) && (
          <div className="border border-gray-200 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 sm:p-5 lg:p-6 text-left hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection("pricing")}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                PRICING DETAILS
              </h2>
              {expandedSections.pricing ? (
                <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
            {expandedSections.pricing && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-gray-700">
                  {adjustedGoldPrice && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Gold Price per gram:</span>
                      <span>₹{adjustedGoldPrice.toFixed(2)}</span>
                    </div>
                  )}
                  {product.goldWeight && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Gold Weight:</span>
                      <span>{product.goldWeight}g</span>
                    </div>
                  )}
                  {adjustedGoldPrice && product.goldWeight && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Gold Cost:</span>
                      <span>
                        ₹{(adjustedGoldPrice * product.goldWeight).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {product.diamondPrice && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Diamond Price:</span>
                      <span>₹{product.diamondPrice}</span>
                    </div>
                  )}
                  {totalMakingCharge && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Making Charges:</span>
                      <span>₹{totalMakingCharge}</span>
                    </div>
                  )}
                  {product.colorStonePrice > 0 && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Color Stone Price:</span>
                      <span>₹{product.colorStonePrice}</span>
                    </div>
                  )}
                  {totalPrice && (
                    <div className="flex justify-between border-b pb-2 font-medium">
                      <span>Subtotal:</span>
                      <span>₹{Math.floor(totalPrice)}</span>
                    </div>
                  )}
                  {Number(product.discount) > 0 && discountAmount && (
                    <div className="flex justify-between border-b pb-2 text-green-600">
                      <span className="font-medium">
                        Discount ({product.discount}%):
                      </span>
                      <span>-₹{Math.floor(discountAmount)}</span>
                    </div>
                  )}
                  {discountPrice && (
                    <div className="flex justify-between font-bold text-lg sm:text-xl text-black">
                      <span>Final Price:</span>
                      <span>₹{discountPrice}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
 
      {/* Testimonials Section */}
      <div className="mt-8 sm:mt-10 lg:mt-12">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-Kugile mt-4 sm:mt-6 lg:mt-8 mb-6 sm:mb-8 lg:mb-10">
          Testimonials
        </h1>
 
        <ProductReview />
      </div>
    </div>





  );
}
 
export default ProductDetails;
 
 