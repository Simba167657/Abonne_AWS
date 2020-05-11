import React from 'react';
import { Result } from 'antd';

const NotFoundPage = props => {
  // const backHome = () => props.history.push('/');

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, this page does not exist"
        // extra={
        //   <Button type="primary" onClick={backHome}>
        //     Back Home
        //   </Button>
        // }
      />
    </div>
  );
};

export default NotFoundPage;
