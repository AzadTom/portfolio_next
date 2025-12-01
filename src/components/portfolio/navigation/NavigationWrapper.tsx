'use client';
import dynamic from "next/dynamic";
const NavigationDrawer = dynamic(()=> import("./NavigationDrawer"),{ssr:false});


const NavigationWrapper = () => {

    return (
       <NavigationDrawer/>
    )
}

export default NavigationWrapper