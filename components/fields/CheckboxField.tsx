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
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { Checkbox } from "../ui/checkbox";



const type: ElementsType = "CheckboxField"

const extraAttributes = {
    label: "Checkbox Field",
    helperText: "Helper Text",
    required: false,
    
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    
});

export const CheckboxFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes, 
    }),

    designerBtnElement: {
        icon: RiCheckboxMultipleLine,
        label: "Checkbox",
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
            return currentValue === "true";
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
    const {label, required, helperText} = element.extraAttributes;
    const id = `checkbox-${element.id}`
    return (
        <div className="flex items-top space-x-2">
        <Checkbox id={id}/>
        <div className="grid gap-1.5 leading-none">
            <Label htmlFor={id}>
                {label}
                {required && "*"}
            </Label>
              
        {helperText && (
            <p className="text-muted-foreground text-[0.7rem]"> {helperText} </p>
        )}

        </div> 
    </div>
    );
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

    const [value, setValue] = useState<boolean>(defaultValue === "true" ? true: false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const {label, required, placeHolder, helperText} = element.extraAttributes;
    const id = `checkbox-${element.id}`
    return (
        <div className="flex items-top space-x-2">
        <Checkbox 
        id={id}
        checked = {value}
        className={cn(error && "border-red-500")}
        onCheckedChange={ (checked) => {
            let value = false;
            if (checked === true) value = true;

            setValue(value);
            if(!submitValue) return; 
            const stringValue = value ? "true" : "false"
            const valid = CheckboxFieldFormElement.validate(
                element,
                stringValue,
            );
            setError(!valid);
            submitValue(element.id, stringValue)
        }}
        />

        <div className="grid gap-1.5 leading-none">
            <Label htmlFor={id} className={cn(error && "border-red-500")}>
                {label}
                {required && "*"}
            </Label>
              
        {helperText && (
            <p className={cn("text-muted-foreground text-[0.7rem]", error && "text-red-500")}> {helperText} </p>
        )}

        </div> 
    </div>
    );
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
            
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType){
        const {label, helperText, required} = values;
        updateElement (element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,                
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


