import React, { useEffect,useRef } from "react";

import { Outlet } from "react-router-dom";
import Adminheader from "./adminheader";
import Adminfooter from "./adminfooter";

import '../assets/css/lineicons.css';
import '../assets/css/materialdesignicons.min.css'
import '../assets/css/morris.css';
import '../assets/css/main.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import '../assets/js/main.js';

// import '../assets/js/loading-bar.min.js';
// import '../assets/js/moment.min.js';


export default function Adminlayout() {
    
    return (
        <>
         <main class="main-wrapper">
            <Adminheader />
            <Outlet />
            <Adminfooter />
            </main>
        </>
    );
}
