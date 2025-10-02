import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/admincontext';


function Doctorlist() {
  const { doctors, aToken, getAllDoctors, changeavailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-light">All Doctors</h1>
      <div className="row">
        {doctors.map((item, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div
              className="card h-100"
              style={{
                backgroundColor: '#161b22', 
                border: '1px solid #30363d', 
                color: 'white',
              }}
            >
              
              <div className="card-img-top overflow-hidden" style={{ height: '300px' }}>
                <img
                  src={item.image}
                  alt="doctor-image"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div className="card-body py-2">
                <p className="card-title mb-1 fw-bold">{item.name}</p>
                <p className="card-text mb-2">{item.speciality}</p>
                <div className="form-check">
                  <input onChange={()=>changeavailability(item._id)}
                    className="form-check-input"
                    type="checkbox"
                    checked={item.available}
                    readOnly
                    id={`available-${index}`}
                  />
                  <label className="form-check-label" htmlFor={`available-${index}`}>
                    Available
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctorlist;
