import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BACKEND_API from "../../backendApi"
export default function Subcategoryupdate() {
  let { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
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
  const [item, setitem] = useState([]);
  const [itemcat, setitemcat] = useState([]);
  const [picstatus, setpicstatus] = useState(false);
  useEffect(() => {
    fetch(`${BACKEND_API}/api/maincategory`) // Ensure this is the correct endpoint
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log(data);
        setmaincategories(data); // Set the categories data from the API
        setmainLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
        setmainLoading(false);
      });
  }, []);

  // Fetch categories from the backend on component mount
  useEffect(() => {
    fetch(`${BACKEND_API}/api/categories`) // Ensure this is the correct endpoint
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log(data);
        setCategories(data); // Set the categories data from the API
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
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

  useState(() => {
    fetch(`${BACKEND_API}/subcategoryupdate`)
      .then((response) => response.json())
      .then((data) => setitemcat(data))
      .catch((err) => console.error("error fetching data: ", err));
  }, []);

  useEffect(() => {
    const formdata = JSON.stringify({
      id: id,
    });

    try {
      const response = fetch(
        `${BACKEND_API}/api/displaysubcategorybyid`,
        {
          headers: { "Content-type": "application/json" },
          method: "POST",
          body: formdata,
        }
      )
        .then((response) => response.json())
        .then((data) => setitem(data))
        .catch((err) => console.error("Error fetching data: ", err));
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    if (item.length > 0) {
      console.log(item[0]["maincategory"]["_id"]);
      setselectedmaincategory(item[0]["maincategory"]["_id"]);
      setSelectedCategory(item[0]["category"]["_id"]);
      setsubcategoryname(item[0]["subcategoryname"]);
      setpicurl(item[0]["picture"]);
      setgender(item[0]["gender"]);
    }
  }, [item]);

  useEffect(() => {
    console.log(pic);
    handleupload(pic);
  }, [pic]);

  const handlefile = (e) => {
    const newimg = e.target.files[0];
    setpic(newimg);
    console.log(newimg);
    setpic(e.target.files[0]);
    setpicstatus(true);
  };

  const handleupload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ultras");
    data.append("cloud_name", "ddniad7uh");
    fetch("https://api.cloudinary.com/v1_1/ddniad7uh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setpicurl(data.url);
      });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    let formdata = "";
    if (picstatus) {
      await handleupload(pic);
      formdata = JSON.stringify({
        maincategory: selectedmaincategory,
        category: selectedCategory,
        subcategoryname: subcategoryname,
        picture: picurl,
        gender: gender,
        id: id,
      });
    }
    //console.log(formdata)
    else {
      formdata = JSON.stringify({
        maincategory: selectedmaincategory,
        category: selectedCategory,
        subcategoryname: subcategoryname,
        picture: picurl,
        gender: gender,
        id: id,
      });
    }

    //console.log("Form Data being sent to the backend: ", formdata); // Add this line to debug

    try {
      const response = await fetch(
        `${BACKEND_API}/api/subcategoryupdate`,
        {
          headers: { "Content-type": "application/json" },
          method: "POST",
          body: formdata,
        }
      );

      if (response.ok) {
        alert("Date updated");
        //navigate("/subcategoryview");
        navigate("/admin/subcategoryview", { state: { updated: true } }); // Passing state to indicate successful update
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                      <li className="breadcrumb-item">
                        <a href="#0">Subcategory</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
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
                      <select
                        value={selectedmaincategory}
                        onChange={(e) =>
                          setselectedmaincategory(e.target.value)
                        }
                      >
                        <option value="">Select category</option>
                        {mainloading ? (
                          <option>Loading...</option> // Show loading message while fetching
                        ) : maincategories.length > 0 ? (
                          maincategories.map((maincategory) => (
                            <option
                              key={maincategory._id}
                              value={maincategory._id}
                            >
                              {maincategory.maincategory}
                            </option>
                          ))
                        ) : (
                          <option>No categories available</option> // Handle case if no categories
                        )}
                      </select>
                    </div>
                    <br />
                  </div>
                  <div className="select-style-1">
                    <label>Category</label>
                    <div className="select-position">
                      <select
                        disabled={!selectedmaincategory}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">Select category</option>
                        {loading ? (
                          <option>Loading...</option> // Show loading message while fetching
                        ) : filteredCategories.length > 0 ? (
                          filteredCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.title}
                            </option>
                          ))
                        ) : (
                          <option>No categories available</option> // Handle case if no categories
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
                    <input type="file" onChange={handlefile} />
                  </div>
                  <h6 className="mb-25"></h6>
                  <div className="input-style-1">
                    <label>Gender</label>
                  </div>
                  <label> Boy </label>{" "}
                  <input
                    type="radio"
                    name="gender"
                    value={"Boy"}
                    onChange={(e) => setgender(e.target.value)}
                    checked={gender === "Boy"}
                  />
                  <label> Girl </label>{" "}
                  <input
                    type="radio"
                    name="gender"
                    value={"Girl"}
                    onChange={(e) => setgender(e.target.value)}
                    checked={gender === "Girl"}
                  />
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
