import React from 'react'
import { Button } from './ui/button'
import { VscOpenPreview } from "react-icons/vsc";
import useDesigner from './hooks/useDesigner';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { FormElements } from './FormElements';

function PreviewDialogBtn() {

const {elements} = useDesigner();

  return (

    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className='gap-3'>
          <VscOpenPreview className='h-4 w-4' />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-h-full flex flex-col flex-grow p-0 gap-0'>
          <div className='px-4 py-2 border-b'>
            <p className='text-lg font-bold text-muted-foreground'>
              Form Privew
            </p>
            <p className='text-[0.7rem] text-muted-foreground'>
              Privew of the form you built. Go back to make changes.
            </p>
          </div>
          <div className='bg-accent flex flex-col flex-grow items-center justify-center overflow-y-auto'>
            <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full 
            rounded-2xl p-8 overflow-y-auto'>

              {elements.map((element) => {
                  const FormComponent = FormElements[element.type].formComponent;
                  return <FormComponent key={element.id} elementInstance={element} />
                })
              }

            </div>
          </div>
      </DialogContent>
    </Dialog>
    
  )
}

export default PreviewDialogBtn;