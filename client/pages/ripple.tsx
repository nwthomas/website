import * as React from "react";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";
import * as reactSpring from "@react-spring/three";

import { ShaderGradient, ShaderGradientCanvas } from "shadergradient";

import Layout from "../components/Layout";
import { NextPage } from "next";
import { RIPPLE_PAGE_NAME } from "../constants/seo";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Ripple: NextPage = () => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <Layout pageName={RIPPLE_PAGE_NAME} withFooter>
      <ShaderGradientCanvas
        importedFiber={{ ...fiber, ...drei, ...reactSpring }}
        style={{
          position: "absolute",
          top: 0,
          pointerEvents: "none",
        }}
      >
        <ShaderGradient
          control="query"
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23ff08ea&bgColor2=%2300b83a&brightness=1.2&cAzimuthAngle=250&cDistance=1.5&cPolarAngle=140&cameraZoom=12.5&color1=%2300400d&color2=%23005252&color3=%2300ebeb&embedMode=off&envPreset=dawn&fov=45&gizmoHelper=hide&grain=on&lightType=env&pixelDensity=2.2&positionX=0&positionY=0&positionZ=0&reflection=0.5&rotationX=0&rotationY=0&rotationZ=140&shader=defaults&toggleAxis=false&type=sphere&uAmplitude=2.6&uDensity=0.7&uFrequency=5.5&uSpeed=0.1&uStrength=0.1&uTime=0&wireframe=false&zoomOut=true"
        />
      </ShaderGradientCanvas>
    </Layout>
  );
};

export default Ripple;
