import React, { useState, useEffect } from "react";
import DiningDataService from "../services/dining";
import { Link } from "react-router-dom";

const Dining = props => {
  const initialDiningState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [dining, setDining] = useState(initialDiningState);

  const getDining = id => {
    DiningDataService.get(id)
      .then(response => {
        setDining(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDining(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    DiningDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setDining((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {dining ? (
        <div>
          <h5>{dining.name}</h5>
          <p>
            <strong>Cuisine: </strong>{dining.cuisine}<br/>
            <strong>Address: </strong>{dining.address.building} {dining.address.street}, {dining.address.zipcode}
          </p>
          <Link to={"/dinings/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {dining.reviews.length > 0 ? (
             dining.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/dinings/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No dining selected.</p>
        </div>
      )}
    </div>
  );
};

export default Dining;