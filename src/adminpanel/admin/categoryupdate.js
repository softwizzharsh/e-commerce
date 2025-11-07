import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BACKEND_API from "../../backendApi"
export default function Categoryupdate() {
    let { id } = useParams(); 
    console.log("Category ID:", id);  // Log to verify if ID is being passed correctly
    const [title, setTitle] = useState("");
    const [pic, setPic] = useState("");
    const [picUrl, setPicUrl] = useState("");
    const [mainCategories, setMainCategories] = useState([]); // State to hold the categories
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedMainCategory, setSelectedMainCategory] = useState(""); // State for selected category
    
    const [item, setItem] = useState([]);
    const [picStatus, setPicStatus] = useState(false); // Check if pic is updated

    // Fetch main categories on initial render
    useEffect(() => {
        fetch(`${BACKEND_API}/api/maincategory`)
            .then(response => response.json())
            .then(data => {
                console.log("Main categories fetched:", data);
                setMainCategories(data); // Set the categories data from the API
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
                setLoading(false);
            });
    }, []);

    // Fetch category data based on the ID from URL params
    useEffect(() => {
        const formdata = JSON.stringify({ id: id });

        fetch(`${BACKEND_API}/api/displaycategorybyid`, {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: formdata,
        })
            .then(response => response.json())
            .then(data => {
                console.log("Fetched category data:", data);
                if (data && data.length > 0) {
                    setItem(data);
                } else {
                    console.error("No data found for this ID.");
                }
            })
            .catch(err => console.error("Error fetching category data: ", err));
    }, [id]);

    // Update title, picture, and selected category when item is updated
    useEffect(() => {
        if (item.length > 0) {
            setTitle(item[0]['title']);
            setPic(item[0]['pic1']);
            console.log(item[0]['pic1']);
            setSelectedMainCategory(item[0]['maincategory']['_id']);
            
        }
    }, [item]);

    // Handle file upload
    const handleFile = (e) => {
        const newImg = e.target.files[0];
        setPic(newImg);
        setPicStatus(true);
        console.log(newImg);
    };

    // Handle image upload to Cloudinary
    const handleUpload = (pic) => {
        const data = new FormData();
        data.append('file', pic);
        data.append('upload_preset', 'practice');
        data.append('cloud_name', 'dezenfhjm');

        return fetch("https://api.cloudinary.com/v1_1/dezenfhjm/image/upload", {
            method: 'POST',
            body: data,
        })
            .then(res => res.json())
            .then(data => {
                setPicUrl(data.url);
                console.log("Image uploaded, URL:", data.url);
                return data.url; // Return the URL to be used later
            })
            .catch(err => {
                console.error("Error uploading image: ", err);
                throw err; // Throw error to handle it later
            });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = {};

        // If pic is updated, upload it and get the URL
        if (picStatus) {
            try {
                // Ensure that the image upload is successful before proceeding
                const uploadedPicUrl = await handleUpload(pic);
                formData = {
                    pic1: uploadedPicUrl, // Use the uploaded image URL
                    title: title,
                    maincategory: selectedMainCategory,
                    id:id,

                };
            } catch (error) {
                alert("Image upload failed! Please try again.");
                return; // Prevent form submission if image upload fails
            }
        } else {
            formData = {
                pic1: pic, // Use the current picUrl (it may be empty if picStatus is false)
                title: title,
                maincategory: selectedMainCategory,
                id:id,
            };
        }

        console.log("Form Data being sent:", formData);

        try {
            const response = await fetch(`${BACKEND_API}/api/categoryupdate`, {
                headers: { 'Content-type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Data updated successfully');
                window.location.href = "/admin/categoryview"; // Redirect to view blogs page after successful update
            } else {
                const errorData = await response.json();
                console.error("Update failed:", errorData);
                alert('Error updating data: ' + (errorData.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error updating data:", error);
            alert("There was an error updating the data.");
        }
    };

    return (
        <>
            <section class="tab-components">
        <div class="container-fluid">
          {/* <!-- ========== title-wrapper start ========== --> */}
          
          <div class="title-wrapper pt-30">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="title">
                  <h2>Update Category</h2>
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
                        Update 
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
                                    
                                        <div className="card-style mb-30">
                                            <div className="select-style-1">
                                                <label>Maincategory</label>
                                                <div className="select-position">
                                                    <select value={selectedMainCategory} onChange={(e) => setSelectedMainCategory(e.target.value)}>
                                                        <option value="">Select Main Category</option>
                                                        {loading ? (
                                                            <option>Loading...</option>
                                                        ) : (
                                                            mainCategories.length > 0 ? (
                                                                mainCategories.map(mainCategory => (
                                                                    <option key={mainCategory._id} value={mainCategory._id}>
                                                                        {mainCategory.maincategory}
                                                                    </option>
                                                                ))
                                                            ) : (
                                                                <option>No categories available</option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-style mb-30">
                                            <h6 className="mb-25"></h6>
                                            <div className="input-style-1">
                                                <label>Category Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Category Name"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="card-style mb-30">
                                            <h6 className="mb-25"></h6>
                                            <div className="input-style-1">
                                                <label>Picture</label>
                                                <input type="file" onChange={handleFile} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-style mb-30">
                                <ul className="buttons-group">
                                    <li>
                                        <button
                                            className="main-btn active-btn-outline square-btn btn-hover form-control"
                                            onClick={handleSubmit}
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
