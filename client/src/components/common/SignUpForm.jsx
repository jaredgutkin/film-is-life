import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/userApi.js";
import { setAuthModalOpen } from "../../redux/features/authModalSlice.jsx";
import { setUser } from "../../redux/features/userSlice.jsx";

const SignUpForm = () => {
  return (
    <div>SignUpForm</div>
  )
}

export default SignUpForm