const AddressCard = ({ address }) => {
  return (
    <div className="addressCard">
      <h2>{address.name}</h2>
      <p>{address.street}</p>
      <p>{address.city}</p>
      <p>{address.state}</p>
      <p>{address.country}</p>
      <p>+91 {address.mobile}</p>
    </div>
  );
};

export { AddressCard };
