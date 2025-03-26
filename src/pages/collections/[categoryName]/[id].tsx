import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SingleProductDetails from "@/_components/core/SingleProductDetails/SingleProductDetails";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getallVariantsOfAProduct } from "@/redux/slices/orderSlice";

const fiberCareData = [
  "Cold wash only and wash with similar colors.",
  "Do not iron directly; light steam only if required.",
  "Avoid rubbing into hard surfaces to prevent pilling.",
];

const shippingInfoData = [
  {
    country: "UAE",
    options: [
      "FREE Same Day Delivery (up to AED198)",
      "AED15 Same Day Delivery (over AED198)",
      "AED15 Next Day Delivery (after cut-off)",
      "FREE Express Delivery 1–2 Days",
      "AED40 Cash on Delivery 1–2 Days",
    ],
  },
  {
    country: "Saudi Arabia",
    options: [
      "FREE Next-Day Delivery (up to AED198)",
      "AED15 Next-Day Delivery (over AED198)",
      "SAR40 Express Delivery (COD) 2–3 Days",
    ],
    note: "All Duties and taxes are paid by TGM",
  },
  {
    country: "Kuwait",
    options: [
      "AED40 Express Delivery (Card) 2–3 Days",
      "AED40 Express Delivery (COD) 2–3 Days",
    ],
    note: "All Duties and taxes are paid by TGM",
  },
];

const index = () => {
  const router = useRouter();
  const { categoryName, id } = router.query;
  const [fiberCare, setFiberCare] = useState<string[]>([]);
  const [shippingInfo, setShippingInfo] = useState<any[]>([]);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    setFiberCare(fiberCareData);
    setShippingInfo(shippingInfoData);
  }, []);
  useEffect(() => {
    dispatch(getallVariantsOfAProduct({ productId: id }))
      .unwrap()
      .then((res) => {})
      .catch((err) => console.error(err));
  }, [dispatch, id]);

  return (
    <div>
      <SingleProductDetails
        info={{ fiberCare, shippingInfo }}
        categoryName={categoryName}
      />
    </div>
  );
};

export default index;
