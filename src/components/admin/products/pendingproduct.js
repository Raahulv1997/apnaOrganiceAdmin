import React, { useState } from "react";
import Input from "../common/input";
import { AiOutlineCloudUpload,AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Badge } from "react-bootstrap";



const Pendingproduct = () => {
  
  const columns = [
    {
      name: "Sku",
      selector: (row) => (
        <p>
          {row.sku}
        </p>
      ),
      sortable: true,
      width: "100px",
      center: true,
    },
    {
      name: "#",
      width: "120px",
      center: true,
      cell: (row) => (
        <img
          height="90px"
          width="75px"
          alt={row.name}
          src={
            "https://images.pexels.com/photos/12547195/pexels-photo-12547195.jpeg?cs=srgb&dl=pexels-fidan-nazim-qizi-12547195.jpg&fm=jpg"
          }
          style={{
            borderRadius: 15,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "right",
          }}
          onClick={handleClick}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row.pname,
      sortable: true,
      width: "250px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "170px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    // {
    //   name: "Gst",
    //   selector: (row) => row.gst,
    //   sortable: true,
    //   width: "90px",
    //   center: true,
    //   style: {
    //     paddingLeft: "0px",
    //   },
    // },
  
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
  
    {
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Status",
      selector: (row) => (
        <h5 className="p-0">
        <Badge  bg= {row.status === "Selling"
        ?"success"  : row.status === "Sold out"
              ? "danger" : null}>{row.status}</Badge>
       </h5>
      ),
      sortable: true,
      width: "115px",
      // center: true,
    },
    {
      name: "Action",
      width: "110px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <AiOutlineEdit className=" p-0 m-0  editiconn text-info" />
          <BsTrash className=" p-0 m-0 editiconn text-danger" />
        </div>
      ),
    },
  ];
  
  const data = [
    {
      id: 1,
      sku: "9AF4FE",
      pname: (
        <div className="productdescbox">
          <b>
            <p className="mb-0">Green Leaf Lettuce</p>
          </b>
  
          <p className="productdesc">
            {" "}
            {`The root vegetables include beets, carrots, radishes, sweet potatoes,
            and turnips`}
          </p>
        </div>
      ),
      category: (
        <p className="productdesc">Fruits & Vegetable Fruits & Vegetable</p>
      ),
      price: "$14",
      gst: "10%",
      stock: "15",
      status: "Selling",
      discount: "50%",
    },
    {
      id: 2,
      sku: "9AF4FE",
      pname: (
        <div className="productdescbox">
          <b>
            <p className="mb-0">Green Leaf Lettuce</p>
          </b>
          <p className="productdesc">
            {" "}
            The root vegetables include beets, and turnips
          </p>
        </div>
      ),
      category: "Fruits & Vegetable",
      price: "$14",
      gst: "10%",
      stock: "15",
      status: "Sold out",
      discount: "50%",
    },
  ];
  const handleClick = () => {};
  const onButtonClick = () =>{
    
  }
    return (
        <div>
             <h2>Pending Products</h2>

  {/* search bar */}
  <div className="card mt-3 px-3 ">
      <div className="product_page_searchbox">
        <Input type={"text"} plchldr={"Search by product name"} />
        <Form.Select aria-label="Search by category" className="adminselectbox">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Form.Select aria-label="Search by status" className="adminselectbox">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>

        <MainButton btntext={"Search"} />
      </div>

      {/* upload */}

      <div className="product_page_uploadbox my-4">
        <div className="product_page_uploadbox_one">
          <Input type={"file"} inputclass={"hiddeninput"} />
          <Iconbutton
            btntext={"Upload"}
            btnclass={"button main_outline_button adminmainbutton"}
            Iconname={<AiOutlineCloudUpload />}
          />
        </div>
        <MainButton btntext={"Download"} />
       
      </div>

      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        className={"productlist_table"}
      />
    </div>
    </div>
    );
}

export default Pendingproduct;
