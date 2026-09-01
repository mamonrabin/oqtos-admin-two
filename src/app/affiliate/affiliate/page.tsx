

import AffiliateList from '@/components/pages/affiliate_managment/AffiliateList';
import CreateAffiliate from '@/components/pages/affiliate_managment/CreateAffiliate';
import React from 'react';

const page = () => {
    return (
        <div>
            <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
           <CreateAffiliate/>
           <AffiliateList/>
        </div>
        </div>
    );
};

export default page;