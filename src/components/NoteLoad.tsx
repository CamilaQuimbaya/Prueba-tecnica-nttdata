import '../styles/noteLoad.css';

const NoteLoad = () => {
  return (
    <div className="loader-con">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="pfile" style={{ ['--i' as any]: i }} />
      ))}
    </div>
  );
};

export default NoteLoad;
