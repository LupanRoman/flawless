import React from "react";

type Props = {};

function InviteMemberForm({}: Props) {
  return (
    <>
      <div>
        <input type="email" placeholder="email" />
        <button>Invite</button>
      </div>
    </>
  );
}

export default InviteMemberForm;
