function NetworkError({ onClose }) {

    return (
    <>
        <div
            className="alert alert-danger alert-dismissible fade show position-fixed
                    top-0 start-50 translate-middle-x mt-3 w-75"
            role="alert"
            style={{ zIndex: 9999 }}
        >
            <strong>Network error:</strong> Unable to connect to the server.

            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
            />
        </div>
    </>
    );
}

export default NetworkError;