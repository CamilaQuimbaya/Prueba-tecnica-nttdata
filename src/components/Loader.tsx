const Loader = () => {
  return (
    <div className="loader relative flex gap-[0.3em] h-8">
      <div className="loader__circle" />
      <div className="loader__circle" />
      <div className="loader__circle" />
      <div className="loader__circle" />
      <div className="loader__circle" />
      <style>{`
        .loader::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 2em;
          filter: blur(45px);
          background-color: #e299ff;
          background-image:
            radial-gradient(at 52% 57%, hsla(11,83%,72%,1) 0px, transparent 50%),
            radial-gradient(at 37% 57%, hsla(175,78%,66%,1) 0px, transparent 50%);
          z-index: 0;
        }

        .loader__circle {
          --size__loader: 0.6em;
          width: var(--size__loader);
          height: var(--size__loader);
          border-radius: 9999px;
          background-color: #b499ff;
          animation: loader__circle__jumping 2s infinite;
        }

        .loader__circle:nth-child(2n) {
          animation-delay: 300ms;
          background-color: #e499ff;
        }

        .loader__circle:nth-child(3n) {
          animation-delay: 600ms;
        }

        @keyframes loader__circle__jumping {
          0%, 100% {
            transform: translateY(0px);
          }

          25% {
            transform: translateY(-15px) scale(0.5);
          }

          50% {
            transform: translateY(0px);
          }

          75% {
            transform: translateY(5px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
