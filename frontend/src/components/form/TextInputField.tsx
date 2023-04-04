import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>, // This is the register function from react-hook-form
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any, // This is to allow any other props to be passed to the input element
}

const TextInputField = ({name, label, register, registerOptions, error, ...props} : TextInputFieldProps) => {
    return (
        <Form.Group className="mb-3" controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
            {...props}
            {...register(name, registerOptions)}
            isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}
 
export default TextInputField;