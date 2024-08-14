import React from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Meeting number #{params.id}</h1>
    </div>
  );
};

export default Meeting;
