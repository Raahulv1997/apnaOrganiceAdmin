import React, { useEffect, useState } from "react";
import Input from "./common/input";
import { FaFileInvoiceDollar } from "react-icons/fa";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "../../style/order.css";
import OrderJson from "./json/orders";
import axios from "axios";
import moment from "moment";
import Status from "./json/Status";

function Orders() {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [orderdata, setorderdata] = useState([]);
  const [changstatus, setchangstatus] = useState("");
  const [apicall, setapicall] = useState(false);
  let [condition, setCondition] = useState(false);
  const [searchdata, setsearchData] = useState({
    status: "",
    created_on: "",
  });

  // On selete the status or order limit to search :-
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
  };

  //To search by status and order limit :-
  const onSearchClick = () => {
    setapicall(true);
  };

  //To reset the search feild blank :-
  const OnReset = () => {
    setsearchData({ status: "", created_on: "" });
    setapicall(true);
  };

  //To get the order list :-
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/orders_list`,
        {
          status: searchdata.status,
          created_on: searchdata.created_on,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        setorderdata(response.data);
        setapicall(false);
        setCondition(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apicall, changstatus]);

  const onStatusChange = (e, id) => {
    // e.prevantDefault();
    setchangstatus(e.target.value);
    setCondition(true);
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/order_status_change`,
        {
          status_change: e.target.value,
          id: id,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setapicall(true);
        setCondition(false);
      })
      .catch(function (error) {
        console.log(error);
        setCondition(false);
      });
  };

  // To go on the order details page :-
  const onOrderClick = (id) => {
    localStorage.setItem("orderid", id[0]);
    localStorage.setItem("userid", id[1]);

    navigate("/order_detail");
  };

  // Table data :-
  const columns = [
    {
      name: "Order Id",
      selector: (row) => (
        <p onClick={onOrderClick.bind(this, [row.order_id, row.user_id])}>
          {" "}
          {row.order_id}
        </p>
      ),
      sortable: true,
    },

    {
      name: "Items",
      selector: (row) => (
        <p className="m-0">
          <b>Product ID:</b> {row.product_id}
          <br />
          <b>Quantity:</b> {row.quantity}
        </p>
      ),
      sortable: true,
    },
    {
      name: "price",
      selector: (row) => (
        <p className="m-0">
          <b>MRP :</b>₹ {row.mrp} ({row.discount}%) <br />
          <b>Product Price:</b>₹ {Number(row.taxable_value).toFixed(2)} <br />
          <b>Sale Price:</b> ₹ {Number(row.sale_price).toFixed(2)}
        </p>
      ),
      sortable: true,
    },
    {
      name: "Tax",
      selector: (row) => (
        <p className="m-0">
          <b>GST %:</b> {row.gst}
          <br />
          <b>CGST %:</b> {row.cgst}
          <br />
          <b>SGST %:</b> {row.sgst}
          <br />
        </p>
      ),
      sortable: true,
    },

    {
      name: "Total Ammount",
      selector: (row) => (
        <p className="m-0">
          <b>Sale Price X Quantity</b>
          <br />₹{(Number(row.sale_price) * Number(row.quantity)).toFixed(2)}
          <br />
        </p>
      ),
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => moment(row.created_on).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "Delivery Date",
      selector: (row) => row.delivery_date,
      sortable: true,
    },

    {
      name: "Pyament Mode",
      selector: (row) => row.payment_mode,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.status === "placed"
              ? "badge bg-warning"
              : row.status === "pending"
              ? "badge bg-secondary"
              : row.status === "shipped"
              ? "badge bg-primary"
              : row.status === "delivered"
              ? "badge bg-success"
              : row.status === "packed"
              ? "badge bg-primary"
              : row.status === "cancel"
              ? "badge bg-danger"
              : row.status === "approved"
              ? "badge bg-info"
              : "badge bg-dark"
          }
        >
          {row.status === "placed"
            ? "placed"
            : row.status === "delivered"
            ? "delivered"
            : row.status === "shipped"
            ? "shipped"
            : row.status === "packed"
            ? "packed"
            : row.status === "cancel"
            ? "cancel"
            : row.status === "approved"
            ? "approved"
            : row.status === "pending"
            ? "pending"
            : "return"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) => onStatusChange(e, row.order_id)}
          name="status"
        >
            <option selected={row.product_status === "" ? true : false} value="">
            Select
          </option>
          <option
            value="placed"
<<<<<<< HEAD
            selected={row.product_status === "placed" ? true : false}
=======
            selected={row.status === "placed" ? true : false}
            disabled={condition ? `true` : false}
>>>>>>> de88f84acf0b946e9bbd38956f78aeb9dfefae73
          >
            Placed
          </option>
          <option
            value="pending"
<<<<<<< HEAD
            selected={row.product_status === "pending" ? true : false}
=======
            selected={row.status === "pending" ? true : false}
            disabled={condition ? true : false}
>>>>>>> de88f84acf0b946e9bbd38956f78aeb9dfefae73
          >
            Pending
          </option>
          <option
            value="shipped"
<<<<<<< HEAD
            selected={row.product_status === "shipped" ? true : false}
=======
            selected={row.status === "shipped" ? true : false}
            disabled={condition ? true : false}
>>>>>>> de88f84acf0b946e9bbd38956f78aeb9dfefae73
          >
            Shipped
          </option>
          <option
            value="delivered"
<<<<<<< HEAD
            selected={row.product_status === "delivered" ? true : false}
=======
            selected={row.status === "delivered" ? true : false}
            disabled={condition ? true : false}
>>>>>>> de88f84acf0b946e9bbd38956f78aeb9dfefae73
          >
            Delivered
          </option>
          <option
            value="packed"
<<<<<<< HEAD
            selected={row.product_status === "packed" ? true : false}
=======
            selected={row.status === "packed" ? true : false}
            disabled={condition ? true : false}
>>>>>>> de88f84acf0b946e9bbd38956f78aeb9dfefae73
          >
            Packed
          </option>
          <option
            value="cancel"
<<<<<<< HEAD
            selected={row.product_status === "cancel" ? true : false}
=======
            selected={row.status === "cancel" ? true : false}
            disabled={condition ? true : false}
>>>>>>> de88f84acf0b946e9bbd38956f78aeb9dfefae73
          >
            Cancel
          </option>
          <option
            value="approved"
<<<<<<< HEAD
            selected={row.product_status === "approved" ? true : false}
=======
            selected={row.status === "approved" ? true : false}
            disabled={condition ? true : false}
>>>>>>> de88f84acf0b946e9bbd38956f78aeb9dfefae73
          >
            Approved{" "}
          </option>
          <option
            value="return"
<<<<<<< HEAD
            selected={row.product_status === "return" ? true : false}
=======
            selected={row.status === "return" ? true : false}
            disabled={condition ? true : false}
>>>>>>> de88f84acf0b946e9bbd38956f78aeb9dfefae73
          >
            Return{" "}
          </option>
        </Form.Select>
      ),
      sortable: true,
    },
  ];
console.log("--------==========="+JSON.stringify(orderdata))
  return (
    <div className="App">
      <h2>Orders</h2>
      <div className="card mt-3 px-3 ">
        <div className="product_page_searchbox bg-gray my-4">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by delivery"
                className="adminselectbox"
                onChange={OnSearchChange}
                name="status"
                value={searchdata.status}
              >
                <option>Delivery status</option>
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="packed">Processing</option>
                <option value="return">Return</option>
                <option value="cancel">Cancel</option>
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by delivery_status"
                className="adminselectbox"
                onChange={OnSearchChange}
                name="created_on"
                value={searchdata.created_on}
              >
                <option>Order limits</option>
                <option value="one">Today</option>
                <option value="1">Yesterday</option>
                <option value="15">Last 15 days orders</option>
                <option value="30">Last 30 days orders</option>
                <option value="90">Last 3 month orders</option>
                <option value="180">Last 6 month orders</option>
              </Form.Select>
            </div>
            <div className="col-md-1 col-sm-6 mx-3  ">
              <MainButton btntext={"Search"} onClick={onSearchClick} />
            </div>
            <div className="col-md-1 col-sm-6 mx-3  ">
              <MainButton btntext={"Reset"} onClick={OnReset} />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={orderdata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body order_table"}
        />
      </div>
    </div>
  );
}

export default Orders;
