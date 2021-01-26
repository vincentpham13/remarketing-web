import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const CustomModal = (props) => {
  const {
    isOpen,
    titleHeader,
    children,
    onSubmit
  } = props;

  return (
    <div>
          <Modal isOpen={isOpen}>
            <ModalHeader>{titleHeader}</ModalHeader>
            <ModalBody>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onSubmit}>Submit</Button>
            </ModalFooter>
          </Modal>
    </div>
  );
}

export default CustomModal;