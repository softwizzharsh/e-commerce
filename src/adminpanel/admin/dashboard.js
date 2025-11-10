import React, { useEffect, useState } from "react";
import { BACKEND_API } from "../../backendApi";
const Dashboard = () => {
  const [counts, setCounts] = useState({
    mainCategory: 0,
    category: 0,
    subCategory: 0,
    product: 0,
    brand: 0,
    tag: 0,
    order: 0,
    coupon: 0,
  });
  const [stat, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    activeCoupons: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllData()
  }, []);
  const fetchAllData = async () => {
    try {
      setLoading(true);
      // Fetch counts
      const countsResponse = await fetch(`${BACKEND_API}/api/counts`);
      const countsData = await countsResponse.json();
      console.log(countsData)
      if (countsData.success) {
        setCounts(countsData.data);
        // Update stats from counts
        setStats({
          totalOrders: countsData.data.order,
          totalProducts: countsData.data.product,
          activeCoupons: countsData.data.coupon,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const stats = [
    {
      label: "Total Orders",
      value: stat.totalOrders,
      icon: "fa-shopping-cart",
      color: "primary",
      
    },
    {
      label: "Total Products",
      value: stat.totalProducts,
     
      icon: "fa-box",
      color: "success",
     
    },
   
    {
      label: "Active Coupons",
      value: stat.activeCoupons,
      icon: "fa-ticket-alt",
      color: "warning",
    
    },
  ];

  const collections = [
    {
      name: "Main Categories",
      count: counts.mainCategory,
      icon: "fa-layer-group",
      route: "maincategory",
      color: "primary",
    },
    {
      name: "Categories",
      count: counts.category,
      icon: "fa-th-large",
      route: "category",
      color: "success",
    },
    {
      name: "Sub Categories",
      count: counts.subCategory,
      icon: "fa-th",
      route: "subcategory",
      color: "info",
    },
    {
      name: "Products",
      count: counts.product,
      icon: "fa-box",
      route: "product",
      color: "warning",
    },
    {
      name: "Brands",
      count: counts.brand,
      icon: "fa-award",
      route: "brand",
      color: "danger",
    },
    {
      name: "Tags",
      count: counts.tag,
      icon: "fa-tags",
      route: "tag",
      color: "secondary",
    },
    {
      name: "Orders",
      count: counts.order,
      icon: "fa-shopping-cart",
      route: "order",
      color: "primary",
    },
    {
      name: "Coupons",
      count: counts.coupon,
      icon: "fa-ticket-alt",
      route: "coupons",
      color: "success",
    },
  ];

  return (
    <>
    

      <style>{`
       
        
        .main-content {
          padding: 30px;
          min-height: 100vh;
        }
       
        .stat-card {
          border-radius: 12px;
          transition: transform 0.2s, box-shadow 0.2s;
          border: none;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        .icon-box {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        .collection-card {
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s;
          height: 100%;
        }
        .collection-card:hover {
          border-color: #0d6efd !important;
          box-shadow: 0 4px 12px rgba(13,110,253,0.2);
          transform: translateY(-3px);
        }
      
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
          }
          .main-content {
            margin-left: 0;
          }
        }
      `}</style>

      <div className="d-flex">
        {/* Main Content */}
        <div className="main-content">
          {/* Header */}
          <div className="mb-4">
            <h2 className="fw-bold">Dashboard Overview</h2>
            <p className="text-muted">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="row g-4 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card stat-card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div
                        className={`icon-box bg-${stat.color} bg-opacity-10 text-${stat.color}`}
                      >
                        <i className={`fas ${stat.icon}`}></i>
                      </div>
                     
                    </div>
                    <h6 className="text-muted mb-1">{stat.label}</h6>
                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Collections Overview */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-4">Collections Overview</h5>
              <div className="row g-3">
                {collections.map((collection, index) => (
                  <div key={index} className="col-6 col-md-4 col-lg-3">
                    <div className="card collection-card border">
                      <div className="card-body">
                        <div
                          className={`icon-box bg-${collection.color} bg-opacity-10 text-${collection.color} mb-3`}
                        >
                          <i className={`fas ${collection.icon}`}></i>
                        </div>
                        <h6 className="fw-semibold mb-1">{collection.name}</h6>
                        <h4 className="fw-bold mb-0">{collection.count}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
