import React from "react";
import { Button } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { ic_file_upload } from 'react-icons-kit/md/ic_file_upload';
import parseUrl from 'url-parse';

const PinFooter = (props) => {
  const url = parseUrl(props.url);
  // const hostname = url.hostname;


  return (
    <div className="display-over-bottom">
      <Button variant="light" className="rounded-circle m-2">
        <Icon className="absolute m-10" icon={ic_file_upload} size={20} />
      </Button>
    </div>
  );
};

export default PinFooter;
