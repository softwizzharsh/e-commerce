import React from "react";
import { useState,useEffect, useRef } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";

export default function Subcategoryview()
{
  const tableRef = useRef(null);

  const [items, setItems] = useState([]);
 
    useEffect(() => {
      fetch('http://localhost:8000/api/subcategories')
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(err => console.error("Error fetching data: ", err));
       
    }, []);
    useEffect(() => {
      // Initialize DataTable after items are updated
      if (items.length > 0 && tableRef.current) {
        const table = $(tableRef.current).DataTable(); // Initialize DataTable
 
        return () => {
          // Destroy DataTable when component unmounts or items change
          if ($.fn.DataTable.isDataTable(tableRef.current)) {
            table.destroy();
          }
        };
      }
    }, [items]); // Re-run this effect whenever `items` changes

    async function deleteview(id){
      const formdata=JSON.stringify({
        id:id,
      });
   
     
      try{
        const response=await fetch("http://localhost:8000/api/deletesubcategory",{
          headers:{'Content-type':'application/json'},
          method:'POST',
          body:formdata,
        }
        )
        if(response.ok){
          alert('Form deleted')
          setTimeout(()=>{
            window.location.reload();
          },1000 );
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
         <section class="section">
         <div class="container-fluid">
                <div className="card-style mb-30">
                  <h6 className="mb-10"> Sub Category View</h6>
                  {/* <p className="text-sm mb-20">
                    For basic styling—light padding and only horizontal
                    dividers—use the className table.
                  </p> */}
                  <div className="table-wrapper table-responsive">
                    <table id="example" ref={tableRef} className="table table-striped">
                      <thead>
                        <tr>
                          <th>
                            <h6 className="text-center">S.no</h6>
                          </th>
                          <th>
                            <h6>Title</h6>
                          </th>
                          <th>
                            <h6>Main Category</h6>
                          </th>
                          <th>
                            <h6> Category</h6>
                          </th>
                          <th>
                            <h6>Picture</h6>
                          </th>
                          <th>
                            <h6>Gender</h6>
                          </th>

                          <th>
                            <h6>Action</h6>
                          </th>
                          <th>
                            <h6>Update</h6>
                          </th>
                        </tr>
                        {/* <!-- end table row--> */}
                      </thead>
                      <tbody>
                        
          {items.map((item , index) => (
            <tr key={item._id}>
              <td className="text-center">{index + 1}</td>
              <td>{item.subcategoryname}</td>
                <td>{item.maincategory.maincategory}</td>
                <td>{item.category.title}</td>
                <td><img src={item.picture} height={100}/></td>
                <td>{item.gender}</td>
                {/* <td>{item.email}</td>
                <td>{item.phonenumber}</td>
                <td>{item.message}</td> */}
                <td><button className="btn text-danger" onClick={()=>deleteview(item._id)}><i class="lni lni-trash-can"></i></button>
                </td>
                <td><Link to={`/admin/subcategoryupdate/${item._id}`}><button className="btn border-dark" > UPDATE  </button></Link> </td> 
            </tr>
          ))}
          </tbody>
                    </table>
                    {/* <!-- end table --> */}
                  </div>
                  </div>
                  </div>
                  </section>
                
                {/* <!-- end card --> */}
              
        </>
    )
}