import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Link} from "react-router-dom"
import BACKEND_API from "../backendApi"
function SubCategory() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [allSubCategory, setAllSubCategory] = useState([]);
  async function getSubCategory() {
    try {
      const res = await axios.get(`${BACKEND_API}/api/subcategories`);
      setAllSubCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  }
 
  useEffect(() => {
    getSubCategory();
  } , []);
  return (
    <>
      <section class="py-5 overflow-hidden">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="section-header d-flex flex-wrap justify-content-between mb-5">
                <h2 class="section-title">Category</h2>

                <div class="d-flex align-items-center">
                  <a class="btn-link text-decoration-none">
                    View All Categories →
                  </a>
                  <div class="swiper-buttons">
                    <button
                      class="swiper-prev category-carousel-prev btn btn-yellow"
                      onClick={() => swiperInstance?.slidePrev()}
                    >
                      ❮
                    </button>
                    <button
                      class="swiper-next category-carousel-next btn btn-yellow"
                      onClick={() => swiperInstance?.slideNext()}
                    >
                      ❯
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="category-carousel swiper">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={6}
                  loop={true}
                  onSwiper={setSwiperInstance}
                  style={{
                    "--swiper-pagination-color": "#fff",
                  }}
                >
                  {/* <div class="swiper-wrapper"> */}
                  {allSubCategory.map(({subcategoryname , _id , picture , gender}) => {
                    return (
                      <SwiperSlide key={_id}>
                        <Link to={`/product/${_id}?isName=subCategory`} class="nav-link category-item ">
                          <img
                            src={picture}
                            className="w-100 rounded-start-5 rounded-end-5"
                            height={200}
                            alt="Category Thumbnail"
                          />
                          <h3 class="category-title">{subcategoryname}</h3>
                          <p>For : {gender}</p>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SubCategory;
