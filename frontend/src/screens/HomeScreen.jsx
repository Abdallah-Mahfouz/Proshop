//import { useEffect, useState } from "react";
// 1-Useffect hook to fetch our data.
//2- use state because the products are going to be part of our state
//3-Later on we're going to be using Redux.
//fetch everything from Redux and pass it down into the components that need it
// import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Product from "../component/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../component/loader";
import Message from "../component/Message";
import Paginate from "../component/Paginate";
import ProductCarousel from "../component/ProductCarousel";
import Meta from "../component/Meta";

//----------------------------------------------------------------
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
