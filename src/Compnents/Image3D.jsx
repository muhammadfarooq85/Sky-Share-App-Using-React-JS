function Image3DComp({ src, alt }) {
  return (
    <div className="image-container">
      <img src={src} alt={alt} className="image rounded-xl cursor-pointer" />
    </div>
  );
}

export default Image3DComp;
