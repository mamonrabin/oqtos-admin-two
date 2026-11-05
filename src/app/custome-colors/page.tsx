
import CustomeColorDesign from '@/components/pages/customeColorDesign_managment/CustomeColorDesign';
import CustomeColorDesignList from '@/components/pages/customeColorDesign_managment/CustomeColorDesignList';
import React from 'react';

const page = () => {
    return (
     <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
           <CustomeColorDesign/>
           <CustomeColorDesignList/>
        </div>
    );
};

export default page;