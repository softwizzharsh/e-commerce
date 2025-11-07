import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
function Brand() {
  const [swiperInstance1, setSwiperInstance1] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/brands")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  console.log(items)

  return (
    <>
      <section class="py-5 overflow-hidden">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="section-header d-flex flex-wrap flex-wrap justify-content-between mb-5">
                <h2 class="section-title">Newly Arrived Brands</h2>
                <div class="d-flex align-items-center">
                  <a href="#" class="btn-link text-decoration-none">
                    View All Categories →
                  </a>
                  <div class="swiper-buttons">
                    <button
                      class="swiper-prev brand-carousel-prev btn btn-yellow"
                      onClick={() => swiperInstance1?.slidePrev()}
                    >
                      ❮
                    </button>
                    <button
                      class="swiper-next brand-carousel-next btn btn-yellow"
                      onClick={() => swiperInstance1?.slideNext()}
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
              <div class="brand-carousel swiper">
                {/* <div class="swiper-wrapper"> */}
                <Swiper
                  spaceBetween={10}
                  slidesPerView={4}
                  loop={true}
                  onSwiper={setSwiperInstance1} // Set the Swiper instance when it's initialized
                  style={{ "--swiper-pagination-color": "#fff" }}
                >
                  {items.map(({brandname , category , _id}) => {
                    return (
                      <SwiperSlide key={_id}>
                        <Link to={`/product/${_id}?isName=brand`}>
                        <div class="card mb-3 p-3 rounded-4 shadow border-0">
                          <div class="row g-0">
                            <div class="col-md-4">
                              <img
                                src={category.pic1}
                                class="img-fluid rounded"
                                alt="Card title"
                              />
                            </div>
                            <div class="col-md-8">
                              <div class="card-body py-0">
                                <p class="text-muted mb-0">{brandname}</p>
                                <h5 class="card-title">
                                  Honey best nectar you wish to get
                                  helll 
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        </Link>

                      </SwiperSlide>
                    );
                  })}
                  {/* </div> */}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Brand;
