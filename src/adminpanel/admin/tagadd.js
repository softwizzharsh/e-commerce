import React from "react";
import { useState,useEffect } from "react";
import {BACKEND_API} from "../../backendApi"
export default function Tagadd()
{

  const [tagname,settagname]=useState("");

  const handlesubmit=async()=>{
    const formdata=JSON.stringify({
        tagname:tagname,
    });
    try{
       const response=await fetch(`${BACKEND_API}/api/inserttag`,{
        headers:{'Content-type':'application/json'},
        method:'POST',
        body: formdata,
       }
       )
       
       if(response.ok){
        alert('Tag Submitted')
       }
       else {
        alert('Error')
       }
    }
    catch(error)
    {
        console.log(error)
    }
}

    return(
        <>
         {/* <!-- ========== tab components start ========== --> */}
      <section class="tab-components section">
        <div class="container-fluid">
          {/* <!-- ========== title-wrapper start ========== --> */}
          
          <div class="title-wrapper pt-30">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="title">
                  <h2>Add Tags</h2>
                </div>
              </div>
              {/* <!-- end col --> */}
              <div class="col-md-6">
                <div class="breadcrumb-wrapper">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a href="#0">Dashboard</a>
                      </li>
                      <li class="breadcrumb-item"><a href="#0">Tag</a></li>
                      <li class="breadcrumb-item active" aria-current="page">
                        Add 
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              {/* <!-- end col --> */}
            </div>
            {/* <!-- end row --> */}
          </div>
          {/* <!-- ========== title-wrapper end ========== --> */}

          {/* <!-- ========== form-elements-wrapper start ========== --> */}
          <div class="form-elements-wrapper">
            <div class="row">
              <div class="col-lg-6">
                {/* <!-- input style start --> */}
                <div class="card-style mb-30">
                  <h6 class="mb-25"></h6>
                  <div class="input-style-1">
                    <label>Tag Name</label>
                    <input type="text" placeholder="Tag Name" value={tagname} onChange={(e)=>settagname(e.target.value)} />
                  </div>
                  {/* <!-- end input --> */}
                </div>
                {/* <!-- end card --> */}
                {/* <!-- ======= input style end ======= --> */}

                {/* <!-- ======= select style start ======= --> */}
                {/* <div class="card-style mb-30">
                  <h6 class="mb-25">Selects</h6>
                  <div class="select-style-1">
                    <label>Category</label>
                    <div class="select-position">
                      <select>
                        <option value="">Select category</option>
                        <option value="">Category one</option>
                        <option value="">Category two</option>
                        <option value="">Category three</option>
                      </select>
                    </div>
                  </div> */}
                  {/* <!-- end select --> */}
                {/* </div> */}
                {/* <!-- end card --> */}
                {/* <!-- ======= select style end ======= --> */}

                {/* <!-- ======= select style start ======= --> */}
                {/* <div class="card-style mb-30">
                  <h6 class="mb-25">Time and Date</h6>
                  <div class="input-style-1">
                    <label>Date</label>
                    <input type="date" />
                  </div> */}
                  {/* <!-- end input --> */}
                  {/* <div class="input-style-2">
                    <input type="time" />
                  </div> */}
                  {/* <!-- end input --> */}
                {/* </div> */}
                {/* <!-- end card --> */}
                {/* <!-- ======= input style end ======= --> */}

              </div>
              {/* <!-- end col --> */}
            </div>
            {/* <!-- end row --> */}
          </div>
          {/* <!-- ========== form-elements-wrapper end ========== --> */}
          <div class="card-style mb-30">
          <ul class="buttons-group">
            <li>
              <button href="#0" class="main-btn active-btn-outline square-btn btn-hover form-control " onClick={handlesubmit}>Submit</button >
            </li>  
          </ul>
        </div>
          </div>                                                                  
         
        {/* <!-- end container --> */}
      </section>
      {/* <!-- ========== tab components end ========== --> */}

        </>
    )
}