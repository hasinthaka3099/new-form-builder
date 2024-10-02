import React from 'react'
import { FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';
import useDesigner from './hooks/useDesigner';
import FormElementsSidebar from './FormElementsSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';

function DesignerSidebar() {
  const {selectedElement} = useDesigner();
  return (
    <aside className='w-[250px] max-w-[400px] flex flex-col flex-grow
    gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full text-[0.9rem]'>
        {!selectedElement && <FormElementsSidebar/>}
        {selectedElement && <PropertiesFormSidebar/>}

    </aside>
  );
}

export default DesignerSidebar