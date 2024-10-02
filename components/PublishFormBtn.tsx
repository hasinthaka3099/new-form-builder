import React, { startTransition, useTransition } from 'react'
import { Button } from './ui/button';
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { TbFidgetSpinner } from 'react-icons/tb';
import { toast } from '@/hooks/use-toast';
import { PublishForm } from '@/actions/form';
import { useRouter } from 'next/navigation';




function PublishFormBtn( {id}: {id:number}) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm(){
    try {
      await PublishForm(id);
      toast({
        title: "Success",
        description: "Form Published. Good Luck!!"
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }



  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400' >
            <MdOutlinePublishedWithChanges className='h-4 w-4'/> Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You won't be able edit the form once it is published. Do you want to publish the form? <br>
            
            </br>

            <br></br>
            <span className='text-[0.7rem]'>
              By publishing the form, you are making it available to public and you will be able to collect data.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
          disabled={loading}
          onClick={(e)=>{
            e.preventDefault();
            startTransition(publishForm)
          }}>
            Publish {loading && <TbFidgetSpinner className='animate-spin'/>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormBtn;