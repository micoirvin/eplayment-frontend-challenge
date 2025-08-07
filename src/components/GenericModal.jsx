import { useEffect, useState } from 'react';

export default function GenericModal({ children, condition, setCondition }) {
  const [showModal, setShowModal] = useState(false);
  const [finallyClose, setFinallyClose] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    new Promise((resolve) => {
      setTimeout(() => {
        setCondition(false);
        setFinallyClose(true);
        resolve(null);
      }, 300);
    });
  };

  useEffect(() => {
    if (condition) {
      setFinallyClose(false);
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
          setShowModal(true);
        }, 100);
      });
    } else {
      handleCloseModal();
    }
  }, [condition]);

  if (finallyClose) return null;
  return (
    <section className={'modal ' + (showModal ? 'show' : '')}>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
      {children}
    </section>
  );
}
