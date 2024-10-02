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

import { ImParagraphCenter } from "react-icons/im";
import { Textarea } from "../ui/textarea";



const type: ElementsType = "ParagraphField"

const extraAttributes = {
    text: "Text here",

};

const propertiesSchema = z.object({
    text: z.string().min(2).max(500),

});

export const ParagraphFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes, 
    }),

    designerBtnElement: {
        icon: ImParagraphCenter,
        label: "Paragraph",
    },


    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
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
    const {text} = element.extraAttributes;
    return <div className="flex flex-col gap-2 w-full">
        <Label className="text-[0.7rem]"> Paragraph Field </Label>
        <p className="break-words overflow-hidden whitespace-normal"> {text} </p>

        

    </div>;
}

function FormComponent({
    elementInstance,
    
    
}: {
    elementInstance: FormElementInstance;
    
    
}) {
    const element = elementInstance as CustomInstance;



    const {text} = element.extraAttributes;
    return (
        <p className="break-words overflow-hidden whitespace-normal"> {text} </p>
    )
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
            text: element.extraAttributes.text,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType){
        const {text} = values;
        updateElement (element.id, {
            ...element,
            extraAttributes: {
                text,
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
                name="text"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-[0.8rem]">Text</FormLabel>
                        <FormControl className="text-[0.7rem]">
                            <Textarea rows={20} {...field} 
                            onKeyDown={(e)=>{
                                if(e.key==="Enter") e.currentTarget.blur();
                            }}/>
                        </FormControl>
  
                        <FormMessage/>
                    </FormItem>
                )}
                />
            </form>
        </Form>
    )
}


