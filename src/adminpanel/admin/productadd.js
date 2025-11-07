// import React from "react";
// import { useState, useEffect } from "react

// export default function Productadd() {
//   const [productname, setproductname] = useState("");
//   const [shortdescription, setshortdescription] = useState("");
//   const [longdescription, setlongdescription] = useState("");
//   const [genericname, setgenericname] = useState("");
//   const [manufacturer, setmanufacturer] = useState("");
//   const [packer, setpacker] = useState("");
//   const [size, setsize] = useState("");
//   const [mrp, setmrp] = useState("");
//   const [itemweight, setitemweight] = useState("");
//   const [netquantity, setnetquantity] = useState("");
//   const [discount, setdiscount] = useState("");
//   const [itemdimension, setitemdimension] = useState("");
//   const [subcategory, setsubcategory] = useState([]);
//   const [brand, setbrand] = useState([]);
//   const [tag, settag] = useState([]);
//   const [pic1, setpic1] = useState("");
//   const [picurl1, setpicurl1] = useState("");
//   const [pic2, setpic2] = useState("");
//   const [picurl2, setpicurl2] = useState("");
//   const [pic3, setpic3] = useState("");
//   const [picurl3, setpicurl3] = useState("");
//   const [pic4, setpic4] = useState("");
//   const [picurl4, setpicurl4] = useState("");
//   const [maincategories, setmaincategories] = useState([]); // State to hold the categories
//   const [mainloading, setmainLoading] = useState(true); // Loading state
//   const [selectedmaincategory, setselectedmaincategory] = useState(""); // State for selected category
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [categories, setCategories] = useState([]); // State to hold the categories
//   const [loading, setLoading] = useState(true); // Loading state
//   const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
//   const [filteredSubcategories, setFilteredSubcategories] = useState([]);
//   // const [categories, setCategories] = useState([]); // State to hold the categories
//   const [loading1, setLoading1] = useState(true); // Loading state
//   const [loading2, setLoading2] = useState(true); // Loading state
//   const [loading3, setLoading3] = useState(true); // Loading state
//   const [selectedsubcategory, setselectedsubcategory] = useState(""); // State for selected category
//   const [selectedbrand, setSelectedbrand] = useState(""); // State for selected category
//   const [selectedtag, setSelectedtag] = useState(""); // State for selected category

//   useEffect(() => {
//     fetch("http://localhost:8000/api/maincategory") // Ensure this is the correct endpoint
//       .then((response) => response.json()) // Parse the JSON response
//       .then((data) => {
//         // console.log(data);
//         setmaincategories(data); // Set the categories data from the API
//         setmainLoading(false); // Set loading to false when data is fetched
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the categories!", error);
//         setmainLoading(false);
//       });
//   }, []);

//   // Fetch categories from the backend on component mount
//   useEffect(() => {
//     fetch("http://localhost:8000/api/subcategoriesunique") // Ensure this is the correct endpoint
//       .then((response) => response.json()) // Parse the JSON response
//       .then((data) => {
//         // console.log(data);
//         setsubcategory(data); // Set the categories data from the API
//         setLoading1(false); // Set loading to false when data is fetched
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the categories!", error);
//         setLoading1(false);
//       });
//   }, []);
//   // Fetch categories from the backend on component mount
//   useEffect(() => {
//     fetch("http://localhost:8000/api/categories") // Ensure this is the correct endpoint
//       .then((response) => response.json()) // Parse the JSON response
//       .then((data) => {
//         // console.log(data);
//         setCategories(data); // Set the categories data from the API
//         setLoading(false); // Set loading to false when data is fetched
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the categories!", error);
//         setLoading(false);
//       });
//   }, []);

//   // Filter categories based on the selected main category
//   useEffect(() => {
//     // console.log(selectedmaincategory);
//     if (selectedmaincategory) {
//       const filtered = categories.filter(
//         (category) => category.maincategory._id === selectedmaincategory
//       );
//       setFilteredCategories(filtered);
//     } else {
//       setFilteredCategories([]);
//     }
//     // console.log(filteredCategories);
//   }, [selectedmaincategory]);

//   // Filter categories based on the selected main category

//   useEffect(() => {
//     if (selectedCategory) {
//       const filtered = subcategory.filter(
//         (subcategory) => subcategory.category === selectedCategory
//       );
//       setFilteredSubcategories(filtered);
//     } else {
//       setFilteredSubcategories([]);
//     }
//     // console.log(filteredCategories);
//   }, [selectedCategory]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/tags") // Ensure this is the correct endpoint
//       .then((response) => response.json()) // Parse the JSON response
//       .then((data) => {
//         // console.log(data);
//         settag(data); // Set the categories data from the API
//         setLoading2(false); // Set loading to false when data is fetched
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the categories!", error);
//         setLoading2(false);
//       });
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/brands") // Ensure this is the correct endpoint
//       .then((response) => response.json()) // Parse the JSON response
//       .then((data) => {
//        const filterData =  data.filter((d)=>
//              d.category._id ===selectedCategory
//         )
//         setbrand(filterData); // Set the categories data from the API
//         setLoading3(false); // Set loading to false when data is fetched
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the categories!", error);
//         setLoading3(false);
//       });
//   }, [ selectedCategory]);

//   useEffect(() => {
//     handleupload1(pic1);
//   }, [pic1]);
//   useEffect(() => {
//     handleupload2(pic2);
//   }, [pic2]);
//   useEffect(() => {
//     handleupload3(pic3);
//   }, [pic3]);
//   useEffect(() => {
//     handleupload4(pic4);
//   }, [pic4]);

//   const handlepicture1 = (e) => {
//     setpic1(e.target.files[0]);
//   };
//   const handlepicture2 = (e) => {
//     setpic2(e.target.files[0]);
//   };
//   const handlepicture3 = (e) => {
//     setpic3(e.target.files[0]);
//   };
//   const handlepicture4 = (e) => {
//     setpic4(e.target.files[0]);
//   };

//   const handleupload1 = (pic1) => {
//     const data = new FormData();
//     data.append("file", pic1);
//     data.append("upload_preset", "shopping")  ;
//     data.append("cloud_name", "dezenfhjm");
//     fetch("https://api.cloudinary.com/v1_1/dezenfhjm/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setpicurl1(data.url);
//       });
//   };
//   const handleupload2 = (pic2) => {
//     const data = new FormData();
//     data.append("file", pic2);
//     data.append("upload_preset", "shopping");
//     data.append("cloud_name", "dezenfhjm");
//     fetch("https://api.cloudinary.com/v1_1/dezenfhjm/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setpicurl2(data.url);
//       });
//   };
//   const handleupload3 = (pic3) => {
//     const data = new FormData();
//     data.append("file", pic3);
//     data.append("upload_preset", "shopping");
//     data.append("cloud_name", "dezenfhjm");
//     fetch("https://api.cloudinary.com/v1_1/dezenfhjm/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setpicurl3(data.url);
//       });
//   };
//   const handleupload4 = (pic4) => {
//     const data = new FormData();
//     data.append("file", pic4);
//     data.append("upload_preset", "shopping");
//     data.append("cloud_name", "dezenfhjm");
//     fetch("https://api.cloudinary.com/v1_1/dezenfhjm/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setpicurl4(data.url);
//       });
//   };

//   const handlesubmit = async (e) => {
//     // e.target.preventDefault()
//     const formdata = JSON.stringify({
//       subcategory: selectedsubcategory,
//       brand: selectedbrand,
//       tag: selectedtag,
//       pic1: picurl1,
//       productname: productname,
//       shortdescription: shortdescription,
//       longdescription: longdescription,
//       genericname: genericname,
//       manufacturer: manufacturer,
//       packer: packer,
//       size: size,
//       mrp: mrp,
//       itemweight: itemweight,
//       netquantity: netquantity,
//       discount: discount,
//       itemdimension: itemdimension,
//       pic2: picurl2,
//       pic3: picurl3,
//       pic4: picurl4,
//     });
//     // console.log(formdata);
//     try {
//       const response = await fetch("http://localhost:8000/api/insertproduct", {
//         headers: { "Content-type": "application/json" },
//         method: "POST",
//         body: formdata,
//       });

//       if (response.ok) {
//         alert("Product submitted");
//       } else {
//         alert("Error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(pic1 , pic2,  pic3 , pic4)
//   console.log(picurl1 , picurl2 , picurl3 ,picurl4);
  
//   return (
//     <>
//       {/* <!-- ========== tab components start ========== --> */}
//       <section class="tab-components">
//         <div class="container-fluid">
//           {/* <!-- ========== title-wrapper start ========== --> */}

//           <div class="title-wrapper pt-30">
//             <div class="row align-items-center">
//               <div class="col-md-6">
//                 <div class="title">
//                   <h2>Add Products</h2>
//                 </div>
//               </div>
//               {/* <!-- end col --> */}
//               <div class="col-md-6">
//                 <div class="breadcrumb-wrapper">
//                   <nav aria-label="breadcrumb">
//                     <ol class="breadcrumb">
//                       <li class="breadcrumb-item">
//                         <a href="#0">Dashboard</a>
//                       </li>
//                       <li class="breadcrumb-item">
//                         <a href="#0">Products</a>
//                       </li>
//                       <li class="breadcrumb-item active" aria-current="page">
//                         Add
//                       </li>
//                     </ol>
//                   </nav>
//                 </div>
//               </div>
//               {/* <!-- end col --> */}
//             </div>
//             {/* <!-- end row --> */}
//           </div>
//           {/* <!-- ========== title-wrapper end ========== --> */}

//           {/* <!-- ========== form-elements-wrapper start ========== --> */}
//           <div class="form-elements-wrapper">
//             <div class="row">
//               <div class="col-lg-6">
//                 {/* <!-- input style start --> */}
//                 <div class="card-style mb-30">
//                   <h6 class="mb-25"></h6>
//                   <div class="input-style-1">
//                     <label>Product Name</label>
//                     <input
//                       type="text"
//                       placeholder="Product Name"
//                       onChange={(e) => setproductname(e.target.value)}
//                     />
//                   </div>
//                   {/* <!-- end input --> */}
//                 </div>
//                 {/* <!-- end card --> */}
//                 {/* <!-- ======= input style end ======= --> */}

//                 <div class="card-style mb-30">
//                   <h6 class="mb-25"></h6>

//                   <div className="select-style-1">
//                     <label>Maincategory</label>
//                     <div className="select-position">
//                       <select
//                         value={selectedmaincategory}
//                         onChange={(e) =>
//                           setselectedmaincategory(e.target.value)
//                         }
//                       >
//                         <option value="">Select category</option>
//                         {mainloading ? (
//                           <option>Loading...</option> // Show loading message while fetching
//                         ) : maincategories.length > 0 ? (
//                           maincategories.map((maincategory) => (
//                             <option
//                               key={maincategory._id}
//                               value={maincategory._id}
//                             >
//                               {maincategory.maincategory}
//                             </option>
//                           ))
//                         ) : (
//                           <option>No categories available</option> // Handle case if no categories
//                         )}
//                       </select>
//                     </div>
//                     <br />
//                   </div>

//                   <div className="select-style-1">
//                     <label>Category</label>
//                     <div className="select-position">
//                       <select
//                         disabled={!selectedmaincategory}
//                         value={selectedCategory}
//                         onChange={(e) =>{                          
//                           setSelectedCategory(e.target.value)
//                         }
//                         }
//                       >
//                         <option value="">Select category</option>
//                         {loading ? (
//                           <option>Loading...</option> // Show loading message while fetching
//                         ) : filteredCategories.length > 0 ? (
//                           filteredCategories.map((category) => (
//                             <option key={category._id} value={category._id}>
//                               {category.title}
//                             </option>
//                           ))
//                         ) : (
//                           <option>No categories available</option> // Handle case if no categories
//                         )}
//                       </select>
//                     </div>
//                     <br />
//                   </div>

//                   <div class="select-style-1">
//                     <label>Subcategory</label>
//                     <div class="select-position">
//                       <select
//                         disabled={!selectedCategory}
//                         value={selectedsubcategory}
//                         onChange={(e) => setselectedsubcategory(e.target.value)}
//                       >
//                         <option value="">Select subcategory</option>
//                         {loading1 ? (
//                           <option>Loading...</option> // Show loading message while fetching
//                         ) : filteredSubcategories.length > 0 ? (
//                           filteredSubcategories.map((subcategory) => (
//                             <option
//                               key={subcategory._id}
//                               value={subcategory._id}
//                             >
//                               {subcategory.subcategoryname}
//                             </option>
//                           ))
//                         ) : (
//                           <option>No categories available</option> // Handle case if no categories
//                         )}
//                       </select>
//                     </div>
//                     <br />
//                   </div>
//                   <div class="select-style-1">
//                     <label>Brand</label>
//                     <div class="select-position">
//                       <select
//                         value={selectedbrand}
//                         onChange={(e) => setSelectedbrand(e.target.value)}
//                       >
//                         <option value="">Select category</option>
//                         {loading3 ? (
//                           <option>Loading...</option> // Show loading message while fetching
//                         ) : brand.length > 0 ? (
//                           brand.map((brand) => (
//                             <option key={brand._id} value={brand._id}>
//                               {brand.brandname}
//                             </option>
//                           ))
//                         ) : (
//                           <option>No categories available</option> // Handle case if no categories
//                         )}
//                       </select>
//                     </div>
//                     <br />
//                   </div>
//                   <div class="select-style-1">
//                     <label>Tag</label>
//                     <div class="select-position">
//                       <select
//                         value={selectedtag}
//                         onChange={(e) => setSelectedtag(e.target.value)}
//                       >
//                         <option value="">Select category</option>
//                         {loading2 ? (
//                           <option>Loading...</option> // Show loading message while fetching
//                         ) : tag.length > 0 ? (
//                           tag.map((tag) => (
//                             <option key={tag._id} value={tag._id}>
//                               {tag.tagname}
//                             </option>
//                           ))
//                         ) : (
//                           <option>No categories available</option> // Handle case if no categories
//                         )}
//                       </select>
//                     </div>
//                     <br />
//                   </div>
//                 </div>

//                 {/* <!-- ======= select style start ======= --> */}
//                 <div class="card-style mb-30">
//                   <h6 class="mb-25"></h6>
//                   <div class="select-style-1">
//                     <label>Size</label>
//                     <div class="select-position">
//                       <select onChange={(e) => setsize(e.target.value)}>
//                         <option value="">Select Size</option>
//                         <option value="one"> one</option>
//                         <option value="two"> two</option>
//                         <option value="three"> three</option>
//                       </select>
//                     </div>
//                     <br />
//                     <div class="input-style-1">
//                       <label>MRP</label>
//                       <input
//                         type="text"
//                         placeholder="MRP"
//                         onChange={(e) => setmrp(e.target.value)}
//                       />
//                     </div>
//                     <div class="input-style-1">
//                       <label>Discount</label>
//                       <input
//                         type="text"
//                         placeholder="Discount"
//                         onChange={(e) => setdiscount(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   {/* <!-- end select --> */}
//                   {/* <div class="select-style-2">
//                     <div class="select-position">
//                       <select>
//                         <option value="">Select category</option>
//                         <option value="">Category one</option>
//                         <option value="">Category two</option>
//                         <option value="">Category three</option>
//                       </select>
//                     </div>
//                   </div> */}
//                   {/* <!-- end select --> */}
//                 </div>
//                 {/* <!-- end card --> */}
//                 {/* <!-- ======= select style end ======= --> */}

//                 {/* <!-- ======= select style start ======= --> */}
//                 {/* <div class="card-style mb-30">
//                   <h6 class="mb-25">Time and Date</h6>
//                   <div class="input-style-1">
//                     <label>Date</label>
//                     <input type="date" />
//                   </div> */}
//                 {/* <!-- end input --> */}
//                 {/* <div class="input-style-2">
//                   <label>Time</label>
//                     <input type="time" />
//                   </div> */}
//                 {/* <!-- end input --> */}
//                 {/* </div> */}
//                 {/* <!-- end card --> */}
//                 {/* <!-- ======= input style end ======= --> */}

//                 {/* <!-- ======= input switch style start ======= --> */}
//                 {/* <div class="card-style mb-30">
//                   <h6 class="mb-25">Toggle switch input</h6>
//                   <div class="form-check form-switch toggle-switch mb-30">
//                     <input class="form-check-input" type="checkbox" id="toggleSwitch1" />
//                     <label class="form-check-label" for="toggleSwitch1">Default switch checkbox input</label>
//                   </div>
//                   <div class="form-check form-switch toggle-switch">
//                     <input class="form-check-input" type="checkbox" id="toggleSwitch2" checked />
//                     <label class="form-check-label" for="toggleSwitch2">Default switch checkbox input</label>
//                   </div>
//                 </div> */}
//                 <div class="card-style mb-30">
//                   <h6 class="mb-25"></h6>
//                   <div class="input-style-1">
//                     <label>Item Weight</label>
//                     <input
//                       type="text"
//                       placeholder="Item Weight"
//                       onChange={(e) => setitemweight(e.target.value)}
//                     />
//                   </div>
//                   <div class="input-style-1">
//                     <label>Net quantity</label>
//                     <input
//                       type="text"
//                       placeholder="Net quantity"
//                       onChange={(e) => setnetquantity(e.target.value)}
//                     />
//                   </div>
//                   <div class="input-style-1">
//                     <label>Item Dimensions</label>
//                     <input
//                       type="text"
//                       placeholder="Item Dimensions"
//                       onChange={(e) => setitemdimension(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 {/* <!-- ======= input switch style end ======= --> */}
//               </div>
//               {/* <!-- end col --> */}
//               <div class="col-lg-6">
//                 {/* <!-- ======= textarea style start ======= --> */}
//                 <div class="card-style mb-30">
//                   <h6 class="mb-25">Description</h6>
//                   <div class="input-style-1">
//                     <label>Short Description</label>
//                     <textarea
//                       placeholder="Short description"
//                       rows="5"
//                       onChange={(e) => setshortdescription(e.target.value)}
//                     ></textarea>
//                   </div>
//                   {/* <!-- end textarea --> */}
//                   <h6 class="mb-25">Description</h6>
//                   <div class="input-style-1">
//                     <textarea
//                       placeholder="Description"
//                       rows="5"
//                       onChange={(e) => setlongdescription(e.target.value)}
//                     ></textarea>
//                   </div>
//                   <div class="input-style-1">
//                     <label>Generic Name</label>
//                     <input
//                       type="text"
//                       placeholder="Generic Name"
//                       onChange={(e) => setgenericname(e.target.value)}
//                     />
//                   </div>
//                   <div class="input-style-1">
//                     <label>Manufacturer</label>
//                     <input
//                       type="text"
//                       placeholder="Manufacturer"
//                       onChange={(e) => setmanufacturer(e.target.value)}
//                     />
//                   </div>
//                   <div class="input-style-1">
//                     <label>Packer</label>
//                     <input
//                       type="text"
//                       placeholder="Packer"
//                       onChange={(e) => setpacker(e.target.value)}
//                     />
//                   </div>
                 
//                 </div>
                 
//                 {/* <!-- ======= radio style end ======= --> */}
//                 <div class="card-style mb-30">
//                   <h6 class="mb-25">pictures </h6>
//                   <div class="input-style-1">
//                     <label>Picture 1</label>
//                     <input
//                       type="file"
//                       placeholder=""
//                       onChange={handlepicture1}
//                     />
//                   </div>
//                   <div class="input-style-1">
//                     <label>Picture 2</label>
//                     <input
//                       type="file"
//                       placeholder=""
//                       onChange={handlepicture2}
//                     />
//                   </div>
//                   <div class="input-style-1">
//                     <label>Picture 3</label>
//                     <input
//                       type="file"
//                       placeholder=""
//                       onChange={handlepicture3}
//                     />
//                   </div>
//                   <div class="input-style-1">
//                     <label>Picture 4</label>
//                     <input
//                       type="file"
//                       placeholder=""
//                       onChange={handlepicture4}
//                     />
//                   </div>
//                 </div>
//               </div>
//               {/* <!-- end col --> */}
//             </div>
//             {/* <!-- end row --> */}
//           </div>
//           <div class="card-style mb-30">
//             <ul class="buttons-group">
//               <li>
//                 <button
//                   href="#0"
//                   class="main-btn active-btn-outline square-btn btn-hover form-control"
//                   onClick={handlesubmit}
//                 >
//                   Submit
//                 </button>
//               </li>
//             </ul>
//           </div>
//           {/* <!-- ========== form-elements-wrapper end ========== --> */}
//         </div>

//         {/* <!-- end container --> */}
//       </section>
//       {/* <!-- ========== tab components end ========== --> */}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";

export default function ProductAdd() {
  // Product form data states
  const [productData, setProductData] = useState({
    productname: "",
    shortdescription: "",
    longdescription: "",
    genericname: "",
    manufacturer: "",
    packer: "",
    size: "",
    mrp: "",
    itemweight: "",
    netquantity: "",
    discount: "",
    itemdimension: "",
  });

  // Selection states
  const [selections, setSelections] = useState({
    selectedmaincategory: "",
    selectedCategory: "",
    selectedsubcategory: "",
    selectedbrand: "",
    selectedtag: "",
  });

  // Image states
  const [images, setImages] = useState({
    pic1: "",
    picurl1: "",
    pic2: "",
    picurl2: "",
    pic3: "",
    picurl3: "",
    pic4: "",
    picurl4: "",
  });

  // Data states
  const [data, setData] = useState({
    maincategories: [],
    categories: [],
    subcategory: [],
    brand: [],
    tag: [],
  });

  // Loading states
  const [loading, setLoading] = useState({
    main: true,
    categories: true,
    subcategories: true,
    brands: true,
    tags: true,
  });

  // Filtered data states
  const [filtered, setFiltered] = useState({
    categories: [],
    subcategories: [],
  });

  // Fetch main categories
  useEffect(() => {
    fetch("http://localhost:8000/api/maincategory")
      .then((response) => response.json())
      .then((result) => {
        setData(prev => ({ ...prev, maincategories: result }));
        setLoading(prev => ({ ...prev, main: false }));
      })
      .catch((error) => {
        console.error("Error fetching main categories:", error);
        setLoading(prev => ({ ...prev, main: false }));
      });
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then((response) => response.json())
      .then((result) => {
        setData(prev => ({ ...prev, categories: result }));
        setLoading(prev => ({ ...prev, categories: false }));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(prev => ({ ...prev, categories: false }));
      });
  }, []);

  // Fetch subcategories
  useEffect(() => {
    fetch("http://localhost:8000/api/subcategoriesunique")
      .then((response) => response.json())
      .then((result) => {
        setData(prev => ({ ...prev, subcategory: result }));
        setLoading(prev => ({ ...prev, subcategories: false }));
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
        setLoading(prev => ({ ...prev, subcategories: false }));
      });
  }, []);

  // Fetch tags
  useEffect(() => {
    fetch("http://localhost:8000/api/tags")
      .then((response) => response.json())
      .then((result) => {
        setData(prev => ({ ...prev, tag: result }));
        setLoading(prev => ({ ...prev, tags: false }));
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        setLoading(prev => ({ ...prev, tags: false }));
      });
  }, []);

  // Fetch brands based on selected category
  useEffect(() => {
    if (selections.selectedCategory) {
      fetch("http://localhost:8000/api/brands")
        .then((response) => response.json())
        .then((result) => {
          const filteredData = result.filter(
            (brand) => brand.category._id === selections.selectedCategory
          );
          setData(prev => ({ ...prev, brand: filteredData }));
          setLoading(prev => ({ ...prev, brands: false }));
        })
        .catch((error) => {
          console.error("Error fetching brands:", error);
          setLoading(prev => ({ ...prev, brands: false }));
        });
    }
  }, [selections.selectedCategory]);

  // Filter categories based on selected main category
  useEffect(() => {
    if (selections.selectedmaincategory) {
      const filteredCategories = data.categories.filter(
        (category) => category.maincategory._id === selections.selectedmaincategory
      );
      setFiltered(prev => ({ ...prev, categories: filteredCategories }));
    } else {
      setFiltered(prev => ({ ...prev, categories: [] }));
    }
  }, [selections.selectedmaincategory, data.categories]);

  // Filter subcategories based on selected category
  useEffect(() => {
    if (selections.selectedCategory) {
      const filteredSubcategories = data.subcategory.filter(
        (subcategory) => subcategory.category === selections.selectedCategory
      );
      setFiltered(prev => ({ ...prev, subcategories: filteredSubcategories }));
    } else {
      setFiltered(prev => ({ ...prev, subcategories: [] }));
    }
  }, [selections.selectedCategory, data.subcategory]);

  // Image upload effects
  useEffect(() => {
    if (images.pic1) handleImageUpload(images.pic1, 1);
  }, [images.pic1]);

  useEffect(() => {
    if (images.pic2) handleImageUpload(images.pic2, 2);
  }, [images.pic2]);

  useEffect(() => {
    if (images.pic3) handleImageUpload(images.pic3, 3);
  }, [images.pic3]);

  useEffect(() => {
    if (images.pic4) handleImageUpload(images.pic4, 4);
  }, [images.pic4]);

  // Handle input changes for product data
  const handleProductDataChange = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  // Handle selection changes
  const handleSelectionChange = (field, value) => {
    setSelections(prev => ({ ...prev, [field]: value }));
  };

  // Handle image file selection
  const handleImageChange = (imageNumber, file) => {
    setImages(prev => ({ ...prev, [`pic${imageNumber}`]: file }));
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file, imageNumber) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shopping");
    formData.append("cloud_name", "dezenfhjm");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dezenfhjm/image/upload", {
        method: "post",
        body: formData,
      });
      const data = await response.json();
      setImages(prev => ({ ...prev, [`picurl${imageNumber}`]: data.url }));
    } catch (error) {
      console.error(`Error uploading image ${imageNumber}:`, error);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formData = {
      ...productData,
      maincategory : selections.selectedmaincategory , 
      category : selections.selectedCategory,
      subcategory: selections.selectedsubcategory,
      brand: selections.selectedbrand,
      tag: selections.selectedtag,
      pic1: images.picurl1,
      pic2: images.picurl2,
      pic3: images.picurl3,
      pic4: images.picurl4,
    };

    try {
      const response = await fetch("http://localhost:8000/api/insertproduct", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Product submitted successfully!");
        // Reset form
        setProductData({
          productname: "",
          shortdescription: "",
          longdescription: "",
          genericname: "",
          manufacturer: "",
          packer: "",
          size: "",
          mrp: "",
          itemweight: "",
          netquantity: "",
          discount: "",
          itemdimension: "",
        });
        setSelections({
          selectedmaincategory: "",
          selectedCategory: "",
          selectedsubcategory: "",
          selectedbrand: "",
          selectedtag: "",
        });
        setImages({
          pic1: "",
          picurl1: "",
          pic2: "",
          picurl2: "",
          pic3: "",
          picurl3: "",
          pic4: "",
          picurl4: "",
        });
      } else {
        alert("Error submitting product");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting product");
    }
  };

  return (
    <section className="tab-components">
      <div className="container-fluid">
        {/* Title Section */}
        <div className="title-wrapper pt-30">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="title">
                <h2>Add Products</h2>
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
                      <a href="#0">Products</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Add
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-elements-wrapper">
          <div className="row">
            <div className="col-lg-6">
              {/* Product Name */}
              <div className="card-style mb-30">
                <div className="input-style-1">
                  <label>Product Name</label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={productData.productname}
                    onChange={(e) => handleProductDataChange('productname', e.target.value)}
                  />
                </div>
              </div>

              {/* Categories Selection */}
              <div className="card-style mb-30">
                {/* Main Category */}
                <div className="select-style-1">
                  <label>Main Category</label>
                  <div className="select-position">
                    <select
                      value={selections.selectedmaincategory}
                      onChange={(e) => handleSelectionChange('selectedmaincategory', e.target.value)}
                    >
                      <option value="">Select main category</option>
                      {loading.main ? (
                        <option>Loading...</option>
                      ) : data.maincategories.length > 0 ? (
                        data.maincategories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.maincategory}
                          </option>
                        ))
                      ) : (
                        <option>No categories available</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div className="select-style-1">
                  <label>Category</label>
                  <div className="select-position">
                    <select
                      disabled={!selections.selectedmaincategory}
                      value={selections.selectedCategory}
                      onChange={(e) => handleSelectionChange('selectedCategory', e.target.value)}
                    >
                      <option value="">Select category</option>
                      {loading.categories ? (
                        <option>Loading...</option>
                      ) : filtered.categories.length > 0 ? (
                        filtered.categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.title}
                          </option>
                        ))
                      ) : (
                        <option>No categories available</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Subcategory */}
                <div className="select-style-1">
                  <label>Subcategory</label>
                  <div className="select-position">
                    <select
                      disabled={!selections.selectedCategory}
                      value={selections.selectedsubcategory}
                      onChange={(e) => handleSelectionChange('selectedsubcategory', e.target.value)}
                    >
                      <option value="">Select subcategory</option>
                      {loading.subcategories ? (
                        <option>Loading...</option>
                      ) : filtered.subcategories.length > 0 ? (
                        filtered.subcategories.map((subcategory) => (
                          <option key={subcategory._id} value={subcategory._id}>
                            {subcategory.subcategoryname}
                          </option>
                        ))
                      ) : (
                        <option>No subcategories available</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Brand */}
                <div className="select-style-1">
                  <label>Brand</label>
                  <div className="select-position">
                    <select
                      value={selections.selectedbrand}
                      onChange={(e) => handleSelectionChange('selectedbrand', e.target.value)}
                    >
                      <option value="">Select brand</option>
                      {loading.brands ? (
                        <option>Loading...</option>
                      ) : data.brand.length > 0 ? (
                        data.brand.map((brand) => (
                          <option key={brand._id} value={brand._id}>
                            {brand.brandname}
                          </option>
                        ))
                      ) : (
                        <option>No brands available</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Tag */}
                <div className="select-style-1">
                  <label>Tag</label>
                  <div className="select-position">
                    <select
                      value={selections.selectedtag}
                      onChange={(e) => handleSelectionChange('selectedtag', e.target.value)}
                    >
                      <option value="">Select tag</option>
                      {loading.tags ? (
                        <option>Loading...</option>
                      ) : data.tag.length > 0 ? (
                        data.tag.map((tag) => (
                          <option key={tag._id} value={tag._id}>
                            {tag.tagname}
                          </option>
                        ))
                      ) : (
                        <option>No tags available</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Size, MRP, Discount */}
              <div className="card-style mb-30">
                <div className="select-style-1">
                  <label>Size</label>
                  <div className="select-position">
                    <select
                      value={productData.size}
                      onChange={(e) => handleProductDataChange('size', e.target.value)}
                    >
                      <option value="">Select Size</option>
                      <option value="one">One</option>
                      <option value="two">Two</option>
                      <option value="three">Three</option>
                    </select>
                  </div>
                </div>

                <div className="input-style-1">
                  <label>MRP</label>
                  <input
                    type="text"
                    placeholder="MRP"
                    value={productData.mrp}
                    onChange={(e) => handleProductDataChange('mrp', e.target.value)}
                  />
                </div>

                <div className="input-style-1">
                  <label>Discount</label>
                  <input
                    type="text"
                    placeholder="Discount"
                    value={productData.discount}
                    onChange={(e) => handleProductDataChange('discount', e.target.value)}
                  />
                </div>
              </div>

              {/* Item Details */}
              <div className="card-style mb-30">
                <div className="input-style-1">
                  <label>Item Weight</label>
                  <input
                    type="text"
                    placeholder="Item Weight"
                    value={productData.itemweight}
                    onChange={(e) => handleProductDataChange('itemweight', e.target.value)}
                  />
                </div>

                <div className="input-style-1">
                  <label>Net Quantity</label>
                  <input
                    type="text"
                    placeholder="Net Quantity"
                    value={productData.netquantity}
                    onChange={(e) => handleProductDataChange('netquantity', e.target.value)}
                  />
                </div>

                <div className="input-style-1">
                  <label>Item Dimensions</label>
                  <input
                    type="text"
                    placeholder="Item Dimensions"
                    value={productData.itemdimension}
                    onChange={(e) => handleProductDataChange('itemdimension', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-6">
              {/* Descriptions */}
              <div className="card-style mb-30">
                <h6 className="mb-25">Description</h6>
                <div className="input-style-1">
                  <label>Short Description</label>
                  <textarea
                    placeholder="Short description"
                    rows="5"
                    value={productData.shortdescription}
                    onChange={(e) => handleProductDataChange('shortdescription', e.target.value)}
                  />
                </div>

                <div className="input-style-1">
                  <label>Long Description</label>
                  <textarea
                    placeholder="Long description"
                    rows="5"
                    value={productData.longdescription}
                    onChange={(e) => handleProductDataChange('longdescription', e.target.value)}
                  />
                </div>

                <div className="input-style-1">
                  <label>Generic Name</label>
                  <input
                    type="text"
                    placeholder="Generic Name"
                    value={productData.genericname}
                    onChange={(e) => handleProductDataChange('genericname', e.target.value)}
                  />
                </div>

                <div className="input-style-1">
                  <label>Manufacturer</label>
                  <input
                    type="text"
                    placeholder="Manufacturer"
                    value={productData.manufacturer}
                    onChange={(e) => handleProductDataChange('manufacturer', e.target.value)}
                  />
                </div>

                <div className="input-style-1">
                  <label>Packer</label>
                  <input
                    type="text"
                    placeholder="Packer"
                    value={productData.packer}
                    onChange={(e) => handleProductDataChange('packer', e.target.value)}
                  />
                </div>
              </div>

              {/* Image Uploads */}
              <div className="card-style mb-30">
                <h6 className="mb-25">Pictures</h6>
                {[1, 2, 3, 4,].map((num) => (
                  <div key={num} className="input-style-1">
                    <label>Picture {num}</label>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(num, e.target.files[0])}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
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
  );
}