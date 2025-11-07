import React  from "react";
import { useState,useEffect } from "react";
import BACKEND_API from "../../backendApi"
export default function Brandadd()
{

    const [brandname, setbrandname] = useState("");
    const [categories, setCategories] = useState([]); // State to hold the categories
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
    console.log(categories)
    // Fetch categories from the backend on component mount
    useEffect(() => {
      fetch(`${BACKEND_API}/api/categories`) // Ensure this is the correct endpoint
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
          setCategories(data); // Set the categories data from the API
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch(error => {
          console.error('There was an error fetching the categories!', error);
          setLoading(false);
        });
    }, []);

    // console.log(brandname)
    const handlesubmit = async () => {
      const formdata = JSON.stringify({
        category: selectedCategory, // Send the selected category
        brandname: brandname,
      });
      console.log(formdata);
      try {
        const response = await fetch(`${BACKEND_API}/api/insertbrand`, {
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
          body: formdata,
        });
  
        if (response.ok) {
          alert('Brand submitted');
        } else {
          alert('Error');
        }
      } catch (error) {
        console.log(error);
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
                  <h2>Add Brand</h2>
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
                      <li class="breadcrumb-item"><a href="#0">Brand</a></li>
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
                 
                  <div class="select-style-1">
                    <label>Category</label>
                    <div class="select-position">
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">Select category</option>
                            {loading ? (
                              <option>Loading...</option>  // Show loading message while fetching
                            ) : (
                              categories.length > 0 ? (
                                categories.map(category => (
                                  <option key={category._id} value={category._id}>
                                    {category.maincategory.maincategory} {"  "}
                                    {category.title} 
                                  </option>
                                ))
                              ) : (
                                <option>No categories available</option>  // Handle case if no categories
                              )
                            )}
                          </select>
                    </div>
                    <br/> 
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

                {/* <!-- ======= input switch style start ======= --> */}
                {/* <div class="card-style mb-30">
                  <h6 class="mb-25">Toggle switch input</h6>
                  <div class="form-check form-switch toggle-switch mb-30">
                    <input class="form-check-input" type="checkbox" id="toggleSwitch1" />
                    <label class="form-check-label" for="toggleSwitch1">Default switch checkbox input</label>
                  </div>
                  <div class="form-check form-switch toggle-switch">
                    <input class="form-check-input" type="checkbox" id="toggleSwitch2" checked />
                    <label class="form-check-label" for="toggleSwitch2">Default switch checkbox input</label>
                  </div>
                </div> */}
                {/* <!-- ======= input switch style end ======= --> */}
              </div>
              {/* <!-- end col --> */}
              <div class="col-lg-6">
                {/* <!-- ======= picture style start ======= --> */}
                <div class="card-style mb-30">
                <div class="input-style-1">
                    <label>Brand Name</label>
                    <input type="text" placeholder="Brand Name" onChange={(e)=>setbrandname(e.target.value)} />
                  </div>
                  </div>
                {/* <div class="card-style mb-30">
                  <h6 class="mb-25">Picture</h6>
                  <div class="input-style-1">
                    <input type="file" placeholder=""/>
                  </div>
                </div> */}
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