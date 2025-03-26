import Image from "next/image";
import React from "react";

const MaskGroupImage = ({ onLoad }: { onLoad?: () => void }) => {
  return (
    <Image
      src="/Images/MaskGroup.svg"
      alt="Mask Group"
      width={300}
      height={500}
      priority 
      style={{
        objectFit: "contain",
        display: "block",
      }}
      onLoad={onLoad} 
    />
  );
};

export default MaskGroupImage;
