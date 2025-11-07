import React, { useState, useEffect } from "react";

export default function Subcategoryadd() {
  const [subcategoryname, setsubcategoryname] = useState("");
  const [pic, setpic] = useState("");
  const [picurl, setpicurl] = useState("");
  const [categories, setCategories] = useState([]); // State to hold the categories
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [maincategories, setmaincategories] = useState([]); // State to hold the categories
  const [mainloading, setmainLoading] = useState(true); // Loading state
  const [selectedmaincategory, setselectedmaincategory] = useState(""); // State for selected category
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [gender, setgender] = useState("");

   useEffect(() => {
          fetch('http://localhost:8000/api/maincategory') // Ensure this is the correct endpoint
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
  

  // Fetch categories from the backend on component mount
  useEffect(() => {
    fetch('http://localhost:8000/api/categories') // Ensure this is the correct endpoint
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        console.log(data)
        setCategories(data); // Set the categories data from the API
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
        setLoading(false);
      });
  }, []);

  // Filter categories based on the selected main category
  useEffect(() => {
    // console.log(selectedmaincategory);
    if (selectedmaincategory) {
      const filtered = categories.filter(
        (category) => category.maincategory._id === selectedmaincategory
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
    // console.log(filteredCategories);
  }, [selectedmaincategory]);

  useEffect(() => {
    handleupload(pic);
  }, [pic]);

  const handlepicture = (e) => {
    setpic(e.target.files[0]);
  }

  const handleupload = (pic) => {
    const data = new FormData();
    data.append('file', pic);
    data.append('upload_preset', 'shopping');
    data.append('cloud_name', 'dezenfhjm');
    fetch("https://api.cloudinary.com/v1_1/dezenfhjm/image/upload", {
      method: 'post', body: data
    })
      .then(res => res.json())
      .then(data => { setpicurl(data.url); })
  }

  const handlesubmit = async () => {
    const formdata = JSON.stringify({
      category: selectedCategory, // Send the selected category
      subcategoryname: subcategoryname,
      picture: picurl,
      maincategory:selectedmaincategory,
      gender:gender,
    });
    console.log(formdata);
    try {
      const response = await fetch("http://localhost:8000/api/insertsubcategory", {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: formdata,
      });

      if (response.ok) {
        alert('Subcategory submitted');
      } else {
        alert('Error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="tab-components">
        <div className="container-fluid">
              <div className="title-wrapper pt-30">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="title">
                      <h2>Add Subcategory</h2>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="breadcrumb-wrapper">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a href="#0">Dashboard</a>
                          </li>
                          <li className="breadcrumb-item"><a href="#0">Subcategory</a></li>
                          <li className="breadcrumb-item active" aria-current="page">
                            Add
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-elements-wrapper">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card-style mb-30">
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
                      <div className="select-style-1">
                        <label>Category</label>
                        <div className="select-position">
                          <select disabled={!selectedmaincategory} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">Select category</option>
                            {loading ? (
                              <option>Loading...</option>  // Show loading message while fetching
                            ) : (
                              filteredCategories.length > 0 ? (
                                filteredCategories.map(category => (
                                  <option key={category._id} value={category._id}>
                                    {category.title}
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

                      <h6 className="mb-25"></h6>
                      <div className="input-style-1">
                        <label>Subcategory Name</label>
                        <input
                          type="text"
                          placeholder="Subcategory Name"
                          value={subcategoryname}
                          onChange={(e) => setsubcategoryname(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="card-style mb-30">
                      <h6 className="mb-25"></h6>
                      <div className="input-style-1">
                        <label>Picture</label>
                        <input type="file" onChange={handlepicture} />
                      </div>

                      <h6 className="mb-25"></h6>
                      <div className="input-style-1">
                        <label>Gender</label>
                        
                      </div>
                      <label> Boy </label> <input type="radio" name="gender" value={'Boy'} onChange={(e)=>setgender(e.target.value)} />
                        <label> Girl </label> <input type="radio" name="gender" value={'Girl'} onChange={(e)=>setgender(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-style mb-30">
                <ul className="buttons-group">
                  <li>
                    <button
                      type="button"
                      onClick={handlesubmit}
                      className="main-btn active-btn-outline square-btn btn-hover form-control"
                    >
                      Submit
                    </button>
                  </li>
                </ul>
              </div>
            </div>
         
      </section>
    </>
  );
}
