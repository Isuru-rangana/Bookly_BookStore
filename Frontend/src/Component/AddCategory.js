import React, { useState } from "react";
import axios from "axios";

function AddCategory() {
  const [cname, setCname] = useState("");
 
  const [cdescription, setCdescription] = useState("");




  
  

 

  



  const newCategory = {
    cname,
    
    cdescription,
    
  
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      alert("Success");
      await axios.post("http://localhost:9004/categores", newCategory);
    } catch (e) {
      console.log(e);
    }
  };

  return (

    <div>
    <form >

      <h1>Add Category</h1>
        <label >Category name:</label><br />
        <input type="text" id="cname" name="cname" 
         onChange={(e) => setCname(e.target.value)}
        /><br />
       
        <label >Category Description:</label><br />
        <input type="text" id="cdescription" name="cdescription"
         onChange={(e) => setCdescription(e.target.value)}
        /><br /><br />



      
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>






      </div>


  );
}

export default AddCategory;
