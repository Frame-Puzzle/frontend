import "./InvitedMember.css";
import { useDispatch, useSelector } from "react-redux";
import { setModalId } from "../../../stores/directorySlice";
import { useEffect, useState } from "react";

import directoryApi from "../../../apis/directoryApi";
import { setMemberList } from "../../../stores/directorySlice";

const InvitedMember = ({ member }) => {
  const createBoard = useSelector((state) => state.createBoard);
  const dispatch = useDispatch();

  const deleteMember = async () => {
    try {
      const data = {
        userId: member.userId,
      };
      const response = await directoryApi.delete(
        `/${createBoard.directoryId}/user`,
        {data}
      );

      fetchDirectory();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const fetchDirectory = async () => {
    const response = await directoryApi.get(`/${createBoard.directoryId}`);
    const data = response.data.data;
  
    dispatch(setMemberList(data.memberList));
  };

  return (
    <div className="invited-member-container flex flex-wrap">
      <div
        className="invited-member-circle"
        style={{
          backgroundImage: member.profileUrl
            ? `url(${member.profileUrl})`
            : `url('https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/profile-default.png')`,
        }}
      ></div>

      <div className="member-details">
        <span>{member.nickname}</span>
        <span className="member-email">{member.email}</span>
      </div>
      {member.accept ? (
        <button className="member-button" disabled>
          멤버
        </button>
      ) : null}
      {!member.accept ? (
        <button onClick={deleteMember}>초대 취소</button>
      ) : null}
    </div>
  );
};

export default InvitedMember;
