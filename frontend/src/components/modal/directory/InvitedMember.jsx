import "./InvitedMember.css";
import { useDispatch, useSelector } from "react-redux";
import { setModalId } from "../../../stores/directorySlice";
import { useEffect, useState } from "react";

const InvitedMember = ({ member }) => {
  return (
    <div className="invite-member-container flex flex-wrap">
      <div
        className="invite-member-circle"
        style={{
          backgroundImage: `url(${member.imgUrl})`,
        }}
      ></div>
    </div>
  );
};
export default InvitedMember;
