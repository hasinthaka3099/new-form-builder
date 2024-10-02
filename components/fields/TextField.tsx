"use client"

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDesigner from "../hooks/useDesigner";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";



const type: ElementsType = "TextField"

const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Type something...",
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
});

export const TextFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes, 
    }),

    designerBtnElement: {
        icon: MdTextFields,
        label: "Text",
    },


    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (
        formElement: FormElementInstance,
        currentValue: string
    ): boolean => {
        const element = formElement as CustomInstance;
        if (element.extraAttributes.required){
            return currentValue.length > 0;
        }

        return true;
    }
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;


function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const {label, required, placeHolder, helperText} = element.extraAttributes;
    return <div className="flex flex-col gap-2 w-full">
        <Label className="text-[0.7rem]">
            {label}
            {required && "*"}

        </Label>

        <Input readOnly disabled placeholder={placeHolder} className="text-[0.8rem]"/>
        {helperText && (
            <p className="text-muted-foreground text-[0.7rem]"> {helperText} </p>
        )}

    </div>;
}

function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    defaultValue,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
}) {
    const element = elementInstance as CustomInstance;

    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const {label, required, placeHolder, helperText} = element.extraAttributes;
    return <div className="flex flex-col gap-2 w-full">
        <Label className={cn("text-[0.7rem]",error && "text-red-500") }>
            {label}
            {required && "*"}

        </Label>

        <Input 
        className={cn("text-[0.7rem]",error && "border-red-500")}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
            if(!submitValue) return;
            const valid = TextFieldFormElement.validate(element, e.target.value);
            setError(!valid);
            if(!valid) return;

            submitValue(element.id, e.target.value);
        }}
        value={value}
        />
        {helperText && (
            <p className={cn("text-muted-foreground text-[0.7rem]", error && "text-red-500")}> {helperText} </p>
        )}

    </div>;
}

function PropertiesComponent({
    elementInstance,
}:{
    elementInstance: FormElementInstance;
}) {

    const element = elementInstance as CustomInstance;
    const {updateElement} = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder,
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType){
        const {label, helperText, placeHolder, required} = values;
        updateElement (element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
                required,
            },
        });
    }

    return (
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)}
            onSubmit={(e)=> {
                e.preventDefault();
            }}
             className="space-y-3">
                <FormField control={form.control}
                name="label"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-[0.8rem]">Label</FormLabel>
                        <FormControl className="text-[0.7rem]">
                            <Input {...field} 
                            onKeyDown={(e)=>{
                                if(e.key==="Enter") e.currentTarget.blur();
                            }}/>
                        </FormControl>
                        <FormDescription className="text-[0.7rem]">
                            Change the label of the field
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />

                <FormField control={form.control}
                    name="placeHolder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[0.8rem]">Placeholder Text</FormLabel>
                            <FormControl className="text-[0.7rem]">
                                <Input {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }} />
                            </FormControl>
                            <FormDescription className="text-[0.7rem]">
                                Change the placeholder text of the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField control={form.control}
                    name="helperText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[0.8rem]">Helper Text</FormLabel>
                            <FormControl className="text-[0.7rem]">
                                <Input {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }} />
                            </FormControl>
                            <FormDescription className="text-[0.7rem]">
                                Change the Helper text of the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                            <FormLabel className="text-[0.8rem]">Required?</FormLabel>
                            
                            <FormDescription className="text-[0.7rem]">
                                This field must not be empty
                            </FormDescription>
                            </div>
                            <FormControl className="text-[0.7rem]">
                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}


