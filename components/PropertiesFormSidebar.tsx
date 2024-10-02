import React from 'react'
import useDesigner from './hooks/useDesigner';
import { FormElements } from './FormElements';
import { Button } from './ui/button';
import { CgCloseO } from "react-icons/cg";
import { Separator } from './ui/separator';

function PropertiesFormSidebar() {
    const {selectedElement, setSelectedElement} = useDesigner();

    if(!selectedElement) return null;

    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;
  return (

    <div className='flex flex-col p-2'>
        <div className='flex justify-between items-center'>
            <p className='text-[0.8rem] text-foreground/70'>Properties</p>
            <Button size={"icon"}
            variant={"ghost"}
            onClick={() =>{
                setSelectedElement(null);
            }}
            >
                <CgCloseO />
            </Button>
        </div>
        <Separator className='mb-4'/>
        <PropertiesForm elementInstance={selectedElement}/>
    </div>
  )
}

export default PropertiesFormSidebar;