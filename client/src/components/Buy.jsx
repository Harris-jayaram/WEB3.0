import { ethers } from "ethers";
import "./Buy.css";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const appointmentTime = document.querySelector("#appointment-time").value; // Get the appointment time input value
    const amount = { value: ethers.utils.parseEther("0.0001") };

    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();

    // Display the appointment time in the console
    alert("Appointment Time:", appointmentTime);

    alert("Appointment is Booked");
    window.location.reload();
  };

  return (
    <div className="center">
      <h1>Book Your Doctor</h1>
      <form onSubmit={buyChai}>
        <div className="inputbox">
          <input type="text" required="required" id="name" />
          <span>Patient's Name</span>
        </div>
        <div className="inputbox">
          <input type="text" required="required" id="message" />
          <span>Patient Details</span>
        </div>
        <div className="inputbox">
          <input type="datetime-local" required="required" id="appointment-time" />
        </div>
        <div className="inputbox">
          <input type="submit" value="Make An Appointment" disabled={!state.contract} />
        </div>
      </form>
    </div>
  );
};

export default Buy;
