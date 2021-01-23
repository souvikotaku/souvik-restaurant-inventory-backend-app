import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Addmodal from "./components/Addmodal";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {


  const[userdata,setUserdata] = useState([])


  useEffect(()=>{

    async function fetchnow(){


      axios.get("http://localhost:5001/products/").then((res) => {
        console.log(res.data);
        setUserdata(res.data);
      })
  
      // const req = await axios.get(
      //   "http://localhost:5000/exercises/"
      // );
    // console.log(req.data)
      // setUsername(req.data[0].username);
      // setDesc(req.data[0].description);

    }
    fetchnow();
  },[])


function clickAdd(){
  let paybox = document.querySelector(".tablediv");

  paybox.style.display = "block";
}

let modal = document.getElementById("myModal");

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  function deleteNow(id){
    let deldata = {
      id:id,
    }

    console.log(deldata);


    if(window.confirm("are you sure you want to delete the message?")){
      axios.delete("http://localhost:5001/products/" + id).then((res) => {
        // console.log(res.data);
        window.location.reload();

      });
    }
  }


  return (
    <div class="mainBody" style={{display:'flex',justifyContent:'center',padding:'4%'}}>
      <br/>
      <div class="tableBody" style={{width:'75%',padding:'15px 15px',borderRadius:'15px'}}>
        <div >
        <button onClick={clickAdd} className="btn btn-lg btn-success">Add+</button><span style={{fontSize:'40px',marginLeft:'26%'}}>Souvik's Eatery</span>

        </div><br/>

      <table style={{border:'solid black 2px'}}>
                      <tr style={{border:'solid black 2px',textAlign:'center'}}>
                        <th style={{border:'solid black 2px', width:'6%'}}>Sr No.</th>
                        <th style={{border:'solid black 2px', width:'14%'}}>Product Name</th>
                        <th style={{border:'solid black 2px', width:'10%'}}>Price per Qty (Gross)</th>
                        <th style={{border:'solid black 2px', width:'6%'}}>VAT</th>
                        <th style={{border:'solid black 2px', width:'10%'}}>Price per Qty (net)</th>
                        <th style={{border:'solid black 2px', width:'8%'}}>Total Stock</th>
                        <th style={{border:'solid black 2px', width:'6%'}}>Product Image</th>
                        <th style={{border:'solid black 2px', width:'9%'}}>Action</th>
                      </tr>
                    
                      {userdata.map((eachdata,index)=>(
                        <tr style={{border:'solid black 2px',textAlign:'center'}}>
                          <td style={{border:'solid black 2px'}}>{index+1}</td>
                          <td style={{border:'solid black 2px'}}>{eachdata.productName}</td>
                          <td style={{border:'solid black 2px'}}>{eachdata.price_gross}$</td>
                          <td style={{border:'solid black 2px'}}>{eachdata.vat}%</td>
                          <td style={{border:'solid black 2px'}}>{eachdata.price_net}$</td>
                          <td style={{border:'solid black 2px'}}>{eachdata.total_stock}</td>
                          <td style={{border:'solid black 2px'}}>
                            
                            <a href={`http://localhost:5001/${eachdata.productImage}`} target='_blank'>
                            <img class="piclink" src={`http://localhost:5001/${eachdata.productImage}`} style={{width:'80%',padding:'2px 2px'}}/>
                            </a>
                           
                          </td>
                          <td>
                            <button className="btn btn-sm btn-danger" onClick={()=>{
                               deleteNow(eachdata._id)
                            }}
                            style={{marginRight:'4%'}}
                            >Delete</button>

                            <button className="btn btn-sm btn-info" >Edit</button>
                          </td>
                        </tr>
                      ))}
                     
      </table>
      <p style={{opacity:'50%'}}>Made by Souvik Das in 2021</p> 
      </div>
          
      <div id="myModal" class="modal tablediv" style={{display: 'none'}}>
      <Addmodal />
      </div>
    </div>
  );
}

export default App;