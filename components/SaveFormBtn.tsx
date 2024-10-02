import React, { useTransition } from 'react'
import { Button } from './ui/button';
import { HiOutlineSave } from "react-icons/hi";
import useDesigner from './hooks/useDesigner';
import { UpdateFormContent } from '@/actions/form';
import { toast } from '@/hooks/use-toast';
import { TbFidgetSpinner } from "react-icons/tb";


function SaveFormBtn({id}:{id:number}) {

  const {elements} = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent (id,jsonElements);
      toast({
        title: "Success",
        description: "Form Saved"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <Button variant={"outline"} 
    className='gap-2'
    disabled={loading}
    onClick={()=>{
      startTransition(updateFormContent);
    }}>
        <HiOutlineSave className='h-4 w-4'/> Save
        {loading && <TbFidgetSpinner className='animate-spin'/>}
    </Button>
  )
}

export default SaveFormBtn;