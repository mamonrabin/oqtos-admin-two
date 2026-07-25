import Staffs from '@/components/pages/user_managmant/Staffs';

import React from 'react';

const User = () => {
    return (
       <div>
      <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
       <Staffs/>
      </div>
    </div>
    );
};

export default User;