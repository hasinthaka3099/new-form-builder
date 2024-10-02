"use client"

import { RxDropdownMenu } from "react-icons/rx";
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
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import { FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "@/hooks/use-toast";





const type: ElementsType = "SelectField"

const extraAttributes = {
    label: "Select Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Type something...",
    options: [],
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    options: z.array(z.string()).default([],)
});

export const SelectFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes, 
    }),

    designerBtnElement: {
        icon: RxDropdownMenu,
        label: "Dropdown",
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

        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeHolder}/>
            </SelectTrigger>
        </Select>

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

    const {label, required, placeHolder, helperText, options} = element.extraAttributes;
    return <div className="flex flex-col gap-2 w-full">
        <Label className={cn("text-[0.7rem]",error && "text-red-500") }>
            {label}
            {required && "*"}

        </Label>

        <Select
        defaultValue={value}
        onValueChange={(value) => {
            setValue(value);
            if(!submitValue) return;
            const valid = SelectFieldFormElement.validate(element, value);
            setError(!valid);
            submitValue(element.id, value);
        }} 
        >
            <SelectTrigger className={cn("w-full", error && "border-red-500")}>
                <SelectValue placeholder={placeHolder}/>
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
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
    const {updateElement, setSelectedElement} = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onSubmit",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder,
            options: element.extraAttributes.options,
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType){
        const {label, helperText, placeHolder, required,options} = values;
        updateElement (element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
                required,
                options,
            },
        });

        toast({
            title: "Success",
            description: "Saved Successfully.",
        });

        setSelectedElement(null);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(applyChanges)}
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

                <Separator/>

                <FormField control={form.control}
                    name="options"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                            <FormLabel className="text-[0.8rem]">Options</FormLabel>
                                <Button
                                variant={"outline"}
                                className="gap-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    form.setValue("options", field.value.concat("Add Option"));
                                }}>
                                   <FaPlus />
                                   Add                                
                                </Button>
                            </div>

                            <div className="flex flex-col gap-2">
                                {form.watch("options").map((option, index) => (
                                    <div key={index} className="flex items-center justify-between gap-1">
                                        <Input
                                        placeholder=""
                                        value={option}
                                        onChange={(e) => {
                                            field.value[index] = e.target.value;
                                            field.onChange(field.value);
                                        }}/>
                                        <Button
                                        variant={"ghost"}
                                        size={"icon"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const newOptions = [...field.value];
                                            newOptions.splice(index, 1);
                                            field.onChange(newOptions);
                                        }}>
                                            <AiOutlineClose/>
                                        </Button>
                                    </div>
                                ))}
                            </div>                        
                            
                            <FormDescription className="text-[0.7rem]">
                                Change the Helper text of the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                
                <Separator/>
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
                <Separator/>
                <Button className="w-full" type="submit">
                    Save
                </Button>
            </form>
        </Form>
    )
}


