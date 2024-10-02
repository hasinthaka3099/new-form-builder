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
import { LuHeading1 } from "react-icons/lu";
import { CgFormatSeparator } from "react-icons/cg";
import { Separator } from "../ui/separator";



const type: ElementsType = "SeparatorField"

export const SeparatorFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
       
    }),

    designerBtnElement: {
        icon: CgFormatSeparator,
        label: "Separator",
    },


    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
};




function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    
    return <div className="flex flex-col gap-2 w-full">
        <Label className="text-[0.7rem]"> Separator Field </Label>
        <Separator/>

    </div>;
}

function FormComponent({
    elementInstance,
    
    
}: {
    elementInstance: FormElementInstance;
    
    
}) {
    
    return (
        <Separator/>
    )
}

function PropertiesComponent({
    elementInstance,
}:{
    elementInstance: FormElementInstance;
}) {

    return <p>No properties for this element</p>
}


