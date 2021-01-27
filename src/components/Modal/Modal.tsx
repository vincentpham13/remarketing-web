import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const CustomModal = (props) => {
  const {
    isOpen,
    titleHeader,
    children,
    onSubmit,
    fnToggle
  } = props;

  return (
    <div>
          <Modal backdrop={true} toggle={fnToggle} isOpen={isOpen}>
            <ModalHeader className="text-center">
              <p className="h2">{titleHeader}</p>
            </ModalHeader>
            <ModalBody>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onSubmit}>Lưu</Button>
            </ModalFooter>
          </Modal>
    </div>
  );
}

export default CustomModal;