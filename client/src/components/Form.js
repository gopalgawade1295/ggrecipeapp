import { TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { modeContext } from "../App";
import { FormBox, FormSpan } from "../assets/styles/FormStyles";
import { Button1, Title } from "../assets/styles/CommonStyles";
import { useForm } from "react-hook-form";

const Form = () => {
    const mode = useContext(modeContext);

    const {
        register,
        trigger,
        formState: { errors },
    } = useForm();

    const onSubmit = async (e) => {
        const isValid = await trigger();
        if (!isValid) {
            e.preventDefault();
        }
    };

    return (
        <div
            style={{
                backgroundColor: mode.mode === "dark" ? "#484848" : "#E4EBE4",
                borderRadius: "20px",
            }}
        >
            <form
                target="_blank"
                onSubmit={onSubmit}
                method="POST"
                action="https://formsubmit.co/90c73e311e208fea874637eeb50a0860"
            >
                <FormBox>
                    <Title variant="h4">
                        Let's stay in Touch!
                    </Title>

                    <TextField
                        size="small"
                        fullWidth
                        type="text"
                        placeholder="Name"
                        {...register("name", {
                            required: true,
                            maxLength: 100,
                        })}
                    />

                    <FormSpan>
                        {errors.name && (
                            <Typography variant="caption">
                                {errors.name.type === "required" && "This field is required."}
                                {errors.name.type === "maxLength" && "Max length is 100 char."}
                            </Typography>
                        )}
                    </FormSpan>

                    <TextField
                        size="small"
                        fullWidth
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                    />

                    <FormSpan>
                        {errors.email && (
                            <Typography variant="caption">
                                {errors.email.type === "required" && "This field is required."}
                                {errors.email.type === "pattern" && "Invalid email address."}
                            </Typography>
                        )}
                    </FormSpan>

                    <TextField
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Message"
                        type="text"
                        {...register("message", {
                            required: true,
                            maxLength: 2000,
                        })}
                    />

                    <FormSpan>
                        {errors.message && (
                            <Typography variant="caption">
                                {errors.message.type === "required" &&
                                    "This field is required."}
                                {errors.message.type === "maxLength" &&
                                    "Max length is 2000 char."}
                            </Typography>
                        )}
                    </FormSpan>

                    <Button1 type="submit">
                        Send a message
                    </Button1>
                </FormBox>
            </form>
        </div>
    );
};

export default Form;
