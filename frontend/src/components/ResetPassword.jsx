import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../slices/apiSlice";
import Loader from "../components/Loader";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword({ token, newPassword }).unwrap();
      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="resetPasswordContainer">
      <div className="resetPasswordTitle">
        <h2>Reset Password</h2>
      </div>
 
        <form onSubmit={handleSubmit} className="resetPasswordForm">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div>
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </div>
   
  );
};

export default ResetPassword;
