import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import Form from "components/common/Form";

const EditCar = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const [carImage, setCarImage] = useState({ name: "", url: "" });
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    //incarcaree imagine
    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setCarImage({ name: file?.name, url: result }),
        );
    };

    // control prezente imagane
    const onFinishHandler = async (data: FieldValues) => {
        if (!carImage.name) return alert("Please upload a car image");

        await onFinish({
            ...data,
            photo: carImage.url,
            email: user.email,
        });
    };

    return (
        <Form
            type="Editare"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            carImage={carImage}
        />
    );
};

export default EditCar;
