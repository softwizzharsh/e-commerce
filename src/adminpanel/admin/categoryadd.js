import React from "react";
import { useState,useEffect } from "react";
import {BACKEND_API} from "../../backendApi"
export default function Categoryadd()
{

  const [title, settitle]= useState("");
  const [pic, setpic]= useState("");
  const [picurl,setpicurl]=useState("");
  const [maincategories, setmaincategories] = useState([]); // State to hold the categories
        const [mainloading, setmainLoading] = useState(true); // Loading state
        const [selectedmaincategory, setselectedmaincategory] = useState(""); // State for selected category


          useEffect(() => {
              fetch(`${BACKEND_API}/api/maincategory`) // Ensure this is the correct endpoint
                .then(response => response.json()) // Parse the JSON response
                .then(data => {
                  console.log(data)
                  setmaincategories(data); // Set the categories data from the API
                  setmainLoading(false); // Set loading to false when data is fetched
                })
                .catch(error => {
                  console.error('There was an error fetching the categories!', error);
                  setmainLoading(false);
                });
            }, []);

  useEffect(()=>{
    handleupload(pic);
},[pic]);

const handlepicture=(e)=>{
    setpic(e.target.files[0]);
}

const handleupload=(pic)=>{
    const data= new FormData();
    data.append('file',pic);
    data.append('upload_preset','shopping');
    data.append('cloud_name','dezenfhjm')
    fetch("https://api.cloudinary.com/v1_1/dezenfhjm/image/upload",
        {
          method:'post', body:data
        })
        .then(res=>res.json())
        .then(data=>{setpicurl(data.url); })
}

const handlesubmit=async()=>{
    const formdata=JSON.stringify({
      title:title,
      pic1:picurl,
      maincategory: selectedmaincategory,
      
    });
    console.log(formdata);
    try{
      const response=await fetch(`${BACKEND_API}/api/insertcategory`,{
      headers:{'Content-type':'application/json'},
      method:'POST',
      body:formdata,
    }
      )
  
  if(response.ok){
    alert('Category submitted')
  }
  else{
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
      <section class="tab-components">
        <div class="container-fluid">
          {/* <!-- ========== title-wrapper start ========== --> */}
          
          <div class="title-wrapper pt-30">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="title">
                  <h2>Add Category</h2>
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
                      <li class="breadcrumb-item"><a href="#0">Category</a></li>
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
                  <div className="select-style-1">
                      <label>Maincategory</label>
                      <div className="select-position">
                        <select value={selectedmaincategory} onChange={(e) => setselectedmaincategory(e.target.value)}>
                          <option value="">Select category</option>
                          {mainloading ? (
                            <option>Loading...</option>  // Show loading message while fetching
                          ) : (
                            maincategories.length > 0 ? (
                              maincategories.map(maincategory => (
                                <option key={maincategory._id} value={maincategory._id}>
                                  {maincategory.maincategory}
                                </option>
                                ))
                              ) : (
                                <option>No categories available</option>  // Handle case if no categories
                              )
                            )}
                          </select>
                        </div>
                        <br />
                      </div>
                  <div class="input-style-1">
                    <label>Category Name</label>
                    <input type="text" placeholder="Category Name" onChange={(e)=>settitle(e.target.value)} />
                  </div>
                  {/* <!-- end input --> */}
                </div>
                {/* <!-- end card --> */}
                {/* <!-- ======= input style end ======= --> */}

                {/* <!-- ======= select style start ======= --> */}
                {/* <div class="card-style mb-30">
                  <h6 class="mb-25">Time and Date</h6>
                  <div class="input-style-1">
                    <label>Date</label>
                    <input type="date" />
                  </div> */}
                  {/* <!-- end input --> */}
                  {/* <div class="input-style-2">
                  <label>Time</label>
                    <input type="time" />
                  </div> */}
                  {/* <!-- end input --> */}
                {/* </div> */}
                {/* <!-- end card --> */}
                {/* <!-- ======= input style end ======= --> */}
              </div>
              {/* <!-- end col --> */}
              <div class="col-lg-6">
                {/* <!-- ======= picture style start ======= --> */}
                <div class="card-style mb-30">
                  <h6 class="mb-25"></h6>
                  <div class="input-style-1">
                    <label>Picture</label>
                    <input type="file" placeholder="" onChange={handlepicture} />
                  </div>         
                </div>
                {/* <!-- ======= picture style end ======= --> */}

              </div>
              {/* <!-- end col --> */}
            </div>
            {/* <!-- end row --> */}
          </div>
          {/* <!-- ========== form-elements-wrapper end ========== --> */}
          <div class="card-style mb-30">
          <ul class="buttons-group">
            <li>
              <button href="#0" class="main-btn active-btn-outline square-btn btn-hover form-control" onClick={handlesubmit}>Submit</button >
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