import React, { useEffect } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import BusinessForm from "../components/BusinessForm";
import fetch from "isomorphic-unfetch";
import { withRouter } from "next/router";

const Home = ({ businesses, router, authenticated, user }) => {
  useEffect(() => {
    console.log("businesses", businesses, user);
    if (!authenticated) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <BusinessForm />

      <div className="hero">
        <h1 className="title">Businesses</h1>
        <p className="description">Pin Latino</p>
        {businesses.map(b => {
          return <div>{b.name}</div>;
        })}
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

Home.getInitialProps = async () => {
  try {
    const user = await fetch("/api/getuser");
    const response = await fetch("/api/businesses");
    console.log("response", response);
    const businesses = await response.json();

    return { businesses, authenticated: true, user };
  } catch (e) {
    return { authenticated: false };
  }
};

export default withRouter(Home);
