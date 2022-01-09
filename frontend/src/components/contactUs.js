import React from "react";

function ContactUs(){
    return (
        <div class="app-container">
      
      <div class="container my-4">

      
      <form>
          <div class=" container my-4">
<label for="exampleFormControlInput1" class="form-label">Email address</label>
<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div class="container my-4">
<label for="exampleFormControlTextarea1" class="form-label">Your Concern</label>
<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<button class="container my-4 btn btn-primary">Submit</button>
</form></div></div>
    );
}

export default ContactUs;