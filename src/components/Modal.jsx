const Modal = ({ id, title, children, onClose }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <button 
            onClick={() => {
              document.getElementById(id).close();
              onClose?.();
            }}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;