/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
} & TFormConfig;

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

const CustomForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    // methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submitHandler)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default CustomForm;
